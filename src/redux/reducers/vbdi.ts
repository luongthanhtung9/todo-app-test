import {
	DEFAULT,
	DS_VBDI_COMPLETE,
	CT_VBDI_COMPLETE,
	TRINH_XL_COMPLETE,
	LICH_SU_XU_LY_COMPLETE,
	DUYET_VAN_BAN_DI_COMPLETE,
	KIEM_TRA_Y_KIEN_VBDI_COMPLETE,
	TRA_LOI_VAN_BAN_COMPLETE,
	THONG_TIN_TRA_COMPLETE,
	THU_HOI_VAN_BAN_DI_COMPLETE,
	DANH_SACH_LANH_DAO_TRINH_COMPLETE,
	THONG_KE_VBDI_COMPLETE,
	CAP_SO_COMPLETE,
	DS_PHAT_HANH_VBDI_COMPLETE,
	PHAT_HANH_COMPLETE,
	THEM_MOI_COMPLETE,
	VAN_BAN_DI_INIT_COMPLETE,
	LAY_SO_VB_COMPLETE,
	CAP_SO_VT_COMPLETE,
    DANH_SACH_HO_SO_CV_COMPLETE,
} from '../constants/vbdi';
const initialState = {
	trinhXuLyResponse: undefined, // trình xử lý
	DSVanBanDiResponse: undefined, // danh sách văn bản đi
	chiTietVanBanDiResponse: undefined, //
	lichSuXuLyResponse: undefined,
	kiemtraYKienResponse: undefined,
	duyetVanBanDiResponse: undefined,
	traVBResponse: undefined,
	thongtinTraVBDIResponse: undefined, // thông tin trả vb
	thuhoiVBDIResponse: undefined, // thu hồi văn bản đi
	danhSachLanhDaoTrinh: undefined, // thu hồi văn bản đi
	thongkeVBDiResponse: undefined, // thống kê văn bản đi
	chuyenCapSoResponse: undefined, // chuyển cấp số respone
	DSPhatHanhVanBanDiResponse: undefined, // chuyển cấp số respone
	phatHanhVanBanDiResponse: undefined,
	themMoiResponse: undefined,
	initVBDResponse: undefined,
	laysoVB: undefined,
	chuyenCapSoVBVT: undefined,
	danhSachCV: undefined,
};

export default function vbdi(state = initialState, action: any) {
	switch (action.type) {
		case DEFAULT:
			return {
				...initialState,
			};
		// Danh sách văn bản đi
		case DS_VBDI_COMPLETE:
			return {
				...state,
				DSVanBanDiResponse: action.payload,
			};
		// Chi tiết văn bản đi
		case CT_VBDI_COMPLETE:
			return {
				...state,
				chiTietVanBanDiResponse: action.payload,
			};
		// Trình xử lý
		case TRINH_XL_COMPLETE:
			return {
				...state,
				trinhXuLyResponse: action.payload,
			};
		// Lịch sử xử lý
		case LICH_SU_XU_LY_COMPLETE:
			return {
				...state,
				lichSuXuLyResponse: action.payload,
			};

		// Kieemr tra ys kieens
		case KIEM_TRA_Y_KIEN_VBDI_COMPLETE:
			return {
				...state,
				kiemtraYKienResponse: action.payload,
			};

		// duyet văn bản đi
		case DUYET_VAN_BAN_DI_COMPLETE:
			return {
				...state,
				duyetVanBanDiResponse: action.payload,
			};

		// trả lời văn bản đi
		case TRA_LOI_VAN_BAN_COMPLETE:
			return {
				...state,
				traVBResponse: action.payload,
			};

		// laays thoong tin nguoi tra loi
		case THONG_TIN_TRA_COMPLETE:
			return {
				...state,
				thongtinTraVBDIResponse: action.payload,
			};
		// thu hồi văn bản đi
		case THU_HOI_VAN_BAN_DI_COMPLETE:
			return {
				...state,
				thuhoiVBDIResponse: action.payload,
			};
		// danh sách lãnh đạo
		case DANH_SACH_LANH_DAO_TRINH_COMPLETE:
			return {
				...state,
				danhSachLanhDaoTrinh: action.payload,
			};
		// thống kê văn bản đi
		case THONG_KE_VBDI_COMPLETE:
			return {
				...state,
				thongkeVBDiResponse: action.payload,
			};
		case CAP_SO_COMPLETE:
			return {
				...state,
				chuyenCapSoResponse: action.payload,
			};
		case DS_PHAT_HANH_VBDI_COMPLETE:
			return {
				...state,
				DSPhatHanhVanBanDiResponse: action.payload,
			};
		case PHAT_HANH_COMPLETE:
			return {
				...state,
				phatHanhVanBanDiResponse: action.payload,
			};
		case THEM_MOI_COMPLETE:
			return {
				...state,
				themMoiResponse: action.payload,
			};
		case VAN_BAN_DI_INIT_COMPLETE:
			return {
				...state,
				initVBDResponse: action.payload,
			};
		case LAY_SO_VB_COMPLETE:
			return {
				...state,
				laysoVB: action.payload,
			};
		case CAP_SO_VT_COMPLETE:
			return {
				...state,
				chuyenCapSoVBVT: action.payload,
			};
		case DANH_SACH_HO_SO_CV_COMPLETE:
			return {
				...state,
				danhSachCV: action.payload,
			};
	}
	return state;
}
