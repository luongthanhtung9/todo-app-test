// import { GET_ALL_LEADER_ACTION, GET_ALL_LEADER_COMPLETE } from "@redux/constants/quanly";
import { CT_PHONG_HOP_ACTION, CT_PHONG_HOP_COMPLETE, DANH_MUC_CHUNG_ACTION, DANH_MUC_CHUNG_COMPLETE, DEFAULT_PHONG_HOP, GET_ALL_ROOM_ACTION, GET_ALL_ROOM_COMPLETE, GET_ALL_USER_ACTION, GET_ALL_USER_COMPLETE, PHONG_HOP_ACTION, PHONG_HOP_CHO_DUYET_COMPLETE, PHONG_HOP_DA_DUYET_COMPLETE, PHONG_HOP_TU_CHOI_COMPLETE } from "../constants/phonghop";

export const actionDefaultPhongHop = () => {
    return {
        type: DEFAULT_PHONG_HOP
    }
}

// lấy ds chờ duyệt 
export const actionGetPhongHop = (payload: any) => {
    return {
        type: PHONG_HOP_ACTION,
        payload
    }
}

export const actionPhongHopComplete = (payload: any) => {
    // let typeAction
    // switch (status) {
    //     case 2:
    //         typeAction = PHONG_HOP_CHO_DUYET_COMPLETE
    //         break;
    //     case 3:
    //         typeAction = PHONG_HOP_DA_DUYET_COMPLETE
    //         break;
    //     case 4:
    //         typeAction = PHONG_HOP_TU_CHOI_COMPLETE
    //         break;
    //     default:
    //         break;
    // }
    return {
        type: PHONG_HOP_DA_DUYET_COMPLETE,
        payload
    }
}

// chi tiết phòng họp
export const actionCTPHONG = (payload: any) => {
    return {
        type: CT_PHONG_HOP_ACTION,
        payload
    }
}

export const ctPhongHopComplete = (payload: any) => {
    return {
        type: CT_PHONG_HOP_COMPLETE,
        payload
    }
}

// Lấy danh sách leader
export const actionGetAllUser = () => {
    return {
        type: GET_ALL_USER_ACTION,
    }
}

export const getAllUserComplete = (payload: any) => {
    return {
        type: GET_ALL_USER_COMPLETE,
        payload
    }
}

// get item phong
export const actionDanhMucChung = (payload: any) => {
    return {
        type: DANH_MUC_CHUNG_ACTION,
        payload
    }
}

export const danhMucChungComplete = (payload: any) => {
    return {
        type: DANH_MUC_CHUNG_COMPLETE,
        payload
    }
}

// get list phong
export const actionGetAllRoom = (payload: any) => {
    return {
        type: GET_ALL_ROOM_ACTION,
        payload
    }
}

export const getAllRoomComplete = (payload: any) => {
    return {
        type: GET_ALL_ROOM_COMPLETE,
        payload
    }
}




