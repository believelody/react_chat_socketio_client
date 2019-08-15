const USER_HOOK = 'USER_HOOK'
const REQUEST_HOOK = 'REQUEST_HOOK'
const FRIEND_HOOK = 'FRIEND_HOOK'
const BLOCKED_HOOK = 'BLOCKED_HOOK'

export const initHookState = {
    userHook: false,
    requestHook: false,
    friendHook: false,
    blockedHook: false
}

export const hookReducer = (state, { type, payload }) => {
    switch(type) {
        case USER_HOOK:
                return { ...state, userHook: !state.userHook }

        case REQUEST_HOOK:
                return { ...state, userHook: !state.requestHook }

        case FRIEND_HOOK:
                return { ...state, userHook: !state.friendHook }

        case BLOCKED_HOOK:
                return { ...state, userHook: !state.blockedHook }

        default:
                return state
    }
}