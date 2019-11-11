from __init__ import mongo
from passlib.hash import sha256_crypt

class UserModel:


  def __init__(self):
    self.email = None
    self.newEmail = None
    self.password = None
    self.facebookToken = None
    self.googleToken = None
    self.authType = None
    self.linkedinToken = None
    self.githubToken = None
    self.yammerToken = None


  def setUser(self, email, password, authType, facebookToken=None, googleToken=None):
    self.setEmail(email)
    self.setPassword(password)
    self.setFacebookToken(facebookToken)
    self.setAuthType(authType)
    self.setGoogleToken(googleToken)


  def setYammerToken(self, token):
    self.yammerToken = token


  def setGithubToken(self, token):
    self.githubToken = token


  def setLinkedinToken(self, token):
    self.linkedinToken = token


  def setAuthType(self, authType):
    if authType != "basic" or authType != "facebook" or authType != "google":
      return False
    self.authType = authType
    return True


  def setEmail(self, email):
    if email == None:
      return False
    if email.find('@') != -1 and len(email) > 5 and len(email) < 100:
      self.newEmail = email
      self.email = email
      return True
    return False


  def setPassword(self, password):
    if password == None:
      return False
    if len(password) < 100:
      self.password = sha256_crypt.hash(password)
      return True
    return False


  def setFacebookToken(self, token):
    if token == None:
      return False
    self.facebookToken = token
    return True


  def setGoogleToken(self, token):
    if token == None:
      return False
    self.googleToken = token
    return True


  def getAsObject(self):
    user = {}
    if self.email != None:
      user["email"] = self.email
    if self.password != None:
      user["password"] = self.password
    if self.authType != None:
      user["authType"] = self.authType
    if self.googleToken != None:
      user["googleToken"] = self.googleToken
    if self.facebookToken != None:
      user["facebookToken"] = self.facebookToken
    return user


  def save(self):
    if self.email != None:
      user = mongo.db.users.find_one({"email": self.email})
      if user == None:
        user = {
          "email": self.email,
          "password": self.password,
          "googleToken": self.googleToken,
          "facebookToken": self.facebookToken
        }
        try:
          mongo.db.users.insert_one(user)
        except:
          return False
        return True
      else:
        try:
          mongo.db.users.find_one(
            {"email": self.email}, {
            '$set': {
              'email': self.newEmail,
              'password': self.password,
              'googleToken': self.googleToken,
              'facebookToken': self.facebookToken
            }
          })
          self.email = self.newEmail
          self.newEmail = None
        except:
          return False

        return True
    else:
      return False


  @staticmethod
  def list():
    users = list(mongo.db.users.find({}))
    for i in users:
      i["_id"] = str(i["_id"])
    return users


  @staticmethod
  def deleteById(id):
    return mongo.db.users.find_one_and_delete({"_id": id})


  @staticmethod
  def delete():
    return mongo.db.users.delete_many({})


  @staticmethod
  def userExists(email):
    length = len(list(mongo.db.users.find({"email": email})))
    if length == 0:
      return False
    return True


  @staticmethod
  def getById(id):
    return mongo.db.users.find_one({"_id": id})


  @staticmethod
  def getByEmail(email):
     return mongo.db.users.find_one({"email": email})
