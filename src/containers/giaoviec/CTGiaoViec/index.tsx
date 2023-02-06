import DocumentStatus from '@commons/DocumentStatus';
import DocumentType from '@commons/DocumentType';
import {
	HeaderComponent,
	LichSuXuLyComponent,
	ThongTinChungComponent,
	TouchComponent,
	XuLyComponent,
} from '@components/index';
import {ApiResponse} from '@models/ApiResponse';
import {ApiResponseNoData} from '@models/ApiResponseNoData';
import {VanBan} from '@models/VanBan';
import {RootStackParamList} from '@navigations/NameRoute';
import ViewPager from '@react-native-community/viewpager';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
	actionChuyenXuLyGV,
	actionCTGiaoViec,
	actionDefaultGV,
	actionKTPhieuGiaoViec,
	actionLayDVGiaoViec,
	actionTCGiaoViec,
} from '@redux/actions/giaoviec';
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
import {connect, RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import TabTitleComponent from './components/TabTitleComponent';
import styles from './style';

export interface Props {
	ctGiaoViecResponse?: ApiResponse<VanBan>;
	ketthucGVResponse?: ApiResponseNoData;
	chuyenXLGVResponse?: ApiResponseNoData;
	xulyCongViecResponse?: ApiResponseNoData;
	layDVGiaoViecResponse?: ApiResponse<any>;
	tcGiaoViecResponse?: ApiResponse<any>;
}

export interface RouteParams {
	id?: string;
	status?: number;
	onRefresh?: () => void;
}

const CTGiaoViecScreen = (props: Props) => {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
	const viewPagerRef = createRef<ViewPager>();
	const dispatch = useDispatch();
	const {token} = useSelector((state: RootStateOrAny) => state.configs);
	const routeParams: RouteParams = useRoute().params as RouteParams;
	const {
		ctGiaoViecResponse,
		ketthucGVResponse,
		chuyenXLGVResponse,
		xulyCongViecResponse,
		tcGiaoViecResponse,
	} = props;

	const [tabSelected, setTabSelected] = useState(0);
	const [data, setData] = useState<VanBan>();
	const tabData =
		routeParams.status == 1
			? ['Thông tin chung', 'Xử lý', 'Lịch sử xử lý']
			: ['Thông tin chung', 'Lịch sử xử lý'];

	useEffect(() => {
		showLoading();
		dispatch(actionCTGiaoViec({id: routeParams.id}));
		dispatch(actionLayDVGiaoViec({}));
		return () => {
			dispatch(actionDefaultGV());
		};
	}, []);

	useMemo(() => {
		if (!ctGiaoViecResponse) return;
		dismissLoading();
		if (ctGiaoViecResponse.success) {
			setData(ctGiaoViecResponse.data);
		} else showMessageWarning(ctGiaoViecResponse.error);
	}, [ctGiaoViecResponse]);

	useMemo(() => {
		if (!ketthucGVResponse) return;
		dismissLoading();
		if (ketthucGVResponse.success) {
			showMessageSuccess('Kết thúc phiếu giao việc thành công.');
			_backandrefresh();
		} else showMessageWarning(ketthucGVResponse.error);
	}, [ketthucGVResponse]);

	useMemo(() => {
		if (!chuyenXLGVResponse) return;
		dismissLoading();
		if (chuyenXLGVResponse.success) {
			showMessageSuccess('Chuyển xử lý phiếu giao việc thành công.');
			_backandrefresh();
		} else showMessageWarning(chuyenXLGVResponse.error);
	}, [chuyenXLGVResponse]);

	useMemo(() => {
		if (!xulyCongViecResponse) return;
		dismissLoading();
		if (xulyCongViecResponse.success) {
			showMessageSuccess('Cập nhật công việc thành công.');
			_backandrefresh();
		} else showMessageWarning(xulyCongViecResponse.error);
	}, [xulyCongViecResponse]);

	useMemo(() => {
		if (!tcGiaoViecResponse) return;
		dismissLoading();
		if (tcGiaoViecResponse.success) {
			showMessageSuccess('Từ chối công việc thành công.');
			_backandrefresh();
		} else showMessageWarning(tcGiaoViecResponse.error);
	}, [tcGiaoViecResponse]);

	function _backandrefresh() {
		navigation.pop();
		if (routeParams.onRefresh) routeParams.onRefresh();
	}

	function _onChuyenXL(param?: any) {
		const body = {
			idCongViec: routeParams.id,
			nguoiXuLy: param.nguoiXuLy.map((item: any) => {
				return {
					...item,
					idVanBan: routeParams.id,
					sendGroupId: data && data.listProcess && data.listProcess[0]?.sendGroupId,
					sendGroupName: data && data.listProcess && data.listProcess[0]?.sendGroupName,
					sendUserId: data && data.listProcess && data.listProcess[0]?.sendUserId,
					sendUserName: data && data.listProcess && data.listProcess[0]?.sendUserName,
					status: -1,
				};
			}),
		};
		showAlert({
			message: 'Bạn chắc chắn muốn chuyển xử lý phiếu giao việc?',
			rightAction: () => {
				showLoading();
				dispatch(actionChuyenXuLyGV(body));
			},
		});
	}

	function _onKetThuc() {
		showAlert({
			message: 'Bạn chắc chắn muốn kết thúc phiếu giao việc?',
			rightAction: () => {
				showLoading();
				dispatch(actionKTPhieuGiaoViec({managerJobId: routeParams.id}));
			},
		});
	}

	function _tuChoiCongViec(param?: any) {
		// showAlert({
		//   message: 'Bạn có chắc chắn muốn cập nhật công việc?',
		//   rightAction: () => {
		//     showLoading()
		//     dispatch(actionTCGiaoViec({
		//       idVanBan: param.id,
		//       ghiChu: param.noiDung
		//     }))
		//   }
		// })
		showLoading();
		dispatch(
			actionTCGiaoViec({
				idVanBan: routeParams.id,
				ghiChu: param.noiDung,
			}),
		);
	}

	function isChuyenXuLy() {
		return !(
			data &&
			((data.userProcess && data.userProcess.status === 9) ||
				data.status === DocumentStatus.DA_KY_DUYET)
		);
	}

	function isDuyet() {
		return data && data.isUserMainProcess && data.status !== DocumentStatus.DA_KY_DUYET;
	}

	function isTuChoi() {
		const user = getUserLogin(token);
		return data && data.createdBy !== user.userId && data.status !== DocumentStatus.DA_KY_DUYET;
	}

	function _getViewDS(index: number) {
		if (data) {
			if (index == 0)
				return (
					<ThongTinChungComponent key={index} data={data} type={DocumentType.GIAO_VIEC} />
				);
			if (routeParams.status == 1) {
				if (index == 1)
					return (
						<XuLyComponent
							key={index}
							id={routeParams.id}
							type={DocumentType.GIAO_VIEC}
							isTrinh={isChuyenXuLy()}
							titleFormTrinh={'THÔNG TIN TRÌNH'}
							ischeckShowBtnAddPersionResolve={isChuyenXuLy()}
							onTrinhXuLy={_onChuyenXL}
							isDuyet={isDuyet()}
							onKetThuc={_onKetThuc}
							isTuChoi={isTuChoi()}
							onTuChoiVB={_tuChoiCongViec}
						/>
					);
				if (index == 2)
					return (
						<LichSuXuLyComponent
							key={index}
							id={routeParams.id}
							type={DocumentType.GIAO_VIEC}
						/>
					);
			} else {
				if (index == 1)
					return (
						<LichSuXuLyComponent
							key={index}
							id={routeParams.id}
							type={DocumentType.GIAO_VIEC}
						/>
					);
			}
		}
	}

	return (
		<View style={{flex: 1}}>
			<HeaderComponent title="Chi tiết phiếu giao việc" />
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
		ctGiaoViecResponse: state.giaoviec.ctGiaoViecResponse,
		ketthucGVResponse: state.giaoviec.ketthucGVResponse,
		chuyenXLGVResponse: state.giaoviec.chuyenXLGVResponse,
		xulyCongViecResponse: state.giaoviec.xulyCongViecResponse,
		layDVGiaoViecResponse: state.giaoviec.layDVGiaoViecResponse,
		tcGiaoViecResponse: state.giaoviec.tcGiaoViecResponse,
	};
};

export default connect(mapStateToProps)(memo(CTGiaoViecScreen));
