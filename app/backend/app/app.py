import __init__
from service.auth import login, auth, linkedin, github, yammer, epitech
from service.user import user
from service.widgets import widgets
from service.epitech import epitech
from service.yammer import yammer
from service.linkedin import linkedin
from service import about
from flask import Flask, send_from_directory
from flask_cors import CORS

if __name__ == "__main__":
    app = __init__.app

    @app.route('/<path:path>')
    def catch_all_paths(path):
        return send_from_directory(app.static_folder, "index.html")
    
    @app.errorhandler(404)
    def handle_404(e):
        return send_from_directory(app.static_folder, "index.html")

    app.run(host="0.0.0.0", debug=True, port=80)
