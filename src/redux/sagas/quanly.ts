import {takeLatest, put, all, select} from 'redux-saga/effects';
import {
	LAY_FILE_DINH_KEM_ACTION,
	LAY_THONG_TIN_FILE_ACTION,
	LAY_LANH_DAO_DE_XUAT_ACTION,
	LAY_TAT_CA_SO_ACTION,
	LAY_TAT_CA_FILTER_TREE_ACTION,
	LAY_TAT_CA_DON_VI_ACTION,
	GET_ALL_LEADER_ACTION,
	LSXL_VBD_ACTION,
	LOAI_VB_ACTION,
	LAY_LANH_DAO_DON_VI_ACTION,
	DANHSACH_LIENKET_ACTION,
	LAY_DON_VI_DE_XUAT_ACTION,
	KIEM_TRA_NGUOI_DUNG_ACTION,
	DANH_SACH_NGUOI_XU_LY,
	TIM_THEO_ID_ACTION,
	LAY_TAT_CA_SO_DI_ACTION,
	TIM_THEO_MA,
	LAY_THONG_TIN_FILE_REF_ACTION,
	BO_SUNG_LANH_DAO_XU_LY,
	XEM_LUONG_VAN_BAN,
} from '../constants/quanly';
import {
	layFileDinhKemComplete,
	layThongTinFileComplete,
	layLDDXComplete,
	layTatCaSoComplete,
	layTatCaFilterTreeComplete,
	layTatCaDonViComplete,
	getAllLeaderComplete,
	lsXLVBDComplete,
	loaiVBComplete,
	layLanhDaoDVComplete,
	layDanhSachLienKetComplete,
	layDonViDeXuatComplete,
	ktraNDComplete,
	danhSachNguoiXuLyComplete,
	timTheoIdComplete,
	layTatCaSoDiComplete,
	timTheoMaComplete,
	layThongTinFileRefComplete,
	boSungLanhDaoXyLyComplete,
	xemLuongVanBanComplete,
} from '../actions/quanly';
import {fetchPOST, fetchGET} from '../../connections/connections';
import {ApiResponse} from '@models/ApiResponse';
import {selectToken} from '../selectorConfig';
import {File} from '@models/File';
import {UserInfo} from '@models/UserInfo';

function* _layfiledinhkem(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<Array<File>> = yield fetchGET(
			'api/QuanLyFilesServer/LayFileDinhKemVanBan',
			token,
			action.payload,
		);
		yield put(layFileDinhKemComplete(res));
	} catch (e) {
		yield put(layFileDinhKemComplete({success: false}));
	}
}

function* _laythongtinfile(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<Array<File>> = yield fetchPOST(
			'api/QuanLyFilesServer/LayThongTinFile',
			token,
			action.payload,
		);
		yield put(layThongTinFileComplete(res));
	} catch (e) {
		yield put(layThongTinFileComplete({success: false}));
	}
}

function* _laylanhdaodexuat(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(
			'api/DonVi/LayLanhDaoDeXuat',
			token,
			action.payload,
		);
		yield put(layLDDXComplete(res));
	} catch (e) {
		yield put(layLDDXComplete({success: false}));
	}
}

function* _laytatcaso(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchGET(
			'api/SoVanBan/LayTatCaSoTheoLoai',
			token,
			action.payload,
		);
		yield put(layTatCaSoComplete(res));
	} catch (e) {
		yield put(layTatCaSoComplete({success: false}));
	}
}

function* _laytatcasodi(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchGET('api/LoaiVanBan/LayTatca', token);
		yield put(layTatCaSoDiComplete(res));
	} catch (e) {
		yield put(layTatCaSoDiComplete({success: false}));
	}
}

// http://14.248.82.147:81/api/LoaiVanBan/LayTatca

function* _laytatcafiltertree(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(
			'api/DonVi/LayTatCaTheoFilterTree',
			token,
			action.payload,
		);
		yield put(layTatCaFilterTreeComplete(res));
	} catch (e) {
		yield put(layTatCaFilterTreeComplete({success: false}));
	}
}

function* _laytatcadonvi() {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchGET('api/DonVi/LayTatca', token);
		yield put(layTatCaDonViComplete(res));
	} catch (e) {
		yield put(layTatCaDonViComplete({success: false}));
	}
}

function* _laytatcalanhdao() {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchGET('api/NguoiDung/GetAllLeader', token);
		yield put(getAllLeaderComplete(res));
	} catch (e) {
		yield put(getAllLeaderComplete({success: false}));
	}
}

function* _lichsuxulyvbden(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(
			'api/QuyTrinhXuLyVB/LayLichSuXuLy',
			token,
			action.payload,
		);
		yield put(lsXLVBDComplete(res));
	} catch (e) {
		yield put(lsXLVBDComplete({success: false}));
	}
}

function* _loaivb() {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchGET(`api/LoaiVanBan/LayTatca`, token);
		yield put(loaiVBComplete(res));
	} catch (e) {
		yield put(loaiVBComplete({success: false, message: 'Bạn vui lòng kiểm tra lại kết nối.'}));
	}
}

function* _laylanhdaodonvi() {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<Array<UserInfo>> = yield fetchGET(
			`api/NguoiDung/LayTatCaLanhDaoDonVi`,
			token,
		);
		yield put(layLanhDaoDVComplete(res));
	} catch (e) {
		yield put(
			layLanhDaoDVComplete({success: false, message: 'Bạn vui lòng kiểm tra lại kết nối.'}),
		);
	}
}

