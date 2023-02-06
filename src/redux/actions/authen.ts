import {
    DEFAULT,
    LAY_TAT_CA_CHUC_NANG_USER_ACTION,
    LAY_TAT_CA_CHUC_NANG_USER_COMPLETE,
    LOGIN_ACTION,
    LOGIN_COMPLETE,
    GET_VERSION_ACTION,
    GET_VERSION_COMPLETE
} from "../constants/authen";

export const actionDefault = () => {
    return {
        type: DEFAULT
    }
}

// lấy version 
export const actionGetVersion = () => {
    return {
        type: GET_VERSION_ACTION
    }
}

export const getVersionComplete = (payload: any) => {
    return {
        type: GET_VERSION_COMPLETE,
        payload
    }
}

// đăng nhập
export const actionLogin = (payload: any) => {
    return {
        type: LOGIN_ACTION,
        payload
    }
}

export const loginComplete = (payload: any) => {
    return {
        type: LOGIN_COMPLETE,
        payload
    }
}

// lấy tất cả chức năng của user
export const actionLayTatCaChucNangUser = () => {
    return {
        type: LAY_TAT_CA_CHUC_NANG_USER_ACTION
    }
}

export const layTatCaChucNangUserComplete = (payload: any) => {
    return {
        type: LAY_TAT_CA_CHUC_NANG_USER_COMPLETE,
        payload
    }
}
