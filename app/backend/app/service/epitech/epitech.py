from flask import request
import requests
from __init__ import app, mongo
from flask_restful import Resource, reqparse
import jwt
import datetime
from utils.token_required import token_required

@app.route('/api/epitech/information', methods=["GET"])
@token_required
def epitechInformation():
  email = jwt.decode(request.headers.get('x-access-token'), app.config["SECRET_KEY"])["user"]
  user = mongo.db.users.find_one({"email": email})
  r = requests.get('https://intra.epitech.eu/' + user["autologinEpitech"] + "/user/?format=json")
  try:
    credits = str(r.json()["credits"])
    gpa = str(r.json()["gpa"][0]["gpa"])
    netsoul = str(r.json()["nsstat"]["active"])
  except:
    return {"error": "error"}, 404
  return {"gpa": gpa, "netsoul": netsoul, "credits": credits}


@app.route('/api/epitech/notification', methods=["GET"])
@token_required
def epitechNotification():
  try:
    email = jwt.decode(request.headers.get('x-access-token'), app.config["SECRET_KEY"])["user"]
    user = mongo.db.users.find_one({"email": email})
    r_message = requests.get("https://intra.epitech.eu/" + user["autologinEpitech"] + "/user/notification/message?format=json")
    r_missed = requests.get("https://intra.epitech.eu/" + user["autologinEpitech"] + "/user/notification/missed?format=json")
    r_alert = requests.get("https://intra.epitech.eu/" + user["autologinEpitech"] + "/user/notification/alert?format=json")
    if r_message.status_code != 200 or r_missed.status_code != 200 or r_alert.status_code != 200:
      return {"error": "api intra down"}, 200
    alert = []
    message = []
    missed = []
  except:
    return {"error": 1}, 200

  try:
    # messages
    for i in r_message.json():
      title = i["title"]
      while title.find('<') != -1:
        title = title[:title.find('<')] + title[title.find('>') + 1:]
      message.append(title)

    # missed
    to_parse = []
    if len(r_missed.json()["recents"]) >= 2:
      to_parse = r_missed.json()["recents"]
    else:
      to_parse = r_missed.json()["others"]
    for i in to_parse:
      s = {
        "title": i["acti_title"],
        "date": i["begin"][:10],
        "hour": i["begin"][11:]
      }
      missed.append(s)

    # alert
    for i in r_alert.json():
      alert.append(i["title"])
  except:
    return {"error": "error"}, 200

  return {"data": {"message": message, "alert": alert, "missed": missed}}, 200


@app.route('/api/epitech/profile')
@token_required
def epitechProfile():
  user = None
  try:
    email = jwt.decode(request.headers.get('x-access-token'), app.config["SECRET_KEY"])["user"]
    user = mongo.db.users.find_one({"email": email})
  except:
    return {"error": "User not found"}, 404
  
  r = requests.get("https://intra.epitech.eu/" + user["autologinEpitech"] +"/user/?format=json")
  name = r.json()["title"]
  description = "EPITECH " + r.json()["groups"][0]["title"]
  gpa = r.json()["gpa"][0]["gpa"]
  netsoul = r.json()["nsstat"]["active"]
  imageFile = "https://intra.epitech.eu" + r.json()["picture"]
  promo = r.json()["promo"]
  annee = str(6 - int(r.json()["promo"]) + int(r.json()["scolaryear"])) + "ème année"
  parcours = r.json()["gpa"][0]["cycle"]
  return {"data": {
    "name": name,
    "description": description,
    "gpa": gpa,
    "netsoul": netsoul,
    "imageFile": imageFile,
    "promo": promo,
    "annee": annee,
    "parcours": parcours
  }}, 200


@app.route('/api/epitech/module', methods=["GET"])
@token_required
def epitechModule():
  try:
    email = jwt.decode(request.headers.get('x-access-token'), app.config["SECRET_KEY"])["user"]
    user = mongo.db.users.find_one({"email": email})
  except:
    return {"error": "Not found"}, 404
  r = requests.get('https://intra.epitech.eu/' + user["autologinEpitech"] + "/?format=json")
  return {"error": r.json()["board"]["modules"]}, 200


@app.route('/api/epitech/module_names', methods=["GET"])
@token_required
def epitechModuleNames():
  try:
    email = jwt.decode(request.headers.get('x-access-token'), app.config["SECRET_KEY"])["user"]
    user = mongo.db.users.find_one({"email": email})
  except:
    return {"error", "error"}, 404

  if "autologinEpitech" not in user:
    return {"error": "need autologin"}, 401
  try:
    login = requests.get('https://intra.epitech.eu/' + user["autologinEpitech"] + '/user?format=json').json()["login"]
    r = requests.get('https://intra.epitech.eu/' + user["autologinEpitech"] + "/user/" + login + "/notes?format=json")
    modules = r.json()["modules"]
    ret = []
    for i in modules:
      ret.append({
        "title": i["title"],
        "year": i["scolaryear"],
        "module": i["codemodule"],
        "instance": i["codeinstance"]
      })
  except:
    return {"error": "error"}, 405
  return {"data": ret}, 200


@app.route('/api/epitech/module_info', methods=["POST"])
@token_required
def epitechModuleInfo():
  parser = reqparse.RequestParser()
  parser.add_argument("instance", type=str, required=True)
  parser.add_argument("year", type=str, required=True)
  parser.add_argument("module", type=str, required=True)
  parser.add_argument("moduleName", type=str, required=True)
  args = parser.parse_args()

  try:
    email = jwt.decode(request.headers.get('x-access-token'), app.config["SECRET_KEY"])["user"]
    user = mongo.db.users.find_one({"email": email})
  except:
    return {"error", "error"}, 404

  r = requests.get(
    'https://intra.epitech.eu/'
    + user["autologinEpitech"]
    + "/module/" + args["year"]
    + "/" + args["module"] + "/"
    + args["instance"] + "?format=json"
  )

  begin = datetime.datetime.strptime(r.json()["begin"][:10], "%Y-%m-%d")
  end = datetime.datetime.strptime(r.json()["end"][:10], "%Y-%m-%d")
  end_register = datetime.datetime.strptime(r.json()["end_register"][:10], "%Y-%m-%d")

  title = r.json()["title"]
  credits = r.json()["credits"]
  total_time = (end - begin).days
  print(begin)

  now_time = (end - datetime.datetime.today()).days

  if now_time < 0:
    percentage = 100
  else:
    percentage = total_time / 100 * now_time

  return {"data": {
    "percentage": percentage,
    "title": title,
    "credits": credits,
    "end": r.json()["end"][:10]
  }}, 200