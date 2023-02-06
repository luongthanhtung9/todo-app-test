import React, {memo, useEffect, useMemo, useState} from 'react';
import {View} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import styles from './style';
import {actionLayFileDinhKem} from '@redux/actions/quanly';
import {
	HeaderComponent,
	SearchModalComponent,
	FlatListComponent,
	MenuBottomComponent,
} from '@components/index';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ApiResponse} from '@models/ApiResponse';
import {CTVBDiRoute, RootStackParamList} from '@navigations/NameRoute';
import {dismissLoading, formatDateTimeZ, showLoading} from '@utils/index';
import {
	actionDSVBDi,
	actionDSPhatHanhVBDi,
	dsPhatHanhVBDiComplete,
	dsVBDiComplete,
} from '@redux/actions/vbdi';
import {VanBan} from '@models/VanBan';
import {Menu} from '@models/Menu';
import dayjs from 'dayjs';
import DocumentType from '@commons/DocumentType';
import DSVBDiItemComponent from './components/DSVBDiItemComponent';

export interface Props {
	dsVanBanDiResponse: ApiResponse<Array<any>>;
	dsPhatHanhVanBanDiResponse: ApiResponse<Array<any>>;
}
export interface RouteParams {
	status?: number;
	menu?: Array<Menu>;
}

