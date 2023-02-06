import {
	DEFAULT,
	LAY_FILE_DINH_KEM_COMPLETE,
	LAY_THONG_TIN_FILE_COMPLETE,
	LAY_LANH_DAO_DE_XUAT_COMPLETE,
	LAY_TAT_CA_SO_COMPLETE,
	LAY_TAT_CA_FILTER_TREE_COMPLETE,
	LAY_TAT_CA_DON_VI_COMPLETE,
	GET_ALL_LEADER_COMPLETE,
	LSXL_VBD_COMPLETE,
	LOAI_VB_COMPLETE,
	LAY_LANH_DAO_DON_VI_COMPLETE,
	DANHSACH_LIENKET_COMPLETE,
	LAY_DON_VI_DE_XUAT_COMPLETE,
	KIEM_TRA_NGUOI_DUNG_COMPLETE,
	DANH_SACH_NGUOI_XU_LY_COMPLETE,
	TIM_THEO_ID_COMPLETE,
	LAY_TAT_CA_SO_DI_COMPLETE,
	TIM_THEO_MA_COMPLETE,
	LAY_THONG_TIN_FILE_REF_COMPLETE,
	BO_SUNG_LANH_DAO_XU_LY_COMPLETE,
	XEM_LUONG_VAN_BAN_COMPLETE,
} from '../constants/quanly';

const initialState = {
	listFileResponse: undefined, // lấy file đính kèm
	listInfoFileResponse: undefined, // lấy thông tin file
	listLDDXResponse: undefined, // lấy lãnh đạo đề xuất
	listTatCaSoResponse: undefined, // lấy tất cả sổ
	listTatCaFilterTreeResponse: undefined, // lấy tất cả filter tree
	listTatCaDonViResponse: undefined, // lấy tất cả đon vị
	listAllLeaderResponse: undefined, // lấy tất cả lãnh đạo
	lsxlVBDResponse: undefined, // lấy lịch sử xử lý văn bản đến
	luongVanBanRes: undefined, // luong xu ly
	loaiVBResponse: undefined, // tất cả loại văn bản của vb đến
	layLanhDaoDVResponse: undefined, // lấy lãnh đạo đơn vị
	listLienKetResponse: undefined, // danh sách liên kết
	listDonViDXResponse: undefined, // lấy đơn vị đề xuất
	ktraNDResponse: undefined, // lấy đơn vị đề xuất
	danhSachNguoiXuLyResponse: undefined,
	listTatCaSoDiResponse: undefined, // lấy tất cả sổ đi,
	listInfoFileRefResponse: undefined, // lấy thông tin file
};

export default function quanly(state = initialState, action: any) {
	switch (action.type) {
		case DEFAULT:
			return {
				...initialState,
			};
		// lấy file đính kèm
		case LAY_FILE_DINH_KEM_COMPLETE:
			return {
				...state,
				listFileResponse: action.payload,
			};
		// lấy thông tin file
		case LAY_THONG_TIN_FILE_COMPLETE:
			return {
				...state,
				listInfoFileResponse: action.payload,
			};
		// lấy lãnh đạo đề xuất
		case LAY_LANH_DAO_DE_XUAT_COMPLETE:
			return {
				...state,
				listLDDXResponse: action.payload,
			};
		// lấy tất cả sổ
		case LAY_TAT_CA_SO_COMPLETE:
			return {
				...state,
				listTatCaSoResponse: action.payload,
			};
		case LAY_TAT_CA_SO_DI_COMPLETE:
			return {
				...state,
				listTatCaSoDiResponse: action.payload,
			};
		// lấy tất cả filter tree
		case LAY_TAT_CA_FILTER_TREE_COMPLETE:
			return {
				...state,
				listTatCaFilterTreeResponse: action.payload,
			};
		// lấy tất cả đơn vị
		case LAY_TAT_CA_DON_VI_COMPLETE:
			return {
				...state,
				listTatCaDonViResponse: action.payload,
			};
		// lấy tất cả lãnh đạo
		case GET_ALL_LEADER_COMPLETE:
			return {
				...state,
				listAllLeaderResponse: action.payload,
			};
		// lấy lịch sử xử lý văn bản đến
		case LSXL_VBD_COMPLETE:
			return {
				...state,
				lsxlVBDResponse: action.payload,
			};
		case XEM_LUONG_VAN_BAN_COMPLETE:
			return {
				...state,
				luongVanBanRes: action.payload,
			};
		case LOAI_VB_COMPLETE:
			return {
				...state,
				loaiVBResponse: action.payload,
			};
		case LAY_LANH_DAO_DON_VI_COMPLETE:
			return {
				...state,
				layLanhDaoDVResponse: action.payload,
			};

		case DANHSACH_LIENKET_COMPLETE:
			return {
				...state,
				listLienKetResponse: action.payload,
			};
		case LAY_DON_VI_DE_XUAT_COMPLETE:
			return {
				...state,
				listDonViDXResponse: action.payload,
			};
		case KIEM_TRA_NGUOI_DUNG_COMPLETE:
			return {
				...state,
				ktraNDResponse: action.payload,
			};
		case DANH_SACH_NGUOI_XU_LY_COMPLETE:
			return {
				...state,
				danhSachNguoiXuLyResponse: action.payload.data.documentInDto,
			};
		case TIM_THEO_ID_COMPLETE:
			return {
				...state,
				timTheoIdResponse: action.payload,
			};
		case TIM_THEO_MA_COMPLETE:
			return {
				...state,
				timTheoMaResponse: action.payload,
			};
		// lấy thông tin file ref
		case LAY_THONG_TIN_FILE_REF_COMPLETE:
			return {
				...state,
				listInfoFileRefResponse: action.payload,
			};
		case BO_SUNG_LANH_DAO_XU_LY_COMPLETE:
			return {
				...state,
				boSungLanhDaoXuLyRes: action.payload,
			};
	}
	return state;
}
