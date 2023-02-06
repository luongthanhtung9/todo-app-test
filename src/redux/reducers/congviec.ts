import {
    DEFAULT,
    DS_HSCV_COMPLETE,
    CT_HSCV_COMPLETE,
    THONGKE_VANBAN_COMPLETE,
    DONG_HO_SO_COMPLETE,
    XOA_LKVB_COMPLETE
} from '../constants/congviec';
const initialState = {
    dsHSCVResponse: undefined, // danh sách văn bản đi
    ctHSCVResponse: undefined, //
    thongkevanbanResponse: undefined,
    dongHSResponse: undefined,
    xoaLKVBResponse: undefined
};

export default function congviec(state = initialState, action: any) {
    switch (action.type) {
        case DEFAULT:
            return {
                ...initialState,
            };
        // Danh sách văn bản đi
        case DS_HSCV_COMPLETE:
            return {
                ...state,
                dsHSCVResponse: action.payload,
            };
        // Chi tiết văn bản đi
        case CT_HSCV_COMPLETE:
            return {
                ...state,
                ctHSCVResponse: action.payload,
            };
        // lấy thống ke văn bản
        case THONGKE_VANBAN_COMPLETE:
            return {
                ...state,
                thongkevanbanResponse: action.payload,
            };
        // đóng hồ sơ
        case DONG_HO_SO_COMPLETE:
            return {
                ...state,
                dongHSResponse: action.payload,
            };
        // xoá lkvb
        case XOA_LKVB_COMPLETE:
            return {
                ...state,
                xoaLKVBResponse: action.payload,
            };

    }
    return state;
}
