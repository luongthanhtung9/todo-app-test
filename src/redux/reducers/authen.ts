import {
	DEFAULT,
	LAY_TAT_CA_CHUC_NANG_USER_COMPLETE,
	LOGIN_COMPLETE,
	GET_VERSION_COMPLETE,
    LAY_THONG_BAO_COMPLETE,
} from '../constants/authen';

const initialState = {
	getVersionResponse: undefined, // lấy version
	loginResponse: undefined, // đăng nhập
	layTatCaChucNangUserResponse: undefined, // lấy quyền chức năng
    dataNumberNotify: undefined,
};

export default function authen(state = initialState, action: any) {
	switch (action.type) {
		case DEFAULT:
			return {
				...initialState,
			};
		// lấy version
		case GET_VERSION_COMPLETE:
			return {
				...state,
				getVersionResponse: action.payload,
			};
		// đăng nhập
		case LOGIN_COMPLETE:
			return {
				...state,
				loginResponse: action.payload,
			};
		// lấy tất cả chức năng
		case LAY_TAT_CA_CHUC_NANG_USER_COMPLETE:
			return {
				...state,
				layTatCaChucNangUserResponse: action.payload,
			};
		case LAY_THONG_BAO_COMPLETE:
			return {
				...state,
				dataNumberNotify: action.payload,
			};
	}
	return state;
}
