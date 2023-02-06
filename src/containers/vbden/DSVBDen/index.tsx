import React, {memo, useState, useEffect, useMemo, createRef} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import styles from './style';
import DSVBDenItemComponent from './components/DSVBDenItemComponent';
import {
	HeaderComponent,
	SearchModalComponent,
	MenuBottomComponent,
	ModalInputComponent,
	ModalTraVBComponent,
	ModalDonViComponent,
	DSFilesModalComponent,
} from '@components/index';
import {StackNavigationProp} from '@react-navigation/stack';
import {CTVBDenRoute, RootStackParamList} from '@navigations/NameRoute';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
	actionChuyenBoSung,
	actionDefaultVBDen,
	actionDSVBDen,
	actionDSVBDenTrongDv,
	actionThongKeVBDen,
	actionThongTinTraVB,
	actionThongTinXL,
	actionTraVB,
} from '@redux/actions/vbden';
import {ApiResponse} from '@models/ApiResponse';
import {
	showLoading,
	dismissLoading,
	showAlert,
	showMessageSuccess,
	showMessageWarning,
	formatDateTimeZ,
} from '@utils/index';
import {VanBan} from '@models/VanBan';
import DocumentType from '@commons/DocumentType';
import {actionLayFileDinhKem, actionLayTatCaFilterTree} from '@redux/actions/quanly';
import FlatListComponent from '@components/FlatListComponent';
import {Menu} from '@models/Menu';
import dayjs from 'dayjs';
import ActionNextType from '@commons/ActionNextType';
import RoleType from '@commons/RoleType';
import {UserInfo} from '@models/UserInfo';
import {actionLayQuyenChucNang} from '@redux/actions/setting';
import {ApiResponseNoData} from '@models/ApiResponseNoData';
import {DonVi} from '@models/DonVi';
import ViewPager from '@react-native-community/viewpager';
import {actionLayTatCaChucNangUser} from '@redux/actions/authen';
export interface Props {
	listVanBanDenResponse?: ApiResponse<Array<VanBan>>;
	listVanBanDenTrongDvResponse?: ApiResponse<Array<VanBan>>;
	layQuyenChucNangRespone?: ApiResponse<any>;
	thongtinTraVBResponse?: ApiResponse<Array<any>>;
	traVBResponse?: ApiResponseNoData;
	listTatCaFilterTreeResponse?: ApiResponse<any>;
	listFileResponse?: ApiResponse<any>;
	chuyenBoSungResponse?: ApiResponseNoData;
	thongTinXLResponse?: ApiResponse<any>;
	thongTinTrinhXLResponse?: ApiResponse<Array<any>>;
	userInfo: UserInfo;
}

export interface RouteParams {
	status?: number;
	menu?: Array<Menu>;
}

