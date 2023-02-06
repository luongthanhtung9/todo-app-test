import React, {memo, useState, useEffect, useMemo, createRef} from 'react';
import {View} from 'react-native';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import styles from './style';
import TabTitleComponent from './components/TabTitleComponent';
import {
	HeaderComponent,
	TouchComponent,
	ThongTinChungComponent,
	XuLyComponent,
	LichSuXuLyComponent,
	ModalInputPasswordComponent,
} from '@components/index';
import ViewPager from '@react-native-community/viewpager';
import {actionLayDanhSachLanhDaoTrinh, actionThuHoiVBDi} from '@redux/actions/vbdi';
import {
	actionChiTietToTrinh,
	actionChuyenKyThay,
	actionToTrinhInit,
	cCSCompleteToTrinh,
	duyetToTrinhComplete,
	traLoiVanBanCompleteToTrinh,
	trinhXuLyComplete,
} from '@redux/actions/totrinh';
import {VanBan} from '@models/VanBan';
import {ApiResponse} from '@models/ApiResponse';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
	showLoading,
	dismissLoading,
	showMessageWarning,
	showAlert,
	showMessageSuccess,
	getUserLogin,
} from '@utils/index';
import DocumentType from '@commons/DocumentType';
import {ApiResponseNoData} from '@models/ApiResponseNoData';
import {actionDefaultToTrinh, actionDuyetToTrinh} from '@redux/actions/totrinh';
import ErrorCode from '@commons/ErrorCode';
import RoleType from '@commons/RoleType';
import DocumentStatus from '@commons/DocumentStatus';
import {actionLayLDDX} from '@redux/actions/quanly';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@navigations/NameRoute';
import {defaultKyNhay, kyNhayComplete} from '@redux/actions/kynhay';
import {once} from 'lodash';
import {ACTION_NEXT, CONTANTS, DEPT_TYPE, ROLE} from '@commons/ActionCheck';
import {fetchPOST} from 'src/connections/connections';

export interface Props {
	token?: string;
	ctVBDiResponse?: ApiResponse<VanBan>;
	trinhXuLyResponse?: ApiResponseNoData;
	kiemtraYKienResponse?: ApiResponseNoData;
	duyetToTrinhResponse?: ApiResponseNoData;
	thuhoiVBDIResponse?: ApiResponseNoData;
	chiTietToTrinhResponse?: ApiResponse<VanBan>;
	chuyenKyThayRespone?: ApiResponse<any>;
	traVBResponse?: ApiResponse<any>;
	cCSResponse?: ApiResponse<any>;
	toTrinhInitResponse?: ApiResponse<any>;
}

export interface RouteParams {
	id?: string;
	status?: number;
	onRefresh?: () => void;
}

