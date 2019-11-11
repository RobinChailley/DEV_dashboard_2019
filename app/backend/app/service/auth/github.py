from flask import request
from __init__ import app, mongo
from flask_restful import reqparse
import jwt
import datetime
from utils.token_required import token_required
import requests

@app.route('/api/accessTokenGithub', methods=["POST"])
@token_required
def accessTokenGithub():
  parser = reqparse.RequestParser()
  parser.add_argument("code", type=str, required=True)
  args = parser.parse_args()

  r = None
  try:
    r = requests.post("https://github.com/login/oauth/access_token", {
      "code": args["code"],
      "client_id": "fca50a960a6ae9f2a37b",
      "client_secret": "bad7ccb658ec3d5caac29919324553b16f9831e7"
    })
  except: 
    return {"error": "Github API error - 1"}, 401

  githubToken = r.text[13:r.text.find("&")]
  accessToken = jwt.decode(request.headers.get('x-access-token'), app.config["SECRET_KEY"])
  mongo.db.users.find_one_and_update({"email": accessToken["user"]}, {
    "$set": {
      "githubToken": githubToken
    }
  })

  if r.text.find("access_token") == - 1:
    return {"error": "Github API error - 2"}, 401

  return {"token": githubToken}
