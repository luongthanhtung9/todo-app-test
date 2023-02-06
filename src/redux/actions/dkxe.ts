import {
	CT_DK_XE_ACTION,
	CT_DK_XE_COMPLETE,
	DEFAULT_DK_XE,
	DK_XE_ACTION,
	DK_XE_CHO_DIEU_XE_COMPLETE,
	DK_XE_CHO_DUYET_COMPLETE,
	DK_XE_DA_DUYET_COMPLETE,
	DK_XE_TU_CHOI_COMPLETE,
	DUYET_DANG_KY_ACTION,
	DUYET_DANG_KY_COMPLETE,
	GET_ALL_LEADER_ACTION,
	GET_ALL_LEADER_COMPLETE,
} from '../constants/dkxe';

export const actionDefaultDkXe = () => {
	return {
		type: DEFAULT_DK_XE,
	};
};

// lấy ds chờ duyệt
export const actionDkyXe = (payload: any) => {
	return {
		type: DK_XE_ACTION,
		payload,
	};
};

export const actionDkyXeComplete = (payload: any, status?: number) => {
	let typeAction;
	switch (status) {
		case 2:
			typeAction = DK_XE_CHO_DUYET_COMPLETE;
			break;
		case 3:
			typeAction = DK_XE_DA_DUYET_COMPLETE;
			break;
		case 4:
			typeAction = DK_XE_TU_CHOI_COMPLETE;
			break;
		case 5:
			typeAction = DK_XE_CHO_DIEU_XE_COMPLETE;
			break;
		default:
			break;
	}
	return {
		type: typeAction,
		payload,
	};
};

// chi tiết đăng ký xe
export const actionCTDangKyXe = (payload: any) => {
	return {
		type: CT_DK_XE_ACTION,
		payload,
	};
};

export const ctDangKyXeComplete = (payload: any) => {
	return {
		type: CT_DK_XE_COMPLETE,
		payload,
	};
};

// Lấy danh sách leader
export const actionGetAllLeader = (payload: any) => {
	return {
		type: GET_ALL_LEADER_ACTION,
		payload,
	};
};

export const getAllLeaderComplete = (payload: any) => {
	return {
		type: GET_ALL_LEADER_COMPLETE,
		payload,
	};
};

// update lich xe
export const actionUpdateLichXe = (payload: any) => {
	return {
		type: DUYET_DANG_KY_ACTION,
		payload,
	};
};

export const updateLichXeComplete = (payload: any) => {
	return {
		type: DUYET_DANG_KY_COMPLETE,
		payload,
	};
};
