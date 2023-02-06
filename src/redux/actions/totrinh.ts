import {
	DEFAULT,
	DS_TOTRINH_ACTION,
	DS_TOTRINH_COMPLETE,
	LICH_SU_XU_LY_ACTION,
	LICH_SU_XU_LY_COMPLETE,
	KIEM_TRA_YKIEN_ACTION,
	KIEM_TRA_YKIEN_COMPLETE,
	DUYET_TOTRINH_ACTION,
	DUYET_TOTRINH_COMPLETE,
	TRINH_XL_ACTION,
	TRINH_XL_COMPLETE,
	TO_TRINH_INIT_COMPLETE,
	TO_TRINH_INIT_ACTION,
	CHI_TIET_TO_TRINH_ACTION,
	CHI_TIET_TO_TRINH_COMPLETE,
	THONG_KE_TO_TRINH_ACTION,
	THONG_KE_TO_TRINH_COMPLETE,
	TIM_LANH_DAO_KY_THAY_COMPLETE,
	TIM_LANH_DAO_KY_THAY_ACTION,
	CHUYEN_KY_THAY_COMPLETE,
	CHUYEN_KY_THAY_ACTION,
	TRA_LOI_VAN_BAN_ACTION,
	TRA_LOI_VAN_BAN_COMPLETE,
	CHUYEN_CAP_SO_ACTION,
	CHUYEN_CAP_SO_COMPLETE,
} from '../constants/totrinh';

export const actionDefaultToTrinh = () => {
	return {
		type: DEFAULT,
	};
};
// danh sach to trinh
export const actionDSToTrinh = (payload: any) => {
	return {
		type: DS_TOTRINH_ACTION,
		payload,
	};
};

export const dsToTrinhComplete = (payload: any) => {
	return {
		type: DS_TOTRINH_COMPLETE,
		payload,
	};
};

// lịch sử xử lý
export const actionLichSuXuLy = (payload: any) => {
	return {
		type: LICH_SU_XU_LY_ACTION,
		payload,
	};
};

export const lichSuXuLyComplete = (payload: any) => {
	return {
		type: LICH_SU_XU_LY_COMPLETE,
		payload,
	};
};

// Kiểm tra ý kiến
export const actionKiemTraYKien = (payload: any) => {
	return {
		type: KIEM_TRA_YKIEN_ACTION,
		payload,
	};
};

export const kiemTraYKienComplete = (payload: any) => {
	return {
		type: KIEM_TRA_YKIEN_COMPLETE,
		payload,
	};
};

// duyet to trinh
export const actionDuyetToTrinh = (payload: any) => {
	return {
		type: DUYET_TOTRINH_ACTION,
		payload,
	};
};

export const duyetToTrinhComplete = (payload: any) => {
	return {
		type: DUYET_TOTRINH_COMPLETE,
		payload,
	};
};

// Trình xử lý
export const actionTrinhXuLy = (payload: any) => {
	return {
		type: TRINH_XL_ACTION,
		payload,
	};
};

export const trinhXuLyComplete = (payload: any) => {
	return {
		type: TRINH_XL_COMPLETE,
		payload,
	};
};

export const actionToTrinhInit = (payload: any) => {
	return {
		type: TO_TRINH_INIT_ACTION,
		payload,
	};
};

export const toTrinhInitComplete = (payload: any) => {
	return {
		type: TO_TRINH_INIT_COMPLETE,
		payload,
	};
};

export const actionChiTietToTrinh = (payload: any) => {
	return {
		type: CHI_TIET_TO_TRINH_ACTION,
		payload,
	};
};

export const chiTietToTrinhComplete = (payload: any) => {
	return {
		type: CHI_TIET_TO_TRINH_COMPLETE,
		payload,
	};
};

export const actionThongKeToTrinh = () => {
	return {
		type: THONG_KE_TO_TRINH_ACTION,
	};
};

export const thongKeToTrinhComplete = (payload: any) => {
	return {
		type: THONG_KE_TO_TRINH_COMPLETE,
		payload,
	};
};

export const actionTimLanhDaoKyThay = () => {
	return {
		type: TIM_LANH_DAO_KY_THAY_ACTION,
	};
};

export const timLanhDaoKyThayComplete = (payload: any) => {
	return {
		type: TIM_LANH_DAO_KY_THAY_COMPLETE,
		payload,
	};
};

export const actionChuyenKyThay = (payload: any) => {
	return {
		type: CHUYEN_KY_THAY_ACTION,
		payload,
	};
};

export const chuyenKyThayComplete = (payload: any) => {
	return {
		type: CHUYEN_KY_THAY_COMPLETE,
		payload,
	};
};

// tra loi van bản
export const actiontraLoiVanBanToTrinh = (payload: any) => {
	return {
		type: TRA_LOI_VAN_BAN_ACTION,
		payload,
	};
};
export const traLoiVanBanCompleteToTrinh = (payload: any) => {
	return {
		type: TRA_LOI_VAN_BAN_COMPLETE,
		payload,
	};
};

// Chuyển cấp số
export const actionCCSToTrinh = (payload: any) => {
	return {
		type: CHUYEN_CAP_SO_ACTION,
		payload,
	};
};
export const cCSCompleteToTrinh = (payload: any) => {
	return {
		type: CHUYEN_CAP_SO_COMPLETE,
		payload,
	};
};
