import {
	DEFAULT,
	LOGIN_ACTION,
	LOGIN_COMPLETE,
	DS_VBDEN_ACTION,
	DS_VBDEN_COMPLETE,
	CT_VBDEN_ACTION,
	CT_VBDEN_COMPLETE,
	THONG_KE_VBDEN_ACTION,
	THONG_KE_VBDEN_COMPLETE,
	TU_CHOI_VB_ACTION,
	TU_CHOI_VB_COMPLETE,
	THONG_TIN_XL_ACTION,
	THONG_TIN_XL_COMPLETE,
	NOI_DUNG_XL_ACTION,
	NOI_DUNG_XL_COMPLETE,
	THEM_CHUYEN_XL_ACTION,
	THEM_CHUYEN_XL_COMPLETE,
	UPDATE_CHUYEN_XL_ACTION,
	UPDATE_CHUYEN_XL_COMPLETE,
	KET_THUC_VB_ACTION,
	KET_THUC_VB_COMPLETE,
	THONG_TIN_TRA_ACTION,
	THONG_TIN_TRA_COMPLETE,
	TRA_VB_ACTION,
	TRA_VB_COMPLETE,
	CHUYEN_BO_SUNG_ACTION,
	CHUYEN_BO_SUNG_COMPLETE,
	THONG_TIN_TRINH_XU_LY_ACTION,
	THONG_TIN_TRINH_XU_LY_COMPLETE,
	NGUOI_XU_LY_VBD_ACTION,
	NGUOI_XU_LY_VBD_COMPLETE,
	NGUOI_XU_LY_VBD_ACTION_NEW,
	NGUOI_XU_LY_VBD_COMPLETE_NEW,
	CHUYEN_DON_VI_ACTION,
	CHUYEN_DON_VI_COMPLETE,
	CAP_NHAT_THONG_TIN,
	CAP_NHAT_THONG_TIN_SUCCESS,
	TIEP_NHAN_VAN_BAN,
	TIEP_NHAN_VAN_BAN_SUCCESS,
	DS_VBDEN_TRONG_DV_COMPLETE,
	DS_VBDEN_ACTION_TRONG_DV,
	LAY_SO_VAN_BAN,
	LAY_SO_VAN_BAN_COMPLETE,
	LAY_TAT_CA_CHUYEN_VIEN,
	LAY_TAT_CA_CHUYEN_VIEN_SUCCESS,
	CHUYEN_CHUYEN_VIEN,
	CHUYEN_CHUYEN_VIEN_SUCCESS,
	TIM_THEO_DIEU_KIEN,
	TIM_THEO_DIEU_KIEN_SUCCESS,
	THEM_LUU_TRU_VAN_BAN,
	THEM_LUU_TRU_VAN_BAN_SUCCESS,
} from '../constants/vbden';

export const actionDefaultVBDen = () => {
	return {
		type: DEFAULT,
	};
};
// đăng nhập
export const actionLogin = (payload: any) => {
	return {
		type: LOGIN_ACTION,
		payload,
	};
};

export const loginComplete = (payload: any) => {
	return {
		type: LOGIN_COMPLETE,
		payload,
	};
};

export const actionDSVBDen = (payload: any) => {
	return {
		type: DS_VBDEN_ACTION,
		payload,
	};
};

export const actionDSVBDenTrongDv = (payload: any) => {
	return {
		type: DS_VBDEN_ACTION_TRONG_DV,
		payload,
	};
};

export const dsVBDenComplete = (payload: any) => {
	return {
		type: DS_VBDEN_COMPLETE,
		payload,
	};
};

export const dsVBDenTrongDvComplete = (payload: any) => {
	return {
		type: DS_VBDEN_TRONG_DV_COMPLETE,
		payload,
	};
};

export const actionCTVBDen = (payload: any) => {
	return {
		type: CT_VBDEN_ACTION,
		payload,
	};
};

export const ctVBDenComplete = (payload: any) => {
	return {
		type: CT_VBDEN_COMPLETE,
		payload,
	};
};

export const actionThongKeVBDen = () => {
	return {
		type: THONG_KE_VBDEN_ACTION,
	};
};

export const thongKeVBDenComplete = (payload: any) => {
	return {
		type: THONG_KE_VBDEN_COMPLETE,
		payload,
	};
};

export const tuChoiVBAction = (payload: any) => {
	return {
		type: TU_CHOI_VB_ACTION,
		payload,
	};
};

export const tuChoiVBComplete = (payload: any) => {
	return {
		type: TU_CHOI_VB_COMPLETE,
		payload,
	};
};

export const actionThongTinXL = (payload: any) => {
	return {
		type: THONG_TIN_XL_ACTION,
		payload,
	};
};

export const thongTinXLComplete = (payload: any) => {
	return {
		type: THONG_TIN_XL_COMPLETE,
		payload,
	};
};

export const actionThemChuyenXL = (payload: any) => {
	return {
		type: THEM_CHUYEN_XL_ACTION,
		payload,
	};
};

export const themChuyenXLComplete = (payload: any) => {
	return {
		type: THEM_CHUYEN_XL_COMPLETE,
		payload,
	};
};

export const actionUpdateChuyenXL = (payload: any) => {
	return {
		type: UPDATE_CHUYEN_XL_ACTION,
		payload,
	};
};

