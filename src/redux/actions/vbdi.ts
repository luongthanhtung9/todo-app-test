import {
	DEFAULT,
	DS_VBDI_ACTION,
	DS_VBDI_COMPLETE,
	CT_VBDI_ACTION,
	CT_VBDI_COMPLETE,
	TRINH_XL_ACTION,
	TRINH_XL_COMPLETE,
	LICH_SU_XU_LY_ACTION,
	LICH_SU_XU_LY_COMPLETE,
	TRA_LOI_VAN_BAN_ACTION,
	TRA_LOI_VAN_BAN_COMPLETE,
	CHO_Y_KIEN_ACTION,
	CHO_Y_KIEN_COMPLETE,
	KIEM_TRA_Y_KIEN_VBDI_ACTION,
	KIEM_TRA_Y_KIEN_VBDI_COMPLETE,
	DUYET_VAN_BAN_DI_COMPLETE,
	DUYET_VAN_BAN_DI_ACTION,
	TRA_LOI_VBDI_ACTION,
	TRA_LOI_VBDI_COMPLETE,
	THONG_TIN_TRA_ACTION,
	THONG_TIN_TRA_COMPLETE,
	THU_HOI_VAN_BAN_DI_ACTION,
	THU_HOI_VAN_BAN_DI_COMPLETE,
	DANH_SACH_LANH_DAO_TRINH_ACTION,
	DANH_SACH_LANH_DAO_TRINH_COMPLETE,
	THONG_KE_VBDI_ACTION,
	THONG_KE_VBDI_COMPLETE,
	CAP_SO_ACTION,
	CAP_SO_COMPLETE,
	DS_PHAT_HANH_VBDI_COMPLETE,
	DS_PHAT_HANH_VBDI_ACTION,
	PHAT_HANH_ACTION,
	PHAT_HANH_COMPLETE,
	THEM_MOI_ACTION,
	THEM_MOI_COMPLETE,
	VAN_BAN_DI_INIT_ACTION,
	VAN_BAN_DI_INIT_COMPLETE,
	LAY_SO_VB_ACTION,
	LAY_SO_VB_COMPLETE,
	CAP_SO_VT_ACTION,
	CAP_SO_VT_COMPLETE,
    DANH_SACH_HO_SO_CV_ACTION,
    DANH_SACH_HO_SO_CV_COMPLETE,
} from '../constants/vbdi';

export const actionDefaultVBDi = () => {
	return {
		type: DEFAULT,
	};
};
// danh sach văn bản đi
export const actionDSVBDi = (payload: any) => {
	return {
		type: DS_VBDI_ACTION,
		payload,
	};
};

export const dsVBDiComplete = (payload: any) => {
	return {
		type: DS_VBDI_COMPLETE,
		payload,
	};
};

// chi tiết văn bản đi
export const actionCTVBDi = (payload: any) => {
	return {
		type: CT_VBDI_ACTION,
		payload,
	};
};

