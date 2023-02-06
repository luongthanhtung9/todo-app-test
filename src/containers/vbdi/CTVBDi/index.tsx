import React, {createRef, memo, useEffect, useMemo, useState} from 'react';
import {View} from 'react-native';
import {connect, RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import styles from './style';
import {ApiResponse} from '@models/ApiResponse';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@navigations/NameRoute';
import {useNavigation, useRoute} from '@react-navigation/native';
import {once} from 'lodash';
import {
	HeaderComponent,
	TouchComponent,
	ThongTinChungComponent,
	XuLyComponent,
	LichSuXuLyComponent,
	ModalInputPasswordComponent,
	ButtonComponent,
} from '@components/index';
import {
	actionCapSoVBDI,
	actionCTVBDi,
	actionDefaultVBDi,
	actionLayDanhSachLanhDaoTrinh,
	actionLaySoVB,
	actionPhatHanhVBDI,
	actionThemMoiVBDI,
	actionThuHoiVBDi,
	actiontraLoiVanBanVBDI,
	actionVBDIinit,
	chuyenCapSoVBVTComplete,
	danhSachHSCVAction,
	duyetVanBanDiComplete,
	trinhXuLyComplete,
	VBDIinitComplete,
} from '@redux/actions/vbdi';
import {
	dismissLoading,
	showLoading,
	showMessageSuccess,
	showAlert,
	showMessageWarning,
	getUserLogin,
	formatDateTimeZ,
} from '@utils/index';

import ViewPager from '@react-native-community/viewpager';
import DocumentType from '@commons/DocumentType';
import {VanBan} from '@models/VanBan';
import TabTitleComponent from '@containers/totrinh/CTToTrinh/components/TabTitleComponent';
import {ApiResponseNoData} from '@models/ApiResponseNoData';
import DocumentStatus from '@commons/DocumentStatus';
import RoleType from '@commons/RoleType';
import {UserInfo} from '@models/UserInfo';
import {actionLayQuyenChucNang} from '@redux/actions/setting';
import {kyNhayComplete, defaultKyNhay} from '@redux/actions/kynhay';
import {ACTION_NEXT, CONTANTS} from '@commons/ActionCheck';
import {fetchPOST} from 'src/connections/connections';
import {CHECK_CONNECT_INTERNET} from '@commons/messenger';
import ModalChuyenHoSoLuuTru from '@components/ModalChuyenHoSoLuuTru';

export interface Props {
	chiTietVanBanDiResponse: ApiResponse<any>;
	token?: string;
	trinhXuLyResponse?: ApiResponseNoData;
	kiemtraYKienResponse?: ApiResponseNoData;
	duyetVanBanDiResponse?: ApiResponseNoData;
	layQuyenChucNangRespone?: ApiResponse<any>;
	phatHanhVanBanDiResponse?: ApiResponse<any>;
	traVBResponse?: ApiResponseNoData;
	chuyenCapSoResponse?: ApiResponseNoData;
	initVBDResponse?: ApiResponse<any>;
	laysoVB?: ApiResponse<any>;
	themMoiResponse?: ApiResponse<any>;
	chuyenCapSoVBVT?: ApiResponse<any>;
}
export interface RouteParams {
	id?: string;
	status?: number;
	onRefresh?: () => void;
}

const CTVBDiScreen = (props: Props) => {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
	const viewPagerRef = createRef<ViewPager>();
	const dispatch = useDispatch();
	const routeParams: RouteParams = useRoute().params as RouteParams;

	const {token} = useSelector((state: RootStateOrAny) => state.configs);
	const {
		chiTietVanBanDiResponse,
		trinhXuLyResponse,
		kiemtraYKienResponse,
		layQuyenChucNangRespone,
		duyetVanBanDiResponse,
		traVBResponse,
		chuyenCapSoResponse,
		phatHanhVanBanDiResponse,
		initVBDResponse,
		laysoVB,
		themMoiResponse,
		chuyenCapSoVBVT,
		danhSachCV,
	} = useSelector((state: RootStateOrAny) => state.vbdi);
	const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
	const [soVB, setSoVB] = useState<number>(0);
	const [initVB, setInitVB] = useState<any>();
	const [password, setPassword] = useState<string>('');
	const [isShowModal, setIsShowModal] = useState<boolean>(false);
	const {kyNhayResponse} = useSelector((state: RootStateOrAny) => state.kynhay);
	const [noiDung, setNoiDung] = useState<string>();
	const [tabSelected, setTabSelected] = useState(0);
	const [data, setData] = useState<VanBan>();
	const [user, setUser] = useState<UserInfo>();
	const [userPermission, setUserPermission] = useState<any>();
	const [isKySo, setIsKySo] = useState<boolean>(false);
	const [idFile, setIdFile] = useState<string>('');
	const [dataDSCV, setDataDSCV] = useState<any>();
	const [isVisibleChuyenHoSoLuuTru, setIsVisibleChuyenHoSoLuuTru] = useState<boolean>(false);

	const tabData =
		routeParams.status === 1 || routeParams.status === 15
			? ['Thông tin chung', 'Xử lý', 'Lịch sử xử lý']
			: ['Thông tin chung', 'Lịch sử xử lý'];
	// console.log('routeParams.status', routeParams.status);

	// api/QuanLyHoSoCongViec/ThemLuuTruVanBan
	// {
	//     "idHoSoLuuTru": [
	//         "b9d80b3f-3fab-4d35-f9ea-08dae7d5cd92"
	//     ],
	//     "idVanBan": "952fa8c3-b94d-45a1-8519-8a8412585a8b",
	//     "type": "3"
	// }
	useEffect(() => {
		if (routeParams.status === 15) {
			const body = {
				pageInfo: {page: 1, pageSize: 10},
				sorts: [],
				status: 1,
			};
			dispatch(danhSachHSCVAction(body));
		}
	}, []);

	useEffect(() => {
		if (token) {
			const userInfo = getUserLogin(token);
			setUser(userInfo);
		}
		showLoading();
		// thay api lấy người xử lý
		dispatch(
			actionLayDanhSachLanhDaoTrinh({
				idVanBan: routeParams.id,
			}),
		);
		if (isVanThu()) {
			dispatch(
				actionVBDIinit({
					idVanBan: routeParams.id,
				}),
			);
		}

		// dispatch(actionCTVBDi({id: routeParams.id}));
		// dispatch(actionLayQuyenChucNang({controller: 'VanBanDi'}));
		// dispatch(actionLayLDDX({}));
		dispatch(actionCTVBDi({id: routeParams.id}));
		dispatch(actionLayQuyenChucNang({controller: 'VanBanDi'}));
		// dispatch(actionLayLDDX({}))
		return () => {
			dispatch(actionDefaultVBDi());
			dispatch(defaultKyNhay());
		};
	}, []);

	useMemo(() => {
		if (!initVBDResponse) return;
		dismissLoading();
		if (initVBDResponse.success) {
			// setUserPermission(initVBDResponse.data);
			setInitVB(initVBDResponse?.data);
			// console.log('initVBDResponse?.data', initVBDResponse?.data);

			const body = {
				idSo: initVBDResponse?.data?.dsSoVanBan?.DV[0]?.id,
				loaiSoCanLay: 0,
			};
			dispatch(actionLaySoVB(body));
			//   console.log(chiTietVanBanDiResponse.data);
		} else showMessageWarning(initVBDResponse.error);
	}, [initVBDResponse]);

	useMemo(() => {
		if (!initVBDResponse) return;
		dismissLoading();
		if (laysoVB?.success) {
			setSoVB(laysoVB.data);
			dispatch(VBDIinitComplete({success: false}));
			// setUserPermission(initVBDResponse.data);
			// dispatch(LaySoVB(laysoVB?.data?.dsSoVanBan.DV[0].id))
			//   console.log(chiTietVanBanDiResponse.data);
		} else showMessageWarning(laysoVB.error);
	}, [laysoVB]);

	useMemo(() => {
		if (!layQuyenChucNangRespone) return;
		dismissLoading();
		if (layQuyenChucNangRespone.success) {
			setUserPermission(layQuyenChucNangRespone.data);
			//   console.log(chiTietVanBanDiResponse.data);
		} else showMessageWarning(layQuyenChucNangRespone.error);
	}, [layQuyenChucNangRespone]);

	useMemo(() => {
		if (!chiTietVanBanDiResponse) return;
		dismissLoading();
		if (chiTietVanBanDiResponse.success) {
			setData(chiTietVanBanDiResponse.data);
			//   console.log(chiTietVanBanDiResponse.data);
		} else showMessageWarning(chiTietVanBanDiResponse.error);
	}, [chiTietVanBanDiResponse]);

	useMemo(() => {
		if (!danhSachCV) return;
		dismissLoading();
		if (danhSachCV.success) {
			setDataDSCV(danhSachCV.data);
			//   console.log(chiTietVanBanDiResponse.data);
		} else showMessageWarning(danhSachCV.error);
	}, [danhSachCV]);

	useMemo(() => {
		if (!trinhXuLyResponse) return;
		if (trinhXuLyResponse.success) {
			showMessageSuccess('Chuyển xử lý thành công');
			_backandrefresh();
		} else showMessageWarning('Trình xử lý không thành công.');
	}, [trinhXuLyResponse]);

	useMemo(() => {
		if (!chuyenCapSoVBVT) return;
		if (chuyenCapSoVBVT.success) {
			showMessageSuccess('Chuyển cấp số xuống văn thư thành công');
			_backandrefresh();
		} else showMessageWarning('Trình xử lý không thành công.');
	}, [chuyenCapSoVBVT]);

	useMemo(() => {
		if (!phatHanhVanBanDiResponse) return;
		if (phatHanhVanBanDiResponse.success) {
			showMessageSuccess('Cấp phát hành thành công');
			_backandrefresh();
		} else showMessageWarning('Cấp phát hành không thành công.');
	}, [phatHanhVanBanDiResponse]);

	useMemo(() => {
		if (!duyetVanBanDiResponse) return;
		if (duyetVanBanDiResponse.success) {
			showMessageSuccess('Duyệt văn bản thành công');
			_backandrefresh();
		} else showMessageWarning(duyetVanBanDiResponse.error);
	}, [duyetVanBanDiResponse]);

	useMemo(() => {
		if (!chuyenCapSoResponse) return;
		if (chuyenCapSoResponse.success) {
			showMessageSuccess('Chuyển cấp số văn bản thành công');
			_backandrefresh();
		} else showMessageWarning(chuyenCapSoResponse.error);
	}, [chuyenCapSoResponse]);

	useMemo(() => {
		if (!traVBResponse) return;
		dismissLoading();
		if (traVBResponse.success) {
			showMessageSuccess('Trả văn bản thành công');
			_backandrefresh();
		} else showMessageWarning(traVBResponse.error);
	}, [traVBResponse]);

	useMemo(() => {
		if (!chuyenCapSoResponse) return;
		dismissLoading();
		if (chuyenCapSoResponse.success) {
			const body = {
				userName: user?.userName,
				UserId: user?.userId,
				Type: 3,
				Description: null,
				TypeName: 'Sửa',
				IpPublic: '',
				IpPrivate: '',
				FunctionAffected: 'Văn bản đi',
				Created: formatDateTimeZ(new Date()),
			};
			dispatch(actionThemMoiVBDI(body));
			// showMessageSuccess('Chuyển văn bản cấp số thành công');
			// _backandrefresh();
		} else showMessageWarning(chuyenCapSoResponse.error);
	}, [chuyenCapSoResponse]);

	useEffect(() => {
		if (!kyNhayResponse) return;
		dismissLoading();
		if (kyNhayResponse?.success) {
			dispatch(actionCTVBDi({id: routeParams.id}));
			// setTabSelected(1)
			// viewPagerRef?.current?.setPage(1)
			showMessageSuccess('Ký văn bản thành công');
			dispatch(kyNhayComplete({success: false}));
		}
	}, [kyNhayResponse]);

	useMemo(() => {
		if (!themMoiResponse) return;
		dismissLoading();
		if (themMoiResponse.success) {
			showMessageSuccess('Cấp số thành công');
			_backandrefresh();
		} else showMessageWarning(themMoiResponse.error);
	}, [themMoiResponse]);

	function _backandrefresh() {
		navigation.pop();
		if (routeParams.onRefresh) routeParams.onRefresh();
	}

	// phân quyền nút chức năng
	const _isTrinh = () => {
		if (token && data) {
			const user = getUserLogin(token);
			// isChuyenVanPhong()
			return (
				data.process &&
				data.process.status === 0 &&
				data.process.processType === 0 &&
				!_isChuyenCapSo() &&
				!_isDuyet() &&
				(!(user.roleCode === RoleType.LDDV && user.isLeader) || isChuyenVanPhong()) &&
				((data.sendUserId === user.userId && data.status === DocumentStatus.TAO_MOI) ||
					(data.status === DocumentStatus.DANG_XU_LY && user.roleCode !== RoleType.VBTC))
			);
		}
		return false;
	};

	const isVanThu = () => {
		return user?.roleCode === RoleType.VT;
	};
	// console.log(data);
	// console.log(user);

	const isChuyenVanPhong = () => {
		// deptType;
		return (
			data &&
			data.noiPhatHanh === CONTANTS.NoiPhatHanh_TCDT &&
			user?.roleCode === 'LDDV' &&
			// user?.deptType === DEPT_TYPE.VU &&
			user?.deptCode !== CONTANTS.CodeTCDT
			// VU
			// DEPT_TYPE
		);
	};

	const _isTra = () => {
		if (user && data) {
			return (
				data.process &&
				((data?.process?.status === 0 &&
					data.process.processType === 0 &&
					data?.status === 2) ||
					(data?.status === 3 && user.roleCode === RoleType.VT))
			);
		}
		return false;
	};

	const _onChuyenCapSo = () => {
		const body = {
			...data,
			idVanBan: null,
			status: 1,
			bookId: initVB.dsSoVanBan.DV[0].id,
			bookNumber: soVB,
		};
		dispatch(actionCapSoVBDI(body));
	};

	const _onPhatHanh = () => {
		const body = {
			idVanBan: routeParams.id,
		};
		dispatch(actionPhatHanhVBDI(body));
	};

	const _isChuyenCapSo = () => {
		// console.log('dataaaaa', data);

		return (
			// (data && data.process && data.process.status === 0 && data.status === 1) ||
			(!(user?.roleCode === RoleType.VT && user?.deptCode === '000.00.32.G12') &&
				data?.noiPhatHanh === 'BTC') ||
			(data && data.sendUserId === user?.userId && data.status === 1 && data.isSigned) ||
			(data &&
				(data.status === DocumentStatus.TAO_MOI ||
					data.status === DocumentStatus.DANG_XU_LY) &&
				data.process &&
				data.process.actionName !== 'action.name.transform_approve' &&
				data.signName === user?.displayName &&
				data.noiPhatHanh !== 'BTC')
		);
	};

	const _isDuyet = () => {
		if (checkKyThuaLenh() || checkKyThay() || checkKyUyquyen()) {
			return true;
		}
		return checkKy();
	};

	const checkKyThuaLenh = () => {
		return (
			data &&
			data.process &&
			data.process.status === 0 &&
			data.process.actionName === ACTION_NEXT.KY_THUA_LENH
		);
	};
	const checkKyThay = () => {
		return (
			data &&
			data.process &&
			data.process.status === 0 &&
			data.process.actionName === ACTION_NEXT.KY_THAY
		);
	};

	const checkKyUyquyen = () => {
		return (
			data &&
			data.process &&
			data.process.status === 0 &&
			data.process.actionName === ACTION_NEXT.KY_UY_QUYEN
		);
	};
	const checkKy = () => {
		if (token && data) {
			const user = getUserLogin(token);
			if (_isChuyenCapSo()) {
				return false;
			}
			return (
				data &&
				data.process &&
				data.process.status === 0 &&
				// !_isChuyenCapSo() &&
				// data.status === 2 &&
				((user.isSigner && data.publishDeptId === user.deptId) ||
					user.displayName === data.signName ||
					(data.publishDeptId === user.deptId &&
						user.roleCode === 'LDDV' &&
						user.deptCode === '000.00.32.G12'))
			);
		}
	};

	const _isThuHoi = () => {
		if (user && data) {
			return (
				(data.sendUserId === user.userId && data.status === 2) ||
				(user.roleCode === RoleType.VT && data.status === 5)
			);
		}
		return false;
	};

	const checkKyDuyet = () => {
		if (
			checkKyThuaLenh() ||
			checkKyThay() ||
			checkKyUyquyen() ||
			user?.roleCode === RoleType.LDDV
		) {
			return true;
		}
		return false;
	};

	const onPressKy = async () => {
		if (data?.fileUploads) {
			const body = {
				IdFile: idFile,
				IdVanBan: routeParams.id,
				TypeSign: isKySo ? 0 : 1,
				Token: password,
				LoaiVanBan: '3',
			};
			showLoading();
			// dispatch(actionKyNhay(body));
			const resKy: any = await fetchPOST(`api/QuanLyFilesServer/SignDocument`, token, body);
			if (resKy.success) {
				dismissLoading();
				dispatch(actionCTVBDi({id: routeParams.id}));
			} else {
				dispatch(kyNhayComplete({success: false, message: 'loi'}));
			}
		}
	};

	const onSaveDocument = async (data: any) => {
		const body = {
			idHoSoLuuTru: data,
			idVanBan: routeParams.id,
			type: '3',
		};
		showLoading();
		// dispatch(actionKyNhay(body));
		const resSave: any = await fetchPOST(
			`api/QuanLyHoSoCongViec/ThemLuuTruVanBan`,
			token,
			body,
		);
		if (resSave.success) {
			dismissLoading();
			showMessageSuccess('Thêm văn bản vào hồ sơ thành công');
			_backandrefresh();
		} else {
			showMessageWarning(resSave.error);
		}
	};

	const onPressKyVB = once(onPressKy);
	// console.log('test', data?.fileUploads);
	// console.log('test', data);

	// () => {
	// 	// LoaiVanBan: 1  văn bản đến, 3 văn bản đi, 4 tờ trình
	// 	// TypeSign là 0 ký duyệt, 1 ký nháy
	// 	// setIsShowModal(true)

	// };

	const checkKySo = () => {
		return (
			data &&
			data.process &&
			data.process.status === 0 &&
			// !_isChuyenCapSo() &&
			// data.status === 2 &&
			((user?.isSigner && data.publishDeptId === user?.deptId) ||
				user?.displayName === data.signName ||
				(data.publishDeptId === user?.deptId &&
					user?.roleCode === 'LDDV' &&
					user?.deptCode === '000.00.32.G12'))
		);
	};

	const reset = () => {
		setPassword('');
		setIsShowModal(false);
		setSecureTextEntry(true);
	};
	const checkPhatHanh = () => {
		return (
			// userPermission &&
			// userPermission?.isPhatHanh &&
			data &&
			!data.isPublish &&
			(data.isSignPublish === true || data.isSigned === true) &&
			data?.bookNumber &&
			data?.bookNumber > 0 &&
			user?.deptId === data.publishDeptId
		);
	};

	const checkKyNhay = () => {
		if (token && data) {
			const user = getUserLogin(token);
			if (
				data &&
				data.process &&
				data.process.status === 0 &&
				((data.noiPhatHanh === 'DV' && user.roleCode !== RoleType.VT) ||
					(data.noiPhatHanh === 'TCDT' &&
						user.roleCode === 'LDDV' &&
						user.isLeader === true &&
						data.donViSoanThaoId === user.deptId) ||
					(data.noiPhatHanh === 'BTC' &&
						user.roleCode === 'LDDV' &&
						user.isLeader &&
						user.deptCode === '000.00.32.G12'))
			) {
				return true;
			}
			return false;
		}
		return false;
	};

	const chuyenCapSoVBDI = () => {
		// `api/DuThao/CapNhatThongTin`,
		showAlert({
			message: 'Bạn có chắc chắn muốn chuyển cấp số?',
			rightAction: async () => {
				showLoading();
				const resCS: any = await fetchPOST(`api/DuThao/CapNhatThongTin`, token, {
					...data,
					idVanBan: routeParams.id,
					status: 2,
					listRefer: [],
					listProcess: [],
				});
				if (resCS.success) {
					dispatch(chuyenCapSoVBVTComplete(resCS));
					dismissLoading();
				} else {
					dispatch(chuyenCapSoVBVTComplete({success: CHECK_CONNECT_INTERNET}));
				}
			},
		});
	};

	// phân quyền nút chức năng
	const _getViewDS = (index: number) => {
		if (data) {
			if (index === 0)
				return (
					<ThongTinChungComponent
						key={index}
						data={data}
						type={DocumentType.VAN_BAN_DI}
						kyNhay={checkKyNhay()}
						kySo={checkKyThuaLenh() || checkKyThay() || checkKyUyquyen() || checkKySo()}
						onPressKyNhay={(id?: string) => {
							setIsShowModal(true);
							setIsKySo(false);
							setIdFile(id || '');
						}}
						onPressKySo={(id?: string) => {
							setIsShowModal(true);
							setIsKySo(true);
							setIdFile(id || '');
						}}
					/>
				);
			if (routeParams.status === 1) {
				if (index === 1)
					return (
						<XuLyComponent
							key={index}
							id={routeParams.id}
							isTrinh={_isTrinh()}
							titleTrinh={
								_isTrinh() && isChuyenVanPhong() ? 'Chuyển văn phòng' : 'Trình'
							}
							onTrinhXuLy={param => _onTrinh(param)}
							isDuyet={_isDuyet()}
							onDuyetVB={once(_onDuyetVB)}
							isTra={_isTra()}
							isThuHoi={_isThuHoi()}
							onThuHoiVB={thuhoiVB}
							onTraVB={_onTraVB}
							onChuyenCapSo={_onChuyenCapSo}
							type={DocumentType.VAN_BAN_DI}
							isVT={isVanThu()}
							// isChuyenCP={true}
							ischeckShowBtnAddPersionResolve={
								!_isChuyenCapSo() && !_isDuyet() && !data?.isSigned
							}
							titleFormTrinh={'THÔNG TIN TRÌNH'}
							isPhatHanh={!!checkPhatHanh()}
							onPhatHanh={once(_onPhatHanh)}
							isChuyenCapSo={_isChuyenCapSo()}
							chuyenCapSoVBDI={once(chuyenCapSoVBDI)}
						/>
					);
				if (index === 2)
					return (
						<LichSuXuLyComponent
							key={index}
							id={routeParams.id}
							type={DocumentType.VAN_BAN_DI}
						/>
					);
			} else if (routeParams.status === 15) {
				if (index === 1)
					return (
						<View
							style={{
								flex: 1,
								alignItems: 'center',
								justifyContent: 'flex-end',
							}}>
							<ButtonComponent
								title="Chuyển hồ sơ lưu trữ"
								onPress={() => {
									setIsVisibleChuyenHoSoLuuTru(true);
								}}
							/>
						</View>
					);
				if (index === 2)
					return (
						<LichSuXuLyComponent
							key={index}
							id={routeParams.id}
							type={DocumentType.VAN_BAN_DI}
						/>
					);
			} else {
				if (index === 1)
					return (
						<LichSuXuLyComponent
							key={index}
							id={routeParams.id}
							type={DocumentType.VAN_BAN_DI}
						/>
					);
			}
		}
	};

	const _onTrinh = async (param?: any) => {
		const resTrinh: any = await fetchPOST(`api/VanBanDi/TrinhXuLy`, token, {
			idVanBan: routeParams.id,
			listTrinhKy: param.listTrinhKy,
		});
		if (resTrinh.success) {
			dispatch(trinhXuLyComplete(resTrinh));
			dismissLoading();
		} else {
			dispatch(trinhXuLyComplete({success: false}));
		}
	};

	// const oncedTrinh = once(_onTrinh);

	const _onDuyetVB = async (param?: any) => {
		// dispatch(actionDuyetVanBanDi(param));
		const resDuyet: any = await fetchPOST(`api/DuThao/KyDuyet`, token, param);
		if (resDuyet.success) {
			dispatch(duyetVanBanDiComplete(resDuyet));
		} else {
			dispatch(duyetVanBanDiComplete({success: false}));
		}
	};

	const _onTraVB = (noiDung?: string, userId?: string) => {
		dispatch(
			actiontraLoiVanBanVBDI({
				ghiChu: noiDung,
				idVanBan: routeParams.id,
			}),
		);
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
			<HeaderComponent title="Chi tiết văn bản đi" onBack={() => _backandrefresh()} />
			<View style={{alignItems: 'center', paddingVertical: 10, flex: 1}}>
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
					{/* <Text style={styles.textTitle}>
						{data?.fileUploads?.length}-{count}
					</Text> */}
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
					onPressKyVB();
				}}
			/>
			<ModalChuyenHoSoLuuTru
				isVisible={isVisibleChuyenHoSoLuuTru}
				onAcceptData={data => {
					onSaveDocument(data);
				}}
				closePopup={() => setIsVisibleChuyenHoSoLuuTru(false)}
			/>
		</View>
	);
};

const mapStateToProps = (state: any) => {
	return {
		chiTietVanBanDiResponse: state.vbdi.chiTietVanBanDiResponse,
		trinhXuLyResponse: state.vbdi.trinhXuLyResponse,
		kiemtraYKienResponse: state.vbdi.kiemtraYKienResponse,
		duyetVanBanDiResponse: state.vbdi.duyetVanBanDiResponse,
		token: state.configs.token,
		traVBResponse: state.vbdi.traVBResponse,
		chuyenCapSoResponse: state.vbdi.chuyenCapSoResponse,
		layQuyenChucNangRespone: state.setting.layQuyenChucNangRespone,
	};
};

export default connect(mapStateToProps)(memo(CTVBDiScreen));
