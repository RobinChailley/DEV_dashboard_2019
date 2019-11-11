import requests
from flask import request
from __init__ import app, mongo
from flask_restful import Resource, reqparse
import jwt
import datetime
from utils.token_required import token_required
import uuid

@app.route('/api/yammer/mails', methods=["GET"])
@token_required
def yammerTest():
  try:
    email = jwt.decode(request.headers.get('x-access-token'), app.config["SECRET_KEY"])["user"]
    user = mongo.db.users.find_one({"email": email})
  except:
    return {"error": "User not found"}, 404
  r = requests.get("https://www.yammer.com/api/v1/messages/received.json", headers={
    'Authorization': 'Bearer ' + user["yammerToken"]
  })

  ret = []

  for i in r.json()["messages"]:
    ret.append(i["content_excerpt"])

  return {"data": ret}, 200


@app.route('/api/yammer/group', methods=["GET"])
@token_required
def yammerGroup():
  try:
    email = jwt.decode(request.headers.get('x-access-token'), app.config["SECRET_KEY"])["user"]
    user = mongo.db.users.find_one({"email": email})
  except:
    return {"error": "User not found"}, 404

  try:
    r = requests.get('https://www.yammer.com/api/v1/users/current.json', headers={
      'Authorization': 'Bearer ' + user["yammerToken"]
    })
    yammerId = r.json()["id"]
  except:
    return {"error": "can not get user yammer id"}, 401


  try:
    r = requests.get('https://www.yammer.com/api/v1/groups/for_user/1647347470.json', headers={
      'Authorization': 'Bearer ' + user["yammerToken"]
    })
  except:
    return {"error": "can not get group from yammer"}, 401

  ret = []
  for i in r.json():
    ret.append({
      "name": i["full_name"],
      "img": i["mugshot_url"],
      "members": i["stats"]["members"],
      "privacy": i["privacy"],
      "last_message": i["stats"]["last_message_at"][:-6]
    })
  return {"data": ret}, 200


@app.route('/api/yammer/profil', methods=["GET"])
@token_required
def yammerProfil():
  try:
    email = jwt.decode(request.headers.get('x-access-token'), app.config["SECRET_KEY"])["user"]
    user = mongo.db.users.find_one({"email": email})
  except:
    return {"error": "User not found"}, 404

  try:
    r = requests.get('https://www.yammer.com/api/v1/users/current.json', headers={
      'Authorization': 'Bearer ' + user["yammerToken"]
    })
    ret = {
      "name": r.json()["full_name"],
      "network": r.json()["network_name"],
      "following": r.json()["stats"]["following"],
      "followers": r.json()["stats"]["followers"],
      "updates": r.json()["stats"]["updates"],
      "image": r.json()["mugshot_url"]
    }
  except:
    return {"error": "error"}, 200
  return {"data": ret}, 200