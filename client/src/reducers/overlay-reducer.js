const overlayReducer = (state = { url: "" }, action) => {
    switch (action.type) {
        case 'SET_URL':
            return ({ ...state, url: action.payload })
        default:
            return state
    }

}
export default overlayReducer;