from flask import request, jsonify
import requests
from __init__ import app, mongo
from flask_restful import Resource, reqparse
import jwt
import datetime
from utils.token_required import token_required

@app.route('/api/linkedin/profil', methods=["GET"])
@token_required
def linkedinProfil():
  try:
    email = jwt.decode(request.headers.get('x-access-token'), app.config["SECRET_KEY"])["user"]
    user = mongo.db.users.find_one({"email": email})
    r = requests.get('https://api.linkedin.com/v2/me', headers={
      "Authorization": "Bearer " + user["linkedinToken"]
    })
    ret = {
      "fistName": r.json()["localizedFirstName"],
      "name": r.json()["localizedLastName"],
      "country": r.json()["lastName"]["preferredLocale"]["country"],
    }
    r = requests.get('https://api.linkedin.com/v2/me?projection=(id,profilePicture(displayImage~:playableStreams))', headers={
      "Authorization": "Bearer " + user["linkedinToken"]
    })
    ret["profilePicture"] = r.json()["profilePicture"]["displayImage~"]["elements"][0]["identifiers"][0]["identifier"]
  except:
    return {"error": "error"}, 200
  return jsonify({"data": ret}), 200