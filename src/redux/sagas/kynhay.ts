import {ApiResponse} from '@models/ApiResponse';
import {kyNhayComplete} from '@redux/actions/kynhay';
import {KY_NHAY_ACTION} from '@redux/constants/kynhay';
import {selectToken} from '@redux/selectorConfig';
import {select, put, all, takeLatest} from 'redux-saga/effects';
import {fetchPOST} from 'src/connections/connections';

// LoaiVanBan: 1  văn bản đến, 3 văn bản đi, 4 tờ trình
function* _kyNhayToTrinh(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(
			`api/QuanLyFilesServer/SignDocument`,
			token,
			action.payload,
		);
		yield put(kyNhayComplete(res));
	} catch (e) {
		yield put(kyNhayComplete({success: false}));
	}
}

export function* watchInitial() {
	yield all([takeLatest(KY_NHAY_ACTION, _kyNhayToTrinh)]);
}
