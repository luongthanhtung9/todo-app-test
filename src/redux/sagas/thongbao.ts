import {takeLatest, put, all, select} from 'redux-saga/effects';
import {fetchGET, fetchPOST} from '../../connections/connections';
import {ApiResponse} from '@models/ApiResponse';
import {selectToken} from '../selectorConfig';
import {
	CONG_VIEC_CUA_TOI,
	DANH_SACH_THONG_BAO,
	DOC_THONG_BAO,
	LAY_THONG_BAO,
} from '@redux/constants/thongbao';
import {
	congViecCuaToiComplete,
	docThongBaoComplete,
	layDanhSachThongBaoComplete,
	laySoThongBaoThanhCong,
} from '@redux/actions/thongbao';

function* _laySoThongBao() {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchGET('api/Notification/ThongBaoMoi', token);
		console.log('===>>>> res get number payload', res);

		yield put(laySoThongBaoThanhCong(res));
	} catch (e) {
		yield put(laySoThongBaoThanhCong({success: false}));
	}
}

function* _layDanhSachThongBao(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(
			'api/Notification/TimTheoDieuKien',
			token,
			action.payload,
		);
		yield put(layDanhSachThongBaoComplete(res));
	} catch (e) {
		yield put(layDanhSachThongBaoComplete({success: false}));
	}
}

function* _congViecCuaToi(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchGET(
			'api/TrangChu/CongViecCuaToi',
			token,
			action.payload,
		);
		yield put(congViecCuaToiComplete(res));
	} catch (e) {
		yield put(congViecCuaToiComplete({success: false}));
	}
}

function* _docThongBao(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchGET(
			`api/Notification/DocThognBao/${action.payload}`,
			token,
		);
		yield put(docThongBaoComplete(res));
	} catch (e) {
		yield put(docThongBaoComplete({success: false}));
	}
}

// http://14.248.82.147:81/
export function* watchInitial() {
	yield all([
		takeLatest(LAY_THONG_BAO, _laySoThongBao),
		takeLatest(DANH_SACH_THONG_BAO, _layDanhSachThongBao),
		takeLatest(CONG_VIEC_CUA_TOI, _congViecCuaToi),
		takeLatest(DOC_THONG_BAO, _docThongBao),
	]);
}