export const updateChuyenXLComplete = (payload: any) => {
	return {
		type: UPDATE_CHUYEN_XL_COMPLETE,
		payload,
	};
};

export const actionKetThucVB = (payload: any) => {
	return {
		type: KET_THUC_VB_ACTION,
		payload,
	};
};

export const ketthucVBComplete = (payload: any) => {
	return {
		type: KET_THUC_VB_COMPLETE,
		payload,
	};
};

export const actionNoiDungXL = (payload: any) => {
	return {
		type: NOI_DUNG_XL_ACTION,
		payload,
	};
};

export const noidungXLComplete = (payload: any) => {
	return {
		type: NOI_DUNG_XL_COMPLETE,
		payload,
	};
};

export const actionThongTinTraVB = (payload: any) => {
	return {
		type: THONG_TIN_TRA_ACTION,
		payload,
	};
};

export const thongTinTraVBComplete = (payload: any) => {
	return {
		type: THONG_TIN_TRA_COMPLETE,
		payload,
	};
};

export const actionTraVB = (payload: any) => {
	return {
		type: TRA_VB_ACTION,
		payload,
	};
};

export const traVBComplete = (payload: any) => {
	return {
		type: TRA_VB_COMPLETE,
		payload,
	};
};

export const actionChuyenBoSung = (payload: any) => {
	return {
		type: CHUYEN_BO_SUNG_ACTION,
		payload,
	};
};

export const chuyenBoSungComplete = (payload: any) => {
	return {
		type: CHUYEN_BO_SUNG_COMPLETE,
		payload,
	};
};

export const actionThongTinTrinhXL = (payload: any) => {
	return {
		type: THONG_TIN_TRINH_XU_LY_ACTION,
		payload,
	};
};

export const thongTinTrinhXLComplete = (payload: any) => {
	return {
		type: THONG_TIN_TRINH_XU_LY_COMPLETE,
		payload,
	};
};

export const actionNguoiXLVBDen = (payload: any) => {
	return {
		type: NGUOI_XU_LY_VBD_ACTION,
		payload,
	};
};

// api lấy thông tin người xử lý mới
export const actionNguoiXLVBDenNew = (payload: any) => {
	return {
		type: NGUOI_XU_LY_VBD_ACTION_NEW,
		payload,
	};
};

export const nguoiXLVBDenComplete = (payload: any) => {
	return {
		type: NGUOI_XU_LY_VBD_COMPLETE,
		payload,
	};
};

export const nguoiXLVBDenCompleteNew = (payload: any) => {
	return {
		type: NGUOI_XU_LY_VBD_COMPLETE_NEW,
		payload,
	};
};

export const actionChuyenDonVi = (payload: any) => {
	return {
		type: CHUYEN_DON_VI_ACTION,
		payload,
	};
};

export const chuyenDonViCompelete = (payload: any) => {
	return {
		type: CHUYEN_DON_VI_COMPLETE,
		payload,
	};
};

export const capNhatThongTin = (payload: any) => {
	return {
		type: CAP_NHAT_THONG_TIN,
		payload,
	};
};

export const capNhatThongTinSuccess = (payload: any) => {
	return {
		type: CAP_NHAT_THONG_TIN_SUCCESS,
		payload,
	};
};

export const tiepNhanVanBan = (payload: any) => {
	return {
		type: TIEP_NHAN_VAN_BAN,
		payload,
	};
};

export const tiepNhanVanBanSuccess = (payload: any) => {
	return {
		type: TIEP_NHAN_VAN_BAN_SUCCESS,
		payload,
	};
};

export const laySoVanBan = (payload: any) => {
	return {
		type: LAY_SO_VAN_BAN,
		payload,
	};
};

export const laySoVanBanSuccess = (payload: any) => {
	return {
		type: LAY_SO_VAN_BAN_COMPLETE,
		payload,
	};
};

export const layTatCaChuyenVien = (payload?: any) => {
	return {
		type: LAY_TAT_CA_CHUYEN_VIEN,
		payload,
	};
};

export const layTatCaChuyenVienSuccess = (payload: any) => {
	return {
		type: LAY_TAT_CA_CHUYEN_VIEN_SUCCESS,
		payload,
	};
};

export const chuyenChuyenVien = (payload: any) => {
	return {
		type: CHUYEN_CHUYEN_VIEN,
		payload,
	};
};

export const chuyenChuyenVienSuccess = (payload: any) => {
	return {
		type: CHUYEN_CHUYEN_VIEN_SUCCESS,
		payload,
	};
};

export const timTheoDieuKienAction = (payload: any) => {
	return {
		type: TIM_THEO_DIEU_KIEN,
		payload,
	};
};

export const timTheoDieuKienSuccess = (payload: any) => {
	return {
		type: TIM_THEO_DIEU_KIEN_SUCCESS,
		payload,
	};
};

export const themLuuTruVanBanAction = (payload: any) => {
	return {
		type: THEM_LUU_TRU_VAN_BAN,
		payload,
	};
};

export const themLuuTruVanBanSuccess = (payload: any) => {
	return {
		type: THEM_LUU_TRU_VAN_BAN_SUCCESS,
		payload,
	};
};
