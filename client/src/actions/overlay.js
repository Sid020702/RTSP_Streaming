import * as api from "../api"
export const setOverlayUrl = (url) => {
    return ({
        type: "SET_URL",
        payload: url
    })
}

export const getOverlay = () => async (dispatch) => {
    try {
        const { data } = await api.getOverlayConfig()
        dispatch(setOverlayUrl(data))
    } catch (error) {
        console.log(error)
    }
}


export const saveOverlay = (overlay) => async (dispatch) => {
    try {
        const { data } = await api.saveOverlayConfig(overlay)
    } catch (error) {
        console.log(error)
    }
}