const DSVBDenScreen = (props: Props) => {
	const viewPagerRef = createRef<ViewPager>();
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
	const routeParams: RouteParams = useRoute().params as RouteParams;
	const dispatch = useDispatch();
	const {
		listVanBanDenResponse,
		listVanBanDenTrongDvResponse,
		layQuyenChucNangRespone,
		userInfo,
		thongtinTraVBResponse,
		traVBResponse,
		listTatCaFilterTreeResponse,
		listFileResponse,
		chuyenBoSungResponse,
		thongTinXLResponse,
		thongTinTrinhXLResponse,
	} = props;
	const [tabSelected, setTabSelected] = useState(0);
	const [dsVBDen, setDSVBDen] = useState<Array<VanBan>>([]);
	const [dsVBDenTrongDv, setDsVBDenTrongDv] = useState<Array<VanBan>>([]);
	const [idXL, setIdXL] = useState<string>();
	const [isVisibleSearch, setIsVisibleSearch] = useState<boolean>(false);
	const [isVisibleDuyet, setIsVisibleDuyet] = useState<boolean>(false);
	const [isVisibleTra, setIsVisibleTra] = useState<boolean>(false);
	const [isVisibleDonVi, setIsVisibleDonVi] = useState<boolean>(false);
	const [isVisibleFile, setIsVisibleFile] = useState({
		visible: false,
		id: '',
	});
	const [listDonVi, setListDonVi] = useState<Array<DonVi>>();
	const [listSelectDonVi, setListSelectDonVi] = useState<Array<DonVi>>([]);
	const [menuData, setMenuData] = useState();
	const [menuSelected, setMenuSelected] = useState(routeParams?.status);
	const [pageInfoTrongDv, setPageInfoTrongDv] = useState<{
		pageInfo: {page: number; pageSize: number};
		isLoadMore: boolean;
		needMore: boolean;
	}>({
		pageInfo: {
			page: 1,
			pageSize: 10,
		},
		isLoadMore: false,
		needMore: true,
	});
	const [paramDS, setParamDS] = useState<{
		pageInfo: {page: number; pageSize: number};
		isLoadMore: boolean;
		needMore: boolean;
		status: number | undefined;
		searchKeyword?: string;
		documentTypeId?: string;
		soVanBan?: string;
		soDen?: string;
		documentCode?: string;
		ngayVanBanDenTuNgay?: any;
		ngayVanBanDenDenNgay?: any;
		ngayVanBanTuNgay?: any;
		ngayVanBanDenNgay?: any;
		searchDoKhan?: string;
		trangThaiKySo?: string;
		searchNoiGui?: string;
		isVanBanTrongTCDT?: boolean;
	}>({
		pageInfo: {
			page: 1,
			pageSize: 10,
		},
		isLoadMore: false,
		needMore: true,
		status: routeParams?.status,
		searchKeyword: undefined,
		documentTypeId: undefined,
		soVanBan: undefined,
		soDen: undefined,
		documentCode: undefined,
		ngayVanBanDenTuNgay: undefined,
		ngayVanBanDenDenNgay: undefined,
		ngayVanBanTuNgay: undefined,
		ngayVanBanDenNgay: undefined,
		searchDoKhan: undefined,
		trangThaiKySo: undefined,
		searchNoiGui: undefined,
		isVanBanTrongTCDT: menuSelected === 11 ? false : undefined,
	});

	// useFocusEffect(
	//   React.useCallback(() => {
	//     const newMenu: any = routeParams?.menu?.map((menu, index) => {
	//       return {
	//         ...menu,
	//         isActive: menu.status == routeParams?.status
	//       }
	//     })
	//     setMenuData(newMenu)
	//     setDSVBDen([])
	//     showLoading()
	//     _getDSVBDen()
	//     dispatch(actionLayQuyenChucNang({ controller: 'VanBanDen' }))
	//     return () => {
	//       dispatch(actionDefaultVBDen());
	//     };
	//   }, [])
	// );

	useEffect(() => {
		const newMenu: any = routeParams?.menu?.map((menu, index) => {
			return {
				...menu,
				isActive: menu.status == routeParams?.status,
			};
		});
		setMenuData(newMenu);
		setDSVBDen([]);
		setDsVBDenTrongDv([]);
		showLoading();
		_getDSVBDen();
		menuSelected === 11 && _getDSVBDenTrongDv();
		dispatch(actionLayQuyenChucNang({controller: 'VanBanDen'}));
		dispatch(actionLayTatCaFilterTree({}));
		return () => {
			dispatch(actionDefaultVBDen());
			dispatch(actionThongKeVBDen());
		};
	}, []);

	function _getDSVBDen() {
		dispatch(actionDSVBDen(paramDS));
	}

	function _getDSVBDenTrongDv() {
		const param = {
			...paramDS,
			isVanBanTrongTCDT: true,
		};
		dispatch(actionDSVBDenTrongDv(param));
	}

	useMemo(() => {
		if (!listVanBanDenTrongDvResponse) return;
		dismissLoading();
		if (listVanBanDenTrongDvResponse.success) {
			if (
				listVanBanDenTrongDvResponse.data &&
				listVanBanDenTrongDvResponse.data?.length > 0
			) {
				const pageInfo = {
					...pageInfoTrongDv.pageInfo,
					page: pageInfoTrongDv.pageInfo.page + 1,
				};
				setPageInfoTrongDv({
					isLoadMore: false,
					needMore:
						listVanBanDenTrongDvResponse.data?.length ===
						pageInfoTrongDv.pageInfo.pageSize,
					pageInfo,
				});
				const ds = dsVBDenTrongDv.concat(listVanBanDenTrongDvResponse.data);
				setDsVBDenTrongDv(ds);
			} else {
				setPageInfoTrongDv({...pageInfoTrongDv, isLoadMore: false, needMore: false});
			}
		}
		// setDsVBDenTrongDv(listVanBanDenTrongDvResponse.data || []);
	}, [listVanBanDenTrongDvResponse]);

	useMemo(() => {
		if (!listVanBanDenResponse) return;
		dismissLoading();
		if (listVanBanDenResponse.success) {
			if (listVanBanDenResponse.data && listVanBanDenResponse.data?.length > 0) {
				const pageInfo = {
					...paramDS.pageInfo,
					page: paramDS.pageInfo.page + 1,
				};
				setParamDS({
					...paramDS,
					isLoadMore: false,
					needMore: listVanBanDenResponse.data?.length == paramDS.pageInfo.pageSize,
					pageInfo,
				});
				const ds = dsVBDen.concat(listVanBanDenResponse.data);
				setDSVBDen(ds);
			} else {
				setParamDS({...paramDS, isLoadMore: false, needMore: false});
			}
		}
	}, [listVanBanDenResponse]);

	// useMemo(() => {
	//   if (!listTatCaFilterTreeResponse) return;
	//   if (listTatCaFilterTreeResponse.success) {
	//     const list = listTatCaFilterTreeResponse.data[0].children.map((donvi: any) => {
	//       return {
	//         value: donvi.key,
	//         name: donvi.title,
	//       }
	//     })
	//     setListDonVi(list)
	//   }
	// }, [listTatCaFilterTreeResponse]);

	useMemo(() => {
		if (!thongtinTraVBResponse) return;
		if (thongtinTraVBResponse.success) {
			if (idXL) setIsVisibleTra(true);
		}
	}, [thongtinTraVBResponse]);

	useMemo(() => {
		if (!traVBResponse) return;
		dismissLoading();
		if (traVBResponse.success) {
			showMessageSuccess('Trả văn bản thành công');
			_onRefresh();
		} else showMessageWarning(traVBResponse.error);
	}, [traVBResponse]);

	useMemo(() => {
		if (!chuyenBoSungResponse) return;
		dismissLoading();
		if (chuyenBoSungResponse.success) {
			showMessageSuccess('Chuyển bổ sung thành công thành công');
			_onRefresh();
		} else showMessageWarning(chuyenBoSungResponse.error);
	}, [chuyenBoSungResponse]);

	// useMemo(() => {
	//   if (!thongTinXLResponse) return
	//   dismissLoading()
	//   if (thongTinXLResponse.success) {
	//     showAlert({
	//       message: 'Bạn chắc chắn muốn chuyển xử lý',
	//       rightAction: () => {
	//           if (thongTinXLResponse.data.id) {
	//               dispatch(actionUpdateChuyenXL({
	//                   ...param,
	//                   id: thongTinXLResponse.data.id,
	//                   nguoiDuocDeXuat,
	//                   nguoiXuLy
	//               }))
	//           } else
	//               dispatch(actionThemChuyenXL({ ...param, nguoiDuocDeXuat, nguoiXuLy }))
	//       }
	//   })
	//   }
	// }, [thongTinXLResponse])

	useMemo(() => {
		if (!thongTinTrinhXLResponse) return;
		dismissLoading();
		if (thongTinTrinhXLResponse.success) {
			if (thongTinTrinhXLResponse.data && thongTinTrinhXLResponse.data?.length > 0)
				dispatch(actionThongTinXL({id: idXL}));
			else showMessageWarning('Chưa có thông tin lãnh đạo xử lý.');
		}
	}, [thongTinTrinhXLResponse]);

	function _onLoadMore() {
		setParamDS({...paramDS, isLoadMore: true});
		_getDSVBDen();
	}

	function _onLoadMoreTrongDv() {
		setPageInfoTrongDv({...pageInfoTrongDv, isLoadMore: true});
		const param = {
			...paramDS,
			pageInfo: pageInfoTrongDv.pageInfo,
			isLoadMore: pageInfoTrongDv.isLoadMore,
			needMore: pageInfoTrongDv.needMore,
			isVanBanTrongTCDT: true,
		};
		dispatch(actionDSVBDenTrongDv(param));
	}

	function _onSearch(type?: string, param?: any) {
		setIsVisibleSearch(false);
		setDSVBDen([]);
		showLoading();
		paramDS.pageInfo.page = 1;
		if (type === 'Y') {
			const start = dayjs().startOf('year');
			const end = dayjs().endOf('year');
			paramDS.ngayVanBanTuNgay = start;
			paramDS.ngayVanBanDenNgay = end;
			_getDSVBDen();
			return;
		}

		if (type === 'M') {
			const start = dayjs().startOf('month');
			const end = dayjs().endOf('month');
			paramDS.ngayVanBanTuNgay = start;
			paramDS.ngayVanBanDenNgay = end;
			_getDSVBDen();
			return;
		}

		if (type === 'W') {
			const start = dayjs().startOf('week');
			const end = dayjs().endOf('week');
			paramDS.ngayVanBanTuNgay = start;
			paramDS.ngayVanBanDenNgay = end;
			_getDSVBDen();
			return;
		}

		if (type === 'D') {
			const start = dayjs().startOf('day');
			const end = dayjs().endOf('day');
			paramDS.ngayVanBanTuNgay = start;
			paramDS.ngayVanBanDenNgay = end;
			_getDSVBDen();
			return;
		}

		if (param) {
			paramDS.searchKeyword = param.searchKeyword;
			paramDS.documentTypeId = param.documentTypeId?.value;
			paramDS.soVanBan = param.soVanBan?.value;
			paramDS.soDen = param.soDen;
			paramDS.documentCode = param.documentCode;
			paramDS.ngayVanBanDenTuNgay = formatDateTimeZ(param.ngayVanBanDenTuNgay);
			paramDS.ngayVanBanDenDenNgay = formatDateTimeZ(param.ngayVanBanDenDenNgay);
			paramDS.ngayVanBanTuNgay = formatDateTimeZ(param.ngayVanBanTuNgay);
			paramDS.ngayVanBanDenNgay = formatDateTimeZ(param.ngayVanBanDenNgay);
			paramDS.searchDoKhan = param.searchDoKhan;
			paramDS.trangThaiKySo = param.trangThaiKySo;
			paramDS.searchNoiGui = param.searchNoiGui;
			_getDSVBDen();
			return;
		}
	}

	function _onMenuBottom(status?: number) {
		const newMenu: any = routeParams?.menu?.map((menu, index) => {
			return {
				...menu,
				isActive: menu.status == status,
			};
		});
		setMenuSelected(status);
		setMenuData(newMenu);
		setDSVBDen([]);
		setDsVBDenTrongDv([]);
		showLoading();
		paramDS.pageInfo.page = 1;
		pageInfoTrongDv.pageInfo.page = 1;
		paramDS.status = status;
		_getDSVBDen();
		_getDSVBDenTrongDv();
	}

	function _onDocumentItem(id?: string) {
		setIdXL(undefined);
		navigation.push(CTVBDenRoute, {id, status: paramDS.status, onRefresh: _onRefresh});
	}

	function _onFilePress(id?: string) {
		if (id) setIsVisibleFile({visible: true, id});
		const param = {
			idVanBan: id || '',
			loai: DocumentType.VAN_BAN_DEN,
			onlyFilePublic: false,
		};
		// showLoading();
		dispatch(actionLayFileDinhKem(param));
	}

	function _onRefresh() {
		setDSVBDen([]);
		const paramRefresh: any = {
			pageInfo: {
				page: 1,
				pageSize: 10,
			},
			isLoadMore: false,
			needMore: true,
			status: paramDS?.status,
			isVanBanTrongTCDT: menuSelected === 11 ? false : undefined,
		};
		setParamDS(paramRefresh);
		dispatch(actionDSVBDen(paramRefresh));
	}

	function _onRefreshTrongDv() {
		setDsVBDenTrongDv([]);
		const param = {
			...paramDS,
			pageInfo: {
				page: 1,
				pageSize: 10,
			},
			isVanBanTrongTCDT: true,
		};
		const paramRefresh: any = {
			pageInfo: {
				page: 1,
				pageSize: 10,
			},
			isLoadMore: false,
			needMore: true,
		};
		setPageInfoTrongDv(paramRefresh);
		dispatch(actionDSVBDenTrongDv(param));
	}

	function _onVisibleTra(id?: string) {
		setIdXL(id);
		dispatch(actionThongTinTraVB({id}));
	}

	function _onVisibleChuyenBS(id?: string) {
		setIdXL(id);
		setIsVisibleDonVi(true);
	}

	function traVB(noiDung: string, userId: string) {
		setIsVisibleTra(false);
		showAlert({
			message: 'Bạn chắc chắn muốn trả văn bản',
			rightAction: () => {
				showLoading();
				dispatch(
					actionTraVB({
						idVanBan: idXL,
						userId: userId,
						message: noiDung,
					}),
				);
			},
		});
	}

	function _onTrinhXL(id?: string) {
		setIdXL(id);
		showMessageWarning('Chưa có thông tin lãnh đạo xử lý.');
		// showLoading()
		// dispatch(actionThongTinTrinhXL({ id }))
	}

	function _onDuyetVB(param?: any) {
		// if (!noidungXLResponse?.data || !noidungXLResponse?.data.id) {
		//     showMessageWarning(noidungXLResponse?.error)
		//     return
		// }
		// showAlert({
		//     message: 'Bạn chắc chắn muốn duyệt văn bản?',
		//     rightAction: () => {
		//         dispatch(actionKetThucVB({
		//             ...param,
		//             id: noidungXLResponse?.data.id,
		//             fileUpload: chiTietVanBanDenResponse?.data?.documentIn?.fileUploads?.toString()
		//         }))
		//     }
		// })
	}

	function _onSelectDV(item: DonVi) {
		const newList: any = listDonVi?.map((element: DonVi) => {
			return {
				...element,
				isSelect: item.value === element.value ? !element.isSelect : element.isSelect,
			};
		});
		setListDonVi(newList);
	}

	// function _onSelectHTDV(item: DonVi, processType?: string) {
	// 	const newList: any = listDonVi?.map((element: DonVi) => {
	// 		return {
	// 			...element,
	// 			processType:
	// 				item.value === element.value ? Number(processType) - 1 : element.processType,
	// 		};
	// 	});
	// 	setListDonVi(newList);
	// }

	// function _onSelectHXLDV(item: DonVi, hanXuly: any) {
	// 	const newList: any = listDonVi?.map((element: DonVi) => {
	// 		return {
	// 			...element,
	// 			hanXuLy: item.value === element.value ? hanXuly : element.hanXuLy,
	// 		};
	// 	});
	// 	setListDonVi(newList);
	// }

	// function _onSelectNDDV(item: DonVi, noiDung: string) {
	// 	const newList: any = listDonVi?.map((element: DonVi) => {
	// 		return {
	// 			...element,
	// 			noiDung: item.value === element.value ? noiDung : element.noiDung,
	// 		};
	// 	});
	// 	setListDonVi(newList);
	// }

	function _onSelectAcceptDV() {
		setIsVisibleDonVi(false);
		const newList: any = listDonVi?.filter(item => item.isSelect);
		setListSelectDonVi(newList);

		const newListDV: any = listDonVi?.filter(
			item =>
				item.isSelect &&
				(item.processType == 0 || item.processType == 1 || item.processType == 2),
		);
		if (newListDV.length == 0) {
			showMessageWarning('Bạn phải thêm đơn vị xử lý.');
			return;
		}

		const nguoiDuocDeXuat = newListDV.map((item: any) => {
			return {
				...item,
				tenDonVi: item.name,
				kieuXuLy: item.processType,
			};
		});
		showAlert({
			message: 'Bạn chắc chắn muốn chuyển bổ sung?',
			rightAction: () => {
				showLoading();
				dispatch(actionChuyenBoSung({idVanBan: idXL, nguoiDuocDeXuat}));
			},
		});
	}

	// phân quyền nút chức năng
	function _isTrinh(data: any) {
		if (data?.process && data?.process?.actionNext && data?.process?.actionNext.length > 0) {
			const checkTrinh = data.process.actionNext.find(
				(item: any) =>
					item.key === ActionNextType.TRINH || item.key === ActionNextType.CHUYEN_CAP_PHO,
			);
			return !!checkTrinh && paramDS.status == 1;
		}
		return false;
	}

	function _isDuyet(data: any) {
		if (userInfo && data) {
			return (
				userInfo.roleCode === RoleType.CV &&
				!!layQuyenChucNangRespone?.data.isXuLyVanBan &&
				!data?.isElectron
			);
		}
		return false;
	}

	function _isTra(data: any) {
		if (userInfo && data) {
			return (
				paramDS.status == 1 &&
				userInfo.roleCode !== RoleType.CV &&
				!!layQuyenChucNangRespone?.data.isTraLai &&
				data?.createdBy !== userInfo.userId &&
				data?.status !== 2 &&
				!data?.isElectron &&
				data?.process &&
				data?.process?.processType !== 1
			);
		}
		return false;
	}

	function _isChuyenBS(data: any) {
		if (userInfo && data) {
			return !!layQuyenChucNangRespone?.data.isBoSungDonVi && data?.process?.status == 9;
		}
		return false;
	}
	// phân quyền nút chức năng

	const renderItem = (item: VanBan, index: number) => (
		<DSVBDenItemComponent
			key={index}
			item={item}
			isTrinh={_isTrinh(item)}
			onTrinhPress={_onTrinhXL}
			isDuyet={_isDuyet(item)}
			isTra={_isTra(item)}
			onTraPress={_onVisibleTra}
			isChuyenBS={_isChuyenBS(item)}
			onChuyenBSPress={_onVisibleChuyenBS}
			onItemPress={_onDocumentItem}
			onFilePress={_onFilePress}
		/>
	);

	return (
		<View style={{flex: 1}}>
			<HeaderComponent
				title="Danh sách văn bản đến"
				isSearch={true}
				showFilter={() => setIsVisibleSearch(true)}
			/>
			<View style={styles.documentReceived}>
				<View style={styles.viewList}>
					{/* <ButtonDateSearchComponent
						onYear={() => _onSearch('Y')}
						onMonth={() => _onSearch('M')}
						onWeek={() => _onSearch('W')}
						onDay={() => _onSearch('D')}
					/> */}
					{menuSelected === 11 ? (
						<>
							<View style={{flexDirection: 'row', paddingVertical: 10}}>
								<TouchableOpacity
									onPress={() => viewPagerRef?.current?.setPage(0)}
									style={[
										styles.btnTop,
										{backgroundColor: tabSelected === 0 ? '#187779' : '#fff'},
									]}>
									<Text
										style={{
											color: tabSelected === 0 ? '#fff' : '#000',
											textAlign: 'center',
										}}>
										Văn bản đến đơn vị
									</Text>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => viewPagerRef?.current?.setPage(1)}
									style={[
										styles.btnTop,
										{backgroundColor: tabSelected === 1 ? '#187779' : '#fff'},
									]}>
									<Text
										style={{
											color: tabSelected === 1 ? '#fff' : '#000',
											textAlign: 'center',
										}}>
										Văn bản đến ngoài đơn vị
									</Text>
								</TouchableOpacity>
							</View>
							<View style={{flex: 1}}>
								<ViewPager
									ref={viewPagerRef}
									style={styles.viewPager}
									initialPage={0}
									onPageSelected={event => {
										setTabSelected(event.nativeEvent.position);
									}}>
									<View>
										<FlatListComponent
											listData={dsVBDenTrongDv}
											isLoadMore={pageInfoTrongDv.isLoadMore}
											needMore={pageInfoTrongDv.needMore}
											buildItem={renderItem}
											onLoadMore={_onLoadMoreTrongDv}
											onRefresh={_onRefreshTrongDv}
										/>
									</View>
									<View>
										<FlatListComponent
											listData={dsVBDen}
											isLoadMore={paramDS.isLoadMore}
											needMore={paramDS.needMore}
											buildItem={renderItem}
											onLoadMore={_onLoadMore}
											onRefresh={_onRefresh}
										/>
									</View>
								</ViewPager>
							</View>
						</>
					) : (
						<FlatListComponent
							listData={dsVBDen}
							isLoadMore={paramDS.isLoadMore}
							needMore={paramDS.needMore}
							buildItem={renderItem}
							onLoadMore={_onLoadMore}
							onRefresh={_onRefresh}
						/>
					)}
				</View>
				<MenuBottomComponent menu={menuData} getDS={_onMenuBottom} />
			</View>
			<ModalTraVBComponent
				type={DocumentType.VAN_BAN_DEN}
				isVisible={isVisibleTra}
				closePopup={() => setIsVisibleTra(false)}
				onAccept={traVB}
			/>
			<ModalInputComponent
				isVisible={isVisibleDuyet}
				closePopup={() => setIsVisibleDuyet(false)}
				onAccept={_onDuyetVB}
			/>
			<ModalDonViComponent
				isVisible={isVisibleDonVi}
				data={listDonVi}
				onSelect={_onSelectDV}
				// onSelectHT={_onSelectHTDV}
				// onSelectHXL={_onSelectHXLDV}
				// onSelectND={_onSelectNDDV}
				onSelectAccept={_onSelectAcceptDV}
				closePopup={() => setIsVisibleDonVi(false)}
			/>
			<SearchModalComponent
				isVisible={isVisibleSearch}
				type={DocumentType.VAN_BAN_DEN}
				closePopup={() => setIsVisibleSearch(false)}
				onYear={() => _onSearch('Y')}
				onMonth={() => _onSearch('M')}
				onWeek={() => _onSearch('W')}
				onDay={() => _onSearch('D')}
				onSearchForm={param => _onSearch('S', param)}
			/>
			<DSFilesModalComponent
				isVisible={isVisibleFile.visible}
				id={isVisibleFile.id}
				type={DocumentType.VAN_BAN_DEN}
				closePopup={() => setIsVisibleFile({visible: false, id: ''})}
			/>
		</View>
	);
};

const mapStateToProps = (state: any) => {
	return {
		listVanBanDenResponse: state.vbden.listVanBanDenResponse,
		listVanBanDenTrongDvResponse: state.vbden.listVanBanDenTrongDvResponse,
		layQuyenChucNangRespone: state.setting.layQuyenChucNangRespone,
		thongtinTraVBResponse: state.vbden.thongtinTraVBResponse,
		traVBResponse: state.vbden.traVBResponse,
		listTatCaFilterTreeResponse: state.quanly.listTatCaFilterTreeResponse,
		listFileResponse: state.quanly.listFileResponse,
		chuyenBoSungResponse: state.vbden.chuyenBoSungResponse,
		thongTinXLResponse: state.vbden.thongTinXLResponse,
		thongTinTrinhXLResponse: state.vbden.thongTinTrinhXLResponse,
		userInfo: state.setting.userInfo,
	};
};

export default connect(mapStateToProps)(memo(DSVBDenScreen));
