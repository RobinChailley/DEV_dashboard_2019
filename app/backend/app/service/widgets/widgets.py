from flask import request
from __init__ import app, mongo
from flask_restful import Resource, reqparse
import jwt
import datetime
from utils.token_required import token_required
import uuid

def getParamsAsObject(params):
  obj = {}
  try:
    params = params.split("&")
    for i in params:
      obj[i[:i.find("=")]] = i[i.find("=") + 1:]
  except:
    return None
  return obj


def setStringFromObject(obj):
  params = ""
  try:
    for key, value in obj.items:
      params += key + "=" + value + "&"
    params = params[:-1]
  except:
    return None
  return params


@app.route('/api/createWidget', methods=["POST"])
@token_required
def createWidget():
  """
  WidgetModel:
    type: Str -> "LinkedinProfile" , "..."
    gridX: Number
    gridY: Number
    timer: Number
    params: String -> "key=value&key=value&key=value" /!\ Keys can not be "type" | "gridX" | "gridY" | "timer"
  This endpoints get the params of the request and create a widget to the user who
  sended the request (knowing who send with the token)
  When the new widget is added in the database, a random ID is generated
  """
  parser = reqparse.RequestParser()
  parser.add_argument("type", type=str, required=True)
  parser.add_argument("params", type=str, required=True)
  parser.add_argument("gridX", type=int, required=True)
  parser.add_argument("gridY", type=int, required=True)
  parser.add_argument("timer", type=int, required=True)
  args = parser.parse_args()

  widget = {
    "id": str(uuid.uuid1()),
    "type": args["type"],
    "gridX": args["gridX"],
    "gridY": args["gridY"],
    "timer": args["timer"],
    "params": {}
  }

  for key, value in getParamsAsObject(args["params"]).items():
    widget["params"][key] = value

  try:
    email = jwt.decode(request.headers.get('x-access-token'), app.config["SECRET_KEY"])["user"]
    mongo.db.users.find_one_and_update({"email": email}, {
      "$push": {"widgets" : widget}
    })
  except:
    return {"error": "can not add this widget"}, 401

  return {"data": widget}, 200


@app.route('/api/updateWidget', methods=["POST"])
@token_required
def updateWidget():
  parser = reqparse.RequestParser()
  parser.add_argument("widget_id", type=str, required=True)
  parser.add_argument("params", type=str, required=False)
  parser.add_argument("gridX", type=int, required=False)
  parser.add_argument("gridY", type=int, required=False)
  parser.add_argument("timer", type=int, required=False)
  args = parser.parse_args()

  widget = None
  email = None
  user = None

  try:
    email = jwt.decode(request.headers.get('x-access-token'), app.config["SECRET_KEY"])["user"]
    user = mongo.db.users.find_one({"email": email})
    for i in user["widgets"]:
      if i["id"] == args["widget_id"]:
        widget = i
  except:
    return {"error": "can not update this widget"}, 401

  if widget == None:
    return {"error": "Widget not found"}, 404

  if "gridX" in args and args["gridX"] != None:
    widget["gridX"] = args["gridX"]
  if "gridY" in args and args["gridY"] != None:
    widget["gridY"] = args["gridY"]
  if "timer" in args and args["timer"] != None:
    widget["timer"] = args["timer"]

  if getParamsAsObject(args["params"]) != None:
    for key, value in getParamsAsObject(args["params"]).items():
      widget["params"][key] = value


  try:
    mongo.db.users.replace_one({"email": email}, user)
  except:
    return {"error": "can not replace this widget"}, 401

  return {"data": widget}, 200

@app.route('/api/deleteWidget', methods=["POST"])
@token_required
def deleteWidget():
  parser = reqparse.RequestParser()
  parser.add_argument("widget_id", type=str, required=True)
  args = parser.parse_args()

  try:
    email = jwt.decode(request.headers.get('x-access-token'), app.config["SECRET_KEY"])["user"]
    user = mongo.db.users.find_one({"email": email})
    widget_to_delete = None
    is_deleted = False
    for i in user["widgets"]:
      if i["id"] == args["widget_id"]:
        widget_to_delete = i
    if widget_to_delete != None:
      user["widgets"].remove(widget_to_delete)
      is_deleted = True
    else:
      return {"error": "widget not found"}, 404
    mongo.db.users.replace_one({"email": email}, user)
  except:
    return {"error": "can not delete this widget"}, 401

  return {"data": is_deleted}, 200


@app.route('/api/setLayout', methods=["POST"])
@token_required
def setLayout():
  user = None
  try:
    email = jwt.decode(request.headers.get('x-access-token'), app.config['SECRET_KEY'])["user"]
    user = mongo.db.users.find_one({"email": email})
  except:
    return {"error": "Not found"}, 404

  if user == None:
    return {"error": "Not found"}, 404

  if 'widgets' not in user:
    return {"error": "User's widgets empty"}, 404

  if len(user['widgets']) != len(request.json['layout']):
    return {"error": "Size problem"}, 404

  for elFromReq in request.json['layout']:
    for elFromDB in user['widgets']:
      if elFromDB["id"] == elFromReq["id"]:
        elFromDB["gridX"] = elFromReq["GridX"]
        elFromDB["gridY"] = elFromReq["GridY"]

  mongo.db.users.replace_one({"email": email}, user)
  return {"data": user["widgets"]}, 200


