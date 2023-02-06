import {TouchComponent} from '@components/index';
import {ApiResponse} from '@models/ApiResponse';
import {Menu} from '@models/Menu';
import {UserInfo} from '@models/UserInfo';
import {
	DangKyXeRoute,
	DSCongViecRoute,
	DSGiaoViecRoute,
	DSThongBaoRoute,
	DSToTrinhRoute,
	DSVBDenRoute,
	DSVBDiRoute,
	LichLDRoute,
	LichPHRoute,
	LoginRoute,
	RootStackParamList,
} from '@navigations/NameRoute';
import ViewPager from '@react-native-community/viewpager';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {actionDefault, actionLayTatCaChucNangUser} from '@redux/actions/authen';
import {actionThongKeVBDen} from '@redux/actions/vbden';
import {saveToken} from '@redux/actions/configs';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';

const MyLoader = () => (
	<ContentLoader
		height={200}
		speed={1}
		backgroundColor={'#F6FFFE'}
		foregroundColor={'#000'}
		viewBox="0 0 380 70 ">
		<Circle cx="30" cy="30" r="30" />
		<Rect x="80" y="10" rx="4" ry="4" width="150" height="15" />
		<Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
		<Rect x="80" y="60" rx="4" ry="4" width="250" height="10" />
		<Rect x="15" y="90" rx="3" ry="3" width="250" height="10" />
		<Rect x="15" y="120" rx="4" ry="4" width="350" height="10" />
	</ContentLoader>
);
import {
	getIcon,
	getStatus,
	getSTT,
	getTitle,
	getUserLogin,
	showAlert,
	getCount,
	getTitleParent,
} from '@utils/index';
import PropTypes from 'prop-types';
import React, {createRef, memo, useEffect, useMemo, useState} from 'react';
import {Dimensions, Text, View} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import HeaderHomeComponent from './components/HeaderHomeComponent';
import MenuComponent from './components/MenuComponent';
import NotiComponent from './components/NotiComponent';
import ProfileHomeComponent from './components/ProfileHomeComponent';
import styles from './style';
import {userInfoComplete} from '@redux/actions/setting';
import {congViecCuaToiAction, layDanhSachThongBao, laySoThongBao} from '@redux/actions/thongbao';
import {actionThongKeVBDi} from '@redux/actions/vbdi';
import {actionThongKeToTrinh} from '@redux/actions/totrinh';
import CongViecComponent from './components/CongViecComponent';
import DocumentType from '@commons/DocumentType';
import {ScrollView} from 'react-native-gesture-handler';
export interface Props {
	layTatCaChucNangUserResponse: ApiResponse<any>;
	thongkeVBDenResponse: ApiResponse<any>;
	thongkeVBDiResponse: ApiResponse<any>;
	thongKeToTrinhResponse: ApiResponse<any>;
	dataNumberNotify: ApiResponse<any>;
	docThongBaoResponse: ApiResponse<any>;
	cvctResponse: ApiResponse<any>;
	token?: string;
}

const width = Dimensions.get('window').width;

