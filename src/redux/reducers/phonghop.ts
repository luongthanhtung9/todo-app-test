// import {
// 	CT_PHONG_HOP_COMPLETE,
// 	DEFAULT_PHONG_HOP,
// 	PHONG_HOP_CHO_DIEU_XE_COMPLETE,
// 	PHONG_HOP_CHO_DUYET_COMPLETE,
// 	PHONG_HOP_DA_DUYET_COMPLETE,
// 	PHONG_HOP_TU_CHOI_COMPLETE,
// 	DUYET_DANG_KY_ACOMPLETE,
// 	GET_ALL_LEADER_COMPLETE,
// } from '@redux/constants/dkxe';

import {
	CT_PHONG_HOP_COMPLETE,
	DANH_MUC_CHUNG_COMPLETE,
	DEFAULT_PHONG_HOP,
	GET_ALL_ROOM_COMPLETE,
	GET_ALL_USER_COMPLETE,
	PHONG_HOP_CHO_DUYET_COMPLETE,
	PHONG_HOP_DA_DUYET_COMPLETE,
	PHONG_HOP_TU_CHOI_COMPLETE,
} from '@redux/constants/phonghop';

const initialState = {
	choDuyetResponse: undefined, // lấy ds chờ duyệt
	daDuyetResponse: undefined, // lấy ds đã duyệt
	tuChoiResponse: undefined, // lấy ds từ chối
	chiTietPhongHopResponse: undefined, // chi tiết đăng ký xe
	userResponse: undefined,
	danhMucResponse: undefined,
	roomResponse: undefined,
};

export default function phonghop(state = initialState, action: any) {
	switch (action.type) {
		case DEFAULT_PHONG_HOP:
			return {
				...initialState,
			};
		case PHONG_HOP_CHO_DUYET_COMPLETE:
			return {
				...initialState,
				choDuyetResponse: action.payload,
			};
		case PHONG_HOP_DA_DUYET_COMPLETE:
			return {
				...state,
				daDuyetResponse: action.payload,
			};
		case PHONG_HOP_TU_CHOI_COMPLETE:
			return {
				...initialState,
				tuChoiResponse: action.payload,
			};
		case CT_PHONG_HOP_COMPLETE:
			return {
				...initialState,
				chiTietPhongHopResponse: action.payload,
			};
		case GET_ALL_USER_COMPLETE:
			return {
				...initialState,
				userResponse: action.payload,
			};

		case DANH_MUC_CHUNG_COMPLETE:
			return {
				...initialState,
				danhMucResponse: action.payload,
			};
		case GET_ALL_ROOM_COMPLETE:
			return {
				...state,
				roomResponse: action.payload,
			};
	}
	return state;
}
