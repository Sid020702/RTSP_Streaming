from application import app,db
from flask import render_template,jsonify, send_from_directory, request
import os,shutil
import ffmpeg_streaming
from ffmpeg_streaming import Formats




# @app.after_request
# def add_header(response):
#     response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
#     response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
#     response.headers['Pragma'] = 'no-cache'
#     response.headers['Expires'] = '0'
#     return response





@app.route('/')
def index():
    db.overlay.insert_one({'name':"Sid"})
    return render_template('index.html')


@app.route('/video/<string:file_name>')
def stream(file_name):
    video_dir = './video'
    return send_from_directory(video_dir, file_name)

@app.route('/video/<string:path>/<string:file_name>')
def stream_from_dir(path, file_name):
    video_dir = './video' + '/' + path
    return send_from_directory(video_dir, file_name)

@app.route("/api/save/overlay",methods=["POST"],strict_slashes=False)
def save_overlay():
    new_overlay=request.get_json()["overlay"]
    old_overlay=db.overlay.find().next()
    db.overlay.update_one(old_overlay,{"$set":{"overlay":new_overlay}})
    res={'message':"Overlay saved successfully"}
    return jsonify(res)

@app.route("/api/save/logos",methods=["POST"],strict_slashes=False)
def save_logos():
    new_logos=request.get_json()["logos"]
    old_logos=db.logos.find().next()
    db.logos.update_one(old_logos,{"$set":{"logos":new_logos}})
    res={'message':"Logos saved successfully"}
    return jsonify(res)

@app.route("/api/logos")
def get_logos():
    logos=db.logos.find().next()["logos"]
    return jsonify([logo for logo in logos])

@app.route("/api/overlay")
def get_overlay():
    overlay=db.overlay.find().next()["overlay"]
    return jsonify(overlay)

@app.route("/api/rtsp",methods=["GET"])
def get_rtsp():
    url=request.args.get('url')
    folder="./application/video"
    for filename in os.listdir(folder):
        file_path=os.path.join(folder,filename)
        try:
            if os.path.isfile(file_path):
                os.unlink(file_path)
            elif os.path.isdir(file_path):
                shutil.rmtree(file_path)
        except Exception as e:
            print("Failed to delete %s. Reason: %s" %(file_path,e))


    video=ffmpeg_streaming.input(url)
    hls = video.hls(Formats.h264())
    hls.auto_generate_representations()
    hls.output('./application/video/hls.m3u8')
    return jsonify({'message':"FFMPEG run successfully"})
#     