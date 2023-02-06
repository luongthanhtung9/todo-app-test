import React, {memo, useRef, useState, useEffect, useMemo, createRef} from 'react';
import {Text, View, ImageBackground, Dimensions} from 'react-native';
import {connect, RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import {LogoIcon, LoginBG, LoginBGImage, PhoneCall} from '@images/index';
import styles from './style';
import TabTitleComponent from './components/TabTitleComponent';
import CheckBox from '@react-native-community/checkbox';
import {
	HeaderComponent,
	TouchComponent,
	ThongTinChungComponent,
	XuLyComponent,
	LichSuDeXuatComponent,
	LichSuXuLyComponent,
} from '@components/index';
import ViewPager from '@react-native-community/viewpager';
import {actionCTVBDi} from '@redux/actions/vbdi';
import {VanBan} from '@models/VanBan';
import {ApiResponse} from '@models/ApiResponse';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
	showLoading,
	dismissLoading,
	showMessageWarning,
	formatHours,
	foramtDate,
	showMessageSuccess,
	getUserLogin,
    formatHoursXe,
} from '@utils/index';
import ButtonBottomComponent from '@components/ButtonBottomComponent';
import {actionCTHSCV} from '@redux/actions/congviec';
import DocumentType from '@commons/DocumentType';
import {CongViec} from '@models/Congviec';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@navigations/NameRoute';
import {
	actionCTDangKyXe,
	actionGetAllLeader,
	actionUpdateLichXe,
	updateLichXeComplete,
} from '@redux/actions/dkxe';
import {Dkxe} from '@models/dkxe';
import Icon from '@commons/Icon';
import {ScrollView} from 'react-native-gesture-handler';
import InfoComponent from './components/InfoComponent';
import AppColors from '@commons/AppColors';
import TepComponent from '@components/TepComponent';
import {UserInfo} from '@models/UserInfo';
import ButtonRadius from '@components/ButtonRadiusComponent/ButtonRadius';

export interface Props {
	ctHSCVResponse?: ApiResponse<VanBan>;
}

export interface RouteParams {
	id?: string;
	status?: number;
	onRefresh?: () => void;
}

