import {takeLatest, put, all, select} from 'redux-saga/effects';
import {
	DS_VBDI_ACTION,
	CT_VBDI_ACTION,
	TRINH_XL_ACTION,
	LICH_SU_XU_LY_ACTION,
	KIEM_TRA_Y_KIEN_VBDI_ACTION,
	DUYET_VAN_BAN_DI_ACTION,
	TRA_LOI_VAN_BAN_ACTION,
	THONG_TIN_TRA_ACTION,
	THU_HOI_VAN_BAN_DI_ACTION,
	DANH_SACH_LANH_DAO_TRINH_ACTION,
	THONG_KE_VBDI_ACTION,
	CAP_SO_ACTION,
	DS_PHAT_HANH_VBDI_ACTION,
	PHAT_HANH_ACTION,
	THEM_MOI_ACTION,
	VAN_BAN_DI_INIT_ACTION,
	LAY_SO_VB_ACTION,
	CAP_SO_VT_ACTION,
	DANH_SACH_HO_SO_CV_ACTION,
} from '../constants/vbdi';
import {
	dsVBDiComplete,
	ctVBDiComplete,
	trinhXuLyComplete,
	lichSuXuLyCompleteVBDI,
	kiemTraYKienVBDIComplete,
	duyetVanBanDiComplete,
	thongTinTraVBDIComplete,
	traLoiVanBanCompleteVBDI,
	thuhoiVBDiComplete,
	LayDanhSachLanhDaoTrinhComplete,
	thongKeVBDiComplete,
	capSoVBDIComplete,
	dsPhatHanhVBDiComplete,
	phatHanhVBDIComplete,
	VBDIinitComplete,
	themMoiVBDIComplete,
	LaySoVBComplete,
	chuyenCapSoVBVTComplete,
	danhSachHSCVComplete,
} from '../actions/vbdi';
import {fetchPOST, fetchGET} from '../../connections/connections';
import {ApiResponse} from '@models/ApiResponse';
import {selectToken} from '../selectorConfig';
import {CHECK_CONNECT_INTERNET} from '@commons/messenger';
import {LSXL} from '@models/LSXL';
import {ApiResponseNoData} from '@models/ApiResponseNoData';

function* _dsVBDi(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST('api/DuThao/DanhSach', token, action.payload);
		yield put(dsVBDiComplete(res));
	} catch (e) {
		yield put(dsVBDiComplete({message: CHECK_CONNECT_INTERNET}));
	}
}

function* _ctVBDi(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchGET(
			`api/VanBanDi/XemChiTiet/${action?.payload?.id}`,
			token,
		);
		yield put(ctVBDiComplete(res));
	} catch (e) {
		yield put(ctVBDiComplete({success: false}));
	}
}

function* _trinhXuLy(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(
			`api/VanBanDi/TrinhXuLy`,
			token,
			action.payload,
		);
		yield put(trinhXuLyComplete(res));
	} catch (e) {
		yield put(trinhXuLyComplete({success: false}));
	}
}

function* _lichsuxuly(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<Array<LSXL>> = yield fetchPOST(
			'api/DuThao/LayLichSuXuLy',
			token,
			action.payload,
		);
		yield put(lichSuXuLyCompleteVBDI(res));
	} catch (e) {
		yield put(lichSuXuLyCompleteVBDI({success: false}));
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
		yield put(kiemTraYKienVBDIComplete(res));
	} catch (e) {
		yield put(kiemTraYKienVBDIComplete({success: false}));
	}
}

function* _traloivanbandi(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(
			'api/VanBanDi/TraLaiVanBan',
			token,
			action.payload,
		);
		yield put(traLoiVanBanCompleteVBDI(res));
	} catch (e) {
		yield put(traLoiVanBanCompleteVBDI({success: false}));
	}
}

function* _duyettotrinh(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST('api/DuThao/KyDuyet', token, action.payload);
		yield put(duyetVanBanDiComplete(res));
	} catch (e) {
		yield put(duyetVanBanDiComplete({success: false}));
	}
}

function* _thongtintravb(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchGET(
			`api/VanBanDi/LayThongTinNguoiTraLai/${action.payload.id}`,
			token,
		);
		yield put(thongTinTraVBDIComplete(res));
	} catch (e) {
		yield put(
			thongTinTraVBDIComplete({
				success: false,
				message: 'Bạn vui lòng kiểm tra lại kết nối.',
			}),
		);
	}
}

function* _thuhoivb(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponseNoData = yield fetchPOST(
			`api/VanBanDi/ThuHoiVanBan`,
			token,
			action.payload,
		);
		yield put(thuhoiVBDiComplete(res));
	} catch (e) {
		yield put(
			thuhoiVBDiComplete({success: false, message: 'Bạn vui lòng kiểm tra lại kết nối.'}),
		);
	}
}

