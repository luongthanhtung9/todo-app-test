import {
	DEFAULT_GIAOVIEC,
	DS_GIAOVIEC_ACTION,
	DS_GIAOVIEC_COMPLETE,
	CT_GIAOVIEC_ACTION,
	CT_GIAOVIEC_COMPLETE,
	LICH_SU_XU_LY_ACTION,
	LICH_SU_XU_LY_COMPLETE,
	CHUYEN_XU_LY_GV_ACTION,
	CHUYEN_XU_LY_GV_COMPLETE,
	KT_GIAO_VIEC_ACTION,
	KT_GIAO_VIEC_COMPLETE,
	XU_LY_CV_ACTION,
	XU_LY_CV_COMPLETE,
	LAY_DON_VI_GIAO_VIEC_ACTION,
	LAY_DON_VI_GIAO_VIEC_COMPLETE,
	TC_GIAO_VIEC_ACTION,
	TC_GIAO_VIEC_COMPLETE,
    CTVB_ACTION,
    CTVB_COMPLETE,
} from '../constants/giaoviec';

export const actionDefaultGV = () => {
	return {
		type: DEFAULT_GIAOVIEC,
	};
};

// danh sach phiếu giao việc
export const actionDSGiaoViec = (payload: any) => {
	return {
		type: DS_GIAOVIEC_ACTION,
		payload,
	};
};

export const dsGiaoViecComplete = (payload: any) => {
	return {
		type: DS_GIAOVIEC_COMPLETE,
		payload,
	};
};

// danh sach phiếu giao việc
export const actionCTGiaoViec = (payload: any) => {
	return {
		type: CT_GIAOVIEC_ACTION,
		payload,
	};
};

export const ctGiaoViecComplete = (payload: any) => {
	return {
		type: CT_GIAOVIEC_COMPLETE,
		payload,
	};
};

// lịch sử xử lý
export const actionLichSuXLGV = (payload: any) => {
	return {
		type: LICH_SU_XU_LY_ACTION,
		payload,
	};
};

export const lichSuXLGVComplete = (payload: any) => {
	return {
		type: LICH_SU_XU_LY_COMPLETE,
		payload,
	};
};

// chuyển xử lý phiếu giao việc
export const actionChuyenXuLyGV = (payload: any) => {
	return {
		type: CHUYEN_XU_LY_GV_ACTION,
		payload,
	};
};

export const chuyenXuLyGVComplete = (payload: any) => {
	return {
		type: CHUYEN_XU_LY_GV_COMPLETE,
		payload,
	};
};

// kết thúc phiếu giao việc
export const actionKTPhieuGiaoViec = (payload: any) => {
	return {
		type: KT_GIAO_VIEC_ACTION,
		payload,
	};
};

export const ktPhieuGiaoViecComplete = (payload: any) => {
	return {
		type: KT_GIAO_VIEC_COMPLETE,
		payload,
	};
};

// cập nhật xử lý công việc
export const actionXuLyCongViec = (payload: any) => {
	return {
		type: XU_LY_CV_ACTION,
		payload,
	};
};

export const xuLyCongViecComplete = (payload: any) => {
	return {
		type: XU_LY_CV_COMPLETE,
		payload,
	};
};

// lấy đơn vị giao việc
export const actionLayDVGiaoViec = (payload: any) => {
	return {
		type: LAY_DON_VI_GIAO_VIEC_ACTION,
		payload,
	};
};

export const layDVGiaoViecComplete = (payload: any) => {
	return {
		type: LAY_DON_VI_GIAO_VIEC_COMPLETE,
		payload,
	};
};

// từ chối giao việc
export const actionTCGiaoViec = (payload: any) => {
	return {
		type: TC_GIAO_VIEC_ACTION,
		payload,
	};
};

export const tcGiaoViecComplete = (payload: any) => {
	return {
		type: TC_GIAO_VIEC_COMPLETE,
		payload,
	};
};

// từ chối giao việc
export const actionCTVBDinhKem = (payload: any) => {
	return {
		type: CTVB_ACTION,
		payload,
	};
};

export const CTVBDinhKemComplete = (payload: any) => {
	return {
		type: CTVB_COMPLETE,
		payload,
	};
};
