import React, {memo, useState, useEffect, useMemo} from 'react';
import {View} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import styles from './style';
import DSToTrinhItemComponent from './components/DSToTrinhItemComponent';
import {
	HeaderComponent,
	SearchModalComponent,
	MenuBottomComponent,
	ModalTrinhComponent,
	ModalInputComponent,
} from '@components/index';
import {StackNavigationProp} from '@react-navigation/stack';
import {CTToTrinhRoute, RootStackParamList} from '@navigations/NameRoute';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
	actionDefaultToTrinh,
	actionDSToTrinh,
	actionDuyetToTrinh,
	actionKiemTraYKien,
} from '@redux/actions/totrinh';
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
import {actionGetAllLeader, actionLayFileDinhKem} from '@redux/actions/quanly';
import FlatListComponent from '@components/FlatListComponent';
import {Menu} from '@models/Menu';
import dayjs from 'dayjs';
import RoleType from '@commons/RoleType';
import DocumentStatus from '@commons/DocumentStatus';
import {UserInfo} from '@models/UserInfo';
import {Leader} from '@models/Leader';
import {actionDefaultVBDi, actionTrinhXuLy} from '@redux/actions/vbdi';
import {ApiResponseNoData} from '@models/ApiResponseNoData';
import ErrorCode from '@commons/ErrorCode';
export interface Props {
	dsToTrinhResponse?: ApiResponse<Array<VanBan>>;
	listAllLeaderResponse: ApiResponse<Array<Leader>>;
	trinhXuLyResponse?: ApiResponseNoData;
	kiemtraYKienResponse?: ApiResponseNoData;
	duyetToTrinhResponse?: ApiResponseNoData;
	userInfo: UserInfo;
}

export interface RouteParams {
	status?: number;
	menu?: Array<Menu>;
}

