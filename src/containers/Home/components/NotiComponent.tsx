import React, {memo} from 'react';
import {StyleSheet, View, Text, Modal, FlatList} from 'react-native';
import {ArrowDownIcon} from '@images/index';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import {TouchComponent} from '@components/index';
import {useSelector} from 'react-redux';
import dayjs from 'dayjs';

export interface Props {
	modalVisible?: boolean;
	onRequestClose?: () => void;
	onViewMore?: () => void;
}

interface ThongBao {
	id: string;
	sendUserId: string;
	sendUserName: string;
	receiveUserId: string;
	receiveUserName: string;
	receiveRoleId: string;
	receiveDeptId: string;
	message: string;
	url: string;
	isRead: boolean;
	created: Date;
}

const NotiComponent = (props: Props) => {
	const danhSachThongBao: ThongBao[] = useSelector(
		(state: any) => state.thongbao.danhSachThongBao,
	);

	const renderItem = (item: ThongBao) => (
		<View style={{flex: 1}} key={item.id}>
			<View style={styles.infoUserView}>
				<View style={styles.borderAvatar}>
					<FastImage
						style={{
							width: 40,
							height: 40,
							borderRadius: 20,
							borderColor: 'white',
							borderWidth: 2,
						}}
						source={{
							uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_IXLvlZ0huKMtQtzzlBSju6E0YnG7GFeHxA&usqp=CAU',
						}}
						resizeMode={FastImage.resizeMode.cover}
					/>
				</View>
				<View style={{flex: 1}}>
					<View style={styles.nameView}>
						{/* <Text style={styles.fullName}>{item.receiveUserName} - </Text> */}
						<Text style={styles.userName}>{item.sendUserName}</Text>
						<Text style={styles.time}>
							{dayjs(item.created).format('hh:mm - DD/MM/YYYY')}
						</Text>
					</View>
					<Text style={styles.description}>{item.message}</Text>
				</View>
			</View>
			{/* <View style={styles.addressViewParent}>
				<View style={styles.addressView}>
					<Text style={styles.address}>{item.address}</Text>
					<Text style={styles.status}>{item.status}</Text>
					<View style={styles.typeView}>
						<Text style={styles.type}>{item.type}</Text>
					</View>
				</View>
			</View> */}
		</View>
	);

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={props.modalVisible}
			onRequestClose={props.onRequestClose}>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<TouchComponent style={styles.closeNoti} onPress={props.onRequestClose}>
						<ArrowDownIcon />
						<Text style={styles.infoTitle}>Thông báo</Text>
					</TouchComponent>
					<View style={styles.infoNoti}>
						{/* <View style={styles.listNoti}> */}
						<FlatList
							showsVerticalScrollIndicator={false}
							data={danhSachThongBao}
							renderItem={({item}) => renderItem(item)}
							keyExtractor={item => item.id.toString()}
						/>
						{/* </View> */}
					</View>
					<View style={styles.footerViewParent}>
						<View style={styles.footerView}>
							<TouchComponent
								style={styles.buttonViewmore}
								onPress={props.onViewMore}>
								<Text style={styles.textButtonViewmore}>Xem thêm</Text>
							</TouchComponent>
							<TouchComponent
								style={styles.buttonClose}
								onPress={props.onRequestClose}>
								<Text style={styles.textButtonClose}>Đóng</Text>
							</TouchComponent>
						</View>
					</View>
				</View>
			</View>
		</Modal>
	);
};

NotiComponent.defaultProps = {};

export default memo(NotiComponent);

const styles = StyleSheet.create({
	centeredView: {},
	modalView: {
		height: '100%',
		marginTop: '80%',
		backgroundColor: 'white',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		// alignItems: 'center',
	},
	closeNoti: {
		marginTop: 7,
		alignItems: 'center',
	},
	infoNoti: {
		padding: 19,
		flex: 1,
	},
	infoTitle: {
		fontFamily: 'arial',
		fontSize: moderateScale(14),
		lineHeight: moderateScale(16),
		fontWeight: 'bold',
		color: '#187779',
		marginTop: moderateScale(20),
	},
	listNoti: {
		marginBottom: moderateScale(350),
		backgroundColor: 'red',
	},
	infoUserView: {
		flexDirection: 'row',
		flex: 1,
		marginBottom: 10,
		alignItems: 'center',
	},
	borderAvatar: {
		width: 45,
		height: 45,
		borderRadius: 22.5,
		borderColor: '#40A840',
		borderWidth: 2,
		alignItems: 'center',
		alignContent: 'center',
		justifyContent: 'center',
	},
	nameView: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginLeft: moderateScale(10),
	},
	fullName: {
		color: '#4A4A4A',
		fontFamily: 'arial',
		fontSize: moderateScale(12),
		lineHeight: moderateScale(14),
		fontWeight: 'bold',
	},
	userName: {
		color: '#25989A',
		fontFamily: 'arial',
		fontSize: moderateScale(12),
	},
	time: {
		color: '#B8B8B8',
		fontFamily: 'arial',
		fontSize: moderateScale(10),
		lineHeight: moderateScale(11),
		// position: 'absolute',
		// right: moderateScale(50),
	},
	description: {
		color: '#7C86A2',
		fontFamily: 'arial',
		fontSize: moderateScale(12),
		marginLeft: moderateScale(10),
		marginVertical: moderateScale(4),
		// marginRight: moderateScale(50),
	},
	addressViewParent: {
		width: '100%',
		height: 30,
	},
	addressView: {
		flexDirection: 'row',
		alignItems: 'center',
		position: 'absolute',
		right: 0,
	},
	address: {
		color: '#4A4A4A',
		fontFamily: 'arial',
		fontSize: moderateScale(11),
		lineHeight: moderateScale(13),
	},
	status: {
		color: '#4A4A4A',
		fontFamily: 'arial',
		fontSize: moderateScale(11),
		lineHeight: moderateScale(13),
		marginHorizontal: moderateScale(5),
	},
	typeView: {
		width: scale(68),
		height: verticalScale(20),
		borderRadius: 10,
		backgroundColor: '#25989A',
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: moderateScale(5),
	},
	type: {
		color: '#FFFFFF',
		fontFamily: 'arial',
		fontSize: moderateScale(11),
		lineHeight: moderateScale(13),
		width: '100%',
		textAlign: 'center',
	},
	footerViewParent: {
		position: 'absolute',
		bottom: 0,
		width: '100%',
		flexDirection: 'column',
		alignItems: 'center',
		height: '60%',
		backgroundColor: '#fff',
	},
	footerView: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	buttonViewmore: {
		width: scale(157),
		height: verticalScale(32),
		backgroundColor: '#0EACAF',
		borderRadius: moderateScale(6),
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: moderateScale(7),
	},
	textButtonViewmore: {
		fontFamily: 'arial',
		fontSize: moderateScale(12),
		lineHeight: moderateScale(14),
		color: '#FFFFFF',
		fontWeight: 'bold',
		width: '100%',
		textAlign: 'center',
	},
	buttonClose: {
		width: scale(157),
		height: verticalScale(32),
		backgroundColor: '#F0F0F0',
		borderRadius: moderateScale(6),
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: moderateScale(7),
	},
	textButtonClose: {
		fontFamily: 'arial',
		fontSize: moderateScale(12),
		lineHeight: moderateScale(14),
		color: '#4A4A4A',
		fontWeight: 'bold',
		width: '100%',
		textAlign: 'center',
	},
});