const CTToTrinhScreen = (props: Props) => {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
	const viewPagerRef = createRef<ViewPager>();
	const dispatch = useDispatch();
	const {chiTietVanBanDiResponse, thuhoiVBDIResponse} = useSelector(
		(state: RootStateOrAny) => state.vbdi,
	);
	const {
		trinhXuLyResponse,
		kiemtraYKienResponse,
		duyetToTrinhResponse,
		chiTietToTrinhResponse,
		chuyenKyThayRespone,
		traVBResponse,
		cCSResponse,
		toTrinhInitResponse,
	} = useSelector((state: RootStateOrAny) => state.totrinh);
	const {token} = useSelector((state: RootStateOrAny) => state.configs);
	const {kyNhayResponse} = useSelector((state: RootStateOrAny) => state.kynhay);
	const routeParams: RouteParams = useRoute().params as RouteParams;

	const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
	const [password, setPassword] = useState<string>('');
	const [isShowModal, setIsShowModal] = useState<boolean>(false);
	const [isShowModalRef, setIsShowModalRef] = useState<boolean>(false);
	const [tabSelected, setTabSelected] = useState(0);
	const [data, setData] = useState<VanBan>();
	const [noiDung, setNoiDung] = useState<string>();
	const [idFile, setIdFile] = useState<string>('');
	const [isKySo, setIsKyso] = useState<boolean>(false);
	const tabData =
		routeParams.status == 1
			? ['Thông tin chung', 'Xử lý', 'Lịch sử xử lý']
			: ['Thông tin chung', 'Lịch sử xử lý'];

	useEffect(() => {
		showLoading();
		dispatch(actionChiTietToTrinh(routeParams.id));
		//http://14.248.82.147:81/api/ToTrinh/ToTrinhInit
		const user = getUserLogin(token);
		if (user.roleCode === RoleType.LDDV) {
			dispatch(actionLayDanhSachLanhDaoTrinh({id: routeParams.id, isPhong: true}));
		} else {
			dispatch(actionToTrinhInit({idVanBan: routeParams.id}));
		}

		dispatch(actionLayLDDX({}));
		return () => {
			dispatch(actionDefaultToTrinh());
			dispatch(defaultKyNhay());
		};
	}, []);

	useMemo(() => {
		if (kyNhayResponse?.success) {
			dispatch(actionChiTietToTrinh(routeParams.id));
			// setTabSelected(1)
			// viewPagerRef?.current?.setPage(1)
			showMessageSuccess('Ký văn bản thành công');
			dispatch(kyNhayComplete({success: false}));
		}
	}, [kyNhayResponse]);

	useMemo(() => {
		if (!chiTietToTrinhResponse) return;
		dismissLoading();
		if (chiTietToTrinhResponse.success) {
			setData(chiTietToTrinhResponse.data);
		} else showMessageWarning(chiTietToTrinhResponse.error);
	}, [chiTietToTrinhResponse]);

	useMemo(() => {
		if (!trinhXuLyResponse) return;
		dismissLoading();
		if (trinhXuLyResponse.success) {
			showMessageSuccess('Trình xử lý thành công');
			_backandrefresh();
		} else showMessageWarning(trinhXuLyResponse.error);
	}, [trinhXuLyResponse]);

	useMemo(() => {
		if (!kiemtraYKienResponse) return;
		if (kiemtraYKienResponse.success) {
			dispatch(
				actionDuyetToTrinh({
					idVanBan: routeParams.id,
					noiDung,
				}),
			);
		} else {
			if (kiemtraYKienResponse.error === ErrorCode.ERROR_100) {
				dispatch(
					actionDuyetToTrinh({
						idVanBan: routeParams.id,
						noiDung,
					}),
				);
			} else showMessageWarning(kiemtraYKienResponse.error);
		}
	}, [kiemtraYKienResponse]);

	useMemo(() => {
		if (!duyetToTrinhResponse) return;
		dismissLoading();
		if (duyetToTrinhResponse.success) {
			showMessageSuccess('Duyệt văn bản thành công');
			_backandrefresh();
		} else showMessageWarning(duyetToTrinhResponse.error);
	}, [duyetToTrinhResponse]);

	useMemo(() => {
		if (!thuhoiVBDIResponse) return;
		dismissLoading();
		if (thuhoiVBDIResponse.success) {
			showMessageSuccess('Thu hồi văn bản thành công');
			_backandrefresh();
		} else showMessageWarning('Không thành công.');
	}, [thuhoiVBDIResponse]);

	useMemo(() => {
		if (!chuyenKyThayRespone) return;
		dismissLoading();
		if (chuyenKyThayRespone.success) {
			showMessageSuccess('Chuyển lãnh đạo ký thay thành công');
			_backandrefresh();
		} else showMessageWarning('Không thành công.');
	}, [chuyenKyThayRespone]);

	useMemo(() => {
		if (!traVBResponse) return;
		dismissLoading();
		if (traVBResponse.success) {
			showMessageSuccess('Chuyển trả thành công');
			_backandrefresh();
		} else showMessageWarning('Không thành công.');
	}, [traVBResponse]);

	useMemo(() => {
		if (!cCSResponse) return;
		dismissLoading();
		if (cCSResponse.success) {
			showMessageSuccess('Chuyển cấp số thành công');
			_backandrefresh();
		} else showMessageWarning('Không thành công.');
	}, [cCSResponse]);

	function _backandrefresh() {
		navigation.pop();
		if (routeParams.onRefresh) routeParams.onRefresh();
	}

	// phân quyền nút chức năng
	const _isTrinh = () => {
		if (token && data) {
			const user = getUserLogin(token);
			if (!data) return false;
			if (isShowTrinhLanhDaoVP()) return false;

			const chuTriChoXuLy =
				data.process && data.process.processType === 0 && data.process.status === 0;
			if (data && data.noiPhatHanh === CONTANTS.NoiPhatHanh_DV) {
				//tờ trình đơn vị

				return (
					chuTriChoXuLy &&
					!(user.roleCode === RoleType.VT || user.roleCode === RoleType.LDDV)
				);
			} else if (data && data.noiPhatHanh === CONTANTS.NoiPhatHanh_TCDT) {
				// tờ trình tcdt
				return (
					chuTriChoXuLy &&
					!(
						user.roleCode === RoleType.VT ||
						(user.roleCode === ROLE.LDDV &&
							user.deptCode === CONTANTS.CodeTCDT &&
							user.roleCode === ROLE.LDDV &&
							user.isLeader) ||
						(!(user.roleCode === ROLE.LDDV && user.deptCode === CONTANTS.CodeTCDT) &&
							user.roleCode === ROLE.LDDV)
					)
				);
			} else if (data && data.noiPhatHanh === CONTANTS.NoiPhatHanh_BTC) {
				//tờ trình bộ
				return (
					chuTriChoXuLy &&
					!(user.roleCode === RoleType.VT || user.roleCode === RoleType.LDDV)
				);
			}
			return false;
		}
		return false;
	};

	const _isDuyet = () => {
		if (token && data) {
			const user = getUserLogin(token);
			if (!data) return false;
			const chuTriChoXuLy =
				data.process && data.process.processType === 0 && data.process.status === 0;
			if (data && data.noiPhatHanh === CONTANTS.NoiPhatHanh_DV) {
				//tờ trình đơn vị
				return chuTriChoXuLy && user.roleCode === RoleType.LDDV;
			} else if (data && data.noiPhatHanh === CONTANTS.NoiPhatHanh_TCDT) {
				// tờ trình tcdt
				return (
					user.roleCode === ROLE.LDDV &&
					user.deptCode === CONTANTS.CodeTCDT &&
					((user.roleCode === ROLE.LDDV && user.isLeader) || chuTriChoXuLy)
				);
			} else if (data && data.noiPhatHanh === CONTANTS.NoiPhatHanh_BTC) {
				//tờ trình bộ
			}
			return false;
		}
		return false;
	};

	const isShowTrinhLanhDaoVP = () => {
		const user = getUserLogin(token);
		return (
			user && user?.roleCode === 'VBTC' && data && data.status === DocumentStatus.DANG_XU_LY
		);
	};
	// console.log('dataaaa', data);
	// console.log('dataaaa', toTrinhInitResponse);
	const _isChuyenCapSo = () => {
		if (token && data) {
			const user = getUserLogin(token);
			return (
				data.process &&
				data.process.status === 0 &&
				user.roleCode === RoleType.LDDV &&
				data.status === DocumentStatus.DANG_XU_LY &&
				user.deptId !== data.publishDeptId &&
				user.deptType !== 4
			);
		}
		return false;
	};
	const isSignerDuyetVanBanDi = () => {
		const user = getUserLogin(token);
		return (
			data &&
			data.status === 2 &&
			data.process &&
			data.process.status === 0 &&
			(user.roleCode === 'LDDV' || data.process.actionName === ACTION_NEXT.KY_THAY) &&
			((data.noiPhatHanh === 'DV' && data.vanBanDiRef != null && data.toTrinhTCRef == null) ||
				(data.noiPhatHanh === 'TCDT' &&
					data.vanBanDiRef != null &&
					data.toTrinhBoRef == null))
		);
	};

	//Ký nháy văn bản liên quan
	const isSignerFalshToTrinh = () => {
		const user = getUserLogin(token);
		//Kiểm tra người dùng có quyền ký thay hoặc ký văn bản
		return (
			data &&
			data.status === 2 &&
			data.process &&
			data.process.status === 0 &&
			(user?.roleCode === 'LDDV' || data.process.actionName === ACTION_NEXT.KY_THAY) &&
			data.noiPhatHanh === 'DV' &&
			(data.toTrinhTCRef != null || data.toTrinhBoRef != null)
		);
	};

	//api/ToTrinh/TraLaiVanBan
	const _isCheckChuyenTraVP = () => {
		const user = getUserLogin(token);
		return (
			data &&
			data.status === DocumentStatus.DANG_XU_LY &&
			data.sendUserId !== user.userId &&
			user?.roleCode === 'VBTC'
		);
	};

	const _isChuyenVanPhong = () => {
		const user = getUserLogin(token);
		if (!data) return false;
		return (
			data.isSigned ||
			(user.roleCode === ROLE.VT &&
				// () &&
				data.status === DocumentStatus.DANG_XU_LY &&
				data.signFlashes &&
				data.noiPhatHanh === CONTANTS.NoiPhatHanh_TCDT) ||
			(user.roleCode === ROLE.LDDV &&
				user.deptType === DEPT_TYPE.VU &&
				data.status === DocumentStatus.DANG_XU_LY &&
				data.signFlashes &&
				data.noiPhatHanh === CONTANTS.NoiPhatHanh_TCDT)
		);
	};

	// chuyen van phong
	const _isCheckChuyenTra = () => {
		if (token && data) {
			const user = getUserLogin(token);
			if (!data) return false;
			if (_isCheckChuyenTraVP()) {
				return false;
			}
			if (data && data.noiPhatHanh === 'DV' && user.roleCode === RoleType.LDDV) {
				//tờ trình đơn vị
				return false;
			} else if (
				data &&
				data.noiPhatHanh === 'TCDT' &&
				user.roleCode === RoleType.LDDV &&
				user.deptCode === '000.00.32.G12'
			) {
				// tờ trình tcdt
				return false;
			}

			const lanhDaoMain =
				data && data.process && data.process.processType === 0 && data.process.status === 0;
			return (
				(user.roleCode === RoleType.VT || lanhDaoMain) &&
				data.status === DocumentStatus.DANG_XU_LY
			);
		}
	};

	const _isThuHoi = () => {
		if (token && data) {
			const user = getUserLogin(token);
			return data.sendUserId === user.userId && data.status === 2;
		}
		return false;
	};

	// const _isTra = () => {
	// 	if (token && data) {
	// 		const user = getUserLogin(token);
	// 		return (
	// 			data.process &&
	// 			data.process.status == 0 &&
	// 			(data.status === 2 || data.status === 3) &&
	// 			((data.process.processType == 0 && data.process.status == 0) ||
	// 				user.roleCode === RoleType.VT)
	// 		);
	// 	}
	// 	return false;
	// };

	const _isHoanThienVB = () => {
		const user = getUserLogin(token);
		if (!data) return false;
		const chuTriChoXuLy =
			data.process &&
			data.process.processType === 0 &&
			data.process.status === 0 &&
			data.status === 2;
		if (data && data.noiPhatHanh === CONTANTS.NoiPhatHanh_DV) {
			//tờ trình đơn vị
			return chuTriChoXuLy && user.roleCode === ROLE.LDDV;
		} else if (data && data.noiPhatHanh === CONTANTS.NoiPhatHanh_TCDT) {
			// tờ trình tcdt
			return (
				chuTriChoXuLy && user.roleCode === ROLE.LDDV && user.deptCode === CONTANTS.CodeTCDT
			);
		} else if (data && data.noiPhatHanh === CONTANTS.NoiPhatHanh_BTC) {
			//tờ trình bộ
		}
		return false;
	};

	const checkKyThay = () => {
		const user = getUserLogin(token);
		return (
			data &&
			data.status === 2 &&
			data.process &&
			((data.noiPhatHanh === 'DV' && user.roleCode === 'LDP' && user.isLeader) ||
				(data.noiPhatHanh === 'TCDT' && user.roleCode === 'LDVP' && user.isLeader)) &&
			user.deptId !== user.publishDeptId
		);
	};

	const checkKyThuaLenhRef = () => {
		return (
			data &&
			data.process &&
			data.process.status === 0 &&
			data.process.actionName === ACTION_NEXT.KY_THUA_LENH
		);
	};
	const checkKyThayRef = () => {
		return (
			data &&
			data.process &&
			data.process.status === 0 &&
			data.process.actionName === ACTION_NEXT.KY_THAY
		);
	};

	const checkKyUyquyenRef = () => {
		return (
			data &&
			data.process &&
			data.process.status === 0 &&
			data.process.actionName === ACTION_NEXT.KY_UY_QUYEN
		);
	};

	const checkKyDuyet = () => {
		const user = getUserLogin(token);
		if (
			checkKyThuaLenhRef() ||
			checkKyThayRef() ||
			checkKyUyquyenRef() ||
			user?.roleCode === RoleType.LDDV
		) {
			return true;
		}
		return false;
	};

	const checkKyNhay = () => {
		if (token && data) {
			const user = getUserLogin(token);
			return (
				data &&
				(data.status === DocumentStatus.DANG_XU_LY ||
					data.status === DocumentStatus.TAO_MOI) &&
				data.process &&
				data.process.status === 0 &&
				(data.process.actionName === ACTION_NEXT.KY_THAY ||
					(((data.noiPhatHanh === CONTANTS.NoiPhatHanh_DV &&
						user.roleCode === 'LDP' &&
						user.isLeader) ||
						(data.noiPhatHanh === CONTANTS.NoiPhatHanh_TCDT &&
							user.roleCode === 'LDDV' &&
							user.isLeader &&
							user.deptId !== data.publishDeptId)) &&
						user.deptId === data.donViSoanThaoId))
			);
		}
		return false;
	};

	const onPressKyToTrinh = async () => {
		// LoaiVanBan: 1  văn bản đến, 3 văn bản đi, 4 tờ trình
		// TypeSign là 0 ký duyệt, 1 ký nháy
		// setIsShowModal(true)
		if (data?.fileUploads) {
			const body = {
				IdFile: idFile,
				IdVanBan: routeParams.id,
				TypeSign: isKySo ? 0 : 1,
				Token: password,
				LoaiVanBan: '4',
			};
			showLoading();
			// dispatch(actionKyNhay(body));
			const resKy: any = await fetchPOST(`api/QuanLyFilesServer/SignDocument`, token, body);
			if (resKy.success) {
				dismissLoading();
				dispatch(actionChiTietToTrinh(routeParams.id));
			}
		}
	};

	const onPressKyFileRef = async () => {
		// LoaiVanBan: 1  văn bản đến, 3 văn bản đi, 4 tờ trình
		// TypeSign là 0 ký duyệt, 1 ký nháy

		if (data?.vanBanDiRef?.fileUpload) {
			const body = {
				IdFile: idFile,
				IdVanBan: data?.vanBanDiRef?.id,
				TypeSign: isKySo ? 0 : 1,
				Token: password,
				LoaiVanBan: '3',
			};
			showLoading();
			const resKy: any = await fetchPOST(`api/QuanLyFilesServer/SignDocument`, token, body);
			if (resKy.success) {
				dismissLoading();
				dispatch(actionChiTietToTrinh(routeParams.id));
			}
			// dispatch(actionKyNhay(body));
		}
	};

	const oncedPressKyToTrinh = once(onPressKyToTrinh);
	const oncedPressFileRef = once(onPressKyFileRef);

	const reset = () => {
		setPassword('');
		setIsShowModal(false);
		setIsShowModalRef(false);
		setSecureTextEntry(true);
	};

	const _onTraVB = async (noiDung?: string, userId?: string) => {
		const body = {
			ghiChu: noiDung,
			idVanBan: routeParams.id,
			userId,
		};
		showLoading();
		const resTraVB: any = await fetchPOST(`api/ToTrinh/TraLaiVanBan`, token, body);
		if (resTraVB.success) {
			dismissLoading();
			dispatch(traLoiVanBanCompleteToTrinh(resTraVB));
		} else {
			dispatch(traLoiVanBanCompleteToTrinh({success: false}));
		}
	};

	const _hoanThienVb = async (noiDung?: string) => {
		const body = {
			noiDung: noiDung,
			idVanBan: routeParams.id,
		};
		showLoading();
		const resHT: any = await fetchPOST(`api/ToTrinh/YeuCauHoanThien`, token, body);
		if (resHT.success) {
			dismissLoading();
			dispatch(traLoiVanBanCompleteToTrinh(resHT));
		} else {
			dispatch(traLoiVanBanCompleteToTrinh({success: false}));
		}
	};

	const _chuyenCapSo = async (noiDung?: string) => {
		const body = {
			noiDung: noiDung,
			idVanBan: routeParams.id,
			isOk: true,
		};
		showLoading();
		const resChuyenCapSo: any = await fetchPOST(`api/ToTrinh/ChuyenCapSoToTrinh`, token, body);
		if (resChuyenCapSo.success) {
			dismissLoading();
			dispatch(cCSCompleteToTrinh(resChuyenCapSo));
		} else {
			dispatch(cCSCompleteToTrinh({success: false}));
		}
	};

	const _onTrinhVP = async (param?: any) => {
		const body = {
			...data,
			listProcess: param.listProcess,
			parentBookNumber: toTrinhInitResponse?.data.parentBookNumber,
		};
		// console.log('body', body);

		showLoading();
		const resTrinh: any = await fetchPOST(`api/ToTrinh/TrinhChanhVanPhong`, token, body);
		if (resTrinh.success) {
			dismissLoading();
			dispatch(trinhXuLyComplete(resTrinh));
		} else {
			dispatch(trinhXuLyComplete({success: false}));
		}
	};

	const _onTrinhLDVP = async () => {
		const body = {
			...data,
			// listProcess: param.listProcess,
			bookNumber: data?.bookNumber || toTrinhInitResponse?.data.bookNumber,
			// bookNumber: `toTrinhInitResponse?.data.bookNumber,
		};
		// console.log('body', body);

		showLoading();
		const resTrinh: any = await fetchPOST(`api/ToTrinh/TrinhLanhDaoVP`, token, body);
		if (resTrinh.success) {
			dismissLoading();
			dispatch(trinhXuLyComplete(resTrinh));
		} else {
			dispatch(trinhXuLyComplete({success: false}));
		}
	};

	const _onChuyenKy = async (noiDung?: string, param?: any) => {
		const body = {
			receiceUserId: param.userId,
			receiceUserName: param.displayName,
			noiDung: noiDung,
			roleId: param.roleId,
			roleName: param.roleName,
			deptId: param.deptId,
			deptName: param.deptName,
			positionId: param.positionId,
			positionName: param.positionName,
			idVanBan: routeParams.id,
		};
		dispatch(actionChuyenKyThay(body));
	};

	const oncedChuyenKy = once(_onChuyenKy);

	const _getViewDS = (index: number) => {
		if (data) {
			if (index === 0)
				return (
					<ThongTinChungComponent
						key={index}
						data={data}
						type={DocumentType.TO_TRINH}
						// todo continue
						kyNhay={checkKyNhay()}
						kySo={checkKyDuyet()}
						kyNhayRef={checkKyNhay()}
						kySoRef={isSignerDuyetVanBanDi()}
						onPressKyNhay={(id?: string) => {
							setIsShowModal(true);
							setIdFile(id || '');
							setIsKyso(false);
						}}
						onPressKySo={(id?: string) => {
							setIsShowModal(true);
							setIdFile(id || '');
							setIsKyso(true);
						}}
						onPressKyNhayFileRef={(id?: string) => {
							setIsShowModalRef(true);
							setIdFile(id || '');
							setIsKyso(false);
						}}
						onPressKySoFileRef={(id?: string) => {
							setIsShowModalRef(true);
							setIdFile(id || '');
							setIsKyso(true);
						}}
					/>
				);
			if (routeParams.status === 1) {
				if (index === 1)
					return (
						<XuLyComponent
							key={index}
							id={routeParams.id}
							type={DocumentType.TO_TRINH}
							isTrinh={_isTrinh()}
							onTrinhXuLy={_onTrinh}
							isDuyet={_isDuyet()}
							// isTra={_isTra()}
							onTraVB={_onTraVB}
							isThuHoi={_isThuHoi()}
							onThuHoiVB={thuhoiVB}
							onDuyetVB={_onDuyetVB}
							onChuyenKyThay={(noidung?: string, param?: any) =>
								oncedChuyenKy(noidung, param)
							}
							isKyThay={checkKyThay()}
							// isVT={false}
							// isChuyenCP={true}
							ischeckShowBtnAddPersionResolve={
								(!_isDuyet() && !_isChuyenCapSo() && !_isChuyenVanPhong()) ||
								_isTrinh()
							}
							titleFormTrinh={'THÔNG TIN TRÌNH'}
							isChuyenCapSo={_isChuyenCapSo()}
							onChuyenCapSo={(noidung?: string) => _chuyenCapSo(noidung)}
							isChuyenTra={_isCheckChuyenTra()}
							isYCHoanThien={_isHoanThienVB()}
							hoanThienVb={_hoanThienVb}
							isTrinhVP={isShowTrinhLanhDaoVP()}
							onTrinhVP={_onTrinhVP}
							isChuyenTraVP={_isCheckChuyenTraVP()}
							isChuyenVanPhong={_isChuyenVanPhong()}
							onTrinhLDVP={_onTrinhLDVP}
						/>
					);
				if (index === 2)
					return (
						<LichSuXuLyComponent
							key={index}
							id={routeParams.id}
							type={DocumentType.TO_TRINH}
						/>
					);
			} else {
				if (index === 1)
					return (
						<LichSuXuLyComponent
							key={index}
							id={routeParams.id}
							type={DocumentType.TO_TRINH}
						/>
					);
			}
		}
	};

	const _onTrinh = (param?: any) => {
		showAlert({
			message: 'Bạn chắc chắn muốn trình xử lý',
			// rightAction: () => dispatch(actionTrinhXuLy(param)),
			rightAction: async () => {
				try {
					const res: any = await fetchPOST(`api/ToTrinh/TrinhXuLy`, token, param);
					dispatch(trinhXuLyComplete(res));
				} catch (e) {
					dispatch(trinhXuLyComplete({success: false}));
				}
			},
		});
	};

	const _onDuyetVB = async (param?: any) => {
		setNoiDung(param.noiDung);

		try {
			const res: any = await fetchPOST(`api/ToTrinh/KyDuyet`, token, param);
			// dispatch(trinhXuLyComplete(res));
			dispatch(duyetToTrinhComplete(res));
		} catch (e) {
			dispatch(duyetToTrinhComplete({success: false}));
		}
	};

	const thuhoiVB = (noiDung: string) => {
		setTimeout(() => {
			showAlert({
				message: 'Bạn chắc chắn muốn thu hồi văn bản?',
				rightAction: () => {
					showLoading();
					dispatch(
						actionThuHoiVBDi({
							idVanBan: routeParams.id,
							ghiChu: noiDung,
						}),
					);
				},
			});
		}, 500);
	};

	return (
		<View style={{flex: 1}}>
			<HeaderComponent title="Chi tiết tờ trình" onBack={() => _backandrefresh()} />
			<View style={{padding: 10, flex: 1, backgroundColor: '#fff'}}>
				<View style={styles.tab}>
					{tabData.map((item, index) => (
						<TouchComponent
							key={index}
							onPress={() => viewPagerRef?.current?.setPage(index)}>
							<TabTitleComponent title={item} isActive={index == tabSelected} />
						</TouchComponent>
					))}
				</View>
				<View style={styles.pagerView}>
					<ViewPager
						ref={viewPagerRef}
						style={styles.viewPager}
						initialPage={0}
						onPageSelected={event => setTabSelected(event.nativeEvent.position)}>
						{tabData.map((item, index) => (
							<View key={index}>{_getViewDS(index)}</View>
						))}
					</ViewPager>
				</View>
			</View>
			<ModalInputPasswordComponent
				secureTextEntry={secureTextEntry}
				onPressIcon={() => {
					setSecureTextEntry(!secureTextEntry);
				}}
				reset={() => reset()}
				isShowModal={isShowModal}
				value={password}
				setValue={text => setPassword(text)}
				oncedPressKyNhay={() => {
					oncedPressKyToTrinh();
				}}
			/>

			<ModalInputPasswordComponent
				secureTextEntry={secureTextEntry}
				onPressIcon={() => {
					setSecureTextEntry(!secureTextEntry);
				}}
				reset={() => reset()}
				isShowModal={isShowModalRef}
				value={password}
				setValue={text => setPassword(text)}
				oncedPressKyNhay={() => {
					oncedPressFileRef();
				}}
			/>
		</View>
	);
};

export default memo(CTToTrinhScreen);
