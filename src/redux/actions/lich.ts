import {
    DEFAULT_LICH,
    LICH_LD_ACTION,
    LICH_LD_COMPLETE,
    LICH_HOP_ACTION,
    LICH_HOP_COMPLETE,
    LICH_XE_ACTION,
    LICH_XE_COMPLETE
} from "../constants/lich";

export const actionDefaultLich = () => {
    return {
        type: DEFAULT_LICH
    }
}

// lấy lịch lãnh đạo
export const actionLichLD = (payload: any) => {
    return {
        type: LICH_LD_ACTION,
        payload
    }
}

export const lichLDComplete = (payload: any) => {
    return {
        type: LICH_LD_COMPLETE,
        payload
    }
}

// lấy lịch họp
export const actionLichHop = (payload: any) => {
    return {
        type: LICH_HOP_ACTION,
        payload
    }
}

export const lichHopComplete = (payload: any) => {
    return {
        type: LICH_HOP_COMPLETE,
        payload
    }
}

// lấy lịch xe
export const actionLichXe = (payload: any) => {
    return {
        type: LICH_XE_ACTION,
        payload
    }
}

export const lichXeComplete = (payload: any) => {
    return {
        type: LICH_XE_COMPLETE,
        payload
    }
}
