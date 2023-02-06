import {
	DEFAULT_GIAOVIEC,
	DS_GIAOVIEC_COMPLETE,
	CT_GIAOVIEC_COMPLETE,
	LICH_SU_XU_LY_COMPLETE,
	CHUYEN_XU_LY_GV_COMPLETE,
	KT_GIAO_VIEC_COMPLETE,
	XU_LY_CV_COMPLETE,
	LAY_DON_VI_GIAO_VIEC_COMPLETE,
	TC_GIAO_VIEC_COMPLETE,
	CTVB_COMPLETE,
} from '../constants/giaoviec';

const initialState = {
	dsGiaoViecResponse: undefined, // danh sách phiếu giao việc
	ctGiaoViecResponse: undefined, // chi tiết phiếu giao việc
	lichSuXLGVResponse: undefined, // Lịch sử xử lý
	chuyenXLGVResponse: undefined, // Chuyển xử lý phiếu giao việc
	ketthucGVResponse: undefined, // kết thúc phiếu giao việc
	xulyCongViecResponse: undefined, // cập nhật xử lý công việc
	layDVGiaoViecResponse: undefined, // lấy đơn vị giao việc
	tcGiaoViecResponse: undefined, // từ chối giao việc
	ctvbResponse: undefined, // chi tiết văn bản đính kèm
};

export default function totrinh(state = initialState, action: any) {
	switch (action.type) {
		case DEFAULT_GIAOVIEC:
			return {
				...initialState,
			};
		// Danh sách tờ trình
		case DS_GIAOVIEC_COMPLETE:
			return {
				...state,
				dsGiaoViecResponse: action.payload,
			};
		// Chi tiết tờ trình
		case CT_GIAOVIEC_COMPLETE:
			return {
				...state,
				ctGiaoViecResponse: action.payload,
			};
		// Lịch sử xử lý
		case LICH_SU_XU_LY_COMPLETE:
			return {
				...state,
				lichSuXLGVResponse: action.payload,
			};
		// Chuyển xử lý phiếu giao việc
		case CHUYEN_XU_LY_GV_COMPLETE:
			return {
				...state,
				chuyenXLGVResponse: action.payload,
			};
		// kết thúc phiếu giao việc
		case KT_GIAO_VIEC_COMPLETE:
			return {
				...state,
				ketthucGVResponse: action.payload,
			};
		// cập nhật xử lý công việc
		case XU_LY_CV_COMPLETE:
			return {
				...state,
				xulyCongViecResponse: action.payload,
			};
		// lấy đơn vị giao việc
		case LAY_DON_VI_GIAO_VIEC_COMPLETE:
			return {
				...state,
				layDVGiaoViecResponse: action.payload,
			};
		// từ chối giao việc
		case TC_GIAO_VIEC_COMPLETE:
			return {
				...state,
				tcGiaoViecResponse: action.payload,
			};
		case CTVB_COMPLETE:
			return {
				...state,
				ctvbResponse: action.payload,
			};
	}
	return state;
}
