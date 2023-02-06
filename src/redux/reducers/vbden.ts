import {
	DEFAULT,
	DS_VBDEN_COMPLETE,
	CT_VBDEN_COMPLETE,
	THONG_KE_VBDEN_COMPLETE,
	TU_CHOI_VB_COMPLETE,
	THONG_TIN_XL_COMPLETE,
	THEM_CHUYEN_XL_COMPLETE,
	UPDATE_CHUYEN_XL_COMPLETE,
	KET_THUC_VB_COMPLETE,
	NOI_DUNG_XL_COMPLETE,
	THONG_TIN_TRA_ACTION,
	THONG_TIN_TRA_COMPLETE,
	TRA_VB_COMPLETE,
	CHUYEN_BO_SUNG_COMPLETE,
	THONG_TIN_TRINH_XU_LY_COMPLETE,
	NGUOI_XU_LY_VBD_COMPLETE,
	NGUOI_XU_LY_VBD_COMPLETE_NEW,
	CHUYEN_DON_VI_COMPLETE,
	CAP_NHAT_THONG_TIN_SUCCESS,
	DS_VBDEN_TRONG_DV_COMPLETE,
	LAY_SO_VAN_BAN_COMPLETE,
	TIEP_NHAN_VAN_BAN_SUCCESS,
	LAY_TAT_CA_CHUYEN_VIEN_SUCCESS,
	CHUYEN_CHUYEN_VIEN_SUCCESS,
	TIM_THEO_DIEU_KIEN_SUCCESS,
	THEM_LUU_TRU_VAN_BAN_SUCCESS,
} from '../constants/vbden';

const initialState = {
	loginResponse: undefined, // đăng nhập
	layTatCaChucNangUserResponse: undefined, // đăng nhập
	listVanBanDenResponse: undefined, // danh sách
	listVanBanDenTrongDvResponse: undefined,
	chiTietVanBanDenResponse: undefined, // chi tiết
	thongkeVBDenResponse: undefined, // số lượng văn bản
	tuChoiVBResponse: undefined, //
	thongTinXLResponse: undefined, // lấy thông tin xử lý văn bản
	themChuyenXLResponse: undefined, // chuyển xử lý văn bản đến
	updateChuyenXLResponse: undefined, // cập nhật chuyển xử lý văn bản đến
	ketthucVBResponse: undefined, // kết thúc văn bản đến
	noidungXLResponse: undefined, // nội dung xử lý
	thongtinTraVBResponse: undefined, // thông tin trả vb
	traVBResponse: undefined, // trả văn bản
	chuyenBoSungResponse: undefined, // chuyển bổ sung đơn vị
	thongTinTrinhXLResponse: undefined, // lấy thông tin trình xử lý văn bản
	nguoiXLVBDenResponse: undefined, // lấy người xử lý văn bản đến
	nguoiXLVBDenResponseNew: undefined, // lấy người xử lý văn bản đến
	chuyenDonViResponse: undefined,
	capNhatThongTinResponse: undefined,
	soVanBanDen: undefined,
	tiepNhanVanBanResponse: undefined,
	tatCaChuyenVienResponse: undefined,
	chuyenChuyenVienResponse: undefined,
	timTheoDieuKienResponse: undefined,
	themLuuTruVanBanResponse: undefined,
};

export default function vbden(state = initialState, action: any) {
	switch (action.type) {
		case DEFAULT:
			return {
				...initialState,
			};
		// danh sách văn bản đến
		case DS_VBDEN_COMPLETE:
			return {
				...state,
				listVanBanDenResponse: action.payload,
			};
		case DS_VBDEN_TRONG_DV_COMPLETE:
			return {
				...state,
				listVanBanDenTrongDvResponse: action.payload,
			};
		case CT_VBDEN_COMPLETE:
			return {
				...state,
				chiTietVanBanDenResponse: action.payload,
			};
		case THONG_KE_VBDEN_COMPLETE:
			return {
				...state,
				thongkeVBDenResponse: action.payload,
			};

		case TU_CHOI_VB_COMPLETE:
			return {
				...state,
				tuChoiVBResponse: action.payload,
			};
		case THONG_TIN_XL_COMPLETE:
			return {
				...state,
				thongTinXLResponse: action.payload,
			};
		case NOI_DUNG_XL_COMPLETE:
			return {
				...state,
				noidungXLResponse: action.payload,
			};
		case THEM_CHUYEN_XL_COMPLETE:
			return {
				...state,
				themChuyenXLResponse: action.payload,
			};
		case UPDATE_CHUYEN_XL_COMPLETE:
			return {
				...state,
				updateChuyenXLResponse: action.payload,
			};
		case KET_THUC_VB_COMPLETE:
			return {
				...state,
				ketthucVBResponse: action.payload,
			};
		case THONG_TIN_TRA_ACTION:
			return {
				...state,
				thongtinTraVBResponse: undefined,
			};
		case THONG_TIN_TRA_COMPLETE:
			return {
				...state,
				thongtinTraVBResponse: action.payload,
			};
		case TRA_VB_COMPLETE:
			return {
				...state,
				traVBResponse: action.payload,
			};
		case CHUYEN_BO_SUNG_COMPLETE:
			return {
				...state,
				chuyenBoSungResponse: action.payload,
			};
		case THONG_TIN_TRINH_XU_LY_COMPLETE:
			return {
				...state,
				thongTinTrinhXLResponse: action.payload,
			};
		case NGUOI_XU_LY_VBD_COMPLETE:
			return {
				...state,
				nguoiXLVBDenResponse: action.payload,
			};
		case NGUOI_XU_LY_VBD_COMPLETE_NEW:
			return {
				...state,
				nguoiXLVBDenResponseNew: action.payload,
			};
		case CHUYEN_DON_VI_COMPLETE:
			return {
				...state,
				chuyenDonViResponse: action.payload,
			};
		case TIEP_NHAN_VAN_BAN_SUCCESS: {
			return {
				...state,
				tiepNhanVanBanResponse: action.payload,
			};
		}
		case CAP_NHAT_THONG_TIN_SUCCESS:
			return {
				...state,
				capNhatThongTinResponse: action.payload,
			};
		case LAY_SO_VAN_BAN_COMPLETE:
			return {
				...state,
				soVanBanDen: action.payload,
			};
		case LAY_TAT_CA_CHUYEN_VIEN_SUCCESS:
			return {
				...state,
				tatCaChuyenVienResponse: action.payload,
			};
		case CHUYEN_CHUYEN_VIEN_SUCCESS:
			return {
				...state,
				chuyenChuyenVienResponse: action.payload,
			};
		case TIM_THEO_DIEU_KIEN_SUCCESS:
			return {
				...state,
				timTheoDieuKienResponse: action.payload,
			};
		case THEM_LUU_TRU_VAN_BAN_SUCCESS:
			return {
				...state,
				themLuuTruVanBanResponse: action.payload,
			};
	}
	return state;
}