function* _laydanhsachlienket(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(
			'api/VanBanDi/DanhSachVanBanLienQuans',
			token,
			action.payload,
		);
		yield put(layDanhSachLienKetComplete(res));
	} catch (e) {
		yield put(layDanhSachLienKetComplete({success: false}));
	}
}

function* _laydonvidexuat(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(
			'api/DonVi/LayDonViDeXuat',
			token,
			action.payload,
		);
		yield put(layDonViDeXuatComplete(res));
	} catch (e) {
		yield put(layDonViDeXuatComplete({success: false}));
	}
}

function* _kiemtranguoidung(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(
			`api/NguoiDung/KiemTraNguoiDungThuocDonVi?userId=${action.payload.userId}`,
			token,
		);
		yield put(ktraNDComplete(res));
	} catch (e) {
		yield put(ktraNDComplete({success: false, message: 'Bạn vui lòng kiểm tra lại kết nối.'}));
	}
}

function* _danhSachNguoiXuLy(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchGET(`api/VanBanDen/${action.postId}`, token);
		yield put(danhSachNguoiXuLyComplete(res));
	} catch (e) {
		yield put(
			danhSachNguoiXuLyComplete({
				success: false,
				message: 'Bạn vui lòng kiểm tra lại kết nối.',
			}),
		);
	}
}

function* _timTheoId(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchGET(`api/DonVi/TimTheoId/${action.deptId}`, token);
		yield put(timTheoIdComplete(res));
	} catch (e) {
		yield put(
			timTheoIdComplete({
				success: false,
				message: 'Bạn vui lòng kiểm tra lại kết nối.',
			}),
		);
	}
}

function* _timTheoMa(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchGET(
			`api/DmQuyen/TimTheoMa?ma=${action.ma_data}`,
			token,
		);
		yield put(timTheoMaComplete(res));
	} catch (e) {
		yield put(
			timTheoMaComplete({
				success: false,
				message: 'Bạn vui lòng kiểm tra lại kết nối.',
			}),
		);
	}
}
function* _laythongtinfileRef(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<Array<File>> = yield fetchPOST(
			'api/QuanLyFilesServer/LayThongTinFile',
			token,
			action.payload,
		);
		yield put(layThongTinFileRefComplete(res));
	} catch (e) {
		yield put(layThongTinFileRefComplete({success: false}));
	}
}
function* _boSungLanhDaoXyLy(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<Array<File>> = yield fetchPOST(
			'api/QuyTrinhXuLyVB/BoSungLanhDaoXuLy',
			token,
			action.payload,
		);
		yield put(boSungLanhDaoXyLyComplete(res));
	} catch (e) {
		yield put(boSungLanhDaoXyLyComplete({success: false}));
	}
}

function* _xemLuongVanban(action: any) {
	try {
		const token: string = yield select(selectToken());
		const res: ApiResponse<any> = yield fetchPOST(
			'api/QuyTrinhXuLyVB/XemLuongVanBan',
			token,
			action.payload,
		);
		yield put(xemLuongVanBanComplete(res));
	} catch (e) {
		yield put(xemLuongVanBanComplete({success: false}));
	}
}

export function* watchInitial() {
	yield all([
		takeLatest(LAY_FILE_DINH_KEM_ACTION, _layfiledinhkem),
		takeLatest(LAY_THONG_TIN_FILE_ACTION, _laythongtinfile),
		takeLatest(LAY_LANH_DAO_DE_XUAT_ACTION, _laylanhdaodexuat),
		takeLatest(LAY_TAT_CA_SO_ACTION, _laytatcaso),
		takeLatest(LAY_TAT_CA_SO_DI_ACTION, _laytatcasodi),
		takeLatest(LAY_TAT_CA_FILTER_TREE_ACTION, _laytatcafiltertree),
		takeLatest(LAY_TAT_CA_DON_VI_ACTION, _laytatcadonvi),
		takeLatest(GET_ALL_LEADER_ACTION, _laytatcalanhdao),
		takeLatest(LSXL_VBD_ACTION, _lichsuxulyvbden),
		takeLatest(LOAI_VB_ACTION, _loaivb),
		takeLatest(LAY_LANH_DAO_DON_VI_ACTION, _laylanhdaodonvi),
		takeLatest(DANHSACH_LIENKET_ACTION, _laydanhsachlienket),
		takeLatest(LAY_DON_VI_DE_XUAT_ACTION, _laydonvidexuat),
		takeLatest(KIEM_TRA_NGUOI_DUNG_ACTION, _kiemtranguoidung),
		takeLatest(DANH_SACH_NGUOI_XU_LY, _danhSachNguoiXuLy),
		takeLatest(TIM_THEO_ID_ACTION, _timTheoId),
		takeLatest(TIM_THEO_MA, _timTheoMa),
		takeLatest(LAY_THONG_TIN_FILE_REF_ACTION, _laythongtinfileRef),
		takeLatest(BO_SUNG_LANH_DAO_XU_LY, _boSungLanhDaoXyLy),
		takeLatest(XEM_LUONG_VAN_BAN, _xemLuongVanban),
	]);
}
