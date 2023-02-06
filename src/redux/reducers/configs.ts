import {
    ACTION_SAVE_TOKEN,
    ACTION_SAVE_VERSION,
    ACTION_SAVE_FCMTOKEN
} from "../constants/configs";

const initialState = {
    token: undefined,
    userName: undefined,
    fcmToken: undefined,
    version: undefined
}

export default function configs(state = initialState, action: any) {
    switch (action.type) {
        case ACTION_SAVE_TOKEN:
            return {
                ...state,
                token: action.payload.token,
                userName: action.payload.userName
            }
        case ACTION_SAVE_VERSION:
            return {
                ...state,
                version: action.payload
            }
        case ACTION_SAVE_FCMTOKEN:
            return {
                ...state,
                fcmToken: action.payload
            }
        default:
            break;
    }
    return state
}