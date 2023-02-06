import {takeLatest, put, all, select} from 'redux-saga/effects';
import {
	DS_GIAOVIEC_ACTION,
	CT_GIAOVIEC_ACTION,
	LICH_SU_XU_LY_ACTION,
	CHUYEN_XU_LY_GV_ACTION,
	KT_GIAO_VIEC_ACTION,
	XU_LY_CV_ACTION,
	LAY_DON_VI_GIAO_VIEC_ACTION,
	TC_GIAO_VIEC_ACTION,
	CTVB_ACTION,
} from '../constants/giaoviec';
import {
	dsGiaoViecComplete,
	ctGiaoViecComplete,
	lichSuXLGVComplete,
	chuyenXuLyGVComplete,
	ktPhieuGiaoViecComplete,
	xuLyCongViecComplete,
	layDVGiaoViecComplete,
	tcGiaoViecComplete,
	CTVBDinhKemComplete,
} from '../actions/giaoviec';
import {fetchPOST, fetchGET} from '../../connections/connections';
import {ApiResponse} from '@models/ApiResponse';
import {selectToken} from '../selectorConfig';
import {VanBan} from '@models/VanBan';
import {LSXL} from '@models/LSXL';

function* _dsphieugiaoviec(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<Array<VanBan>> = yield fetchPOST(
			'api/QuanLyCongViec/TimTheoDieuKien',
			token,
			action.payload,
		);
		yield put(dsGiaoViecComplete(res));
	} catch (e) {
		yield put(dsGiaoViecComplete({success: false}));
	}
}

function* _ctphieugiaoviec(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<VanBan> = yield fetchGET(
			`api/QuanLyCongViec/XemChiTiet/${action.payload.id}`,
			token,
		);
		yield put(ctGiaoViecComplete(res));
	} catch (e) {
		yield put(ctGiaoViecComplete({success: false}));
	}
}

function* _lichsuxuly(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<Array<LSXL>> = yield fetchPOST(
			'api/QuanLyCongViec/LayLichSuXuLy',
			token,
			action.payload,
		);
		yield put(lichSuXLGVComplete(res));
	} catch (e) {
		yield put(lichSuXLGVComplete({success: false}));
	}
}

function* _chuyenxlgv(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(
			'api/QuanLyCongViec/ChuyenXuLy',
			token,
			action.payload,
		);
		yield put(chuyenXuLyGVComplete(res));
	} catch (e) {
		yield put(chuyenXuLyGVComplete({success: false}));
	}
}

function* _ktgiaoviec(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(
			'api/QuanLyCongViec/KetThucCongViec',
			token,
			action.payload,
		);
		yield put(ktPhieuGiaoViecComplete(res));
	} catch (e) {
		yield put(ktPhieuGiaoViecComplete({success: false}));
	}
}

function* _xulycongviec(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(
			'api/QuanLyCongViec/XuLyCongViec',
			token,
			action.payload,
		);
		yield put(xuLyCongViecComplete(res));
	} catch (e) {
		yield put(xuLyCongViecComplete({success: false}));
	}
}

function* _laydonvigiaoviec(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchGET(
			'api/QuanLyCongViec/LayDSNguoiGiaoViec',
			token,
			action.payload,
		);
		yield put(layDVGiaoViecComplete(res));
	} catch (e) {
		yield put(layDVGiaoViecComplete({success: false}));
	}
}

function* _tuchoigiaoviec(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(
			'api/QuanLyCongViec/TuChoi',
			token,
			action.payload,
		);
		yield put(tcGiaoViecComplete(res));
	} catch (e) {
		yield put(tcGiaoViecComplete({success: false}));
	}
}

function* _CTVBDinhKem(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchGET(
			`api/VanBanDi/TimTheoId/${action.payload}`,
			token,
		);
		yield put(CTVBDinhKemComplete(res));
	} catch (e) {
		yield put(CTVBDinhKemComplete({success: false}));
	}
}

export function* watchInitial() {
	yield all([
		takeLatest(DS_GIAOVIEC_ACTION, _dsphieugiaoviec),
		takeLatest(CT_GIAOVIEC_ACTION, _ctphieugiaoviec),
		takeLatest(LICH_SU_XU_LY_ACTION, _lichsuxuly),
		takeLatest(CHUYEN_XU_LY_GV_ACTION, _chuyenxlgv),
		takeLatest(KT_GIAO_VIEC_ACTION, _ktgiaoviec),
		takeLatest(XU_LY_CV_ACTION, _xulycongviec),
		takeLatest(LAY_DON_VI_GIAO_VIEC_ACTION, _laydonvigiaoviec),
		takeLatest(TC_GIAO_VIEC_ACTION, _tuchoigiaoviec),
		takeLatest(CTVB_ACTION, _CTVBDinhKem),
	]);
}
