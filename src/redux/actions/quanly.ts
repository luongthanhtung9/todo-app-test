import {
	DEFAULT,
	LAY_FILE_DINH_KEM_ACTION,
	LAY_FILE_DINH_KEM_COMPLETE,
	LAY_LANH_DAO_DE_XUAT_ACTION,
	LAY_LANH_DAO_DE_XUAT_COMPLETE,
	LAY_THONG_TIN_FILE_ACTION,
	LAY_THONG_TIN_FILE_COMPLETE,
	LAY_TAT_CA_SO_ACTION,
	LAY_TAT_CA_SO_COMPLETE,
	LAY_TAT_CA_FILTER_TREE_ACTION,
	LAY_TAT_CA_FILTER_TREE_COMPLETE,
	LAY_TAT_CA_DON_VI_ACTION,
	LAY_TAT_CA_DON_VI_COMPLETE,
	GET_ALL_LEADER_ACTION,
	GET_ALL_LEADER_COMPLETE,
	LSXL_VBD_ACTION,
	LSXL_VBD_COMPLETE,
	LOAI_VB_ACTION,
	LOAI_VB_COMPLETE,
	LAY_LANH_DAO_DON_VI_ACTION,
	LAY_LANH_DAO_DON_VI_COMPLETE,
	DANHSACH_LIENKET_ACTION,
	DANHSACH_LIENKET_COMPLETE,
	LAY_DON_VI_DE_XUAT_ACTION,
	LAY_DON_VI_DE_XUAT_COMPLETE,
	KIEM_TRA_NGUOI_DUNG_ACTION,
	KIEM_TRA_NGUOI_DUNG_COMPLETE,
	DANH_SACH_NGUOI_XU_LY,
	DANH_SACH_NGUOI_XU_LY_COMPLETE,
	TIM_THEO_ID_ACTION,
	TIM_THEO_ID_COMPLETE,
	LAY_TAT_CA_SO_DI_ACTION,
	LAY_TAT_CA_SO_DI_COMPLETE,
	TIM_THEO_MA,
	TIM_THEO_MA_COMPLETE,
	LAY_THONG_TIN_FILE_REF_ACTION,
	LAY_THONG_TIN_FILE_REF_COMPLETE,
	BO_SUNG_LANH_DAO_XU_LY,
	BO_SUNG_LANH_DAO_XU_LY_COMPLETE,
	XEM_LUONG_VAN_BAN,
	XEM_LUONG_VAN_BAN_COMPLETE,
} from '../constants/quanly';

export const actionDefault = () => {
	return {
		type: DEFAULT,
	};
};
// lấy file đính kèm của văn bản
export const actionLayFileDinhKem = (payload: any) => {
	return {
		type: LAY_FILE_DINH_KEM_ACTION,
		payload,
	};
};

export const layFileDinhKemComplete = (payload: any) => {
	return {
		type: LAY_FILE_DINH_KEM_COMPLETE,
		payload,
	};
};

// lấy thông tin file của văn bản
export const actionLayThongTinFile = (payload: any) => {
	return {
		type: LAY_THONG_TIN_FILE_ACTION,
		payload,
	};
};

export const layThongTinFileComplete = (payload: any) => {
	return {
		type: LAY_THONG_TIN_FILE_COMPLETE,
		payload,
	};
};

// lấy lãnh đạo đề xuất
export const actionLayLDDX = (payload: any) => {
	return {
		type: LAY_LANH_DAO_DE_XUAT_ACTION,
		payload,
	};
};

export const layLDDXComplete = (payload: any) => {
	return {
		type: LAY_LANH_DAO_DE_XUAT_COMPLETE,
		payload,
	};
};

// lấy tất cả sổ
export const actionLayTatCaSo = (payload: any) => {
	return {
		type: LAY_TAT_CA_SO_ACTION,
		payload,
	};
};

export const layTatCaSoComplete = (payload: any) => {
	return {
		type: LAY_TAT_CA_SO_COMPLETE,
		payload,
	};
};

// lấy tất cả sổ
export const actionLayTatCaSoDi = () => {
	return {
		type: LAY_TAT_CA_SO_DI_ACTION,
	};
};

export const layTatCaSoDiComplete = (payload: any) => {
	return {
		type: LAY_TAT_CA_SO_DI_COMPLETE,
		payload,
	};
};

// lấy tất cả filter tree
export const actionLayTatCaFilterTree = (payload: any) => {
	return {
		type: LAY_TAT_CA_FILTER_TREE_ACTION,
		payload,
	};
};

export const layTatCaFilterTreeComplete = (payload: any) => {
	return {
		type: LAY_TAT_CA_FILTER_TREE_COMPLETE,
		payload,
	};
};

