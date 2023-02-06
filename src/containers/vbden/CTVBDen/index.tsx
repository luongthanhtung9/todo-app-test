import {
	DOCUMENT_IN_STATUS,
	PROCESS_STATUS,
	VANTHU_TONGCUC,
	CHUYEN_VIEN,
	LANHDAO_PHONG,
	LANHDAO_DONVI,
	CONTANTS,
	ACTION_NEXT,
	ROLE,
} from '@commons/ActionCheck';
import ActionNextType from '@commons/ActionNextType';
import DocumentType from '@commons/DocumentType';
import RoleType from '@commons/RoleType';
import {
	HeaderComponent,
	LichSuXuLyComponent,
	ThongTinChungComponent,
	TouchComponent,
	XuLyComponent,
} from '@components/index';
import {ApiResponse} from '@models/ApiResponse';
import {ApiResponseNoData} from '@models/ApiResponseNoData';
import {UserInfo} from '@models/UserInfo';
import {Process, VanBan} from '@models/VanBan';
import {RootStackParamList} from '@navigations/NameRoute';
import ViewPager from '@react-native-community/viewpager';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
	actionDefault,
	actionLayDonViDeXuat,
	boSungLanhDaoXyLy,
	danhSachNguoiXuLy,
	timTheoId,
	timTheoMaAction,
} from '@redux/actions/quanly';
import {
	actionCTVBDen,
	actionDefaultVBDen,
	actionKetThucVB,
	actionNguoiXLVBDenNew,
	actionNoiDungXL,
	actionThongTinXL,
	actionTraVB,
	capNhatThongTinSuccess,
	chuyenBoSungComplete,
	chuyenChuyenVienSuccess,
	chuyenDonViCompelete,
	layTatCaChuyenVien,
	themChuyenXLComplete,
	themLuuTruVanBanAction,
	tiepNhanVanBanSuccess,
	updateChuyenXLComplete,
} from '@redux/actions/vbden';
import {
	dismissLoading,
	getUserLogin,
	showAlert,
	showLoading,
	showMessageSuccess,
	showMessageWarning,
} from '@utils/index';
import React, {createRef, memo, useEffect, useMemo, useState} from 'react';
import {View} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import {fetchPOST} from 'src/connections/connections';
import TabTitleComponent from './components/TabTitleComponent';
import styles from './style';

export interface Props {
	chiTietVanBanDenResponse?: ApiResponse<{
		documentIn?: VanBan;
		process?: Process;
	}>;
	noidungXLResponse?: ApiResponse<any>;
	chuyenDonViResponse?: ApiResponse<any>;
	tiepNhanVanBanResponse?: ApiResponse<any>;
	chuyenChuyenVienResponse?: ApiResponse<any>;
	thongTinXLResponse?: ApiResponse<any>;
	capNhatThongTinResponse?: ApiResponse<any>;
	themChuyenXLResponse?: ApiResponseNoData;
	updateChuyenXLResponse?: ApiResponseNoData;
	ketthucVBResponse?: ApiResponseNoData;
	traVBResponse?: ApiResponseNoData;
	chuyenBoSungResponse?: ApiResponseNoData;
	layQuyenChucNangRespone?: ApiResponse<any>;
	token?: string;
	themLuuTruVanBanResponse?: ApiResponse<any>;
}

export interface RouteParams {
	id?: string;
	status?: number;
	onRefresh?: () => void;
}

