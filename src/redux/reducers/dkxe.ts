import {
	CT_DK_XE_COMPLETE,
	DEFAULT_DK_XE,
	DK_XE_CHO_DIEU_XE_COMPLETE,
	DK_XE_CHO_DUYET_COMPLETE,
	DK_XE_DA_DUYET_COMPLETE,
	DK_XE_TU_CHOI_COMPLETE,
	DUYET_DANG_KY_ACOMPLETE,
	DUYET_DANG_KY_COMPLETE,
	GET_ALL_LEADER_COMPLETE,
} from '@redux/constants/dkxe';

const initialState = {
	choDuyetResponse: undefined, // lấy ds chờ duyệt
	daDuyetResponse: undefined, // lấy ds đã duyệt
	choDieuXeResponse: undefined, // lấy ds chờ điều xe
	tuChoiResponse: undefined, // lấy ds từ chối
	chiTietDkyXeResponse: undefined, // chi tiết đăng ký xe
	lanhDaoResponse: undefined,
	approvalResponse: undefined,
};

export default function dkxe(state = initialState, action: any) {
	switch (action.type) {
		case DEFAULT_DK_XE:
			return {
				...initialState,
			};
		case DK_XE_CHO_DUYET_COMPLETE:
			return {
				...state,
				choDuyetResponse: action.payload,
			};
		case DK_XE_DA_DUYET_COMPLETE:
			return {
				...state,
				daDuyetResponse: action.payload,
			};
		case DK_XE_CHO_DIEU_XE_COMPLETE:
			return {
				...state,
				choDieuXeResponse: action.payload,
			};
		case DK_XE_TU_CHOI_COMPLETE:
			return {
				...state,
				tuChoiResponse: action.payload,
			};
		case CT_DK_XE_COMPLETE:
			return {
				...state,
				chiTietDkyXeResponse: action.payload,
			};
		case GET_ALL_LEADER_COMPLETE:
			return {
				...state,
				lanhDaoResponse: action.payload,
			};

		case DUYET_DANG_KY_COMPLETE:
			return {
				...state,
				approvalResponse: action.payload,
			};
	}
	return state;
}
