import {
	CONG_VIEC_CUA_TOI_COMPLETE,
	DANH_SACH_THONG_BAO_COMPLETE,
	DEFAULT,
	DOC_THONG_BAO_SUCCESS,
	LAY_THONG_BAO_COMPLETE,
} from '../constants/thongbao';

const initialState = {
	dataNumberNotify: undefined,
	danhSachThongBao: undefined,
	cvctResponse: undefined,
	docThongBaoResponse: undefined,
};

export default function authen(state = initialState, action: any) {
	switch (action.type) {
		case DEFAULT:
			return {
				...initialState,
			};
		case LAY_THONG_BAO_COMPLETE:
			return {
				...state,
				dataNumberNotify: action.payload,
			};
		case DANH_SACH_THONG_BAO_COMPLETE:
			return {
				...state,
				danhSachThongBao: action.payload.data,
			};
		case CONG_VIEC_CUA_TOI_COMPLETE:
			return {
				...state,
				cvctResponse: action.payload,
			};
		case DOC_THONG_BAO_SUCCESS:
			return {
				...state,
				docThongBaoResponse: action.payload,
			};
	}
	return state;
}
