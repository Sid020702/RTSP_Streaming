import React, { useState, useRef, useEffect } from 'react';
import videojs from 'video.js';
import './App.css'
import VideoJS from './components/video-js/Video'
import UploadWidget from './components/upload-widget/upload-widget';
import RndContainer from './components/rnd/rnd';
import { useSelector, useDispatch } from 'react-redux'
import { addLogo, getLogos, saveLogos } from './actions/logos';
import { getOverlay, saveOverlay } from './actions/overlay';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Dustbin from './components/dustbin/dustbin';
import { setRtspUrl } from './actions/rtsp';
import { getRtspUrl } from './actions/rtsp';


const App = () => {
  const playerRef = useRef(null);
  const dispatch = useDispatch()
  const overlay = useSelector(state => state.overlayReducer.url)
  const logos = useSelector(state => state.logosReducer.logos)
  const rtspUrl = useSelector(state => state.rtspReducer.url)
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: 'http://localhost:5000/video/hls.m3u8',
      type: 'application/x-mpegURL'
    }]
  };

  const saveConfig = () => {
    dispatch(saveLogos({ logos }))
    dispatch(saveOverlay({ overlay }))
    alert("Configuration Saved!")
  }
  const handlePlayerReady = (player) => {
    playerRef.current = player;


    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };

  useEffect(() => {
    console.log("Here")
    dispatch(getLogos())
    dispatch(getOverlay())
  }, [])

  const deleteLogo = (item) => {
    let newLogos = logos.filter(logo => logo.url != item.id)
    dispatch(addLogo(newLogos))
  }

  return (
    <div className='App' id="App">
      <DndProvider backend={HTML5Backend}>
        <h1 style={{ color: "white", fontSize: "4em" }}>Welcome to my Livestream</h1>
        <div className='container' id="container" style={{ background: `${overlay != "" ? `url(${overlay})` : "white"} no-repeat center center/cover` }}>
          <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
        </div>
        <div className='custom-overlays'>
          <UploadWidget>Upload Custom Overlay</UploadWidget>
          <UploadWidget isLogo={true}>Upload Custom Logo/Text</UploadWidget>
          <button id='save' onClick={() => { saveConfig() }} >Save Custom Overlay</button>
          <Dustbin accept={["logo"]} onDrop={(item) => { deleteLogo(item) }} />
        </div>
        <div className='rtsp'>
          <input value={rtspUrl} onChange={(e) => { dispatch(setRtspUrl(e.target.value)) }} type="text" placeholder='Enter URL of RTSP link' />
          <button id="url_submit" onClick={(e) => {
            e.target.innerHTML = "Loading..."
            dispatch(getRtspUrl(rtspUrl))
          }}>Watch Now!</button>
        </div>

        {
          logos.map(logo => (
            <RndContainer url={logo.url} key={logo.url} def={{ x: logo.x, y: logo.y }}><img style={{ width: "100%", height: "100%" }} src={logo.url}></img></RndContainer>
          )
          )
        }
      </DndProvider>
    </div >
  );
}

export default App