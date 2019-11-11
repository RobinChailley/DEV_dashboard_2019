from __init__ import app
from flask import jsonify, request
from datetime import datetime

@app.route('/about.json')
def about():
  now = datetime.now()
  timestamp = datetime.timestamp(now)
  return jsonify({
    "customer": {
      "host": request.remote_addr
    },
    "server": {
      "current_time": int(timestamp),
      "services": [{
        "name": "intranet epitech",
        "widgets": [{
          "name": "profileEpitech",
          "description": "Display user profil info like profil picture, gpa, netsoul, and school year",
          "params": [{
            "name": "picture profile",
            "type": "string"
          }, {
            "name": "gpa",
            "type": "string"
          }, {
            "name": "netsoul",
            "type": "string",
          }, {
            "name": "option",
            "type": "string"
          }]
        }, {
          "name": "informationEpitech",
          "description": "Display information about one thing (gpa, netsoul, credits)",
          "params": [{
            "name": "option",
            "type": "string"
          }]
        }, {
          "name": "notificationsEpitech",
          "description": "Display information about the notifications on the epitech's intranet",
          "params": [{
            "name": "option",
            "type": "string"
          }]
        }, {
          "name": "moduleEpitech",
          "description": "Display informations about a module",
          "params": [{
            "name": "instance",
            "type": "string"
          }, {
            "name": "module",
            "type": "string"
          }, {
            "name": "moduleName",
            "type": "string"
          }, {
            "name": "year",
            "type": "string"
          }]
        }]
      }, {
        "name": "github",
        "widgets": [{
          "name": "profileGithub",
          "description": "Display informations about the logged user's profile",
          "params": [{
            "name": "avatar_url",
            "type": "string",  
          }, {
            "name": "login",
            "type": "string"
          }, {
            "name": "name",
            "type": "string"
          }, {
            "name": "option",
            "type": "string"
          }, {
            "name": "repository",
            "type": "string"
          }]
        }, {
          "name": "repositoryGithub",
          "description": "Display informations about a repository on github",
          "params": [{
            "name": "repositoryName",
            "type": "string"
          }]
        }]
      }, {
        "name": "linkedin",
        "widgets": [{
          "name": "profileLinkedin",
          "description": "Display informations about linkedin profile",
          "params": [{
            "name": "country",
            "type": "string"
          }, {
            "name": "profilePicture",
            "type": "string",
          }, {
            "name": "name",
            "type": "string"
          }]
        }, {
          "name": "postLinkedin",
          "description": "Display informations about linkedin post",
          "params": [{
            "name": "url",
            "type": "string"
          }]
        }]
      }, {
        "name": "yammer",
        "widgets": [{
          "name": "group",
          "description": "Display information about a group on yammer",
          "params": [{
            "name": "groupName",
            "type": "string"
          }]
        }, {
          "name": "mailBox",
          "description": "Display last messages from yammer",
          "params": [{
            "name": "nbMsg",
            "type": "number"
          }, {
            "name": "truncate",
            "type": "string"
          }]
        }, {
          "name": "profileYammer",
          "description": "Display informations about profile yammer",
          "params": [{
            "name": "information",
            "type": "string"
          }, {
            "name": "name",
            "type": "string"
          }, {
            "name": "networkName",
            "type": "string"
          }, {
            "name": "profilePicture",
            "type": "string"
          }]
        }]
      }]
    }
  })