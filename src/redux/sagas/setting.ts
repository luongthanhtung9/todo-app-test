import {takeLatest, put, all, select} from 'redux-saga/effects';
import {
	DS_LOAI_VB_ACTION,
	DS_DO_KHAN_ACTION,
	LAY_VAI_TRO_ACTION,
	CHUYEN_VAI_TRO_ACTION,
	LAY_QUYEN_CHUC_NANG_ACTION,
} from '../constants/setting';
import {
	dsLoaiVBComplete,
	dsDoKhanComplete,
	layVaiTroComplete,
	chuyenVaiTroComplete,
	layQuyenChucNangComplete,
} from '../actions/setting';
import {fetchPOST, fetchGET} from '../../connections/connections';
import {ApiResponse} from '@models/ApiResponse';
import {selectToken} from '../selectorConfig';

function* _dsLoaiVB(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchGET(`api/LoaiVanBan/LayTatca`, token);
		yield put(dsLoaiVBComplete(res));
	} catch (e) {
		yield put(dsLoaiVBComplete({message: 'Bạn vui lòng kiểm tra lại kết nối.'}));
	}
}

function* _dsDoKhan(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchGET(
			`api/InitApp/GetOptionalSelectList?key=dokhan`,
			token,
		);
		yield put(dsDoKhanComplete(res));
	} catch (e) {
		yield put(dsDoKhanComplete({message: 'Bạn vui lòng kiểm tra lại kết nối.'}));
	}
}

function* _layvaitro() {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchGET(`api/Account/LayTatCaVaiTro`, token, {}, true);
		yield put(layVaiTroComplete(res));
	} catch (e) {
		yield put(layVaiTroComplete({success: false}));
	}
}

function* _chuyenvaitro(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(
			`api/Account/ChuyenVaiTro/${action.payload.idVaiTro}`,
			token,
			{},
			true,
		);
		yield put(chuyenVaiTroComplete(res));
	} catch (e) {
		yield put(chuyenVaiTroComplete({success: false}));
	}
}

function* _layquyenchucnang(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchGET(
			`api/DmQuyen/LayQuyenChucNangUser`,
			token,
			action.payload,
		);
		yield put(layQuyenChucNangComplete(res));
	} catch (e) {
		yield put(layQuyenChucNangComplete({success: false}));
	}
}

export function* watchInitial() {
	yield all([
		takeLatest(DS_LOAI_VB_ACTION, _dsLoaiVB),
		takeLatest(DS_DO_KHAN_ACTION, _dsDoKhan),
		takeLatest(LAY_VAI_TRO_ACTION, _layvaitro),
		takeLatest(CHUYEN_VAI_TRO_ACTION, _chuyenvaitro),
		takeLatest(LAY_QUYEN_CHUC_NANG_ACTION, _layquyenchucnang),
	]);
}
