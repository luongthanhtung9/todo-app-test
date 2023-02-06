import {takeLatest, put, all, select} from 'redux-saga/effects';
import {
	DS_VBDEN_ACTION,
	CT_VBDEN_ACTION,
	THONG_KE_VBDEN_ACTION,
	TU_CHOI_VB_ACTION,
	THONG_TIN_XL_ACTION,
	THEM_CHUYEN_XL_ACTION,
	UPDATE_CHUYEN_XL_ACTION,
	KET_THUC_VB_ACTION,
	NOI_DUNG_XL_ACTION,
	THONG_TIN_TRA_ACTION,
	TRA_VB_ACTION,
	CHUYEN_BO_SUNG_ACTION,
	THONG_TIN_TRINH_XU_LY_ACTION,
	NGUOI_XU_LY_VBD_ACTION,
	NGUOI_XU_LY_VBD_ACTION_NEW,
	CHUYEN_DON_VI_ACTION,
	CAP_NHAT_THONG_TIN,
	TIEP_NHAN_VAN_BAN,
	DS_VBDEN_ACTION_TRONG_DV,
	LAY_SO_VAN_BAN,
	LAY_TAT_CA_CHUYEN_VIEN,
	CHUYEN_CHUYEN_VIEN,
	TIM_THEO_DIEU_KIEN,
	THEM_LUU_TRU_VAN_BAN,
} from '../constants/vbden';
import {
	dsVBDenComplete,
	ctVBDenComplete,
	thongKeVBDenComplete,
	tuChoiVBComplete,
	thongTinXLComplete,
	themChuyenXLComplete,
	updateChuyenXLComplete,
	ketthucVBComplete,
	noidungXLComplete,
	thongTinTraVBComplete,
	traVBComplete,
	chuyenBoSungComplete,
	thongTinTrinhXLComplete,
	nguoiXLVBDenComplete,
	nguoiXLVBDenCompleteNew,
	chuyenDonViCompelete,
	capNhatThongTinSuccess,
	dsVBDenTrongDvComplete,
	laySoVanBanSuccess,
	tiepNhanVanBanSuccess,
	layTatCaChuyenVienSuccess,
	chuyenChuyenVienSuccess,
	timTheoDieuKienSuccess,
	themLuuTruVanBanSuccess,
} from '../actions/vbden';
import {fetchPOST, fetchGET} from '../../connections/connections';
import {ApiResponse} from '@models/ApiResponse';
import {selectToken} from '../selectorConfig';

function* _dsVBDen(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(
			'api/VanBanDen/DanhSachVanBanDen',
			token,
			action.payload,
		);
		console.log('==>>>> res', res);

		yield put(dsVBDenComplete(res));
	} catch (e) {
		yield put(dsVBDenComplete({message: 'Bạn vui lòng kiểm tra lại kết nối.'}));
	}
}

function* _dsVBDenTrongDv(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(
			'api/VanBanDen/DanhSachVanBanDen',
			token,
			action.payload,
		);
		yield put(dsVBDenTrongDvComplete(res));
	} catch (e) {
		yield put(dsVBDenTrongDvComplete({message: 'Bạn vui lòng kiểm tra lại kết nối.'}));
	}
}

function* _ctVBDen(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchGET(
			`api/VanBanDen/XemChiTiet/${action.payload.id}`,
			token,
		);
		yield put(ctVBDenComplete(res));
	} catch (e) {
		yield put(ctVBDenComplete({message: 'Bạn vui lòng kiểm tra lại kết nối.'}));
	}
}

function* _thongkeVBDen() {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchGET(`api/VanBanDen/LayThongKeVanBan`, token);
		yield put(thongKeVBDenComplete(res));
	} catch (e) {
		yield put(
			thongKeVBDenComplete({success: false, message: 'Bạn vui lòng kiểm tra lại kết nối.'}),
		);
	}
}

function* _tuChoiVB(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(
			`api/VanBanDen/TuChoiVanBan`,
			token,
			action.payload,
		);
		yield put(tuChoiVBComplete(res));
	} catch (e) {
		yield put(tuChoiVBComplete({message: 'Bạn vui lòng kiểm tra lại kết nối.'}));
	}
}

function* _thongtinxuly(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchGET(
			`api/QuyTrinhXuLyVB/LayThongTinXuLy/${action.payload.id}`,
			token,
		);
		yield put(thongTinXLComplete(res));
	} catch (e) {
		yield put(
			thongTinXLComplete({success: false, message: 'Bạn vui lòng kiểm tra lại kết nối.'}),
		);
	}
}

