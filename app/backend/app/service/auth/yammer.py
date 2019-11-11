from __init__ import app, mongo
from flask_restful import reqparse
from flask import request
from utils.token_required import token_required
import jwt

@app.route('/api/setYammerToken', methods=["POST"])
@token_required
def setYammerToken():
  parser = reqparse.RequestParser()
  parser.add_argument("token", type=str, required=True)
  args = parser.parse_args()
  try:
    token = jwt.decode(request.headers.get('x-access-token'), app.config["SECRET_KEY"])
    mongo.db.users.find_one_and_update({"email": token["user"]}, {
      "$set": {
        "yammerToken": args["token"]
      }
    })
  except:
    return {"error": "Invalid token or user"}, 401

  return {"data": "YammerToken sucessfully added"}, 200