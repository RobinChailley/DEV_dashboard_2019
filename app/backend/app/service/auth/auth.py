from flask import request
from __init__ import app, mongo
from flask_restful import Resource, reqparse
from passlib.hash import sha256_crypt
from bson.objectid import ObjectId
import jwt
import datetime
from models import user_model
from utils.token_required import token_required



"""
~ /users - GET
~ This is a temporary endpoint just for dev.
"""
@app.route('/api/users', methods=["GET"])
def list_users():
  users = user_model.UserModel.list()
  return {"data": users}, 200



"""
~ /users - DELETE
~ This is a temporary endpoint just for dev.
"""
@app.route('/api/users', methods=["DELETE"])
def delete_user():
  parser = reqparse.RequestParser()
  parser.add_argument("id", type=str)
  args = parser.parse_args()
  res = None
  try:
    if args["id"]:
      mongo.db.users.delete_one({"_id": ObjectId(args["id"])})
      return {"data": "deleted successfully"}, 200
    else:
      res = user_model.UserModel.delete()
      print(res)
      print(res.deleted_count)
      return {"data": {"deleted_count": res.deleted_count}}, 200
  except:
    return {"error": "Internal server error"}, 500



"""
~ /signup - POST
~ This endpoints is for register an user to the database.
"""
@app.route('/api/signup', methods=["POST"])
def singup():
  parser = reqparse.RequestParser()
  parser.add_argument("email", type=str, required=True)
  parser.add_argument("password", type=str, required=True)
  args = parser.parse_args()

  if user_model.UserModel.userExists(args["email"]):
    return {"error": "Adress email already taken"}, 401

  user = user_model.UserModel()
  res = user.setEmail(args["email"])
  res = user.setPassword(args["password"])

  if res == False:
    return {"error": "Datas are'nt valid."}, 401

  if user.save() == False:
    return {"error": "Can not register this user"}, 401

  return {"data": user.getAsObject()}, 200



"""
~ /me - GET
~ This endpoints return True with a 200 code if the sended token
~ is a valid token, else return 401 (through the @token_required decorator)
"""
@app.route('/api/me', methods=["GET"])
@token_required
def me():
  return {"token": True}, 200