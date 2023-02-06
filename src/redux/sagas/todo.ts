import {takeLatest, put, all, select} from 'redux-saga/effects';
import {
	GET_VERSION_ACTION,
	LOGIN_ACTION,
	LAY_TAT_CA_CHUC_NANG_USER_ACTION,
} from '../constants/authen';
import {loginComplete, layTatCaChucNangUserComplete, getVersionComplete} from '../actions/authen';
import {fetchPOST, fetchGET} from '../../connections/connections';
import {ApiResponse} from '@models/ApiResponse';
import {selectToken} from '../selectorConfig';

// function* _getversion() {
// 	try {
// 		const res: {
// 			mobileVersion: string;
// 			review: boolean;
// 		} = yield fetchGET('api/MobileApp/GetVersion');
// 		yield put(getVersionComplete(res));
// 	} catch (e) {
// 		yield put(getVersionComplete({success: false}));
// 	}
// }

// function* _login(action: any) {
// 	try {
// 		const res: ApiResponse<{
// 			token?: string;
// 		}> = yield fetchPOST('api/Account/DangNhap', undefined, action.payload, true);
// 		yield put(loginComplete(res));
// 	} catch (e) {
// 		yield put(loginComplete({success: false}));
// 	}
// }

// function* _layTatCaChucNangUser() {
// 	try {
// 		const token: string = yield select(selectToken());
// 		const res: ApiResponse<any> = yield fetchGET('api/DmQuyen/LayTatCaChucNangUser', token);
// 		yield put(layTatCaChucNangUserComplete(res));
// 	} catch (e) {
// 		yield put(layTatCaChucNangUserComplete({success: false}));
// 	}
// }

export function* watchInitial() {
	yield all([
		// takeLatest(GET_VERSION_ACTION, _getversion),
		// takeLatest(LOGIN_ACTION, _login),
		// takeLatest(LAY_TAT_CA_CHUC_NANG_USER_ACTION, _layTatCaChucNangUser),
	]);
}
