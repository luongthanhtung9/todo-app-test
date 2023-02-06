import {
    DEFAULT_LICH,
    LICH_LD_COMPLETE,
    LICH_HOP_COMPLETE,
    LICH_XE_COMPLETE
} from "../constants/lich";

const initialState = {
    lichLDResponse: undefined, // lấy lịch lãnh đạo
    lichHopResponse: undefined, // lấy lịch họp
    lichXeResponse: undefined, // lấy lịch xe
}

export default function lich(state = initialState, action: any) {
    switch (action.type) {
        case DEFAULT_LICH:
            return {
                ...initialState
            }
        // lấy lịch lãnh đạo
        case LICH_LD_COMPLETE:
            return {
                ...state,
                lichLDResponse: action.payload
            }
        // lấy lịch họp
        case LICH_HOP_COMPLETE:
            return {
                ...state,
                lichHopResponse: action.payload
            }
        // lấy lịch xe
        case LICH_XE_COMPLETE:
            return {
                ...state,
                lichXeResponse: action.payload
            }

    }
    return state
}