import React, { memo, useState, useEffect, useMemo, createRef } from 'react';
import { Text, View } from 'react-native';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { PhoneCall } from '@images/index';
import styles from './style';
import { HeaderComponent, TouchComponent } from '@components/index';
import ViewPager from '@react-native-community/viewpager';
import { VanBan } from '@models/VanBan';
import { ApiResponse } from '@models/ApiResponse';
import { useNavigation, useRoute } from '@react-navigation/native';
import { showLoading, dismissLoading, showMessageWarning, formatHours, formatHoursRow } from '@utils/index';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@navigations/NameRoute';

import Icon from '@commons/Icon';
import { ScrollView } from 'react-native-gesture-handler';
import AppColors from '@commons/AppColors';
import { UserInfo } from '@models/UserInfo';
import {
	actionCTPHONG,
	actionDanhMucChung,
	actionDefaultPhongHop,
	actionGetAllRoom,
	actionGetAllUser,
} from '@redux/actions/phonghop';
import { PhongHop } from '@models/PhongHop';
import InfoComponent from './components/InfoComponent';
import ViewInfoComponent from './components/ViewInfoComponent';
import ButtonRadius from '@components/ButtonRadiusComponent/ButtonRadius';

export interface Props {
	ctHSCVResponse?: ApiResponse<VanBan>;
}

export interface RouteParams {
	id?: string;
	status?: number;
	onRefresh?: () => void;
}

