export const PROCESS_STATUS = {
	DOING: 9,
	RETURN: 5,
	RECALL: 6,
	FINISH: 4,
};

export const DOCUMENT_IN_STATUS = {
	DaHoanThanh: 4,
	TuChoi: 5,
	ThuHoi: 6,
	DangXuLy: 3,
};

export const VANTHU_TONGCUC = {
	DEPT_CODE: '000.00.32.G12',
	ROLE_CODE: 'VT',
};

export const CHUYEN_VIEN = {
	ROLE_CODE: 'CV',
};

export const LANHDAO_PHONG = {
	ROLE_CODE: 'LDP',
};

export const LANHDAO_DONVI = {
	DEPT_CODE: '000.00.32.G12',
	ROLE_CODE: 'LDDV',
};

export const CONTANTS = {
	CodeBTC: '000.00.00.G12',
	CodeTCDT: '000.00.32.G12',

	NoiPhatHanh_DV: 'DV',
	NoiPhatHanh_TCDT: 'TCDT',
	NoiPhatHanh_BTC: 'BTC',

	KTQ: 'KTQ',
	KT_KTL: 'KT_KTL',
};

export const ACTION_NEXT = {
	TRINH: 'action.name.send_process',
	CHUYEN_CAP_PHO: 'action.name.transform_to_pho',
	CHUYEN_DON_VI: 'action.name.unit',
	CHUYEN_PHONG_BAN: 'action.name.department',
	CHUYEN_CHI_CUC: 'action.name.office',
	CHUYEN_CA_NHAN: 'action.name.person',
	TRA_LAI: 'action.name.return',
	KY_THUA_LENH: 'action.name.transform_to_kythualenh',
	KY_THAY: 'action.name.transform_to_kythay',
	KY_UY_QUYEN: 'action.name.transform_to_kyuyquyen',
	CAP_SO: 'action.name.assign_number',
};

export const ROLE = {
	LDDV: 'LDDV',
	LDP: 'LDP',
	LDVP: 'LDVP',
	VT: 'VT',
	CV: 'CV',
	VBTC: 'VBTC',
};

export const DEPT_TYPE = {
	TONGCUC: 0,
	CUCKHUVUC: 1,
	CHICUC: 2,
	VU: 4,
	VANPHONG: 3,
	CUC: 5,
	BTC: 100,
};