const HomeScreen = (props: Props) => {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
	const dispatch = useDispatch();
	const viewPagerRef = createRef<ViewPager>();
	const {
		layTatCaChucNangUserResponse,
		thongkeVBDenResponse,
		token,
		dataNumberNotify,
		docThongBaoResponse,
		thongkeVBDiResponse,
		thongKeToTrinhResponse,
		cvctResponse,
	} = props;
	const [tabSelected, setTabSelected] = useState(-1);
	const [tabData, setTabData] = useState<Array<any>>([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [numNotify, setNumNotify] = useState(0);
	const [dataCv, setDataCv] = useState<any>();
	const [isSelectedHome, setIsSelectedHome] = useState<boolean>(true);
	useEffect(() => {
		// showLoading();
		dispatch(actionThongKeVBDen());
		dispatch(actionThongKeVBDi());
		dispatch(actionThongKeToTrinh());
		dispatch(laySoThongBao());
		dispatch(congViecCuaToiAction());
		const paramGetDatNotify = {
			pageInfo: {
				page: 1,
				pageSize: 6,
			},
			sorts: [],
		};
		dispatch(layDanhSachThongBao(paramGetDatNotify));
	}, []);

	useMemo(() => {
		if (dataNumberNotify?.success === true) {
			setNumNotify(dataNumberNotify?.data || 0);
		}
	}, [dataNumberNotify]);

	useMemo(() => {
		if (docThongBaoResponse && docThongBaoResponse.success) {
			dispatch(laySoThongBao());
		}
	}, [docThongBaoResponse]);

	useMemo(() => {
		if (cvctResponse?.success === true) {
			setDataCv(cvctResponse?.data);
		}
	}, [cvctResponse]);

	useMemo(() => {
		if (!thongkeVBDenResponse) return;
		// setTimeout(() => {
		// 	dispatch(actionLayTatCaChucNangUser());
		// }, 500000);
		dispatch(actionLayTatCaChucNangUser());
	}, [thongkeVBDenResponse]);
	useMemo(() => {
		if (!layTatCaChucNangUserResponse) {
			return;
		}
		if (
			layTatCaChucNangUserResponse.success &&
			thongkeVBDenResponse &&
			thongkeVBDiResponse &&
			thongKeToTrinhResponse
		) {
			const menuRow = layTatCaChucNangUserResponse.data?.filter(
				(itemParent: any) => itemParent.split('/').length > 2,
			);
			const menuParent = layTatCaChucNangUserResponse.data
				?.filter((itemParent: any) => itemParent.split('/').length === 2)
				.map((parentMap: any, indexMenuParent: number) => {
					const listmenu: any[] = menuRow.filter((item: any) =>
						item.includes(parentMap.split('/')[1]),
					);
					return {
						stt: getSTT(parentMap.split('/')[1]),
						id: parentMap.split('/')[1],
						title: getTitleParent(parentMap.split('/')[1]),
						menu: listmenu
							.filter(
								(item: any) =>
									item.split('/')[2] !== 'soan-thao' &&
									item.split('/')[2] !== 'du-thao' &&
									item.split('/')[2] !== 'bao-cao' &&
									item.split('/')[2] !== 'tiep-nhan' &&
									item.split('/')[2] !== 'da-cap-so' &&
									item.split('/')[2] !== 'xu-ly-van-ban' &&
									item.split('/')[2] !== 'cho-phat-hanh' &&
									item.split('/')[2] !== 'lichsu-phathanh' &&
									item.split('/')[2] !== 'da-kyduyet' &&
									item.split('/')[2] !== 'xin-so-bo' &&
									// item.split('/')[2] !== 'dang-xuly' &&
									item.split('/')[2] !== 'giu-so-van-ban',
							)
							.map((item: any, index) => {
								return {
									stt: getSTT(item.split('/')[2]),
									status: getStatus(item.split('/')[2]),
									id: item.split('/')[2],
									title: getTitle(parentMap.split('/')[1], item.split('/')[2]),
									icon: getIcon(item.split('/')[2], 36),
									iconBottom: getIcon(item.split('/')[2], 24),
									count: getCount(
										item.split('/')[2],
										parentMap.split('/')[1] === 'vb-di'
											? thongkeVBDiResponse.data
											: parentMap.split('/')[1] === 'totrinh'
											? thongKeToTrinhResponse.data
											: thongkeVBDenResponse.data,
									),
								};
							})
							.filter((item: any) => item.id !== 'them-moi')
							.sort((a: any, b: any) => a.stt - b.stt),
					};
				})
				.filter(
					(item: any) =>
						item.id === 'vb-den' ||
						item.id === 'vb-di' ||
						item.id === 'totrinh' ||
						item.id === 'phieugiaoviec' ||
						item.id === 'hosocongviec',
				)
				.sort((a: any, b: any) => a.stt - b.stt);
			console.log('menuParent', menuParent);
			setTabData(menuParent);
			if (token) {
				const userInfo: UserInfo = getUserLogin(token);
				dispatch(userInfoComplete(userInfo));
			}
		}
	}, [layTatCaChucNangUserResponse]);

	function _dangnhap() {
		showAlert({
			title: 'Đăng xuất',
			message: 'Bạn chắc chắn muốn đăng xuất?',
			rightTitle: 'Đăng xuất',
			rightAction: () => {
				dispatch(actionDefault());
				dispatch(saveToken({token: undefined}));
				setModalVisible(false);
				navigation.replace(LoginRoute);
			},
		});
	}

	function _thongbao() {
		setModalVisible(false);
		navigation.push(DSThongBaoRoute);
	}

	function _onPressNoti() {
		navigation.push(DSThongBaoRoute);
	}

	function _onPressCalenda() {
		navigation.push(LichLDRoute);
	}

	const _onPressCar = () => {
		navigation.push(DangKyXeRoute);
	};

	const _onPressMeetRoom = () => {
		navigation.push(LichPHRoute);
	};

	function _onDSVBPress(idTab: string, status?: number, menu?: Array<Menu>) {
		if (idTab === 'vb-den') navigation.push(DSVBDenRoute, {status, menu}); // check one
		if (idTab === 'vb-di') navigation.push(DSVBDiRoute, {status, menu});
		if (idTab === 'totrinh') navigation.push(DSToTrinhRoute, {status, menu});
		if (idTab === 'phieugiaoviec') navigation.push(DSGiaoViecRoute, {status, menu});
		if (idTab === 'hosocongviec') navigation.push(DSCongViecRoute, {status, menu});
	}

	function _getViewDS(item: any, index: number) {
		return (
			<MenuComponent
				key={item}
				data={item.menu}
				onItemPress={status => _onDSVBPress(item?.id, status, item.menu)}
			/>
		);
	}

	return (
		<View style={{flex: 1}}>
			<HeaderHomeComponent
				numberNoti={numNotify}
				onPressNoti={_onPressNoti}
				onPressLog={_dangnhap}
			/>
			<>
				{tabData && tabData.length > 0 ? (
					<View style={styles.home}>
						<View style={styles.infomationParent}>
							{token ? (
								<ProfileHomeComponent
									token={token}
									onCalenda={_onPressCalenda}
									onCar={_onPressCar}
									onMeetRoom={_onPressMeetRoom}
									onPressHome={() => {
										setIsSelectedHome(true);
										setTabSelected(-1);
									}}
									isSelected={isSelectedHome}
								/>
							) : (
								<></>
							)}
							{/* <Text
									onPress={() => navigation.push(DSVBTheoDoiRoute)}
									style={styles.textCare}>
									Văn bản theo dõi
								</Text> */}
							<View style={styles.tabTitleView}>
								{tabData.map((item, index) => (
									<TouchComponent
										key={index}
										style={[
											styles.tabTitleItemView,
											{width: (1 / tabData.length) * (width - 50)},
										]}
										onPress={() => {
											viewPagerRef?.current?.setPage(index);
											setIsSelectedHome(false);
											setTabSelected(index);
										}}>
										<Text
											style={[
												styles.tabTitleItem,
												tabSelected === index
													? {color: '#187779'}
													: {color: '#444444'},
											]}>
											{item.title}
										</Text>
										{tabSelected === index && (
											<View style={styles.selectedView} />
										)}
									</TouchComponent>
								))}
							</View>
						</View>

						{isSelectedHome ? (
							<ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
								<CongViecComponent
									data={dataCv}
									type={DocumentType.VAN_BAN_DEN}
									title={`Văn bản đến (${dataCv?.VBD_TONG})`}
								/>
								<CongViecComponent
									data={dataCv}
									type={DocumentType.VAN_BAN_DI}
									title={`Văn bản đi (${dataCv?.VBDI_TONG})`}
								/>
								<CongViecComponent
									data={dataCv}
									type={DocumentType.TO_TRINH}
									title={`Tờ trình (${dataCv?.TOTRINH_TONG})`}
								/>
								<CongViecComponent data={dataCv} title="Giao việc()" />
							</ScrollView>
						) : (
							<View style={styles.pagerView}>
								<ViewPager
									ref={viewPagerRef}
									style={styles.viewPager}
									initialPage={tabSelected}
									onPageSelected={event =>
										setTabSelected(event.nativeEvent.position)
									}>
									{/* {
        
                                    } */}
									{tabData.map((item, index) => (
										<View key={index}>{_getViewDS(item, index)}</View>
									))}
								</ViewPager>
							</View>
						)}
					</View>
				) : (
					<View>{MyLoader()}</View>
				)}
			</>
			<NotiComponent
				modalVisible={modalVisible}
				onRequestClose={() => setModalVisible(false)}
				onViewMore={_thongbao}
			/>
		</View>
	);
};

HomeScreen.propTypes = {
	dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch: any) {
	return {
		dispatch,
	};
}

const mapStateToProps = (state: any) => {
	return {
		layTatCaChucNangUserResponse: state.authen.layTatCaChucNangUserResponse,
		dataNumberNotify: state.thongbao.dataNumberNotify,
		docThongBaoResponse: state.thongbao.docThongBaoResponse,
		thongkeVBDenResponse: state.vbden.thongkeVBDenResponse,
		thongkeVBDiResponse: state.vbdi.thongkeVBDiResponse,
		token: state.configs.token,
		thongKeToTrinhResponse: state.totrinh.thongKeToTrinhResponse,
		cvctResponse: state.thongbao.cvctResponse,
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(memo(HomeScreen));
