import {
    ACTION_SAVE_TOKEN,
    ACTION_SAVE_VERSION,
    ACTION_SAVE_FCMTOKEN
} from "../constants/configs";

export const saveToken = (payload: any) => {
    return {
        type: ACTION_SAVE_TOKEN,
        payload: payload
    }
}

export const saveVersion = (version: string | undefined) => {
    return {
        type: ACTION_SAVE_VERSION,
        payload: version
    }
}

export const saveFCMToken = (fcmToken: string | undefined) => {
    return {
        type: ACTION_SAVE_FCMTOKEN,
        payload: fcmToken
    }
}
