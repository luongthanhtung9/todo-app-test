import {
	DEFAULT,
	DS_TOTRINH_COMPLETE,
	LICH_SU_XU_LY_COMPLETE,
	KIEM_TRA_YKIEN_COMPLETE,
	DUYET_TOTRINH_COMPLETE,
	TRINH_XL_COMPLETE,
	TO_TRINH_INIT_COMPLETE,
	CHI_TIET_TO_TRINH_COMPLETE,
	THONG_KE_TO_TRINH_COMPLETE,
	TIM_LANH_DAO_KY_THAY_COMPLETE,
	CHUYEN_KY_THAY_COMPLETE,
	TRA_LOI_VAN_BAN_COMPLETE,
	CHUYEN_CAP_SO_COMPLETE,
} from '../constants/totrinh';

const initialState = {
	dsToTrinhResponse: undefined, // danh sách to trinh
	lichSuXuLyResponse: undefined, // Lịch sử xử lý
	kiemtraYKienResponse: undefined, // Kiểm tra ý kiến cấp phó
	duyetToTrinhResponse: undefined, // duyệt tờ trình
	trinhXuLyResponse: undefined, // trình xử lý
	toTrinhInitResponse: undefined, // tờ trình init
	chiTietToTrinhResponse: undefined, // chi tiết tờ trình
	thongKeToTrinhResponse: undefined,
	lanhDaoKyThay: undefined,
	chuyenKyThayRespone: undefined,
	traVBResponse: undefined,
	cCSResponse: undefined,
};

export default function totrinh(state = initialState, action: any) {
	switch (action.type) {
		case DEFAULT:
			return {
				...initialState,
			};
		// Danh sách tờ trình
		case DS_TOTRINH_COMPLETE:
			return {
				...state,
				dsToTrinhResponse: action.payload,
			};
		// Lịch sử xử lý
		case LICH_SU_XU_LY_COMPLETE:
			return {
				...state,
				lichSuXuLyResponse: action.payload,
			};
		// Kiểm tra ý kiến cấp phó
		case KIEM_TRA_YKIEN_COMPLETE:
			return {
				...state,
				kiemtraYKienResponse: action.payload,
			};
		// duyệt tờ trình
		case DUYET_TOTRINH_COMPLETE:
			return {
				...state,
				duyetToTrinhResponse: action.payload,
			};
		// Trình xử lý
		case TRINH_XL_COMPLETE:
			return {
				...state,
				trinhXuLyResponse: action.payload,
			};
		case TO_TRINH_INIT_COMPLETE:
			return {
				...state,
				toTrinhInitResponse: action.payload,
			};
		case CHI_TIET_TO_TRINH_COMPLETE:
			return {
				...state,
				chiTietToTrinhResponse: action.payload,
			};
		// thống kê văn bản đi
		case THONG_KE_TO_TRINH_COMPLETE:
			return {
				...state,
				thongKeToTrinhResponse: action.payload,
			};
		// lãnh đạo ký thay
		case TIM_LANH_DAO_KY_THAY_COMPLETE:
			return {
				...state,
				lanhDaoKyThay: action.payload,
			};
		case CHUYEN_KY_THAY_COMPLETE:
			return {
				...state,
				chuyenKyThayRespone: action.payload,
			};
		// trả lời văn bản đi
		case TRA_LOI_VAN_BAN_COMPLETE:
			return {
				...state,
				traVBResponse: action.payload,
			};
		case CHUYEN_CAP_SO_COMPLETE:
			return {
				...state,
				cCSResponse: action.payload,
			};
	}
	return state;
}