const CTCongViecScreen = (props: Props) => {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
	const viewPagerRef = createRef<ViewPager>();
	const dispatch = useDispatch();
	const routeParams: RouteParams = useRoute().params as RouteParams;

	const {chiTietDkyXeResponse, lanhDaoResponse, approvalResponse} = useSelector(
		(state: RootStateOrAny) => state.dkxe,
	);
	const {token} = useSelector((state: RootStateOrAny) => state.configs);
	const [dataDangkyXe, setData] = useState<Dkxe>();

	const [dataLanhDao, setDataLanhDao] = useState<UserInfo>();
	const [isApproval, setIsApproval] = useState<boolean>(false);
	const [nguoiPheDuyet, setNguoiPheDuyet] = useState<UserInfo>();
	const [nguoiSuDung, setNguoiSuDung] = useState<UserInfo>();
	console.log('dataDangkyXe?.fileUploads', dataDangkyXe?.fileUploads);
	//   http://14.248.82.147:81/api/LichXe/XemChiTiet/485b8c27-e00f-4ba7-a182-08dad98a8a6e
	useEffect(() => {
		showLoading();
		dispatch(actionCTDangKyXe(routeParams.id));
	}, []);

	//
	useMemo(() => {
		if (!chiTietDkyXeResponse) return;
		dismissLoading();
		if (chiTietDkyXeResponse.success) {
			setData(chiTietDkyXeResponse.data);
			dispatch(actionGetAllLeader(chiTietDkyXeResponse.data.registerDeptId));
			const user = getUserLogin(token);
			setIsApproval(
				chiTietDkyXeResponse.data.status === 2 &&
					user.userId === chiTietDkyXeResponse.data.approverId,
			);
		} else showMessageWarning(chiTietDkyXeResponse.error);
	}, [chiTietDkyXeResponse]);

	useMemo(() => {
		if (!lanhDaoResponse) return;
		dismissLoading();
		if (lanhDaoResponse.success) {
			setDataLanhDao(lanhDaoResponse.data);
			const userPheDuyet = lanhDaoResponse.data.find(
				(item: UserInfo) => dataDangkyXe?.approverId === item.id,
			);
			setNguoiPheDuyet(userPheDuyet);
			const userSudung = lanhDaoResponse.data.find(
				(item: UserInfo) => dataDangkyXe?.usingManager === item.id,
			);
			setNguoiSuDung(userSudung);
		} else showMessageWarning(lanhDaoResponse.error);
	}, [lanhDaoResponse]);

	useEffect(() => {
		if (approvalResponse) {
			showMessageSuccess('Cập nhật thành công');
			dispatch(updateLichXeComplete(null));
			_backandrefresh();
		}
	}, [approvalResponse]);

	const _backandrefresh = () => {
		console.log(routeParams.onRefresh);
		if (routeParams.onRefresh) {
			routeParams.onRefresh();
		}

		navigation.pop();
	};

	const onApproval = (status: number) => {
		const body = {
			...dataDangkyXe,
			status: status,
			handlingComment: null,
			carId: null,
			meetingSchedulerId: null,
		};
		delete body.leaderUserName;
		delete body.listProcess;
		delete body.createdBy;
		delete body.userProcess;
		// console.log("body",  body);
		dispatch(actionUpdateLichXe(body));
	};
	// return () ? true : false

	// {
	//     "id": "485b8c27-e00f-4ba7-a182-08dad98a8a6e",
	//     "registerNumber": 1,
	//     "registerId": "181e38af-7734-4836-b741-14b38ae36fed",
	//     "approverId": "13666c17-c2b0-4cd1-be70-1fbb271932f3",
	//     "registerPhoneNumber": "0101010",
	//     "teamLeader": "181e38af-7734-4836-b741-14b38ae36fed",
	//     "leaderUserName": "Nguyễn Thị Mai Hường",
	//     "leaderPhoneNumber": "010101111111",
	//     "usingManager": "13666c17-c2b0-4cd1-be70-1fbb271932f3",
	//     "registerDeptId": "b2f39051-ce91-4ccc-9a7c-699614fc117c",
	//     "registerDate": "2022-12-09T02:05:59.287",
	//     "numberUser": 100,
	//     "pickUpPlace": "HÀ NỘI",
	//     "destination": "HÀ NỘI",
	//     "fromDate": "2022-12-09T02:06:00",
	//     "toDate": "2022-12-24T02:06:00",
	//     "content": "ĐI HỌP",
	//     "registerName": "Phòng Tổng hợp",
	//     "status": 2,
	//     "distance": 100,
	//     "listProcess": [],
	//     "fileUploads": [
	//         "642b6f15-0a52-430d-a64c-08dad98a86f2"
	//     ],
	//     "userProcess": {
	//         "carScheduleId": "00000000-0000-0000-0000-000000000000",
	//         "processValue": 0,
	//         "status": 9
	//     },
	//     "createdBy": "181e38af-7734-4836-b741-14b38ae36fed"
	// }

	return (
		<View style={{flex: 1}}>
			<HeaderComponent title="Chi tiết đăng ký xe" />
			<View style={styles.viewItemList}>
				<View style={styles.viewInfoLeader}>
					<View style={styles.circle}>
						<Text style={styles.number}>{dataDangkyXe?.numberUser}</Text>
						<Text style={{fontSize: 12}}>người</Text>
					</View>
					<View style={styles.containerInfo}>
						<View style={styles.row}>
							<Text style={{color: '#4A4A4A'}}>Trưởng đoàn:</Text>
							<Text style={styles.infoLeader}>{dataDangkyXe?.leaderUserName}</Text>
						</View>
						<View style={[styles.row, {justifyContent: 'space-between'}]}>
							<View style={styles.row}>
								<PhoneCall />
								<Text
									style={{
										marginStart: 8,
										color: '#40A840',
										fontWeight: '700',
										lineHeight: 15,
									}}>
									{dataDangkyXe?.leaderPhoneNumber}
								</Text>
							</View>
							<View style={styles.row}>
								<Text style={{color: '#4A4A4A', fontWeight: '700'}}>Đi/về:</Text>
								<Text style={{color: 'rgba(219, 0, 0, 1)', fontWeight: '700'}}>
									{dataDangkyXe?.distance} Km
								</Text>
							</View>
						</View>
					</View>
				</View>
				<View style={styles.viewDestination}>
					<View style={{flex: 1}}>
						<View style={styles.row}>
							<Text style={styles.hours}>
								{formatHoursXe(dataDangkyXe?.fromDate)}
							</Text>
							<View
								style={[
									styles.row,
									{
										paddingHorizontal: 8,
									},
								]}>
								<Icon name="diemdi" size={12} color={'#187779'} />
								<Text style={styles.destination}>{dataDangkyXe?.pickUpPlace}</Text>
							</View>
						</View>
						<View style={styles.row}>
							<Text style={styles.hours}>{formatHoursXe(dataDangkyXe?.toDate)}</Text>
							<View
								style={[
									styles.row,
									{
										paddingHorizontal: 8,
									},
								]}>
								<Icon name="diemden" size={12} color={'#187779'} />
								<Text style={styles.destination}>{dataDangkyXe?.destination}</Text>
							</View>
						</View>
					</View>
				</View>
				<ScrollView
					style={{backgroundColor: AppColors.while, paddingHorizontal: 16}}
					showsVerticalScrollIndicator={false}>
					<InfoComponent label="Đơn vị" content={'Phòng TH'} />
					<InfoComponent label="Ngày tạo" content={foramtDate(dataDangkyXe?.fromDate)} />
					<InfoComponent label="Người đăng ký" content={dataDangkyXe?.registerName} />
					<InfoComponent
						label="SĐT đăng ký"
						content={dataDangkyXe?.registerPhoneNumber}
					/>
					<InfoComponent label="Lãnh đạo sử dụng" content={nguoiSuDung?.fullName} />
					<InfoComponent label="Loại cuộc họp" content={''} />

					<Text style={[styles.label, {paddingVertical: 4}]}>Nội dung</Text>
					{dataDangkyXe?.content && (
						<View
							style={{
								backgroundColor: '#F8F8F8',
								paddingVertical: 4,
								paddingHorizontal: 8,
							}}>
							<Text style={{fontSize: 12, color: '#4A4A4A'}}>
								{dataDangkyXe?.content}
							</Text>
						</View>
					)}
					<InfoComponent
						label="Trình lãnh đạo"
						content={`${nguoiPheDuyet?.fullName} - ${nguoiPheDuyet?.positionName}`}
					/>
					<View style={{marginHorizontal: -12}}>
						<TepComponent
							title="File liên quan"
							fileUploads={dataDangkyXe?.fileUploads}
						/>
					</View>
				</ScrollView>
				{isApproval && (
					<View style={styles.bottomButtonContainer}>
						<View style={{flex: 1, marginEnd: 12}}>
							<ButtonRadius onPress={() => onApproval(3)} title={'Phê duyệt'} />
						</View>

						<View style={{flex: 1, marginStart: 12}}>
							<ButtonRadius onPress={() => onApproval(4)} title={'Từ chối'} />
						</View>
					</View>
				)}
			</View>
		</View>
	);
};

export default memo(CTCongViecScreen);
