import { combineReducers } from "redux";
import logosReducer from "./logos";
import overlayReducer from "./overlay-reducer";
import rtspReducer from "./rtsp";

export default combineReducers({
    logosReducer,
    overlayReducer,
    rtspReducer
})