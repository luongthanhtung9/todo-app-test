import {
    DEFAULT,
    DS_LOAI_VB_COMPLETE,
    DS_DO_KHAN_COMPLETE,
    LAY_VAI_TRO_COMPLETE,
    CHUYEN_VAI_TRO_COMPLETE,
    LAY_QUYEN_CHUC_NANG_COMPLETE,
    USER_INFO_COMPLETE
} from "../constants/setting";

const initialState = {
    dsLoaiVBResponse: undefined,
    dsDoKhanResponse: undefined,
    listVaiTroRespone: undefined,
    chuyenVaiTroRespone: undefined,
    layQuyenChucNangRespone: undefined,
    userInfo: undefined, // lấy thông tin tài khoản user
}

export default function setting(state = initialState, action: any) {
    switch (action.type) {
        case DEFAULT:
            return {
                ...initialState
            }
        case DS_LOAI_VB_COMPLETE:
            return {
                ...state,
                dsLoaiVBResponse: action.payload
            }
        case DS_DO_KHAN_COMPLETE:
            return {
                ...state,
                dsDoKhanResponse: action.payload
            }
        case LAY_VAI_TRO_COMPLETE:
            return {
                ...state,
                listVaiTroRespone: action.payload
            }
        case CHUYEN_VAI_TRO_COMPLETE:
            return {
                ...state,
                chuyenVaiTroRespone: action.payload
            }
        case LAY_QUYEN_CHUC_NANG_COMPLETE:
            return {
                ...state,
                layQuyenChucNangRespone: action.payload
            }
        // lấy thông tin tài khoản user
        case USER_INFO_COMPLETE:
            return {
                ...state,
                userInfo: action.payload
            }
    }
    return state
}