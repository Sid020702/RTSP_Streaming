import * as api from "../api"
export const addLogo = (logos) => {
    return ({
        type: "ADD_LOGO",
        payload: logos
    })
}

export const getLogos = () => async (dispatch) => {
    try {
        const { data } = await api.getLogosConfig()
        dispatch(addLogo(data))
    } catch (error) {
        console.log(error)
    }
}



export const saveLogos = (logos) => async (dispatch) => {
    try {
        const { data } = await api.saveLogosConfig(logos)

    } catch (error) {
        console.log(error)
    }
}