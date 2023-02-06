import {takeLatest, put, all, select} from 'redux-saga/effects';
import {
	DS_TOTRINH_ACTION,
	LICH_SU_XU_LY_ACTION,
	KIEM_TRA_YKIEN_ACTION,
	DUYET_TOTRINH_ACTION,
	TRINH_XL_ACTION,
	TO_TRINH_INIT_ACTION,
	CHI_TIET_TO_TRINH_ACTION,
	THONG_KE_TO_TRINH_ACTION,
	TIM_LANH_DAO_KY_THAY_ACTION,
	CHUYEN_KY_THAY_ACTION,
	TRA_LOI_VAN_BAN_ACTION,
	CHUYEN_CAP_SO_ACTION,
} from '../constants/totrinh';
import {
	dsToTrinhComplete,
	lichSuXuLyComplete,
	kiemTraYKienComplete,
	duyetToTrinhComplete,
	trinhXuLyComplete,
	toTrinhInitComplete,
	chiTietToTrinhComplete,
	thongKeToTrinhComplete,
	timLanhDaoKyThayComplete,
	chuyenKyThayComplete,
	traLoiVanBanCompleteToTrinh,
	cCSCompleteToTrinh,
} from '../actions/totrinh';
import {fetchPOST, fetchGET} from '../../connections/connections';
import {ApiResponse} from '@models/ApiResponse';
import {selectToken} from '../selectorConfig';
import {VanBan} from '@models/VanBan';
import {LSXL} from '@models/LSXL';

function* _dsToTrinh(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<Array<VanBan>> = yield fetchPOST(
			'api/ToTrinh/DanhSachToTrinh',
			token,
			action.payload,
		);
		yield put(dsToTrinhComplete(res));
	} catch (e) {
		yield put(dsToTrinhComplete({success: false}));
	}
}

function* _lichsuxuly(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<Array<LSXL>> = yield fetchPOST(
			'api/ToTrinh/LayLichSuXuLy',
			token,
			action.payload,
		);
		yield put(lichSuXuLyComplete(res));
	} catch (e) {
		yield put(lichSuXuLyComplete({success: false}));
	}
}

function* _kiemtraykien(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(
			'api/ToTrinh/KiemTraCapPhoChoYKien',
			token,
			action.payload,
		);
		yield put(kiemTraYKienComplete(res));
	} catch (e) {
		yield put(kiemTraYKienComplete({success: false}));
	}
}

function* _duyettotrinh(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST('api/ToTrinh/KyDuyet', token, action.payload);
		yield put(duyetToTrinhComplete(res));
	} catch (e) {
		yield put(duyetToTrinhComplete({success: false}));
	}
}

function* _trinhXuLy(action: any) {
	try {
		const token: string = yield select(selectToken());
		console.log('==>><<==', token);
		const res: ApiResponse<any> = yield fetchPOST(
			`api/ToTrinh/TrinhXuLy`,
			token,
			action.payload,
		);
		yield put(trinhXuLyComplete(res));
	} catch (e) {
		yield put(trinhXuLyComplete({success: false}));
	}
}

function* _toTrinhInit(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(
			`api/ToTrinh/ToTrinhInit`,
			token,
			action.payload,
		);
		yield put(toTrinhInitComplete(res));
	} catch (e) {
		yield put(toTrinhInitComplete({success: false}));
	}
}

function* _chiTietToTrinh(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchGET(
			`api/ToTrinh/XemChiTiet/${action.payload}`,
			token,
		);
		yield put(chiTietToTrinhComplete(res));
	} catch (e) {
		yield put(chiTietToTrinhComplete({success: false}));
	}
}

function* _thongkeToTrinh() {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchGET(`api/ToTrinh/LayThongKeVanBan`, token);
		yield put(thongKeToTrinhComplete(res));
	} catch (e) {
		yield put(
			thongKeToTrinhComplete({success: false, message: 'Bạn vui lòng kiểm tra lại kết nối.'}),
		);
	}
}

function* _timLanhDaoKyThay() {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchGET(`api/NguoiDung/TimLanhDaoKyThay`, token);
		yield put(timLanhDaoKyThayComplete(res));
	} catch (e) {
		yield put(
			timLanhDaoKyThayComplete({
				success: false,
				message: 'Bạn vui lòng kiểm tra lại kết nối.',
			}),
		);
	}
}

function* _chuyenKyThay(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(
			`api/ToTrinh/ChuyenKyThay`,
			token,
			action.payload,
		);
		yield put(chuyenKyThayComplete(res));
	} catch (e) {
		yield put(
			chuyenKyThayComplete({
				success: false,
				message: 'Bạn vui lòng kiểm tra lại kết nối.',
			}),
		);
	}
}

function* _traloitotrinh(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(
			'api/ToTrinh/TraLaiVanBan',
			token,
			action.payload,
		);
		yield put(traLoiVanBanCompleteToTrinh(res));
	} catch (e) {
		yield put(traLoiVanBanCompleteToTrinh({success: false}));
	}
}

function* _chuyencapso(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(
			'api/ToTrinh/ChuyenCapSoToTrinh',
			token,
			action.payload,
		);
		yield put(cCSCompleteToTrinh(res));
	} catch (e) {
		yield put(cCSCompleteToTrinh({success: false}));
	}
}

export function* watchInitial() {
	yield all([
		takeLatest(DS_TOTRINH_ACTION, _dsToTrinh),
		takeLatest(LICH_SU_XU_LY_ACTION, _lichsuxuly),
		takeLatest(KIEM_TRA_YKIEN_ACTION, _kiemtraykien),
		takeLatest(DUYET_TOTRINH_ACTION, _duyettotrinh),
		takeLatest(TRINH_XL_ACTION, _trinhXuLy),
		takeLatest(TO_TRINH_INIT_ACTION, _toTrinhInit),
		takeLatest(CHI_TIET_TO_TRINH_ACTION, _chiTietToTrinh),
		takeLatest(THONG_KE_TO_TRINH_ACTION, _thongkeToTrinh),
		takeLatest(TIM_LANH_DAO_KY_THAY_ACTION, _timLanhDaoKyThay),
		takeLatest(CHUYEN_KY_THAY_ACTION, _chuyenKyThay),
		takeLatest(TRA_LOI_VAN_BAN_ACTION, _traloitotrinh),
		takeLatest(CHUYEN_CAP_SO_ACTION, _chuyencapso),
	]);
}