const CTVBDenScreen = (props: Props) => {
	const viewPagerRef = createRef<ViewPager>();
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
	const dispatch = useDispatch();
	const routeParams: RouteParams = useRoute().params as RouteParams;
	const {
		chiTietVanBanDenResponse,
		noidungXLResponse,
		chuyenDonViResponse,
		tiepNhanVanBanResponse,
		chuyenChuyenVienResponse,
		thongTinXLResponse,
		capNhatThongTinResponse,
		themChuyenXLResponse,
		updateChuyenXLResponse,
		ketthucVBResponse,
		traVBResponse,
		chuyenBoSungResponse,
		layQuyenChucNangRespone,
		token,
		themLuuTruVanBanResponse,
	} = props;

	const [tabSelected, setTabSelected] = useState(0);
	const [data, setData] = useState<{
		documentIn?: VanBan;
		process?: Process;
	}>();
	const [thongTinXL, setThongTinXL] = useState<any>();
	const [user, setUser] = useState<UserInfo>();

	function isShowBtnThuHoi() {
		return (
			data?.documentIn &&
			data?.documentIn?.status === 3 &&
			data?.process &&
			data.process?.status === 9
		);
	}

	const tabData =
		routeParams.status == 1 ||
		routeParams.status == 2 ||
		routeParams.status == 11 ||
		isShowBtnBoSungDonVi() ||
		isShowBtnThuHoi() ||
		_chuyenHoSoLuTru()
			? ['Thông tin chung', 'Xử lý', 'Lịch sử xử lý']
			: ['Thông tin chung', 'Lịch sử xử lý'];

	useEffect(() => {
		let useInfo2: any = {};
		if (token) {
			const userInfo = getUserLogin(token);
			useInfo2 = userInfo;
			console.log('===>>>> userInfo', userInfo);
			setUser(userInfo);
			dispatch(danhSachNguoiXuLy(routeParams.id));
			//call api timTheoId
			dispatch(timTheoId(userInfo.deptId));
		}
		showLoading();
		// thay api lấy người xử lý
		if (useInfo2 && useInfo2?.roleCode === RoleType.LDP) {
			dispatch(layTatCaChuyenVien());
		} else {
			dispatch(
				actionNguoiXLVBDenNew({
					idVanBan: routeParams.id,
				}),
			);
		}
		// dispatch(
		// 	actionNguoiXLVBDen({
		// 		idVanBan: routeParams.id,
		// 		isKhongLayUserDaNhan: true,
		// 		type: 'tree',
		// 	}),
		// );
		dispatch(timTheoMaAction('VT'));
		dispatch(actionLayDonViDeXuat({}));
		getData();
		return () => {
			dispatch(actionDefaultVBDen());
			dispatch(actionDefault());
		};
	}, []);

	function getData() {
		dispatch(actionCTVBDen({id: routeParams.id}));
		dispatch(actionNoiDungXL({idVanBan: routeParams.id}));
		dispatch(actionThongTinXL({id: routeParams.id}));
	}

	useMemo(() => {
		if (!chiTietVanBanDenResponse) return;
		console.log('===>>>> chiTietVanBanDenResponse', chiTietVanBanDenResponse);

		dismissLoading();
		if (chiTietVanBanDenResponse.success) {
			setData(chiTietVanBanDenResponse.data);
		} else showMessageWarning(chiTietVanBanDenResponse.error);
	}, [chiTietVanBanDenResponse]);

	useMemo(() => {
		if (!thongTinXLResponse) return;
		if (thongTinXLResponse.success) {
			setThongTinXL(thongTinXLResponse.data);
		}
		// else
		//     showMessageWarning(thongTinXLResponse.error)
	}, [thongTinXLResponse]);
	useMemo(() => {
		if (!capNhatThongTinResponse) return;
		if (capNhatThongTinResponse.success) {
			showMessageSuccess('Chuyển xử lý thành công');
			_backandrefresh();
		} else showMessageWarning('Chuyển xử lý không thành công');
	}, [capNhatThongTinResponse]);

	//themLuuTruVanBanResponse
	useMemo(() => {
		if (!themLuuTruVanBanResponse) return;
		if (themLuuTruVanBanResponse.success) {
			showMessageSuccess(
				themLuuTruVanBanResponse.message || 'Chuyển hồ sơ lưu trữ thành công',
			);
			_backandrefresh();
		} else showMessageWarning('Chuyển hồ sơ lưu trữ không thành công');
	}, [themLuuTruVanBanResponse]);

	useMemo(() => {
		if (!themChuyenXLResponse) return;
		if (themChuyenXLResponse.success) {
			showMessageSuccess('Chuyển xử lý thành công');
			_backandrefresh();
		} else showMessageWarning('Chuyển xử lý không thành công');
	}, [themChuyenXLResponse]);

	useMemo(() => {
		if (!chuyenDonViResponse) return;
		if (chuyenDonViResponse.success) {
			showMessageSuccess('Chuyển đơn vị thành công');
			_backandrefresh();
		} else showMessageWarning('Chuyển đơn vị không thành công');
	}, [chuyenDonViResponse]);

	useMemo(() => {
		if (!tiepNhanVanBanResponse) return;
		if (tiepNhanVanBanResponse.success) {
			showMessageSuccess('Tiếp nhận văn bản thành công');
			_backandrefresh();
		} else showMessageWarning('Tiếp nhận văn bản không thành công');
	}, [tiepNhanVanBanResponse]);

	useMemo(() => {
		if (!chuyenChuyenVienResponse) return;
		if (chuyenChuyenVienResponse.success) {
			showMessageSuccess('Chuyển chuyên viên thành công');
			_backandrefresh();
		} else showMessageWarning('Chuyển chuyên viên thất bại');
	}, [chuyenChuyenVienResponse]);

	useMemo(() => {
		if (!updateChuyenXLResponse) return;
		if (updateChuyenXLResponse.success) {
			showMessageSuccess('Chuyển xử lý thành công');
			_backandrefresh();
		} else showMessageWarning(updateChuyenXLResponse.error);
	}, [updateChuyenXLResponse]);

	useMemo(() => {
		if (!ketthucVBResponse) return;
		if (ketthucVBResponse.success) {
			showMessageSuccess('Kết thúc văn bản thành công');
			_backandrefresh();
		} else showMessageWarning(ketthucVBResponse.error);
	}, [ketthucVBResponse]);

	useMemo(() => {
		if (!traVBResponse) return;
		dismissLoading();
		if (traVBResponse.success) {
			showMessageSuccess('Trả văn bản thành công');
			_backandrefresh();
		} else showMessageWarning(traVBResponse.error);
	}, [traVBResponse]);

	useMemo(() => {
		if (!chuyenBoSungResponse) return;
		dismissLoading();
		if (chuyenBoSungResponse.success) {
			showMessageSuccess('Chuyển bổ sung thành công thành công');
			_backandrefresh();
		} else showMessageWarning(chuyenBoSungResponse.error);
	}, [chuyenBoSungResponse]);

	// check văn bản đã xử lý
	function checkIsResolve() {
		return data?.process && data.process.status === 9;
	}

	// isShowBtnBoSungDonVi
	function isShowBtnBoSungDonVi() {
		return (
			user &&
			(user.roleCode === ROLE.LDDV || user.roleCode === ROLE.LDVP) &&
			data?.process &&
			data.process.status === 9
		);
	}

	// show btn bổ sung ý kiến
	function isShowBtnBoLanhDaoYKien() {
		return user && user.roleCode === ROLE.LDVP && checkIsResolve();
	}

	function _onTrinhXuLy(param?: any) {
		// const nguoiDuocDeXuat = param.nguoiDuocDeXuat.map((item: any) => {
		//     return {
		//         ...item,
		//         tenDonVi: item.name,
		//         kieuXuLy: item.processType
		//     }
		// })
		// const nguoiXuLy = param.nguoiXuLy.map((item: any) => {
		//     return {
		//         ...item,
		//         receiceUserId: item.id,
		//         receiceUserName: item.fullName,
		//         id: undefined
		//     }
		// })
		// if (thongTinXL.id) {
		// 	dispatch(
		// 		actionUpdateChuyenXL({
		// 			...param,
		// 			id: thongTinXL.id,
		// 		}),
		// 	);
		// } else dispatch(actionThemChuyenXL({...param}));
		// showAlert({
		// 	message: 'Xác nhận chuyển văn bản?',
		// 	rightAction: () => {

		// 	},
		// });
		showAlert({
			message: 'Bạn chắc chắn muốn chuyển xử lý',
			rightAction: async () => {
				if (thongTinXL.id) {
					// dispatch(
					// 	actionUpdateChuyenXL({
					// 		...param,
					// 		id: thongTinXL.id,
					// 	}),
					// );
					try {
						const res: any = await fetchPOST(
							`api/QuyTrinhXuLyVB/CapNhatThongTin`,
							token,
							{
								...param,
								id: thongTinXL.id,
							},
						);
						dispatch(updateChuyenXLComplete(res));
					} catch (e) {
						dispatch(
							updateChuyenXLComplete({
								success: false,
								message: 'Bạn vui lòng kiểm tra lại kết nối.',
							}),
						);
					}
				} else {
					try {
						const res: any = await fetchPOST(`api/QuyTrinhXuLyVB/ThemMoi`, token, {
							...param,
						});
						dispatch(themChuyenXLComplete(res));
					} catch (e) {
						dispatch(
							themChuyenXLComplete({
								success: false,
								message: 'Bạn vui lòng kiểm tra lại kết nối.',
							}),
						);
					}
				}
				// dispatch(actionThemChuyenXL({...param}));
			},
		});
	}

	function _onDuyetVB(param?: any) {
		if (!noidungXLResponse?.data || !noidungXLResponse?.data.id) {
			showMessageWarning(noidungXLResponse?.error);
			return;
		}

		showAlert({
			message: 'Bạn chắc chắn muốn duyệt văn bản?',
			rightAction: () => {
				dispatch(
					actionKetThucVB({
						...param,
						id: noidungXLResponse?.data.id,
						fileUpload:
							chiTietVanBanDenResponse?.data?.documentIn?.fileUploads?.toString(),
					}),
				);
			},
		});
	}

	function _onTraVB(noiDung?: string, userId?: string) {
		setTimeout(() => {
			showAlert({
				message: 'Bạn chắc chắn muốn trả văn bản',
				rightAction: () => {
					showLoading();
					dispatch(
						actionTraVB({
							idVanBan: routeParams.id,
							userId: userId,
							message: noiDung,
						}),
					);
				},
			});
		}, 500);
	}

	function _onChuyenBoSung(param?: any) {
		const nguoiDuocDeXuat = param;

		showAlert({
			message: 'Bạn chắc chắn muốn chuyển bổ sung?',
			rightAction: async () => {
				showLoading();
				// dispatch(actionChuyenBoSung(nguoiDuocDeXuat));
				try {
					const res: any = await fetchPOST(
						`api/VanBanDen/BoSungDonViXuLy`,
						token,
						nguoiDuocDeXuat,
					);
					dispatch(chuyenBoSungComplete(res));
				} catch (e) {
					dispatch(
						chuyenBoSungComplete({
							success: false,
							message: 'Bạn vui lòng kiểm tra lại kết nối.',
						}),
					);
				}
			},
		});
	}

	function _onKetThuc(param?: any) {
		showAlert({
			message: 'Bạn chắc chắn muốn chuyển kết thúc văn bản?',
			rightAction: () => {
				dispatch(
					actionKetThucVB({
						idVanBan: routeParams.id,
						id: noidungXLResponse?.data.id,
						fileUpload:
							chiTietVanBanDenResponse?.data?.documentIn?.fileUploads?.toString(),
					}),
				);
			},
		});
	}

	function _backandrefresh() {
		navigation.pop();
		if (routeParams.onRefresh) routeParams.onRefresh();
	}

	function _isVanThu() {
		return user?.roleCode === RoleType.VT;
	}
	// phân quyền nút chức năng
	function _isTrinh() {
		if (data?.process && data?.process?.actionNext && data?.process?.actionNext.length > 0) {
			const checkTrinh = data.process.actionNext.find(
				item => item.key === ActionNextType.TRINH,
			);
			return !!checkTrinh && data.process?.status == 0;
		}
		return false;
	}

	//check hien thi nut thêm đơn vị xử lý newwwww
	function _checkShowDVXL() {
		let isActionButton = false;
		if (
			data?.process &&
			(data.process.status === PROCESS_STATUS.DOING ||
				data.process.status === PROCESS_STATUS.FINISH ||
				data.process.status === PROCESS_STATUS.RECALL ||
				data.process.status === PROCESS_STATUS.RETURN)
		) {
			isActionButton = false;
		} else {
			if (
				(data?.documentIn && data.documentIn.status === DOCUMENT_IN_STATUS.DaHoanThanh) ||
				(data?.documentIn && data?.documentIn.status === DOCUMENT_IN_STATUS.TuChoi) ||
				(data?.documentIn && data?.documentIn.status === DOCUMENT_IN_STATUS.ThuHoi)
			) {
				isActionButton = false;
			} else isActionButton = true;
		}
		return (
			isActionButton &&
			layQuyenChucNangRespone &&
			layQuyenChucNangRespone?.data.isDeXuatThongTin &&
			data?.process &&
			!(data?.process.processType === 1 || data?.process.processType === 4) &&
			user &&
			user.roleCode !== 'LDP' &&
			user.roleCode !== VANTHU_TONGCUC.ROLE_CODE &&
			// check van bản chưa xử lý
			!checkIsResolve()
		);
	}

	//is xu ly van ban form
	function _isXuLyVanBanForm() {
		if (user && user.roleCode === CHUYEN_VIEN.ROLE_CODE) {
			return false;
		} else {
			if (
				(user && user.roleCode === LANHDAO_PHONG.ROLE_CODE) ||
				(user &&
					user.roleCode === LANHDAO_DONVI.ROLE_CODE &&
					user.deptCode !== CONTANTS.CodeTCDT)
			) {
				return false;
			} else {
				return false;
			}
		}
	}

	function isElectronDoc() {
		if (user && user.roleCode === VANTHU_TONGCUC.ROLE_CODE) {
			return data?.documentIn && data?.documentIn.isElectron;
		}
		return false;
	}

	// check gui tra newwwww
	function _isGuiTraNew() {
		return (
			!_isXuLyVanBanForm() &&
			user &&
			user.roleCode !== 'VT' &&
			layQuyenChucNangRespone &&
			layQuyenChucNangRespone?.data.isTraLai &&
			data?.documentIn &&
			data?.documentIn?.createdBy !== user.userId &&
			data?.documentIn?.status !== 2 &&
			!isElectronDoc() &&
			data?.process &&
			!(data?.process.processType === 1 || data?.process.processType === 4) &&
			// check van bản chưa xử lý
			!checkIsResolve()
		);
	}

	//check trình newwww
	function _checkTrinhNew() {
		return (
			data?.process &&
			data.process.status === 0 &&
			user &&
			(user.roleCode === ROLE.LDVP || user.roleCode === ROLE.VT) &&
			!(
				data.process &&
				data.process.status === 0 &&
				data?.documentIn &&
				data?.documentIn?.isSigned
			)
		);
	}

	//check hien thi nút thêm người xử lý
	function _checkShowBtnAddPersionResolve() {
		// is action button
		let isActionButton = false;
		if (
			data?.process &&
			(data?.process.status === PROCESS_STATUS.DOING ||
				data?.process.status === PROCESS_STATUS.FINISH ||
				data?.process.status === PROCESS_STATUS.RECALL ||
				data?.process.status === PROCESS_STATUS.RETURN)
		) {
			isActionButton = false;
		} else {
			if (
				(data?.documentIn && data?.documentIn.status === DOCUMENT_IN_STATUS.DaHoanThanh) ||
				(data?.documentIn && data?.documentIn.status === DOCUMENT_IN_STATUS.TuChoi) ||
				(data?.documentIn && data?.documentIn.status === DOCUMENT_IN_STATUS.ThuHoi)
			) {
				isActionButton = false;
			} else isActionButton = true;
		}
		//is trinh
		let checkTrinh = false;
		if (data?.process && data?.process?.actionNext && data?.process?.actionNext.length > 0) {
			const findCheck = data.process.actionNext.find(
				item => item.key === ACTION_NEXT.TRINH || item.key === ACTION_NEXT.CHUYEN_CAP_PHO,
			);
			if (findCheck) {
				checkTrinh = true;
			} else {
				checkTrinh = false;
			}
		}

		const _isLanhDaoPheDuyet = (data?.documentIn && data?.documentIn?.isSigned) || false;
		const _isShowBtnLDVPChuyenDonVi =
			data?.process && data.process.status === 0 && _isLanhDaoPheDuyet;

		return (
			!_isShowBtnLDVPChuyenDonVi &&
			isActionButton &&
			checkTrinh &&
			layQuyenChucNangRespone &&
			layQuyenChucNangRespone?.data.isChuyenXuLy &&
			data?.documentIn &&
			data?.documentIn.status !== 1 &&
			!_isXuLyVanBanForm() &&
			user &&
			!(user.roleCode === 'LDDV' && !user.isLeader) &&
			!(user.roleCode === 'LDP' && !user.isLeader) &&
			!user.isLock &&
			// check van bản chưa xử lý
			!checkIsResolve()
		);
	}

	function checkShowInfoResolveVT() {
		return (
			_isVanThu() &&
			data?.documentIn &&
			data?.documentIn.status === 1 &&
			// check van bản chưa xử lý
			!checkIsResolve()
		);
	}

	//title form trình
	function titleFormTrinh() {
		let _titleFormTrinh = 'Thêm người xử lý';
		if (user && user.roleCode === LANHDAO_DONVI.ROLE_CODE && user.isLeader) {
			_titleFormTrinh = 'Thông tin chuyển cấp phó';
		}
		return _titleFormTrinh;
	}

	//check show Thông tin đề xuất đơn vị xử lý
	function _checkIsSuggestDVXL() {
		return (
			layQuyenChucNangRespone &&
			data?.documentIn &&
			!(data.documentIn?.status === 1 || data.documentIn?.status === 2) &&
			!_isXuLyVanBanForm() &&
			// check van bản chưa xử lý
			!checkIsResolve()
		);
	}

	// check chuyen xu ly
	function isShowBtnChuyenXuLyToCV() {
		return (
			data?.process &&
			data?.process.status === 0 &&
			user &&
			user.roleCode === LANHDAO_PHONG.ROLE_CODE
		);
	}

	function isShowBtnLDVPChuyenDonVi(): {status: boolean; typeVB: any; priorityId: any} {
		return {
			status:
				(data?.process &&
					data?.process.status === 0 &&
					data?.documentIn &&
					data?.documentIn?.isSigned) ||
				false,
			typeVB: data && data.documentIn && data.documentIn?.type,
			priorityId:
				data &&
				data?.documentIn &&
				Number.isInteger(data?.documentIn.priorityId) &&
				data?.documentIn.priorityId
					? data?.documentIn.priorityId.toString()
					: null,
		};
	}

	function _isChuyenCP() {
		// if (
		// 	data?.process &&
		// 	data?.process?.actionName &&
		// 	data?.process?.actionName === ActionNextType.CHUYEN_CAP_PHO
		// ) {
		// 	return true;
		// }
		// if (data?.process && data?.process?.actionNext && data?.process?.actionNext.length > 0) {
		// 	const checkChuyenCP = data.process.actionNext.find(
		// 		item => item.key === ActionNextType.CHUYEN_CAP_PHO,
		// 	);
		// 	return !!checkChuyenCP && data.process?.status == 0;
		// }
		// return false;

		// check chuyen newwwww via web code :v
		if (data && data?.process && data?.process.processType === 4) {
			return false;
		}
		//Văn bản đang xử lý và trưởng đơn vị hoặc cấp phó chủ trì
		return (
			data?.process &&
			data?.process.status == 0 &&
			!(
				data?.process &&
				data?.process.status == 0 &&
				user &&
				user.roleCode == LANHDAO_PHONG.ROLE_CODE
			) &&
			((user?.roleCode == ROLE.LDDV && user.isLeader) ||
				(user?.roleCode == ROLE.LDDV && !user?.isLeader && data?.process.processType == 0))
		);
	}

	function _isChuyenDV() {
		if (data?.process && data?.process?.actionNext && data?.process?.actionNext.length > 0) {
			const checkChuyenDV = data.process.actionNext.find(
				item => item.key === ActionNextType.CHUYEN_DON_VI,
			);
			return !!checkChuyenDV && data.process?.status == 0;
		}
		return false;
	}

	function _isChuyenXL() {
		if (user && data) {
			if (_isVanThu()) {
				return !!layQuyenChucNangRespone?.data.isChuyenXuLy && data.process?.status !== 9;
			}
			return (
				!!layQuyenChucNangRespone?.data.isChuyenXuLy &&
				data.process?.status !== 9 &&
				data.process &&
				data.process.processType !== 1
			);
		}
		return false;
	}

	function _getTitleTrinh() {
		// if (_isChuyenCP()) return 'Chuyển cấp phó';
		if (_checkTrinhNew()) return 'Trình';
		if (_isChuyenCP() || isShowBtnLDVPChuyenDonVi().status) return 'Chuyển';
		if (_isChuyenDV()) return 'Chuyển đơn vị';
		return 'Chuyển xử lý';
	}

	function _isDuyet() {
		if (user && data) {
			return (
				user.roleCode === RoleType.CV &&
				!!layQuyenChucNangRespone?.data.isXuLyVanBan &&
				!data.documentIn?.isElectron
			);
		}
		return false;
	}

	function _isKetThuc() {
		if (user && data) {
			return (
				data.process &&
				data.process.status === 0 &&
				(user.roleCode === ROLE.LDDV ||
					user.roleCode === ROLE.LDP ||
					user.roleCode === ROLE.CV)
			);
		}
		return false;

		// if (user && data) {
		// 	return (
		// 		(user.roleCode === RoleType.CV ||
		// 			user.roleCode === RoleType.LDP ||
		// 			(user.roleCode === RoleType.LDDV && user.deptCode !== '000.00.32.G12')) &&
		// 		!!layQuyenChucNangRespone?.data.isXuLyVanBan &&
		// 		!data.documentIn?.isElectron
		// 	);
		// }
		// return false;
	}

	function _chuyenHoSoLuTru() {
		return data && data.documentIn?.status === 4 && !isElectronDoc() && user && !user.isLock;
	}

	const _themLuuTruVanBan = (param: any) => {
		dispatch(themLuuTruVanBanAction(param));
	};

	const _boSungYKien = (param: any) => {
		showLoading();
		dispatch(boSungLanhDaoXyLy(param));
	};

	const _onLDVPChuyenDonVi = (paramLDVPChuyenDonVi: any) => {
		showAlert({
			message: 'Xác nhận chuyển văn bản?',
			rightAction: async () => {
				try {
					const res: any = await fetchPOST(
						`api/QuyTrinhXuLyVB/LDVPChuyenDonVi`,
						token,
						paramLDVPChuyenDonVi,
					);
					dispatch(chuyenDonViCompelete(res));
				} catch (e) {
					dispatch(
						chuyenDonViCompelete({
							success: false,
							message: 'Bạn vui lòng kiểm tra lại kết nối.',
						}),
					);
				}
			},
		});
	};

	const _onChuyenDonVi = async (param: any) => {
		try {
			const res: any = await fetchPOST(`api/QuyTrinhXuLyVB/ChuyenDonVi`, token, param);
			dispatch(chuyenDonViCompelete(res));
		} catch (e) {
			dispatch(
				chuyenDonViCompelete({
					success: false,
					message: 'Bạn vui lòng kiểm tra lại kết nối.',
				}),
			);
		}
	};

	const _onChuyenChuyenVien = async (newParamChuyenChuyenVien: any) => {
		showAlert({
			message: 'Xác nhận chuyển văn bản?',
			rightAction: async () => {
				try {
					const res: any = await fetchPOST(
						`api/QuyTrinhXuLyVB/ChuyenChuyenVien`,
						token,
						newParamChuyenChuyenVien,
					);
					dispatch(chuyenChuyenVienSuccess(res));
				} catch (e) {
					dispatch(
						chuyenChuyenVienSuccess({
							success: false,
							message: 'Bạn vui lòng kiểm tra lại kết nối.',
						}),
					);
				}
			},
		});
	};

	const _onCapNhatThongTin = (param: any) => {
		showAlert({
			message: 'Xác nhận trình văn bản',
			rightAction: async () => {
				showLoading();
				// dispatch(capNhatThongTin(param));
				try {
					const res: any = await fetchPOST(`api/VanBanDen/CapNhatThongTin`, token, param);
					dispatch(capNhatThongTinSuccess(res));
				} catch (e) {
					dispatch(
						capNhatThongTinSuccess({
							success: false,
							message: 'Bạn vui lòng kiểm tra lại kết nối.',
						}),
					);
				}
			},
		});
	};

	const _onTiepNhanVanBan = async (param: any) => {
		// dispatch(tiepNhanVanBan(param));
		try {
			const res: any = await fetchPOST(`api/VanBanDen/TiepNhanVanBan`, token, param);
			dispatch(tiepNhanVanBanSuccess(res));
		} catch (e) {
			dispatch(
				tiepNhanVanBanSuccess({
					success: false,
					message: 'Bạn vui lòng kiểm tra lại kết nối.',
				}),
			);
		}
	};

	function _isTra() {
		if (user && data) {
			return (
				user.roleCode !== RoleType.CV &&
				!!layQuyenChucNangRespone?.data.isTraLai &&
				data.documentIn?.createdBy !== user.userId &&
				data.documentIn?.status !== 2 &&
				!data?.documentIn?.isElectron &&
				data?.process &&
				data?.process?.status !== 9 &&
				data?.process?.processType !== 1
			);
		}
		return false;
	}

	function _isThuHoi() {
		if (user && data) {
			return (
				!!layQuyenChucNangRespone?.data.isThuHoi &&
				data.documentIn &&
				data.documentIn?.status == 3 &&
				data.process &&
				data.process.status == 9
			);
		}
		return false;
	}

	function _isChuyenBS() {
		if (user && data) {
			return !!layQuyenChucNangRespone?.data.isBoSungDonVi && data?.process?.status === 9;
		}
		return false;
	}
	// từ chối văn bản
	const _onTuChoiVB = (param: any) => {
		console.log('==>>>> param', param);
	};

	// phân quyền nút chức năng

	function _getViewDS(index: number) {
		if (data) {
			if (index == 0)
				return (
					<ThongTinChungComponent
						key={index}
						dataDen={data}
						type={DocumentType.VAN_BAN_DEN}
					/>
				);
			if (
				routeParams.status === 1 ||
				routeParams.status === 2 ||
				routeParams.status === 11 ||
				isShowBtnBoSungDonVi() ||
				isShowBtnThuHoi() ||
				_chuyenHoSoLuTru()
			) {
				if (index === 1) {
					return (
						<XuLyComponent
							key={index}
							id={routeParams.id}
							type={DocumentType.VAN_BAN_DEN}
							isDV={_isTrinh() || _isChuyenDV() || _isChuyenCP()}
							isTrinh={_isTrinh() || _isChuyenDV() || _isChuyenCP() || _isChuyenXL()}
							// isChuyenCP={_isChuyenCP()}
							titleTrinh={_getTitleTrinh()}
							onTrinhXuLy={_onTrinhXuLy}
							isDuyet={_isDuyet()}
							isKetThuc={_isKetThuc()}
							onDuyetVB={_onDuyetVB}
							// isTra={_isTra()}
							isTraNew={_isGuiTraNew()}
							// isThuHoi={_isThuHoi()}
							isThuHoi={isShowBtnThuHoi()}
							onTraVB={_onTraVB}
							isChuyenBS={_isChuyenBS()}
							onChuyenBoSung={_onChuyenBoSung}
							onKetThuc={_onKetThuc}
							isComment={_isChuyenCP()}
							isShowBtnLDVPChuyenDonVi={isShowBtnLDVPChuyenDonVi()}
							isVT={_isVanThu()}
							isTiepNhan={routeParams.status === 11}
							isLDP={user && user.roleCode === RoleType.LDP}
							isCheckShowDVXL={_checkShowDVXL()}
							ischeckShowBtnAddPersionResolve={_checkShowBtnAddPersionResolve()}
							titleFormTrinh={titleFormTrinh()}
							checkIsSuggestDVXL={_checkIsSuggestDVXL()}
							checkShowInfoResolveVT={checkShowInfoResolveVT()}
							isShowBtnBoSungDonVi={isShowBtnBoSungDonVi()}
							isChuyenXuLy={isShowBtnChuyenXuLyToCV()}
							onTuChoiVB={_onTuChoiVB}
							isShowBoSungYKien={isShowBtnBoLanhDaoYKien()}
							isChuyenHoSoLuTru={_chuyenHoSoLuTru()}
							onThemLuuTruVanBan={_themLuuTruVanBan}
							boSungYKienVBDen={_boSungYKien}
							onLDVPChuyenDonVi={_onLDVPChuyenDonVi}
							onChuyenDonVi={_onChuyenDonVi}
							onChuyenChuyenVien={_onChuyenChuyenVien}
							onCapNhatThongTin={_onCapNhatThongTin}
							onTiepNhanVanBan={_onTiepNhanVanBan}
						/>
					);
				}
				if (index === 2)
					return (
						<LichSuXuLyComponent
							key={index}
							id={routeParams.id}
							type={DocumentType.VAN_BAN_DEN}
						/>
					);
			} else {
				if (index === 1)
					return (
						<LichSuXuLyComponent
							key={index}
							id={routeParams.id}
							type={DocumentType.VAN_BAN_DEN}
						/>
					);
			}
		}
	}

	return (
		<View style={{flex: 1}}>
			<HeaderComponent title="Chi tiết văn bản đến" />
			<View style={{padding: 10, flex: 1, backgroundColor: '#fff'}}>
				<View style={styles.tab}>
					{tabData.map((item, index) => (
						<TouchComponent
							key={index}
							onPress={() => viewPagerRef?.current?.setPage(index)}>
							<TabTitleComponent title={item} isActive={index === tabSelected} />
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
		</View>
	);
};

const mapStateToProps = (state: any) => {
	return {
		chiTietVanBanDenResponse: state.vbden.chiTietVanBanDenResponse,
		themLuuTruVanBanResponse: state.vbden.themLuuTruVanBanResponse,
		chuyenDonViResponse: state.vbden.chuyenDonViResponse,
		tiepNhanVanBanResponse: state.vbden.tiepNhanVanBanResponse,
		chuyenChuyenVienResponse: state.vbden.chuyenChuyenVienResponse,
		noidungXLResponse: state.vbden.noidungXLResponse,
		thongTinXLResponse: state.vbden.thongTinXLResponse,
		capNhatThongTinResponse: state.vbden.capNhatThongTinResponse,
		themChuyenXLResponse: state.vbden.themChuyenXLResponse,
		updateChuyenXLResponse: state.vbden.updateChuyenXLResponse,
		ketthucVBResponse: state.vbden.ketthucVBResponse,
		traVBResponse: state.vbden.traVBResponse,
		chuyenBoSungResponse: state.vbden.chuyenBoSungResponse,
		layQuyenChucNangRespone: state.setting.layQuyenChucNangRespone,
		token: state.configs.token,
	};
};

export default connect(mapStateToProps)(memo(CTVBDenScreen));
