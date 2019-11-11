from flask import request
from __init__ import app, mongo
from flask_restful import reqparse
from models import user_model
import jwt
import datetime
from passlib.hash import sha256_crypt


"""
~ /login - POST
~ Api endpoint for auth an user, if datas are good (password, email) then a token is returned
~ else, a 401 code is returned, with the error message in "error" field.
~ Token not required
"""
@app.route('/api/login', methods=["POST"])
def login():
  parser = reqparse.RequestParser()
  parser.add_argument("authType", type=str, required=True, help="auhType is required")
  parser.add_argument("password", type=str)
  parser.add_argument("email", type=str, required=True, help="email is required")
  parser.add_argument("token", type=str)
  args = parser.parse_args()

  try:
    if args["authType"] == "basic":
      return basicAuth(args)
    elif args["authType"] == "facebook" or args["authType"] == "google":
      return facebookGoogleAuth(args)
    else:
      return {"data": "authType must be basic | google | facebook"}, 401
  except Exception as e:
    print("e: %s" % e)
    return {"error": "error"}, 410



def basicAuth(args):
  users = list(mongo.db.users.find({"email": args["email"]}))

  if len(users) > 1:
    return {"error": "There is too many users with this email."}, 500

  elif len(users) == 0:
    return {"error": "Invalid password or email"}, 401

  elif len(users) == 1:
    if sha256_crypt.verify(args["password"], users[0]["password"]):
      token = jwt.encode({
          "user": users[0]["email"],
          "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=90)
        },
        app.config["SECRET_KEY"]
      )
      return {"token": str(token)[2:-1]}, 200

    else:
      return {"error": "Bad password"}, 401

  return {"error": "Internal server error"}, 500



def facebookGoogleAuth(args):
  print("facebookGoogleAuth")
  if args["token"] == None:
    return {"error": "Token is missing"}, 200
  users = list(mongo.db.users.find({"email":  args["email"]}))

  if len(users) > 1:
    return {"error": "This email already exists in our database"}, 401
  elif len(users) == 0:
    user = user_model.UserModel()
    user.setAuthType(args["authType"])
    user.setEmail(args["email"])

    if args["authType"] == "facebook":
      user.setFacebookToken(args["token"])
    else:
      user.setGoogleToken(args["token"])

    if user.save() == False:
      return {"error": "Can not save this user."}, 401

    token = jwt.encode({
        "user": args["email"],
        "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=90)
      },
      app.config["SECRET_KEY"]
    )
    return {"data": "Account created", "token": token}, 200

  elif len(users) == 1:
    token = jwt.encode({
        "user": args["email"],
        "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=90)
      },
      app.config["SECRET_KEY"]
    )
    return {"token": str(token)[2:-1]}, 200
