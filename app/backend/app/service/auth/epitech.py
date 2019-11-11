from __init__ import app, mongo
from flask_restful import reqparse
from flask import request
from utils.token_required import token_required
import jwt
import requests

@app.route('/api/setEpitechAutologin', methods=["POST"])
@token_required
def setEpitechAutologin():
  parser = reqparse.RequestParser()
  parser.add_argument("autologin", type=str, required=True)
  args = parser.parse_args()

  try:
    token = jwt.decode(request.headers.get('x-access-token'), app.config["SECRET_KEY"])
    mongo.db.users.find_one_and_update({"email": token["user"]}, {
      "$set": {
        "autologinEpitech": args["autologin"]
      }
    })
  except:
    return {"error": "Error with autologin or user"}, 401

  return {"data": "Epitech Autologin succesfully added"}, 200