const DSVBDiScreen = (props: Props) => {
	const routeParams: RouteParams = useRoute().params as RouteParams;
	const [showDSFile, setShowDSFile] = useState<boolean>(false);
	const [showModalFilter, setShowModalFilter] = useState<boolean>(false);
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
	const dispatch = useDispatch();
	const [dsVanBanDi, setDSVanBanDi] = useState<Array<VanBan>>([]);
	const [statusSelected, setStatusSelected] = useState(1);
	const {dsVanBanDiResponse, dsPhatHanhVanBanDiResponse} = props;
	const [dataVBDi, setDataVBDi] = useState<Array<any>>();
	const [menuData, setMenuData] = useState();
	const [isVisibleSearch, setIsVisibleSearch] = useState<boolean>(false);
	const [paramDS, setParamDS] = useState<{
		isConfirmed: boolean;
		pageInfo: {page: number; pageSize: number};
		isLoadMore: boolean;
		needMore: boolean;
		status: number | undefined;
		searchDViSoanThao: any;
		searchDoKhan: any;
		searchHanXuLy: any;
		searchLoaiVanBan: any;
		searchNgayTaoDenNgay: any;
		searchNgayTaoTuNgay: any;
		searchNgayVanBanDenNgay: any;
		searchNgayVanBanTuNgay: any;
		searchNguoiSoanThao: any;
		searchNoiNhan: any;
		searchSoVanBan: any;
		seachTrichYeu: any;
		sendDeptType: any;
		searchHanXuLyTuNgay: any;
		searchHanXuLyDenNgay: any;
	}>({
		isConfirmed: false,
		pageInfo: {
			page: 1,
			pageSize: 10,
		},
		isLoadMore: false,
		needMore: true,
		status: routeParams?.status,
		searchDViSoanThao: null,
		searchDoKhan: null,
		searchHanXuLy: null,
		searchLoaiVanBan: null,
		searchNgayTaoDenNgay: null,
		searchNgayTaoTuNgay: null,
		searchNgayVanBanDenNgay: null,
		searchNgayVanBanTuNgay: null,
		searchNguoiSoanThao: null,
		searchNoiNhan: null,
		searchSoVanBan: null,
		seachTrichYeu: null,
		sendDeptType: null,
		searchHanXuLyTuNgay: null,
		searchHanXuLyDenNgay: null,
	});

	useEffect(() => {
		const newMenu: any = routeParams?.menu?.map((menu, index) => {
			return {
				...menu,
				isActive: menu.status == routeParams?.status,
			};
		});
		setMenuData(newMenu);
		setDSVanBanDi([]);
		showLoading();
		_getDSVanBanDi();
		return () => {
			dispatch(dsVBDiComplete(null));
			dispatch(dsPhatHanhVBDiComplete(null));
		};
	}, []);

	useMemo(() => {
		if (!dsVanBanDiResponse) return;
		dismissLoading();
		if (dsVanBanDiResponse.success) {
			if (dsVanBanDiResponse.data && dsVanBanDiResponse.data?.length > 0) {
				const pageInfo = {
					...paramDS.pageInfo,
					page: paramDS.pageInfo.page + 1,
				};
				setParamDS({
					...paramDS,
					isLoadMore: false,
					needMore: dsVanBanDiResponse.data?.length == paramDS.pageInfo.pageSize,
					pageInfo,
				});
				const ds = dsVanBanDi.concat(dsVanBanDiResponse.data);
				setDSVanBanDi(ds);
			} else {
				setParamDS({...paramDS, isLoadMore: false, needMore: false});
			}
		}
	}, [dsVanBanDiResponse]);

	useMemo(() => {
		if (!dsPhatHanhVanBanDiResponse) return;
		dismissLoading();
		if (dsPhatHanhVanBanDiResponse.success) {
			if (dsPhatHanhVanBanDiResponse.data && dsPhatHanhVanBanDiResponse.data?.length > 0) {
				const pageInfo = {
					...paramDS.pageInfo,
					page: paramDS.pageInfo.page + 1,
				};
				setParamDS({
					...paramDS,
					isLoadMore: false,
					needMore: dsPhatHanhVanBanDiResponse.data?.length == paramDS.pageInfo.pageSize,
					pageInfo,
				});
				const ds = dsVanBanDi.concat(dsPhatHanhVanBanDiResponse.data);
				setDSVanBanDi(ds);
			} else {
				setParamDS({...paramDS, isLoadMore: false, needMore: false});
			}
		}
	}, [dsPhatHanhVanBanDiResponse]);

	function _onLoadMore() {
		setParamDS({...paramDS, isLoadMore: true});
		_getDSVanBanDi();
	}

	function _onSearch(type?: string, param?: any) {
		console.log('test ===>');

		setIsVisibleSearch(false);
		setDSVanBanDi([]);
		showLoading();
		paramDS.pageInfo.page = 1;
		if (type === 'Y') {
			const start = dayjs().startOf('year');
			const end = dayjs().endOf('year');
			paramDS.searchNgayTaoTuNgay = start;
			paramDS.searchNgayTaoDenNgay = end;
			_getDSVanBanDi();
			return;
		}

		if (type === 'M') {
			const start = dayjs().startOf('month');
			const end = dayjs().endOf('month');
			paramDS.searchNgayTaoTuNgay = start;
			paramDS.searchNgayTaoDenNgay = end;
			_getDSVanBanDi();
			return;
		}

		if (type === 'W') {
			const start = dayjs().startOf('week');
			const end = dayjs().endOf('week');
			paramDS.searchNgayTaoTuNgay = start;
			paramDS.searchNgayTaoDenNgay = end;
			_getDSVanBanDi();
			return;
		}

		if (type === 'D') {
			const start = dayjs().startOf('day');
			const end = dayjs().endOf('day');
			paramDS.searchNgayTaoTuNgay = start;
			paramDS.searchNgayTaoDenNgay = end;
			_getDSVanBanDi();
			return;
		}
		if (param) {
			paramDS.seachTrichYeu = param.seachTrichYeu;
			paramDS.searchDViSoanThao = param.searchDViSoanThao;
			paramDS.searchDoKhan = param.searchDoKhan?.value;
			paramDS.searchHanXuLy = param.searchHanXuLy;
			paramDS.searchLoaiVanBan = param.searchLoaiVanBan?.value;
			paramDS.searchNgayTaoDenNgay = formatDateTimeZ(param.searchNgayTaoDenNgay);
			paramDS.searchNgayTaoTuNgay = formatDateTimeZ(param.searchNgayTaoTuNgay);
			paramDS.searchNgayVanBanDenNgay = formatDateTimeZ(param.searchNgayVanBanDenNgay);
			paramDS.searchNgayVanBanTuNgay = formatDateTimeZ(param.searchNgayVanBanTuNgay);
			paramDS.searchNguoiSoanThao = param.searchNguoiSoanThao;
			paramDS.searchHanXuLyTuNgay = formatDateTimeZ(param.searchHanXuLyTuNgay);
			paramDS.searchHanXuLyDenNgay = formatDateTimeZ(param.searchHanXuLyDenNgay);
			paramDS.searchNoiNhan = param.searchNoiNhan;
			paramDS.searchSoVanBan = param.searchSoVanBan;
			paramDS.sendDeptType = param.sendDeptType;
			_getDSVanBanDi();
			return;
		}
	}
	// * call api -----------------------------------------------------------
	function _getDSVanBanDi() {
		console.log(paramDS);
		if (routeParams.status === 15) {
			dispatch(actionDSPhatHanhVBDi(paramDS));
		} else {
			dispatch(actionDSVBDi(paramDS));
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
		setDSVanBanDi([]);
		showLoading();
		paramDS.pageInfo.page = 1;
		paramDS.status = status;
		_getDSVanBanDi();
	}

	function _onDocumentItem(id?: string) {
		navigation.push(CTVBDiRoute, {id, status: paramDS.status, onRefresh: _onRefresh});
	}

	function _onFilePress(id?: string) {
		const param = {
			idVanBan: id,
			loai: DocumentType.VAN_BAN_DI,
			onlyFilePublic: false,
		};
		// showLoading();
		dispatch(actionLayFileDinhKem(param));
	}

	function _onRefresh() {
		setDSVanBanDi([]);
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
		if (routeParams.status === 15) {
			dispatch(actionDSPhatHanhVBDi(paramRefresh));
		} else {
			dispatch(actionDSVBDi(paramRefresh));
		}
	}

	const renderItem = (item: any, index: number) => (
		<DSVBDiItemComponent
			key={index}
			item={item}
			onItemPress={_onDocumentItem}
			onFilePress={_onFilePress}
		/>
	);

	return (
		<View style={{flex: 1}}>
			<HeaderComponent
				title="Văn bản đi"
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
						listData={dsVanBanDi}
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
				type={DocumentType.VAN_BAN_DI}
				closePopup={() => setIsVisibleSearch(false)}
				onYear={() => _onSearch('Y')}
				onMonth={() => _onSearch('M')}
				onWeek={() => _onSearch('W')}
				onDay={() => _onSearch('D')}
				onSearchForm={param => _onSearch('S', param)}
			/>
		</View>
	);
};

const mapStateToProps = (state: any) => {
	return {
		dsVanBanDiResponse: state.vbdi.DSVanBanDiResponse,
		dsPhatHanhVanBanDiResponse: state.vbdi.DSPhatHanhVanBanDiResponse,
	};
};

export default connect(mapStateToProps)(memo(DSVBDiScreen));
