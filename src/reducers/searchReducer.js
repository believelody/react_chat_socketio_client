export const SET_CONTENT = "SET_CONTENT"
export const RESET_CONTENT = "RESET_CONTENT"

export const initSearchState = {
    content: null
}

export const searchReducer = (state, { type, payload }) => {
    switch(type) {
        case SET_CONTENT:
            return {
                ...state,
                content: payload
            }

        case RESET_CONTENT:
            return {
                ...state,
                content: null
            }

        default:
            return state
    }
}