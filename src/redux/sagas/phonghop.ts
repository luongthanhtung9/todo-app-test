import {takeLatest, put, all, select} from 'redux-saga/effects';
import {fetchPOST, fetchGET} from '../../connections/connections';
import {ApiResponse} from '@models/ApiResponse';
import {selectToken} from '../selectorConfig';
import {
	actionPhongHopComplete,
	ctPhongHopComplete,
	danhMucChungComplete,
	getAllRoomComplete,
	getAllUserComplete,
} from '@redux/actions/phonghop';
import {
	CT_PHONG_HOP_ACTION,
	DANH_MUC_CHUNG_ACTION,
	GET_ALL_ROOM_ACTION,
	GET_ALL_USER_ACTION,
	PHONG_HOP_ACTION,
} from '@redux/constants/phonghop';

function* _layDanhSachPhongHop(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(
			'api/LichPhongHop/LichPhongHop',
			token,
			action.payload,
		);
		yield put(actionPhongHopComplete(res));
	} catch (e) {
		yield put(actionPhongHopComplete({success: false}));
	}
}
function* _chiTietPhongHop(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchGET(
			`api/LichPhongHop/TimTheoId/${action.payload}`,
			token,
		);
		yield put(ctPhongHopComplete(res));
	} catch (e) {
		yield put(ctPhongHopComplete({success: false}));
	}
}

function* _getAllUser() {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchGET(`api/NguoiDung/GetAllUser`, token);
		yield put(getAllUserComplete(res));
	} catch (e) {
		yield put(getAllUserComplete({success: false}));
	}
}

function* _danhMucChung(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchGET(
			`api/DanhMucChung/LayTatCaTheoNhom`,
			token,
			action.payload,
		);
		yield put(danhMucChungComplete(res));
	} catch (e) {
		yield put(danhMucChungComplete({success: false}));
	}
}

function* _getAllRoom(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(
			`api/PhongHop/TimTheoDieuKien`,
			token,
			action.payload,
		);
		yield put(getAllRoomComplete(res));
	} catch (e) {
		yield put(getAllRoomComplete({success: false}));
	}
}

export function* watchInitial() {
	yield all([
		takeLatest(PHONG_HOP_ACTION, _layDanhSachPhongHop),
		takeLatest(CT_PHONG_HOP_ACTION, _chiTietPhongHop),
		takeLatest(GET_ALL_USER_ACTION, _getAllUser),
		takeLatest(DANH_MUC_CHUNG_ACTION, _danhMucChung),
		takeLatest(GET_ALL_ROOM_ACTION, _getAllRoom),
	]);
}
