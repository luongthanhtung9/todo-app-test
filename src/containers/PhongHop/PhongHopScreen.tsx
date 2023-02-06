import AppColors from '@commons/AppColors';
import Icon from '@commons/Icon';
import {HeaderComponent} from '@components/index';
import {ApiResponse} from '@models/ApiResponse';
import {PhongHop} from '@models/PhongHop';
import {ChiTietPhongHopRoute, RootStackParamList} from '@navigations/NameRoute';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {actionDefaultPhongHop, actionGetPhongHop} from '@redux/actions/phonghop';
import {showLoading, dismissLoading} from '@utils/index';
import React, {memo, useEffect, useMemo, useState} from 'react';
import {View} from 'react-native';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import TabComponent from './components/TabComponent';
import styles from './style';

export interface Props {
	daDuyetResponse: ApiResponse<Array<PhongHop>>;
	choDieuXeResponse: ApiResponse<Array<PhongHop>>;
	choDuyetResponse: ApiResponse<Array<PhongHop>>;
}

const XETYPE = {
	CHODUYET: 'ChoDuyet',
	DADUYET: 'DaDuyet',
	TUCHOI: 'TuChoi',
};

const PhongHopScreen = (_props: Props) => {
	const Tab = createBottomTabNavigator();
	const dispatch = useDispatch();
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
	const {choDuyetResponse, daDuyetResponse, tuChoiResponse} = useSelector(
		(state: RootStateOrAny) => state.phonghop,
	);
	const [listData, setListData] = useState<Array<PhongHop>>([]);
	const [page, setPage] = useState<number>(1);
	const [param, setParam] = useState({
		pageInfo: {page: page, pageSize: 10},
		status: 2,
		isLoadMore: false,
		needMore: false,
	});

	const TabBarLabel = ({focused, iconName}: any) => {
		return (
			<View
				style={[styles.mainContainer, {backgroundColor: focused ? '#187779' : '#FAFAFA'}]}>
				<Icon name={iconName} size={20} color={focused ? '#FFFFFF' : '#C4C4C4'} />
			</View>
		);
	};

	useEffect(() => {
		_onRefresh();

		return () => {
			dispatch(actionDefaultPhongHop());
		};
	}, []);

	const onItemPress = (idDangKy?: string) => {
		navigation.push(ChiTietPhongHopRoute, {id: idDangKy, onRefresh: _onRefresh});
	};

	useMemo(() => {
		if (!choDuyetResponse) return;
		dismissLoading();
		if (choDuyetResponse.success) {
			if (choDuyetResponse.data && choDuyetResponse.data.length > 0) {
				setListData([...listData, ...choDuyetResponse.data]);
			} else {
				setParam({...param, isLoadMore: false, needMore: false});
				// setListData([]);
			}
		}
	}, [choDuyetResponse]);

	useMemo(() => {
		if (!daDuyetResponse) return;
		dismissLoading();
		if (daDuyetResponse.success) {
			if (daDuyetResponse.data && daDuyetResponse.data.length > 0) {
				setListData([...listData, ...daDuyetResponse.data]);
			} else {
				setParam({...param, isLoadMore: false, needMore: false});
				// setListData([]);
			}
		}
	}, [daDuyetResponse]);

	useMemo(() => {
		if (!tuChoiResponse) return;
		dismissLoading();
		if (tuChoiResponse.success) {
			if (tuChoiResponse.data && tuChoiResponse.data.length > 0) {
				setListData([...listData, ...tuChoiResponse.data]);
			} else {
				setParam({...param, isLoadMore: false, needMore: false});
				// setListData([]);
			}
		}
	}, [tuChoiResponse]);

	function _onRefresh() {
		setPage(1);
		const paramRefresh: any = {
			pageInfo: {page: 1, pageSize: 10},
			status: param.status,
			isLoadMore: false,
			needMore: true,
			sorts: [{field: '', dir: 0}],
			filters: [{field: '', value: ''}],
			keyword: '',
			deptId: '',
			mettingRoomId: '',
			userLead: '',
			positionLead: '',
		};
		setParam(paramRefresh);
		// if (param.status == 2) {
		setTimeout(() => {
			dispatch(actionGetPhongHop(paramRefresh));
		}, 500);
	}

	function _onLoadMore() {
		setPage(page + 1);
		const paramRefresh: any = {
			pageInfo: {page: page + 1, pageSize: 10},
			status: param.status,
			isLoadMore: param.isLoadMore,
			needMore: param.needMore,
			carId: '',
			keyword: '',
			registerDeptId: '',
			fromDate: '',
			toDate: '',
		};
		setParam(paramRefresh);
		// if (param.status == 2) {
		dispatch(actionGetPhongHop(paramRefresh));
	}

	return (
		<>
			<HeaderComponent title="Phòng họp" />
			<Tab.Navigator
				initialRouteName="ChoDuyet"
				screenOptions={{headerShown: false}}
				screenListeners={{
					tabPress: e => {
						showLoading();
						if (e.target?.split('-')[0] === XETYPE.CHODUYET) {
							param.status = 2;
							setListData([]);
						}
						if (e.target?.split('-')[0] === XETYPE.DADUYET) {
							param.status = 3;
							setListData([]);
						}
						if (e.target?.split('-')[0] === XETYPE.TUCHOI) {
							param.status = 4;
							setListData([]);
						}
						_onRefresh();
					},
				}}>
				<Tab.Screen
					name="ChoDuyet"
					options={{
						title: 'Chờ duyệt',
						tabBarInactiveTintColor: 'gray',
						tabBarActiveTintColor: AppColors.iconColor,
						tabBarIcon: ({focused}) => (
							<TabBarLabel focused={focused} iconName="thoigiandexuat" />
						),
					}}
					// component={() => (
					// <TabComponent
					// 	title="ChoDuyet"
					// 	listData={listData}
					// 	onRefresh={_onRefresh}
					// 	onLoadMore={_onLoadMore}
					// 	param={param}
					// 	onClickItem={onItemPress}
					// />
					// )}
				>
					{props => (
						<TabComponent
							{...props}
							title="ChoDuyet"
							listData={listData}
							onRefresh={_onRefresh}
							onLoadMore={_onLoadMore}
							param={param}
							onClickItem={onItemPress}
						/>
					)}
				</Tab.Screen>
				<Tab.Screen
					name="DaDuyet"
					options={{
						title: 'Đã duyệt',
						tabBarInactiveTintColor: 'gray',
						tabBarActiveTintColor: AppColors.iconColor,
						tabBarIcon: ({focused}) => (
							<TabBarLabel focused={focused} iconName="daxuly" />
						),
					}}
					// component={() => (
					// <TabComponent
					// 	title="DaDuyet"
					// 	listData={listData}
					// 	onRefresh={_onRefresh}
					// 	onLoadMore={_onLoadMore}
					// 	param={param}
					// 	onClickItem={onItemPress}
					// />
					// )}
				>
					{props => (
						<TabComponent
							{...props}
							title="DaDuyet"
							listData={listData}
							onRefresh={_onRefresh}
							onLoadMore={_onLoadMore}
							param={param}
							onClickItem={onItemPress}
						/>
					)}
				</Tab.Screen>
				<Tab.Screen
					name="TuChoi"
					options={{
						title: 'Từ chối',
						tabBarInactiveTintColor: 'gray',
						tabBarActiveTintColor: AppColors.iconColor,
						tabBarIcon: ({focused}) => (
							<TabBarLabel focused={focused} iconName="tu-choi" />
						),
					}}
					// component={() => (
					// 	<TabComponent
					// 		title="TuChoi"
					// 		listData={listData}
					// 		onRefresh={_onRefresh}
					// 		onLoadMore={_onLoadMore}
					// 		param={param}
					// 		onClickItem={onItemPress}
					// 	/>
					// )}
				>
					{props => (
						<TabComponent
							{...props}
							title="TuChoi"
							listData={listData}
							onRefresh={_onRefresh}
							onLoadMore={_onLoadMore}
							param={param}
							onClickItem={onItemPress}
						/>
					)}
				</Tab.Screen>
			</Tab.Navigator>
		</>
	);
};

export default memo(PhongHopScreen);