const CTPhongHopScreen = (props: Props) => {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
	const dispatch = useDispatch();
	const routeParams: RouteParams = useRoute().params as RouteParams;

	const { chiTietPhongHopResponse, userResponse, roomResponse, danhMucResponse } = useSelector(
		(state: RootStateOrAny) => state.phonghop,
	);

	const [dataPhongHop, setData] = useState<PhongHop>();
	const [usersJoin, setUserJoins] = useState<string>('');
	const [items, setItems] = useState<string>('');
	const [isApproval, setIsApproval] = useState<boolean>(false);
	const [roomName, setRoomName] = useState<string>('');

	useEffect(() => {
		showLoading();
		dispatch(actionCTPHONG(routeParams.id));
		getPH()
		return () => {
			dispatch(actionDefaultPhongHop())
		}
	}, []);

	function getPH() {
		const body = {
			pageInfo: {
				page: '1',
				pageSize: '100',
			},
			sorts: [],
			filters: [],
			keyword: '',
		};
		dispatch(actionGetAllRoom(body));
	}

	useMemo(() => {
		if (!chiTietPhongHopResponse) return;
		dismissLoading();
		if (chiTietPhongHopResponse?.success) {
			setData(chiTietPhongHopResponse.data);
			const body = {
				pageInfo: {
					page: '1',
					pageSize: '100',
				},
				sorts: [],
				filters: [],
				keyword: '',
			};
			dispatch(actionGetAllRoom(body));
			let str = '';
			chiTietPhongHopResponse.data.userJoinsName.forEach((item: string) => {
				str = str + `${item}, `;
			});
			setUserJoins(str);

			let strItem = '';
			chiTietPhongHopResponse.data.itemsName.forEach((item: string) => {
				strItem = strItem + `${item}, `;
			});
			setItems(strItem);

		} else
			showMessageWarning(chiTietPhongHopResponse.error);
	}, [chiTietPhongHopResponse, userResponse]);

	// useMemo(() => {
	// 	if (!userResponse) return;
	// 	dismissLoading();
	// 	if (userResponse.success) {
	// 		findUserJoin(dataPhongHop?.userJoins);
	// 	} else showMessageWarning(userResponse.error);
	// }, [userResponse]);

	useMemo(() => {
		if (!roomResponse) return;
		dismissLoading();
		if (roomResponse.success) {
			const room = roomResponse.data.find((item: any) => {
				return item.id === dataPhongHop?.meetingRoomId;
			});
			setRoomName(room?.name);
		} else showMessageWarning(roomResponse.error);
	}, [roomResponse]);

	// useMemo(() => {
	// 	if (!danhMucResponse) return;
	// 	dismissLoading();
	// 	if (danhMucResponse.success) {
	// 		findItem(dataPhongHop?.items);
	// 	} else showMessageWarning(danhMucResponse.error);
	// }, [danhMucResponse]);

	// useEffect(() => {
	// 	if (approvalResponse) {
	// 		showMessageSuccess('Cập nhật thành công');
	// 		dispatch(updateLichXeComplete(null));
	// 		_backandrefresh();
	// 	}
	// }, [approvalResponse]);

	// const _backandrefresh = () => {
	// 	console.log(routeParams.onRefresh);
	// 	if (routeParams.onRefresh) {
	// 		routeParams.onRefresh();
	// 	}

	// 	navigation.pop();
	// };

	// const onApproval = (status: number) => {
	// 	const body = {
	// 		...dataPhongHop,
	// 		status: status,
	// 		handlingComment: null,
	// 		carId: null,
	// 		meetingSchedulerId: null,
	// 	};
	// 	delete body.leaderUserName;
	// 	delete body.listProcess;
	// 	delete body.createdBy;
	// 	delete body.userProcess;
	// 	// console.log("body",  body);
	// 	dispatch(actionUpdateLichXe(body));
	// };

	return (
		<View style={{ flex: 1 }}>
			<HeaderComponent title="Chi tiết phòng họp" />
			<View style={styles.viewItemList}>
				<View style={styles.viewInfoLeader}>
					<View style={styles.circle}>
						<Text style={styles.number}>{dataPhongHop?.numberUser}</Text>
						<Text style={{ fontSize: 12 }}>người</Text>
					</View>
					<View style={styles.containerInfo}>
						<View style={styles.row}>
							<Icon name="vai-tro1" size={16} color={'#187779'} />
							<Text style={styles.infoLeader}>{dataPhongHop?.userLead}</Text>
						</View>
						<View style={[styles.row, { justifyContent: 'space-between' }]}>
							<View style={styles.row}>
								{/* <PhoneCall /> */}
								<Icon name="location" size={16} color={'#187779'} />
								<Text style={styles.phone}>{roomName}</Text>
							</View>
						</View>
					</View>
				</View>
				<View style={styles.viewDestination}>
					<View style={[styles.row, { flex: 1 }]}>
						{/* <Text style={styles.hours}>{formatHours(dataPhongHop?.fromDate)}</Text> */}
						<View
							style={[
								styles.row,
								{
									paddingHorizontal: 8,
									flex: 3,
								},
							]}>
							<Icon name="clock" size={16} color={'#187779'} />
							<Text style={styles.destination}>{formatHoursRow(dataPhongHop?.fromDate)} - {formatHoursRow(dataPhongHop?.toDate)}</Text>
						</View>
						{/* <Text style={styles.hours}>{formatHours(dataPhongHop?.toDate)}</Text> */}
					</View>
				</View>
				{/* <View style={styles.viewDestination}>
					<View style={[styles.row, { flex: 1}]}>
						<Text style={styles.hours}>{formatHours(dataPhongHop?.fromDate)}</Text>
						<View
							style={[
								styles.row,
								{
									paddingHorizontal: 8,
									flex: 3,
								},
							]}>
							<Icon name="location" size={16} color={'#187779'} />
							<Text style={styles.destination}>{roomName}</Text>
						</View>
						<Text style={styles.hours}>{formatHours(dataPhongHop?.toDate)}</Text>
					</View>
				</View> */}
				<ScrollView
					style={{ backgroundColor: AppColors.while, paddingHorizontal: 16 }}
					showsVerticalScrollIndicator={false}>
					<InfoComponent label="Tên cuộc họp" content={dataPhongHop?.meetingName} />

					<ViewInfoComponent label={'Nội dung'} content={dataPhongHop?.content} />
					<ViewInfoComponent label={'Thành phần tham dự'} content={usersJoin} />
					<ViewInfoComponent label={'Yêu cầu phục vụ'} content={items} />
					<InfoComponent label="Yêu cầu khác" content={dataPhongHop?.otherRequirement} />
					<InfoComponent
						label="Nhắc lịch trước"
						content={
							dataPhongHop?.noticeBefor && dataPhongHop?.noticeBefor > 0
								? `${dataPhongHop?.noticeBefor} phút`
								: ''
						}
					/>
					<InfoComponent label="Người đăng ký" content={dataPhongHop?.registerName} />
					<InfoComponent label="Số điện thoại" content={dataPhongHop?.phone} />
				</ScrollView>
				{/* {isApproval && (
					<View style={styles.bottomButtonContainer}>
						<View style={{flex: 1, marginEnd: 12}}>
							<ButtonRadius onPress={() => {}} title={'Phê duyệt'} />
						</View>

						<View style={{flex: 1, marginStart: 12}}>
							<ButtonRadius onPress={() => {}} title={'Từ chối'} />
						</View>
					</View>
				)} */}
			</View>
		</View>
	);
};

export default memo(CTPhongHopScreen);
