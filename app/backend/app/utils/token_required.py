import jwt
from flask import request
from functools import wraps
from __init__ import app


def token_required(f):
  @wraps(f)
  def decorated(*args, **kwargs):
    token = request.headers.get('x-access-token')
    if not token:
      return {"data": "Token is missing"}, 401

    try:
      jwt.decode(token, app.config['SECRET_KEY'])
    except:
      return {"data": "Invalid token"}, 401

    return f(*args, **kwargs)

  return decorated