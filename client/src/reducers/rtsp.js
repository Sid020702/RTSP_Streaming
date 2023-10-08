const rtspReducer = (state = { url: "" }, action) => {
    switch (action.type) {
        case 'SET_RTSP':
            return ({ ...state, url: action.payload })
        default:
            return state
    }

}
export default rtspReducer;