function* _layDanhSachLanhDaoTrinh(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponseNoData = yield fetchPOST(
			`api/VanBanDi/LayDanhSachLanhDaoTrinh`,
			token,
			action.payload,
		);
		yield put(LayDanhSachLanhDaoTrinhComplete(res));
	} catch (e) {
		yield put(
			LayDanhSachLanhDaoTrinhComplete({
				success: false,
				message: 'Bạn vui lòng kiểm tra lại kết nối.',
			}),
		);
	}
}

function* _thongkeVBDi() {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchGET(`api/DuThao/LayThongKeVanBan`, token);
		yield put(thongKeVBDiComplete(res));
	} catch (e) {
		yield put(
			thongKeVBDiComplete({success: false, message: 'Bạn vui lòng kiểm tra lại kết nối.'}),
		);
	}
}

function* _capSoVBDi(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(
			`api/DuThao/CapNhatThongTin`,
			token,
			action.payload,
		);
		yield put(capSoVBDIComplete(res));
	} catch (e) {
		yield put(
			capSoVBDIComplete({success: false, message: 'Bạn vui lòng kiểm tra lại kết nối.'}),
		);
	}
}

function* _phatHanhVBDi(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(
			`api/DuThao/PhatHanhVanBan`,
			token,
			action.payload,
		);
		yield put(phatHanhVBDIComplete(res));
	} catch (e) {
		yield put(
			phatHanhVBDIComplete({success: false, message: 'Bạn vui lòng kiểm tra lại kết nối.'}),
		);
	}
}

function* _themMoi(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(`api/Logging/ThemMoi`, token, action.payload);
		yield put(themMoiVBDIComplete(res));
	} catch (e) {
		yield put(
			themMoiVBDIComplete({success: false, message: 'Bạn vui lòng kiểm tra lại kết nối.'}),
		);
	}
}

function* _vanbandiInit(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(
			`api/DuThao/VanBanDiInit`,
			token,
			action.payload,
		);
		yield put(VBDIinitComplete(res));
	} catch (e) {
		yield put(
			VBDIinitComplete({success: false, message: 'Bạn vui lòng kiểm tra lại kết nối.'}),
		);
	}
}

function* laysoVB(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(
			`api/SoVanBan/LaySoVanBan`,
			token,
			action.payload,
		);
		yield put(LaySoVBComplete(res));
	} catch (e) {
		yield put(LaySoVBComplete({success: false, message: 'Bạn vui lòng kiểm tra lại kết nối.'}));
	}
}

function* _dsPhatHanhVBDi(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(
			'api/DuThao/DanhSachLichSuPhatHanh',
			token,
			action.payload,
		);
		yield put(dsPhatHanhVBDiComplete(res));
	} catch (e) {
		yield put(dsPhatHanhVBDiComplete({message: CHECK_CONNECT_INTERNET}));
	}
}

function* _chuyenCapSoVBDiVT(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(
			'api/DuThao/ChuyenCapSoVanThu',
			token,
			action.payload,
		);
		yield put(chuyenCapSoVBVTComplete(res));
	} catch (e) {
		yield put(chuyenCapSoVBVTComplete({message: CHECK_CONNECT_INTERNET}));
	}
}

function* _dsHSCV(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(
			'api/QuanLyHoSoCongViec/TimTheoDieuKien',
			token,
			action.payload,
		);
		yield put(danhSachHSCVComplete(res));
	} catch (e) {
		yield put(danhSachHSCVComplete({message: CHECK_CONNECT_INTERNET}));
	}
}

export function* watchInitial() {
	yield all([
		takeLatest(DS_VBDI_ACTION, _dsVBDi),
		takeLatest(CT_VBDI_ACTION, _ctVBDi),
		takeLatest(TRINH_XL_ACTION, _trinhXuLy),
		takeLatest(LICH_SU_XU_LY_ACTION, _lichsuxuly),
		takeLatest(KIEM_TRA_Y_KIEN_VBDI_ACTION, _kiemtraykien),
		takeLatest(DUYET_VAN_BAN_DI_ACTION, _duyettotrinh),
		takeLatest(TRA_LOI_VAN_BAN_ACTION, _traloivanbandi),
		takeLatest(THONG_TIN_TRA_ACTION, _thongtintravb),
		takeLatest(THU_HOI_VAN_BAN_DI_ACTION, _thuhoivb),
		takeLatest(DANH_SACH_LANH_DAO_TRINH_ACTION, _layDanhSachLanhDaoTrinh),
		takeLatest(THONG_KE_VBDI_ACTION, _thongkeVBDi),
		takeLatest(CAP_SO_ACTION, _capSoVBDi),
		takeLatest(DS_PHAT_HANH_VBDI_ACTION, _dsPhatHanhVBDi),
		takeLatest(PHAT_HANH_ACTION, _phatHanhVBDi),
		takeLatest(THEM_MOI_ACTION, _themMoi),
		takeLatest(VAN_BAN_DI_INIT_ACTION, _vanbandiInit),
		takeLatest(LAY_SO_VB_ACTION, laysoVB),
		takeLatest(CAP_SO_VT_ACTION, _chuyenCapSoVBDiVT),
		takeLatest(DANH_SACH_HO_SO_CV_ACTION, _dsHSCV),
	]);
}
