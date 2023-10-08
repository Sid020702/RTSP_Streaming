import axios from "axios"

const API = axios.create({ baseURL: "http://localhost:5000" })

export const saveOverlayConfig = (overlayData) => { return API.post('/api/save/overlay', overlayData) }
export const saveLogosConfig = (logosData) => { return API.post('/api/save/logos', logosData) }
export const getLogosConfig = () => { return API.get("/api/logos") }
export const getOverlayConfig = () => { return API.get("/api/overlay") }
export const getRtspUrl = (url) => { return API.get(`/api/rtsp?url=${url}`) }