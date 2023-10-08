from flask import Flask
from flask_pymongo import PyMongo
from pymongo.mongo_client import MongoClient
import os,time
from threading import Thread, Event

# Create a new client and connect to the server

app = Flask(__name__)
uri = "mongodb+srv://CyberTPG:Sid020702@cluster0.1dmho3j.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri)
# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    db=client.hls_db
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

path="./application/video"
def clear():
    now = time.time()
    for f in os.listdir(path):
        file_path=os.path.join(path,f)
        if os.stat(file_path).st_mtime < now - 30:
            if os.path.isfile(file_path):
                 os.unlink(file_path)




class MyThread(Thread):
    def __init__(self,event):
        Thread.__init__(self)
        self.stopped = event
    def run(self):
            clear()

stopFlag = Event()
thread = MyThread(stopFlag)
thread.start()

# app.config["SECRET_KEY"]="b17af1f3183677ccaf2bae0177623ee02fb542de"
# app.config["MONGO_URI"]="mongodb+srv://CyberTPG:Sid020702@cluster0.1dmho3j.mongodb.net/?retryWrites=true&w=majority"

#setup mongodb



from application import routes

