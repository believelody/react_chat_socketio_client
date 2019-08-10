export const OPEN_MODAL = "OPEN_MODAL"
export const CLOSE_MODAL = "CLOSE_MODAL"

export const initModalState = {
    isOpen: false
}

export const modalReducer = (state, {type, payload}) => {
    switch (type) {
        case OPEN_MODAL:
            return {
                ...state,
                isOpen: true
            }

        case CLOSE_MODAL:
            return {
                ...state,
                isOpen: false
            }
    
        default:
            return state
    }
} 