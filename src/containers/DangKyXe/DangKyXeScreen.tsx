import AppColors from '@commons/AppColors';
import Icon from '@commons/Icon';
import {HeaderComponent} from '@components/index';
import {ApiResponse} from '@models/ApiResponse';
import {Dkxe} from '@models/dkxe';
import {ChiTietDangKyXeRoute, RootStackParamList} from '@navigations/NameRoute';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {actionDefaultDkXe, actionDkyXe} from '@redux/actions/dkxe';
import {dismissLoading, showLoading} from '@utils/index';
import React, {memo, useEffect, useMemo, useState} from 'react';
import {View} from 'react-native';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import TabComponent from './components/TabComponent';
import styles from './style';

export interface Props {
	daDuyetResponse: ApiResponse<Array<Dkxe>>;
	choDieuXeResponse: ApiResponse<Array<Dkxe>>;
	choDuyetResponse: ApiResponse<Array<Dkxe>>;
	tuChoiResponse: ApiResponse<Array<Dkxe>>;
}

const XETYPE = {
	CHODUYET: 'ChoDuyet',
	DADUYET: 'DaDuyet',
	CHODIEUXE: 'ChoDieuXe',
	TUCHOI: 'TuChoi',
};

const DangKyXeScreen = (_props: Props) => {
	const Tab = createBottomTabNavigator();
	const dispatch = useDispatch();
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
	const {choDuyetResponse, daDuyetResponse, choDieuXeResponse, tuChoiResponse} = useSelector(
		(state: RootStateOrAny) => state.dkxe,
	);
	const [page, setPage] = useState<number>(1);
	const [listData, setListData] = useState<Array<Dkxe>>([]);
	const [param, setParam] = useState({
		pageInfo: {page: page, pageSize: 10},
		status: 2,
		isLoadMore: false,
		needMore: false,
	});

	useEffect(() => {
		showLoading();
		_onRefresh();
		return () => {
			dispatch(actionDefaultDkXe());
		};
	}, []);

	const onItemPress = (idDangKy?: string) => {
		navigation.push(ChiTietDangKyXeRoute, {id: idDangKy, onRefresh: _onRefresh});
	};

	useMemo(() => {
		if (!choDuyetResponse) return;
		if (choDuyetResponse.success) {
			if (choDuyetResponse.data && choDuyetResponse.data.length > 0) {
				setListData([...listData, ...choDuyetResponse.data]);
			} else {
				setParam({...param, isLoadMore: false, needMore: false});
				// setListData([]);
			}
		}
		dismissLoading();
	}, [choDuyetResponse]);

	useMemo(() => {
		if (!daDuyetResponse) return;
		if (daDuyetResponse.success) {
			if (daDuyetResponse.data && daDuyetResponse.data.length > 0) {
				setListData([...listData, ...daDuyetResponse.data]);
			} else {
				setParam({...param, isLoadMore: false, needMore: false});
				// setListData([]);
			}
		}
		dismissLoading();
	}, [daDuyetResponse]);

	useMemo(() => {
		if (!choDieuXeResponse) return;
		if (choDieuXeResponse.success) {
			if (choDieuXeResponse.data && choDieuXeResponse.data.length > 0) {
				setListData([...listData, ...choDieuXeResponse.data]);
			} else {
				setParam({...param, isLoadMore: false, needMore: false});
				// setListData([]);
			}
		}
		dismissLoading();
	}, [choDieuXeResponse]);

	useMemo(() => {
		if (!tuChoiResponse) return;
		if (tuChoiResponse.success) {
			if (tuChoiResponse.data && tuChoiResponse.data.length > 0) {
				setListData([...listData, ...tuChoiResponse.data]);
			} else {
				setParam({...param, isLoadMore: false, needMore: false});
				setListData([]);
			}
		}
		dismissLoading();
	}, [tuChoiResponse]);

	function _onRefresh() {
		showLoading();
		setListData([]);
		setPage(1);
		const paramRefresh: any = {
			pageInfo: {page: 1, pageSize: 10},
			status: param.status,
			isLoadMore: false,
			needMore: true,
			carId: '',
			keyword: '',
			registerDeptId: '',
			fromDate: '',
			toDate: '',
		};
		setParam(paramRefresh);
		// if (param.status == 2) {
		setTimeout(() => {
			dispatch(actionDkyXe(paramRefresh));
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
		dispatch(actionDkyXe(paramRefresh));
	}

	const TabBarLabel = ({focused, iconName}: any) => {
		return (
			<View
				style={[styles.mainContainer, {backgroundColor: focused ? '#187779' : '#FAFAFA'}]}>
				<Icon name={iconName} size={20} color={focused ? '#FFFFFF' : '#C4C4C4'} />
			</View>
		);
	};

	return (
		<>
			<HeaderComponent title="Đăng ký xe" />
			<Tab.Navigator
				initialRouteName="ChoDuyet"
				screenOptions={{headerShown: false}}
				screenListeners={{
					tabPress: e => {
						if (e.target?.split('-')[0] === XETYPE.CHODUYET) param.status = 2;
						if (e.target?.split('-')[0] === XETYPE.DADUYET) param.status = 3;
						if (e.target?.split('-')[0] === XETYPE.CHODIEUXE) param.status = 5;
						if (e.target?.split('-')[0] === XETYPE.TUCHOI) param.status = 4;
						_onRefresh();
					},
				}}>
				<Tab.Screen
					name="ChoDuyet"
					options={{
						title: 'Chờ duyệt',
						tabBarInactiveTintColor: 'gray',
						tabBarActiveTintColor: AppColors.iconColor,
						// tabBarIcon: ({color, size}) => (
						// 	<Icon name="meetingroom" color={color} size={size} />
						// ),
						tabBarIcon: ({focused}) => (
							<TabBarLabel focused={focused} iconName="thoigiandexuat" />
						),
					}}
					// component={() => (
					// 	<TabComponent
					// 		title="ChoDuyet"
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
					// 	<TabComponent
					// 		title="DaDuyet"
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
					name="ChoDieuXe"
					options={{
						title: 'Chờ điều xe',
						tabBarInactiveTintColor: 'gray',
						tabBarActiveTintColor: AppColors.iconColor,
						tabBarIcon: ({focused}) => (
							<TabBarLabel focused={focused} iconName="dieuxe" />
						),
					}}
					// component={() => (
					// 	<TabComponent
					// 		title="ChoDieuXe"
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
							title="ChoDieuXe"
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

export default memo(DangKyXeScreen);
