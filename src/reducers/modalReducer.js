export const OPEN_USER = "OPEN_USER"
export const CLOSE_MODAL = "CLOSE_MODAL"

export const initModalState = {
    isOpen: false,
    label: null
}

export const modalReducer = (state, {type, payload}) => {
    switch (type) {
        case OPEN_USER:
            return {
                ...state,
                isOpen: true,
                label: payload
            }

        case CLOSE_MODAL:
            return {
                ...state,
                isOpen: false,
                label: null
            }
    
        default:
            return state
    }
} 