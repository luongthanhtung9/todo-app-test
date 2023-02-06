import {
	CONG_VIEC_CUA_TOI,
	CONG_VIEC_CUA_TOI_COMPLETE,
	DANH_SACH_THONG_BAO,
	DANH_SACH_THONG_BAO_COMPLETE,
	DEFAULT,
	DOC_THONG_BAO,
	DOC_THONG_BAO_SUCCESS,
	LAY_THONG_BAO,
	LAY_THONG_BAO_COMPLETE,
} from '@redux/constants/thongbao';

export const thongBaoDefault = () => {
	return {
		type: DEFAULT,
	};
};

export const laySoThongBao = () => {
	return {
		type: LAY_THONG_BAO,
	};
};

export const laySoThongBaoThanhCong = (payload: any) => {
	return {
		type: LAY_THONG_BAO_COMPLETE,
		payload,
	};
};

export const layDanhSachThongBao = (payload: any) => {
	return {
		type: DANH_SACH_THONG_BAO,
		payload,
	};
};

export const layDanhSachThongBaoComplete = (payload: any) => {
	return {
		type: DANH_SACH_THONG_BAO_COMPLETE,
		payload,
	};
};

export const congViecCuaToiAction = () => {
	return {
		type: CONG_VIEC_CUA_TOI,
	};
};

export const congViecCuaToiComplete = (payload: any) => {
	return {
		type: CONG_VIEC_CUA_TOI_COMPLETE,
		payload,
	};
};

export const docThongBaoAction = (payload: string) => {
	return {
		type: DOC_THONG_BAO,
		payload,
	};
};

export const docThongBaoComplete = (payload: any) => {
	return {
		type: DOC_THONG_BAO_SUCCESS,
		payload,
	};
};