const DSToTrinhScreen = (props: Props) => {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
	const routeParams: RouteParams = useRoute().params as RouteParams;
	const dispatch = useDispatch();
	const {
		dsToTrinhResponse,
		userInfo,
		listAllLeaderResponse,
		trinhXuLyResponse,
		kiemtraYKienResponse,
		duyetToTrinhResponse,
	} = props;
	const [dsToTrinh, setDSToTrinh] = useState<Array<VanBan>>([]);
	const [listAllLeader, setListAllLeader] = useState<Array<Leader>>();
	const [listSelectLeader, setListSelectLeader] = useState<Array<Leader>>([]);
	const [isVisibleSearch, setIsVisibleSearch] = useState<boolean>(false);
	const [isVisibleTrinh, setIsVisibleTrinh] = useState<boolean>(false);
	const [isVisibleDuyet, setIsVisibleDuyet] = useState<boolean>(false);
	const [idXL, setIdXL] = useState<string>();
	const [noiDung, setNoiDung] = useState<string>();
	const [menuData, setMenuData] = useState();
	const [paramDS, setParamDS] = useState<{
		pageInfo: {page: number; pageSize: number};
		isLoadMore: boolean;
		needMore: boolean;
		status: number | undefined;
		searchNgayTaoTuNgay?: any;
		searchNgayTaoDenNgay?: any;
		seachTrichYeu?: string;
		searchDViSoanThao?: string;
		searchHanXuLyTuNgay?: any;
		searchHanXuLyDenNgay?: any;
		searchDoKhan?: string;
		searchKeyword?: string;
		searchSo?: string;
		searchSoVanBan?: string;
		searchTrangThai?: string;
	}>({
		pageInfo: {
			page: 1,
			pageSize: 10,
		},
		isLoadMore: false,
		needMore: true,
		status: routeParams?.status,
		searchNgayTaoTuNgay: undefined,
		searchNgayTaoDenNgay: undefined,
		seachTrichYeu: undefined,
		searchDViSoanThao: undefined,
		searchHanXuLyTuNgay: undefined,
		searchHanXuLyDenNgay: undefined,
		searchDoKhan: undefined,
		searchKeyword: undefined,
		searchSo: undefined,
		searchSoVanBan: undefined,
		searchTrangThai: undefined,
	});

	// useFocusEffect(
	//   React.useCallback(() => {
	//     console.log('useFocusEffect', paramDS.status)
	//     const newMenu: any = routeParams?.menu?.map((menu, index) => {
	//       return {
	//         ...menu,
	//         isActive: menu.status == routeParams?.status
	//       }
	//     })
	//     setMenuData(newMenu)
	//     setDSToTrinh([])
	//     showLoading()
	//     _getDSToTrinh()
	//     return () => {
	//       dispatch(actionDefaultToTrinh())
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
		setDSToTrinh([]);
		showLoading();
		dispatch(actionGetAllLeader());
		_getDSToTrinh();
		return () => {
			dispatch(actionDefaultVBDi());
			dispatch(actionDefaultToTrinh());
		};
	}, []);

	function _getDSToTrinh() {
		dispatch(actionDSToTrinh(paramDS));
	}

	useMemo(() => {
		if (!dsToTrinhResponse) return;
		dismissLoading();
		if (dsToTrinhResponse.success) {
			if (dsToTrinhResponse.data && dsToTrinhResponse.data?.length > 0) {
				const pageInfo = {
					...paramDS.pageInfo,
					page: paramDS.pageInfo.page + 1,
				};
				setParamDS({
					...paramDS,
					isLoadMore: false,
					needMore: dsToTrinhResponse.data?.length == paramDS.pageInfo.pageSize,
					pageInfo,
				});
				const ds = dsToTrinh.concat(dsToTrinhResponse.data);
				setDSToTrinh(ds);
			} else {
				setParamDS({...paramDS, isLoadMore: false, needMore: false});
			}
		}
	}, [dsToTrinhResponse]);

	useMemo(() => {
		if (!listAllLeaderResponse) return;
		if (listAllLeaderResponse.success) {
			setListAllLeader(listAllLeaderResponse.data);
		}
	}, [listAllLeaderResponse]);

	useMemo(() => {
		if (!trinhXuLyResponse) return;
		if (trinhXuLyResponse.success) {
			showMessageSuccess('Chuyển xử lý thành công');
		} else showMessageWarning(trinhXuLyResponse.error);
	}, [trinhXuLyResponse]);

	useMemo(() => {
		if (!kiemtraYKienResponse) return;
		if (kiemtraYKienResponse.success) {
			dispatch(
				actionDuyetToTrinh({
					idVanBan: idXL,
					noiDung,
				}),
			);
		} else {
			if (kiemtraYKienResponse.error === ErrorCode.ERROR_100) {
				dispatch(
					actionDuyetToTrinh({
						idVanBan: idXL,
						noiDung,
					}),
				);
			}
			// else
			//   showMessageWarning(kiemtraYKienResponse.error)
		}
	}, [kiemtraYKienResponse]);

	useMemo(() => {
		if (!duyetToTrinhResponse) return;
		if (duyetToTrinhResponse.success) {
			showMessageSuccess('Duyệt văn bản thành công');
		} else showMessageWarning(duyetToTrinhResponse.error);
	}, [duyetToTrinhResponse]);

	function _onLoadMore() {
		setParamDS({...paramDS, isLoadMore: true});
		_getDSToTrinh();
	}

	function _onSearch(type?: string, param?: any) {
		setIsVisibleSearch(false);
		setDSToTrinh([]);
		showLoading();
		paramDS.pageInfo.page = 1;
		if (type === 'Y') {
			const start = dayjs().startOf('year');
			const end = dayjs().endOf('year');
			paramDS.searchNgayTaoTuNgay = start;
			paramDS.searchNgayTaoDenNgay = end;
			_getDSToTrinh();
			return;
		}

		if (type === 'M') {
			const start = dayjs().startOf('month');
			const end = dayjs().endOf('month');
			paramDS.searchNgayTaoTuNgay = start;
			paramDS.searchNgayTaoDenNgay = end;
			_getDSToTrinh();
			return;
		}

		if (type === 'W') {
			const start = dayjs().startOf('week');
			const end = dayjs().endOf('week');
			paramDS.searchNgayTaoTuNgay = start;
			paramDS.searchNgayTaoDenNgay = end;
			_getDSToTrinh();
			return;
		}

		if (type === 'D') {
			const start = dayjs().startOf('day');
			const end = dayjs().endOf('day');
			paramDS.searchNgayTaoTuNgay = start;
			paramDS.searchNgayTaoDenNgay = end;
			_getDSToTrinh();
			return;
		}
		if (param) {
			paramDS.seachTrichYeu = param.seachTrichYeu;
			paramDS.searchDViSoanThao = param.searchDViSoanThao;
			paramDS.searchDoKhan = param.searchDoKhan;
			paramDS.searchHanXuLyTuNgay = formatDateTimeZ(param.searchHanXuLyTuNgay);
			paramDS.searchHanXuLyDenNgay = formatDateTimeZ(param.searchHanXuLyDenNgay);
			paramDS.searchKeyword = param.searchKeyword;
			paramDS.searchNgayTaoTuNgay = formatDateTimeZ(param.searchNgayTaoTuNgay);
			paramDS.searchNgayTaoDenNgay = formatDateTimeZ(param.searchNgayTaoDenNgay);
			paramDS.searchSo = param.searchSo;
			paramDS.searchSoVanBan = param.searchSoVanBan?.value;
			paramDS.searchTrangThai = param.searchTrangThai;
			_getDSToTrinh();
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
		setMenuData(newMenu);
		setDSToTrinh([]);
		showLoading();
		paramDS.pageInfo.page = 1;
		paramDS.status = status;
		_getDSToTrinh();
	}

	function _onDocumentItem(id?: string) {
		navigation.push(CTToTrinhRoute, {id, status: paramDS.status, onRefresh: _onRefresh});
	}

	function _onFilePress(id?: string) {
		const param = {
			idVanBan: id,
			loai: DocumentType.TO_TRINH,
			onlyFilePublic: false,
		};
		// showLoading();
		dispatch(actionLayFileDinhKem(param));
	}

	function _onRefresh() {
		setDSToTrinh([]);
		const paramRefresh: any = {
			pageInfo: {
				page: 1,
				pageSize: 10,
			},
			isLoadMore: false,
			needMore: true,
			status: paramDS?.status,
		};
		setParamDS(paramRefresh);
		dispatch(actionDSToTrinh(paramRefresh));
	}

	function _onTrinhPress(id?: string) {
		setIdXL(id);
		setIsVisibleTrinh(true);
	}

	function _onDuyetPress(id?: string) {
		setIdXL(id);
		setIsVisibleDuyet(true);
	}

	function _duyetxuly(noiDung: string) {
		setIsVisibleDuyet(false);
		setNoiDung(noiDung);
		dispatch(actionKiemTraYKien({idVanBan: idXL}));
		// showAlert({
		//   message: 'Bạn chắc chắn muốn duyệt văn bản?',
		//   rightAction: () => {
		//     dispatch(actionKiemTraYKien({ idVanBan: idXL }))
		//   }
		// })
	}

	function _onSelectAccept() {
		setIsVisibleTrinh(false);
		const newList: any = listAllLeader?.filter(item => item.isSelect);
		setListSelectLeader(newList);
		const newListLeader: any = listAllLeader?.filter(
			item =>
				item.isSelect &&
				(item.processType == 0 || item.processType == 1 || item.processType == 2),
		);
		showAlert({
			message: 'Bạn chắc chắn muốn trình xử lý',
			rightAction: () =>
				dispatch(
					actionTrinhXuLy({
						idVanBan: idXL,
						listTrinhKy: newListLeader,
					}),
				),
		});
	}

	function _onSelect(item: Leader) {
		const newList: any = listAllLeader?.map((element: Leader) => {
			return {
				...element,
				isSelect: item.id === element.id ? !element.isSelect : element.isSelect,
			};
		});
		setListAllLeader(newList);
	}

	function _onSelectHT(item: Leader, processType?: string) {
		const newList: any = listAllLeader?.map((element: Leader) => {
			return {
				...element,
				processType: item.id === element.id ? Number(processType) - 1 : element.processType,
			};
		});
		setListAllLeader(newList);
	}

	function _onSelectHXL(item: Leader, hanXuly: any) {
		const newList: any = listAllLeader?.map((element: Leader) => {
			return {
				...element,
				hanXuLy: item.id === element.id ? hanXuly : element.hanXuLy,
			};
		});
		setListAllLeader(newList);
	}

	function _onSelectND(item: Leader, noiDung: string) {
		const newList: any = listAllLeader?.map((element: Leader) => {
			return {
				...element,
				noiDung: item.id === element.id ? noiDung : element.noiDung,
			};
		});
		setListAllLeader(newList);
	}

	// phân quyền nút chức năng
	function _isTrinh(data: any) {
		if (data) {
			if (paramDS.status == 0 || paramDS.status == 1) {
				return (
					data.process &&
					data.process.status == 0 &&
					data.process.processType == 0 &&
					!(userInfo.roleCode === RoleType.LDDV && userInfo.isLeader) &&
					((data.sendUserId === userInfo.userId &&
						data.status === DocumentStatus.TAO_MOI) ||
						(data.status === DocumentStatus.DANG_XU_LY &&
							userInfo.roleCode !== RoleType.VBTC))
				);
			} else return false;
		}
		return false;
	}

	function _isDuyet(data: any) {
		if (data) {
			if (paramDS.status == 0 || paramDS.status == 1) {
				return (
					data.process &&
					data.process.status == 0 &&
					userInfo.roleCode === RoleType.LDDV &&
					userInfo.isLeader &&
					data.status === DocumentStatus.DANG_XU_LY &&
					userInfo.deptId == data.publishDeptId
				);
			} else return false;
		}
		return false;
	}
	// phân quyền nút chức năng

	const renderItem = (item: any, index: number) => (
		<DSToTrinhItemComponent
			key={index}
			item={item}
			isTrinh={_isTrinh(item)}
			onTrinhPress={_onTrinhPress}
			isDuyet={_isDuyet(item)}
			onDuyetPress={_onDuyetPress}
			onItemPress={_onDocumentItem}
			onFilePress={_onFilePress}
		/>
	);

	return (
		<View style={{flex: 1}}>
			<HeaderComponent
				title="Danh sách tờ trình"
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
					<FlatListComponent
						listData={dsToTrinh}
						isLoadMore={paramDS.isLoadMore}
						needMore={paramDS.needMore}
						buildItem={renderItem}
						onLoadMore={_onLoadMore}
						onRefresh={_onRefresh}
					/>
				</View>
				<MenuBottomComponent menu={menuData} getDS={_onMenuBottom} />
			</View>

			<SearchModalComponent
				isVisible={isVisibleSearch}
				type={DocumentType.TO_TRINH}
				closePopup={() => setIsVisibleSearch(false)}
				onYear={() => _onSearch('Y')}
				onMonth={() => _onSearch('M')}
				onWeek={() => _onSearch('W')}
				onDay={() => _onSearch('D')}
				onSearchForm={param => _onSearch('S', param)}
			/>

			<ModalTrinhComponent
				isVisible={isVisibleTrinh}
				data={listAllLeader}
				onSelect={_onSelect}
				onSelectHT={_onSelectHT}
				onSelectHXL={_onSelectHXL}
				onSelectND={_onSelectND}
				onSelectAccept={_onSelectAccept}
				closePopup={() => setIsVisibleTrinh(false)}
			/>

			<ModalInputComponent
				isVisible={isVisibleDuyet}
				closePopup={() => setIsVisibleDuyet(false)}
				onAccept={_duyetxuly}
			/>
		</View>
	);
};

const mapStateToProps = (state: any) => {
	return {
		dsToTrinhResponse: state.totrinh.dsToTrinhResponse,
		listAllLeaderResponse: state.quanly.listAllLeaderResponse,
		trinhXuLyResponse: state.vbdi.trinhXuLyResponse,
		kiemtraYKienResponse: state.totrinh.kiemtraYKienResponse,
		duyetToTrinhResponse: state.totrinh.duyetToTrinhResponse,
		userInfo: state.setting.userInfo,
	};
};

export default connect(mapStateToProps)(memo(DSToTrinhScreen));