export const ctVBDiComplete = (payload: any) => {
	return {
		type: CT_VBDI_COMPLETE,
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

// lịch sử xử lý
export const actionLichSuXuLyVBDI = (payload: any) => {
	return {
		type: LICH_SU_XU_LY_ACTION,
		payload,
	};
};
export const lichSuXuLyCompleteVBDI = (payload: any) => {
	return {
		type: LICH_SU_XU_LY_COMPLETE,
		payload,
	};
};

// tra loi van bản
export const actiontraLoiVanBanVBDI = (payload: any) => {
	return {
		type: TRA_LOI_VAN_BAN_ACTION,
		payload,
	};
};
export const traLoiVanBanCompleteVBDI = (payload: any) => {
	return {
		type: TRA_LOI_VAN_BAN_COMPLETE,
		payload,
	};
};

// cho ý kiến văn bản
export const actionChoYKienVBDI = (payload: any) => {
	return {
		type: CHO_Y_KIEN_ACTION,
		payload,
	};
};
export const ChoYKienCompleteVBDI = (payload: any) => {
	return {
		type: CHO_Y_KIEN_COMPLETE,
		payload,
	};
};

// Kiểm tra ý kiến
export const actionKiemTraYKienVBDI = (payload: any) => {
	return {
		type: KIEM_TRA_Y_KIEN_VBDI_ACTION,
		payload,
	};
};

export const kiemTraYKienVBDIComplete = (payload: any) => {
	return {
		type: KIEM_TRA_Y_KIEN_VBDI_COMPLETE,
		payload,
	};
};

// duyet to trinh
export const actionDuyetVanBanDi = (payload: any) => {
	return {
		type: DUYET_VAN_BAN_DI_ACTION,
		payload,
	};
};

export const duyetVanBanDiComplete = (payload: any) => {
	return {
		type: DUYET_VAN_BAN_DI_COMPLETE,
		payload,
	};
};

// Tra lời văn bản
export const actionTraLoiVBDI = (payload: any) => {
	return {
		type: TRA_LOI_VBDI_ACTION,
		payload,
	};
};

export const traLoiVBDIComplete = (payload: any) => {
	return {
		type: TRA_LOI_VBDI_COMPLETE,
		payload,
	};
};

// Thông tin trả văn bản
export const actionThongTinTraVBDI = (payload: any) => {
	return {
		type: THONG_TIN_TRA_ACTION,
		payload,
	};
};

export const thongTinTraVBDIComplete = (payload: any) => {
	return {
		type: THONG_TIN_TRA_COMPLETE,
		payload,
	};
};

// Thu hồi văn bản
export const actionThuHoiVBDi = (payload: any) => {
	return {
		type: THU_HOI_VAN_BAN_DI_ACTION,
		payload,
	};
};

export const thuhoiVBDiComplete = (payload: any) => {
	return {
		type: THU_HOI_VAN_BAN_DI_COMPLETE,
		payload,
	};
};

// tra loi van bản
export const actionLayDanhSachLanhDaoTrinh = (payload: any) => {
	return {
		type: DANH_SACH_LANH_DAO_TRINH_ACTION,
		payload,
	};
};

export const LayDanhSachLanhDaoTrinhComplete = (payload: any) => {
	return {
		type: DANH_SACH_LANH_DAO_TRINH_COMPLETE,
		payload,
	};
};

export const actionThongKeVBDi = () => {
	return {
		type: THONG_KE_VBDI_ACTION,
	};
};

export const thongKeVBDiComplete = (payload: any) => {
	return {
		type: THONG_KE_VBDI_COMPLETE,
		payload,
	};
};

// chuyển cấp số
export const actionCapSoVBDI = (payload: any) => {
	return {
		type: CAP_SO_ACTION,
		payload,
	};
};

export const capSoVBDIComplete = (payload: any) => {
	return {
		type: CAP_SO_COMPLETE,
		payload,
	};
};

// danh sach phát hành văn bản đi
export const actionDSPhatHanhVBDi = (payload: any) => {
	return {
		type: DS_PHAT_HANH_VBDI_ACTION,
		payload,
	};
};

export const dsPhatHanhVBDiComplete = (payload: any) => {
	return {
		type: DS_PHAT_HANH_VBDI_COMPLETE,
		payload,
	};
};

// phát hành
export const actionPhatHanhVBDI = (payload: any) => {
	return {
		type: PHAT_HANH_ACTION,
		payload,
	};
};

export const phatHanhVBDIComplete = (payload: any) => {
	return {
		type: PHAT_HANH_COMPLETE,
		payload,
	};
};

// thêm mới
export const actionThemMoiVBDI = (payload: any) => {
	return {
		type: THEM_MOI_ACTION,
		payload,
	};
};

export const themMoiVBDIComplete = (payload: any) => {
	return {
		type: THEM_MOI_COMPLETE,
		payload,
	};
};

export const actionVBDIinit = (payload: any) => {
	return {
		type: VAN_BAN_DI_INIT_ACTION,
		payload,
	};
};

export const VBDIinitComplete = (payload: any) => {
	return {
		type: VAN_BAN_DI_INIT_COMPLETE,
		payload,
	};
};

export const actionLaySoVB = (payload: any) => {
	return {
		type: LAY_SO_VB_ACTION,
		payload,
	};
};

export const LaySoVBComplete = (payload: any) => {
	return {
		type: LAY_SO_VB_COMPLETE,
		payload,
	};
};

export const chuyenCapSoVBVTAction = (payload: any) => {
	return {
		type: CAP_SO_VT_ACTION,
		payload,
	};
};

export const chuyenCapSoVBVTComplete = (payload: any) => {
	return {
		type: CAP_SO_VT_COMPLETE,
		payload,
	};
};

export const danhSachHSCVAction = (payload: any) => {
	return {
		type: DANH_SACH_HO_SO_CV_ACTION,
		payload,
	};
};

export const danhSachHSCVComplete = (payload: any) => {
	return {
		type: DANH_SACH_HO_SO_CV_COMPLETE,
		payload,
	};
};
