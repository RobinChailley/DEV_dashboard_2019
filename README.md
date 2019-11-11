# DASHBOARD - Epitech - 2019

Description
-----------
Dashboard is a __third-year epitech project__ in the form of a web application that aims to replicate the principle of [NetVibes](https://www.netvibes.com/en).
A dashboard needs to implements __differents sorts of widgets in differents services.__

Installation
------
`git clone https://github.com/RobinChailley/Dashboard.git`
`cd Dashboard`
`docker-compose build && docker-compose up`


Contributors
------------
- Nicolas Jaussaud : [Github](https://github.com/NicolasJaussaud)
- Robin Chailley : [Github](https://github.com/RobinChailley)

Services
--------

__Each of thoses widgets are fully customizable, and need an authentication in the service.__

  - [x] __Yammer__
    - [x] Profile
    - [x] Messages
    - [x] Group
  - [x] __Intranet Epitech__
    - [x] Profile
    - [x] Notifications
    - [x] Module informations
    - [x] Informations about GPA, netsoul, credits
  - [x] __Linkedin__
    - [x] Profile
    - [x] Post
  - [x] __Github__
    - [x] Profile
    - [x] Repository


Bonus
-----
  - [x] Save dashboard layout in the database
  - [x] 4 services ( + 2 OAUTH platform)
  - [x] 11 widgets
  - [x] Dark / Light scheme
  - [x] Heroku deployement (http://dashboard.heroku.app)


Technos
-------
__BackEnd :__
  - Flask
  - PyJwt
  - PyMongo
  - MongoEngine

__FrontEnd :__
  - ReactJS
  - React-Router-Dom
  - Dragact
  - React-Bootstrap
  - Bootstrap

Screenshots
-----------
#### Login page
![ConnexionPage](/screenshot2.png)

#### Home page
![HomePage](/screenshot1.png)
