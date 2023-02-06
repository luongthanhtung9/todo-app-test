import { takeLatest, put, all, select } from 'redux-saga/effects';
import {
    DS_HSCV_ACTION,
    CT_HSCV_ACTION,
    THONGKE_VANBAN_ACTION,
    DONG_HO_SO_ACTION,
    XOA_LKVB_ACTION
} from '../constants/congviec';
import {
    dsHSCVComplete,
    ctHSCVComplete,
    thongKeVanBanComplete,
    dongHSComplete,
    xoaLKVBComplete
} from '../actions/congviec';
import { fetchPOST, fetchPUT, fetchGET } from '../../connections/connections';
import { ApiResponse } from '@models/ApiResponse';
import { selectToken } from '../selectorConfig';
import { CHECK_CONNECT_INTERNET } from '@commons/messenger';
import { ApiResponseNoData } from '@models/ApiResponseNoData';

function* _dsHSCV(action: any) {
    try {
        const token: string = yield select(selectToken());
        let res: ApiResponse<any> = yield fetchPOST(
            'api/QuanLyHoSoCongViec/TimTheoDieuKien',
            token,
            action.payload,
        );
        yield put(dsHSCVComplete(res));
    } catch (e) {
        yield put(dsHSCVComplete({ message: CHECK_CONNECT_INTERNET }));
    }
}

function* _ctHSCV(action: any) {
    try {
        const token: string = yield select(selectToken());
        let res: ApiResponse<any> = yield fetchGET(
            `api/QuanLyHoSoCongViec/XemChiTiet/${action?.payload?.id}`,
            token,
        );
        yield put(ctHSCVComplete(res));
    } catch (e) {
        yield put(ctHSCVComplete({ success: false }));
    }
}
function* _layThongKeVanBan() {
    try {
        const token: string = yield select(selectToken());
        let res: ApiResponse<any> = yield fetchGET(
            `api/VanBanDen/LayThongKeVanBan`,
            token,
        );
        yield put(thongKeVanBanComplete(res));
    } catch (e) {
        yield put(thongKeVanBanComplete({ success: false }));
    }
}

function* _donghoso(action: any) {
    try {
        const token: string = yield select(selectToken());
        let res: ApiResponseNoData = yield fetchGET(
            `api/QuanLyHoSoCongViec/DongHoSo/${action.payload.id}`,
            token,
        );
        yield put(dongHSComplete(res));
    } catch (e) {
        yield put(dongHSComplete({ success: false }));
    }
}

function* _xoa_lien_ket_van_ban(action: any) {
    try {
        const token: string = yield select(selectToken());
        let res: ApiResponseNoData = yield fetchPOST(
            `api/QuanLyHoSoCongViec/XoaLienKetVanban`,
            token, action.payload
        );
        yield put(xoaLKVBComplete(res));
    } catch (e) {
        yield put(xoaLKVBComplete({ success: false }));
    }
}



export function* watchInitial() {
    yield all([
        takeLatest(DS_HSCV_ACTION, _dsHSCV),
        takeLatest(CT_HSCV_ACTION, _ctHSCV),
        takeLatest(THONGKE_VANBAN_ACTION, _layThongKeVanBan),
        takeLatest(DONG_HO_SO_ACTION, _donghoso),
        takeLatest(XOA_LKVB_ACTION, _xoa_lien_ket_van_ban),
    ]);
}
