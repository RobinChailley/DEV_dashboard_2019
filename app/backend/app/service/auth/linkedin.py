from __init__ import app, mongo
from flask_restful import reqparse
from flask import request
from utils.token_required import token_required
from models import user_model
import requests
import jwt

@app.route('/api/accessTokenLinkedin', methods=["POST"])
@token_required
def accessTokenLinkedin():
  parser = reqparse.RequestParser()
  parser.add_argument("code", type=str, required=True)
  parser.add_argument("redirect_uri", type=str, required=True)
  args = parser.parse_args()

  r = None
  try:
    r = requests.post("https://www.linkedin.com/oauth/v2/accessToken", {
      "grant_type" : "authorization_code",
      "client_id": "770q8w262cpq0v",
      "client_secret": "zZfjoZt2rtX94mnl",
      "redirect_uri": args["redirect_uri"],
      "code": args["code"]
    })
  except:
    return {"error": "Linkedin API error"}, 401

  token = jwt.decode(request.headers.get('x-access-token'), app.config["SECRET_KEY"])
  mongo.db.users.find_one_and_update({"email": token["user"]}, {
    "$set": {
      "linkedinToken": r.json()["access_token"]
    }
  })
  return {"token": r.json()["access_token"]}, 200