export const DELETE_CHAT = "DELETE_CHAT"

export const initChatState = {
    chatSelected: null
}

export const chatReducer = (state, { type, payload }) => {
    switch (type) {
        case DELETE_CHAT:
            return {
                ...state,
                chatId: payload
            }
        
        default:
            return state
    }
}