from flask import request
from __init__ import app, mongo
from flask_restful import Resource, reqparse
import jwt
import datetime
from utils.token_required import token_required

@app.route('/api/account', methods=["GET"])
@token_required
def account():
  try:
    token = jwt.decode(request.headers.get('x-access-token'), app.config["SECRET_KEY"])
    print(token["user"])
    print(token)
    user = mongo.db.users.find_one({"email": token["user"]})
    if user == None:
      return {"error": "User = None"}, 401
    user["_id"] = str(user["_id"])
    del user["password"]
  except:
    return {"error": "error"}, 401
  return {"data": user}, 200
