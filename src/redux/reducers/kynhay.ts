import {DEFAULT_KYNHAY, KY_NHAY_COMPLETE} from '../constants/kynhay';

const initialState = {
	kyNhayResponse: undefined, // danh sách phiếu giao việc
};

export default function kynhay(state = initialState, action: any) {
	switch (action.type) {
		case DEFAULT_KYNHAY:
			return {
				...initialState,
			};
		// ký nháy thành công
		case KY_NHAY_COMPLETE:
			return {
				...state,
				kyNhayResponse: action.payload,
			};
	}
	return state;
}