function* _thongtintrinhxuly(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchGET(
			`api/QuyTrinhXuLyVB/ThongTinTrinhXuLyVanBan/${action.payload.id}`,
			token,
		);
		yield put(thongTinTrinhXLComplete(res));
	} catch (e) {
		yield put(
			thongTinTrinhXLComplete({
				success: false,
				message: 'Bạn vui lòng kiểm tra lại kết nối.',
			}),
		);
	}
}

function* _noidungxuly(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchGET(
			`api/VanBanDen/GetNoiDungXuLy`,
			token,
			action.payload,
		);
		yield put(noidungXLComplete(res));
	} catch (e) {
		yield put(
			noidungXLComplete({success: false, message: 'Bạn vui lòng kiểm tra lại kết nối.'}),
		);
	}
}

function* _themchuyenxl(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(
			`api/QuyTrinhXuLyVB/ThemMoi`,
			token,
			action.payload,
		);
		yield put(themChuyenXLComplete(res));
	} catch (e) {
		yield put(
			themChuyenXLComplete({success: false, message: 'Bạn vui lòng kiểm tra lại kết nối.'}),
		);
	}
}

function* _updatechuyenxl(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(
			`api/QuyTrinhXuLyVB/CapNhatThongTin`,
			token,
			action.payload,
		);
		yield put(updateChuyenXLComplete(res));
	} catch (e) {
		yield put(
			updateChuyenXLComplete({success: false, message: 'Bạn vui lòng kiểm tra lại kết nối.'}),
		);
	}
}

function* _ketthucvb(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(
			`api/VanBanDen/KetThucVanBan`,
			token,
			action.payload,
		);
		yield put(ketthucVBComplete(res));
	} catch (e) {
		yield put(ketthucVBComplete({success: false}));
	}
}

function* _thongtintravb(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchGET(
			`api/QuyTrinhXuLyVB/LayThongTinNguoiTraLai/${action.payload.id}`,
			token,
		);
		yield put(thongTinTraVBComplete(res));
	} catch (e) {
		yield put(
			thongTinTraVBComplete({success: false, message: 'Bạn vui lòng kiểm tra lại kết nối.'}),
		);
	}
}

function* _travb(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(
			`api/QuyTrinhXuLyVB/TraLaiVanBan`,
			token,
			action.payload,
		);
		yield put(traVBComplete(res));
	} catch (e) {
		yield put(traVBComplete({success: false, message: 'Bạn vui lòng kiểm tra lại kết nối.'}));
	}
}

function* _chuyenbosung(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(
			`api/VanBanDen/BoSungDonViXuLy`,
			token,
			action.payload,
		);
		yield put(chuyenBoSungComplete(res));
	} catch (e) {
		yield put(
			chuyenBoSungComplete({success: false, message: 'Bạn vui lòng kiểm tra lại kết nối.'}),
		);
	}
}

function* _nguoixulyvbden(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(
			`api/DonVi/LayNguoiXuLyTiepTheoVBDen`,
			token,
			action.payload,
		);
		yield put(nguoiXLVBDenComplete(res));
	} catch (e) {
		yield put(
			nguoiXLVBDenComplete({success: false, message: 'Bạn vui lòng kiểm tra lại kết nối.'}),
		);
	}
}

function* _nguoixulyvbdennew(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(
			`api/QuyTrinhXuLyVB/GetNguoiXuLyTiepTheoVBDen`,
			token,
			action.payload,
		);
		yield put(nguoiXLVBDenCompleteNew(res));
	} catch (e) {
		yield put(
			nguoiXLVBDenCompleteNew({
				success: false,
				message: 'Bạn vui lòng kiểm tra lại kết nối.',
			}),
		);
	}
}

function* _chuyendonvi(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(
			`api/QuyTrinhXuLyVB/ChuyenDonVi`,
			token,
			action.payload,
		);
		yield put(chuyenDonViCompelete(res));
	} catch (e) {
		yield put(
			chuyenDonViCompelete({
				success: false,
				message: 'Bạn vui lòng kiểm tra lại kết nối.',
			}),
		);
	}
}

function* _capNhatThongtin(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(
			`api/VanBanDen/CapNhatThongTin`,
			token,
			action.payload,
		);
		yield put(capNhatThongTinSuccess(res));
	} catch (e) {
		yield put(
			capNhatThongTinSuccess({
				success: false,
				message: 'Bạn vui lòng kiểm tra lại kết nối.',
			}),
		);
	}
}

