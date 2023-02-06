import DocumentStatus from '@commons/DocumentStatus';
import DocumentType from '@commons/DocumentType';
import FlatListComponent from '@components/FlatListComponent';
import {HeaderComponent, MenuBottomComponent, SearchModalComponent} from '@components/index';
import {ApiResponse} from '@models/ApiResponse';
import {Menu} from '@models/Menu';
import {VanBan} from '@models/VanBan';
import {CTGiaoViecRoute, RootStackParamList} from '@navigations/NameRoute';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {actionDSGiaoViec} from '@redux/actions/giaoviec';
import {actionLayFileDinhKem} from '@redux/actions/quanly';
import {dismissLoading, showLoading} from '@utils/index';
import dayjs from 'dayjs';
import React, {memo, useEffect, useMemo, useState} from 'react';
import {View} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import DSGiaoViecItemComponent from './components/DSGiaoViecItemComponent';
import styles from './style';

export interface Props {
	dsGiaoViecResponse?: ApiResponse<Array<VanBan>>;
}

export interface RouteParams {
	status?: number;
	menu?: Array<Menu>;
}

const DSGiaoViecScreen = (props: Props) => {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
	const routeParams: RouteParams = useRoute().params as RouteParams;
	const dispatch = useDispatch();
	const {dsGiaoViecResponse} = props;
	const [dsGiaoViec, setDSGiaoViec] = useState<Array<VanBan>>([]);
	const [isVisibleSearch, setIsVisibleSearch] = useState<boolean>(false);
	const [menuData, setMenuData] = useState();
	const [paramDS, setParamDS] = useState<{
		pageInfo: {page: number; pageSize: number};
		isLoadMore: boolean;
		needMore: boolean;
		status: number | undefined;
		searchNgayTaoTuNgay: any;
		searchNgayTaoDenNgay: any;
		seachTrichYeu: string;
		searchDViSoanThao: string;
		searchHanXuLyTuNgay: any;
		searchHanXuLyDenNgay: any;
		searchDoKhan: string;
		searchKeyword: string;
		searchSo: string;
		searchSoVanBan: string;
		searchTrangThai: string;
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
		seachTrichYeu: '',
		searchDViSoanThao: '',
		searchHanXuLyTuNgay: undefined,
		searchHanXuLyDenNgay: undefined,
		searchDoKhan: '',
		searchKeyword: '',
		searchSo: '',
		searchSoVanBan: '',
		searchTrangThai: '',
	});

	useEffect(() => {
		const newMenu: any = routeParams?.menu?.map((menu, index) => {
			return {
				...menu,
				isActive: menu.status === routeParams?.status,
			};
		});
		setMenuData(newMenu);
		setDSGiaoViec([]);
		showLoading();
		_getDSGiaoViec();
	}, []);

	function _getDSGiaoViec() {
		dispatch(actionDSGiaoViec(paramDS));
	}

	useMemo(() => {
		if (!dsGiaoViecResponse) return;
		dismissLoading();
		if (dsGiaoViecResponse.success) {
			if (dsGiaoViecResponse.data && dsGiaoViecResponse.data?.length > 0) {
				const pageInfo = {
					...paramDS.pageInfo,
					page: paramDS.pageInfo.page + 1,
				};
				setParamDS({
					...paramDS,
					isLoadMore: false,
					needMore: dsGiaoViecResponse.data?.length == paramDS.pageInfo.pageSize,
					pageInfo,
				});
				const ds = dsGiaoViec.concat(dsGiaoViecResponse.data);
				setDSGiaoViec(ds);
			} else {
				setParamDS({...paramDS, isLoadMore: false, needMore: false});
			}
		}
	}, [dsGiaoViecResponse]);

	function _onLoadMore() {
		setParamDS({...paramDS, isLoadMore: true});
		_getDSGiaoViec();
	}

	function _onSearch(type?: string, param?: any) {
		setIsVisibleSearch(false);
		setDSGiaoViec([]);
		showLoading();
		paramDS.pageInfo.page = 1;
		if (type === 'Y') {
			const start = dayjs().startOf('year');
			const end = dayjs().endOf('year');
			paramDS.searchNgayTaoTuNgay = start;
			paramDS.searchNgayTaoDenNgay = end;
			_getDSGiaoViec();
			return;
		}

		if (type === 'M') {
			const start = dayjs().startOf('month');
			const end = dayjs().endOf('month');
			paramDS.searchNgayTaoTuNgay = start;
			paramDS.searchNgayTaoDenNgay = end;
			_getDSGiaoViec();
			return;
		}

		if (type === 'W') {
			const start = dayjs().startOf('week');
			const end = dayjs().endOf('week');
			paramDS.searchNgayTaoTuNgay = start;
			paramDS.searchNgayTaoDenNgay = end;
			_getDSGiaoViec();
			return;
		}

		if (type === 'D') {
			const start = dayjs().startOf('day');
			const end = dayjs().endOf('day');
			paramDS.searchNgayTaoTuNgay = start;
			paramDS.searchNgayTaoDenNgay = end;
			_getDSGiaoViec();
			return;
		}

		if (param) {
			paramDS.seachTrichYeu = param.seachTrichYeu;
			paramDS.searchDViSoanThao = param.searchDViSoanThao;
			paramDS.searchDoKhan = param.searchDoKhan;
			paramDS.searchHanXuLyTuNgay = param.searchHanXuLyTuNgay;
			paramDS.searchHanXuLyDenNgay = param.searchHanXuLyDenNgay;
			paramDS.searchKeyword = param.searchKeyword;
			paramDS.searchNgayTaoTuNgay = param.searchNgayTaoTuNgay;
			paramDS.searchNgayTaoDenNgay = param.searchNgayTaoDenNgay;
			paramDS.searchSo = param.searchSo;
			paramDS.searchSoVanBan = param.searchSoVanBan;
			paramDS.searchTrangThai = param.searchTrangThai;
			_getDSGiaoViec();
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
		setDSGiaoViec([]);
		showLoading();
		paramDS.pageInfo.page = 1;
		paramDS.status = status;
		_getDSGiaoViec();
	}

	function _onDocumentItem(id?: string) {
		navigation.push(CTGiaoViecRoute, {id, status: paramDS.status, onRefresh: _onRefresh});
	}

	function _onFilePress(id?: string) {
		const param = {
			idVanBan: id,
			loai: DocumentType.TO_TRINH,
			onlyFilePublic: false,
		};
		showLoading();
		dispatch(actionLayFileDinhKem(param));
	}

	function _onRefresh() {
		setDSGiaoViec([]);
		const paramRefresh: any = {
			pageInfo: {
				page: 1,
				pageSize: 10,
			},
			isLoadMore: false,
			needMore: true,
			status: routeParams?.status,
		};
		setParamDS(paramRefresh);
		dispatch(actionDSGiaoViec(paramRefresh));
	}

	function isChuyenXuLy(data: any) {
		return !(
			data &&
			((data.userProcess && data.userProcess.status == 9) ||
				data.status == DocumentStatus.DA_KY_DUYET)
		);
	}

	const renderItem = (item: any, index: number) => (
		<DSGiaoViecItemComponent
			key={index}
			item={item}
			onItemPress={_onDocumentItem}
			onFilePress={_onFilePress}
		/>
	);

	return (
		<View style={{flex: 1}}>
			<HeaderComponent
				title="Danh sách phiếu giao việc"
				isSearch={true}
				showFilter={() => setIsVisibleSearch(true)}
			/>
			<View style={styles.documentReceived}>
				<View style={styles.viewList}>
					<FlatListComponent
						listData={dsGiaoViec}
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
		</View>
	);
};

const mapStateToProps = (state: any) => {
	return {
		dsGiaoViecResponse: state.giaoviec.dsGiaoViecResponse,
	};
};

export default connect(mapStateToProps)(memo(DSGiaoViecScreen));
