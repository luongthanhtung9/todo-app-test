import {
    DEFAULT,
    DS_LOAI_VB_ACTION,
    DS_LOAI_VB_COMPLETE,
    DS_DO_KHAN_ACTION,
    DS_DO_KHAN_COMPLETE,
    LAY_VAI_TRO_ACTION,
    LAY_VAI_TRO_COMPLETE,
    CHUYEN_VAI_TRO_ACTION,
    CHUYEN_VAI_TRO_COMPLETE,
    LAY_QUYEN_CHUC_NANG_ACTION,
    LAY_QUYEN_CHUC_NANG_COMPLETE,
    USER_INFO_COMPLETE
} from "../constants/setting";

export const actionDefault = () => {
    return {
        type: DEFAULT
    }
}

export const userInfoComplete = (payload: any) => {
    return {
        type: USER_INFO_COMPLETE,
        payload
    }
}

export const dsLoaiVBAction = (payload: any) => {
    return {
        type: DS_LOAI_VB_ACTION,
        payload
    }
}

export const dsLoaiVBComplete = (payload: any) => {
    return {
        type: DS_LOAI_VB_COMPLETE,
        payload
    }
}

export const dsDoKhanAction = (payload: any) => {
    return {
        type: DS_DO_KHAN_ACTION,
        payload
    }
}

export const dsDoKhanComplete = (payload: any) => {
    return {
        type: DS_DO_KHAN_COMPLETE,
        payload
    }
}

export const actionLayVaiTro = () => {
    return {
        type: LAY_VAI_TRO_ACTION,
    }
}

export const layVaiTroComplete = (payload: any) => {
    return {
        type: LAY_VAI_TRO_COMPLETE,
        payload
    }
}

export const actionChuyenVaiTro = (payload: any) => {
    return {
        type: CHUYEN_VAI_TRO_ACTION,
        payload
    }
}

export const chuyenVaiTroComplete = (payload: any) => {
    return {
        type: CHUYEN_VAI_TRO_COMPLETE,
        payload
    }
}

export const actionLayQuyenChucNang = (payload: any) => {
    return {
        type: LAY_QUYEN_CHUC_NANG_ACTION,
        payload
    }
}

export const layQuyenChucNangComplete = (payload: any) => {
    return {
        type: LAY_QUYEN_CHUC_NANG_COMPLETE,
        payload
    }
}