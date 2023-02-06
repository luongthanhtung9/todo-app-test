import {
    DEFAULT,
    LAY_TAT_CA_CHUC_NANG_USER_COMPLETE,
    LOGIN_COMPLETE,
} from "../constants/authen";

const initialState = {
    loginResponse: undefined, // đăng nhập
    layTatCaChucNangUserResponse: undefined, // đăng nhập
}

export default function vbnoibo(state = initialState, action: any) {
    switch (action.type) {
        case DEFAULT:
            return {
                ...initialState
            }
        // đăng nhập
        case LOGIN_COMPLETE:
            return {
                ...state,
                loginResponse: action.payload
            }
    }
    return state
}