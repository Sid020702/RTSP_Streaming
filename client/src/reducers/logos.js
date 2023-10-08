
const logosReducer = (state = { logos: [] }, action) => {
    switch (action.type) {
        case 'ADD_LOGO':
            return ({ ...state, logos: action.payload })
        case 'SET_POS':
            return ({ ...state, logos: action.payload })
        case 'SET_DIM':
            return ({ ...state, logos: action.payload })
        default:
            return state

    }
}

export default logosReducer