function* _tiepNhanVanBan(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(
			`api/VanBanDen/TiepNhanVanBan`,
			token,
			action.payload,
		);
		yield put(tiepNhanVanBanSuccess(res));
	} catch (e) {
		yield put(
			tiepNhanVanBanSuccess({
				success: false,
				message: 'Bạn vui lòng kiểm tra lại kết nối.',
			}),
		);
	}
}

function* _laySoVanBan(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(
			`api/SoVanBan/LaySoVanBan`,
			token,
			action.payload,
		);
		yield put(laySoVanBanSuccess(res));
	} catch (e) {
		yield put(
			laySoVanBanSuccess({
				success: false,
				message: 'Bạn vui lòng kiểm tra lại kết nối.',
			}),
		);
	}
}

function* _layTatCaChuyenVien(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchGET(
			`api/NguoiDung/LayTatCaChuyenVien`,
			token,
			action.payload,
		);
		yield put(layTatCaChuyenVienSuccess(res));
	} catch (e) {
		yield put(
			layTatCaChuyenVienSuccess({
				success: false,
				message: 'Bạn vui lòng kiểm tra lại kết nối.',
			}),
		);
	}
}

function* _chuyenChuyenVien(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(
			`api/QuyTrinhXuLyVB/ChuyenChuyenVien`,
			token,
			action.payload,
		);
		yield put(chuyenChuyenVienSuccess(res));
	} catch (e) {
		yield put(
			chuyenChuyenVienSuccess({
				success: false,
				message: 'Bạn vui lòng kiểm tra lại kết nối.',
			}),
		);
	}
}

function* _timTheoDieuKien(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(
			`api/QuanLyHoSoCongViec/TimTheoDieuKien`,
			token,
			action.payload,
		);
		yield put(timTheoDieuKienSuccess(res));
	} catch (e) {
		yield put(
			timTheoDieuKienSuccess({
				success: false,
				message: 'Bạn vui lòng kiểm tra lại kết nối.',
			}),
		);
	}
}

function* _themLuuTruVanBan(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(
			`api/QuanLyHoSoCongViec/ThemLuuTruVanBan`,
			token,
			action.payload,
		);
		yield put(themLuuTruVanBanSuccess(res));
	} catch (e) {
		yield put(
			themLuuTruVanBanSuccess({
				success: false,
				message: 'Bạn vui lòng kiểm tra lại kết nối.',
			}),
		);
	}
}

export function* watchInitial() {
	yield all([
		takeLatest(DS_VBDEN_ACTION, _dsVBDen),
		takeLatest(DS_VBDEN_ACTION_TRONG_DV, _dsVBDenTrongDv),
		takeLatest(CT_VBDEN_ACTION, _ctVBDen),
		takeLatest(THONG_KE_VBDEN_ACTION, _thongkeVBDen),
		takeLatest(TU_CHOI_VB_ACTION, _tuChoiVB),
		takeLatest(THONG_TIN_XL_ACTION, _thongtinxuly),
		takeLatest(NOI_DUNG_XL_ACTION, _noidungxuly),
		takeLatest(THEM_CHUYEN_XL_ACTION, _themchuyenxl),
		takeLatest(UPDATE_CHUYEN_XL_ACTION, _updatechuyenxl),
		takeLatest(KET_THUC_VB_ACTION, _ketthucvb),
		takeLatest(THONG_TIN_TRA_ACTION, _thongtintravb),
		takeLatest(TRA_VB_ACTION, _travb),
		takeLatest(CHUYEN_BO_SUNG_ACTION, _chuyenbosung),
		takeLatest(THONG_TIN_TRINH_XU_LY_ACTION, _thongtintrinhxuly),
		takeLatest(NGUOI_XU_LY_VBD_ACTION, _nguoixulyvbden),
		takeLatest(NGUOI_XU_LY_VBD_ACTION_NEW, _nguoixulyvbdennew),
		takeLatest(CHUYEN_DON_VI_ACTION, _chuyendonvi),
		takeLatest(CAP_NHAT_THONG_TIN, _capNhatThongtin),
		takeLatest(TIEP_NHAN_VAN_BAN, _tiepNhanVanBan),
		takeLatest(LAY_SO_VAN_BAN, _laySoVanBan),
		takeLatest(LAY_TAT_CA_CHUYEN_VIEN, _layTatCaChuyenVien),
		takeLatest(CHUYEN_CHUYEN_VIEN, _chuyenChuyenVien),
		takeLatest(TIM_THEO_DIEU_KIEN, _timTheoDieuKien),
		takeLatest(THEM_LUU_TRU_VAN_BAN, _themLuuTruVanBan),
	]);
}