// lấy tất cả đơn vị
export const actionLayTatCaDonVI = () => {
	return {
		type: LAY_TAT_CA_DON_VI_ACTION,
	};
};

export const layTatCaDonViComplete = (payload: any) => {
	return {
		type: LAY_TAT_CA_DON_VI_COMPLETE,
		payload,
	};
};

// lấy tất cả lãnh đạo
export const actionGetAllLeader = () => {
	return {
		type: GET_ALL_LEADER_ACTION,
	};
};

export const getAllLeaderComplete = (payload: any) => {
	return {
		type: GET_ALL_LEADER_COMPLETE,
		payload,
	};
};

// lấy lịch sử xử lý văn bản đến
export const actionLSXLVBD = (payload: any) => {
	return {
		type: LSXL_VBD_ACTION,
		payload,
	};
};

export const lsXLVBDComplete = (payload: any) => {
	return {
		type: LSXL_VBD_COMPLETE,
		payload,
	};
};

// lấy lịch sử xử lý văn bản đến
export const xemLuongVanBan = (payload: any) => {
	return {
		type: XEM_LUONG_VAN_BAN,
		payload,
	};
};

export const xemLuongVanBanComplete = (payload: any) => {
	return {
		type: XEM_LUONG_VAN_BAN_COMPLETE,
		payload,
	};
};

export const actionLoaiVB = () => {
	return {
		type: LOAI_VB_ACTION,
	};
};

export const loaiVBComplete = (payload: any) => {
	return {
		type: LOAI_VB_COMPLETE,
		payload,
	};
};

export const actionLayLanhDaoDV = () => {
	return {
		type: LAY_LANH_DAO_DON_VI_ACTION,
	};
};

export const layLanhDaoDVComplete = (payload: any) => {
	return {
		type: LAY_LANH_DAO_DON_VI_COMPLETE,
		payload,
	};
};

//* danh sách liên kết
export const actionlayDanhSachLienKet = (payload: any) => {
	return {
		type: DANHSACH_LIENKET_ACTION,
		payload,
	};
};

export const layDanhSachLienKetComplete = (payload: any) => {
	return {
		type: DANHSACH_LIENKET_COMPLETE,
		payload,
	};
};

//* Lấy đơn vị đề xuất
export const actionLayDonViDeXuat = (payload: any) => {
	return {
		type: LAY_DON_VI_DE_XUAT_ACTION,
		payload,
	};
};

export const layDonViDeXuatComplete = (payload: any) => {
	return {
		type: LAY_DON_VI_DE_XUAT_COMPLETE,
		payload,
	};
};

//* Kiểm tra người dùng thuộc đơn vị
export const actionKTraND = (payload: any) => {
	return {
		type: KIEM_TRA_NGUOI_DUNG_ACTION,
		payload,
	};
};

export const ktraNDComplete = (payload: any) => {
	return {
		type: KIEM_TRA_NGUOI_DUNG_COMPLETE,
		payload,
	};
};

export const danhSachNguoiXuLy = (postId: any) => {
	return {
		type: DANH_SACH_NGUOI_XU_LY,
		postId,
	};
};

export const danhSachNguoiXuLyComplete = (payload: any) => {
	return {
		type: DANH_SACH_NGUOI_XU_LY_COMPLETE,
		payload,
	};
};

export const timTheoId = (deptId: any) => {
	return {
		type: TIM_THEO_ID_ACTION,
		deptId,
	};
};

export const timTheoIdComplete = (payload: any) => {
	return {
		type: TIM_THEO_ID_COMPLETE,
		payload,
	};
};

export const timTheoMaAction = (ma_data: any) => {
	return {
		type: TIM_THEO_MA,
		ma_data,
	};
};

export const timTheoMaComplete = (payload: any) => {
	return {
		type: TIM_THEO_MA_COMPLETE,
		payload,
	};
};
// lấy thông tin file ref của văn bản
export const actionLayThongTinFileRef = (payload: any) => {
	return {
		type: LAY_THONG_TIN_FILE_REF_ACTION,
		payload,
	};
};

export const layThongTinFileRefComplete = (payload: any) => {
	return {
		type: LAY_THONG_TIN_FILE_REF_COMPLETE,
		payload,
	};
};

export const boSungLanhDaoXyLy = (payload: any) => {
	return {
		type: BO_SUNG_LANH_DAO_XU_LY,
		payload,
	};
};

export const boSungLanhDaoXyLyComplete = (payload: any) => {
	return {
		type: BO_SUNG_LANH_DAO_XU_LY_COMPLETE,
		payload,
	};
};
