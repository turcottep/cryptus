# import twitter
# from requests_oauthlib import OAuth1Session
from flask import Flask, request
# from flask_cors import CORS

app = Flask(__name__)
# CORS(app)


@app.route("/symbols_to_text")
def hi():
    text = request.args.get('text')
    return "text"


if __name__ == "__main__":
    app.run()
