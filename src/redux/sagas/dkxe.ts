import {takeLatest, put, all, select} from 'redux-saga/effects';

import {fetchPOST, fetchGET} from '../../connections/connections';
import {ApiResponse} from '@models/ApiResponse';
import {selectToken} from '../selectorConfig';
import {
	actionDkyXeComplete,
	ctDangKyXeComplete,
	getAllLeaderComplete,
	updateLichXeComplete,
} from '@redux/actions/dkxe';
import {
	CT_DK_XE_ACTION,
	DK_XE_ACTION,
	DUYET_DANG_KY_ACTION,
	GET_ALL_LEADER_ACTION,
} from '@redux/constants/dkxe';

function* _laydangkyxe(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(
			'api/LichXe/TimTheoDieuKien',
			token,
			action.payload,
		);
		yield put(actionDkyXeComplete(res, action.payload.status));
	} catch (e) {
		yield put(actionDkyXeComplete({success: false}));
	}
}
function* _chiTietDangKyXe(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchGET(
			`api/LichXe/XemChiTiet/${action.payload}`,
			token,
		);
		yield put(ctDangKyXeComplete(res));
	} catch (e) {
		yield put(ctDangKyXeComplete({success: false}));
	}
}

function* _getAllLeader(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchGET(
			`api/NguoiDung/GetAllLeader/${action.payload}`,
			token,
		);
		yield put(getAllLeaderComplete(res));
	} catch (e) {
		yield put(getAllLeaderComplete({success: false}));
	}
}

function* _updateLichXe(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(
			`api/LichXe/CapNhatThongTin`,
			token,
			action.payload,
		);
		yield put(updateLichXeComplete(res));
	} catch (e) {
		yield put(updateLichXeComplete({success: false}));
	}
}

export function* watchInitial() {
	yield all([
		takeLatest(DK_XE_ACTION, _laydangkyxe),
		takeLatest(CT_DK_XE_ACTION, _chiTietDangKyXe),
		takeLatest(GET_ALL_LEADER_ACTION, _getAllLeader),
		takeLatest(DUYET_DANG_KY_ACTION, _updateLichXe),
	]);
}
