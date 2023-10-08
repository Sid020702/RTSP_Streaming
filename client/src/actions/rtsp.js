import * as api from "../api"
export const setRtspUrl = (url) => {
    return ({
        type: "SET_RTSP",
        payload: url
    })
}

export const getRtspUrl = (url) => async (dispatch) => {
    try {
        const { data } = await api.getRtspUrl(url)
        document.getElementById('url_submit').innerHTML = "Enter URL"
        console.log(data)
        dispatch(setRtspUrl(""))
    } catch (err) {
        document.getElementById('url_submit').innerHTML = "Enter URL"
        console.log(err)
    }

}



