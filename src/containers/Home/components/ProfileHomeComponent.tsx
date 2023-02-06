import Icon from '@commons/Icon';
import {TouchComponent} from '@components/index';
import ModalVaiTroComponent from '@components/ModalVaiTroComponent';
import {Role} from '@images/index';
import {UserInfo} from '@models/UserInfo';
import {getUserLogin} from '@utils/index';
import React, {memo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {moderateVerticalScale} from 'react-native-size-matters';

export interface Props {
	token: string;
	onCalenda: () => void;
	onCar: () => void;
	onMeetRoom: () => void;
	onPressHome: () => void;
	isSelected?: boolean;
}

const ProfileHomeComponent = (props: Props) => {
	const userInfo: UserInfo = getUserLogin(props.token);
	const [isisVisibleVT, setIsisVisibleVT] = useState<boolean>(false);

	return (
		<View style={styles.container}>
			<View style={{flexDirection: 'row'}}>
				<TouchComponent style={styles.updateIcon} onPress={() => setIsisVisibleVT(true)}>
					<Role />
				</TouchComponent>
				<View style={{paddingVertical: 16, flex: 1, paddingEnd: 16}}>
					<Text style={styles.infoname}>{userInfo.displayName}</Text>
					<View style={{flexDirection: 'row', marginTop: 4, alignItems: 'center'}}>
						<Icon color={'#7C86A2'} size={10} name="phan-luong2" />
						<Text
							numberOfLines={2}
							style={[
								styles.infoname,
								{fontSize: 12, paddingHorizontal: 4, color: '#7C86A2'},
							]}>
							{userInfo.roleName}
						</Text>
					</View>
					<View style={{flexDirection: 'row', marginTop: 4, alignItems: 'center'}}>
						<Icon color={'#7C86A2'} size={10} name="city_buildings" />
						<Text
							numberOfLines={2}
							style={[
								styles.infoname,
								{fontSize: 12, paddingHorizontal: 4, color: '#7C86A2'},
							]}>
							{userInfo.deptName}
						</Text>
					</View>
				</View>
			</View>
			<View style={{flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 16}}>
				<TouchComponent
					style={[
						styles.calenda,
						{backgroundColor: props.isSelected ? '#187779' : '#DCFFFB'},
					]}
					onPress={() => props.onPressHome()}>
					<Icon name="home" size={20} color={props.isSelected ? '#DCFFFB' : '#187779'} />
				</TouchComponent>
				<TouchComponent style={styles.calenda} onPress={() => props.onCalenda()}>
					<Icon name="lich" size={20} color="#187779" />
				</TouchComponent>
				<TouchComponent style={styles.calenda} onPress={() => props.onCar()}>
					<Icon name="xe" size={20} color="#187779" />
					{/* <CarIcon/> */}
				</TouchComponent>
				<TouchComponent style={styles.calenda} onPress={() => props.onMeetRoom()}>
					<Icon name="meetingroom" size={20} color="#187779" />
					{/* <MeetRoomIcon/> */}
				</TouchComponent>
			</View>
			<ModalVaiTroComponent
				isVisible={isisVisibleVT}
				closePopup={() => setIsisVisibleVT(false)}
			/>
		</View>
	);
};

ProfileHomeComponent.defaultProps = {};

export default memo(ProfileHomeComponent);

const styles = StyleSheet.create({
	container: {
		marginTop: 10,
		backgroundColor: '#F6FFFE',
		borderBottomColor: '#DAEFED',
		borderBottomWidth: 1,
		borderTopEndRadius: 6,
		borderTopStartRadius: 6,
	},
	avatarBorder: {
		width: 50,
		height: 50,
		borderColor: '#0EACAF',
		borderWidth: 3,
		borderRadius: 25,
		marginTop: moderateVerticalScale(10),
		alignItems: 'center',
		justifyContent: 'center',
	},
	avatarImg: {
		borderRadius: 20,
		borderColor: 'white',
		borderWidth: 2,
		width: 40,
		height: 40,
		justifyContent: 'center',
	},
	updateIcon: {
		// borderColor: '#DCFFFB',
		// borderWidth: 1,
		// width: 30,
		// height: 30,
		// borderRadius: 15,
		marginHorizontal: 16,
		justifyContent: 'center',
		// marginTop: -10,
		// marginStart: 60
	},
	infoname: {
		fontFamily: 'arial',
		fontSize: 18,
		lineHeight: 20,
		fontWeight: 'bold',
		color: '#4A4A4A',
	},
	infoaddressParent: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: moderateVerticalScale(6),
	},
	infoaddress: {
		fontFamily: 'arial',
		fontSize: 12,
		color: '#7C86A2',
	},
	calenda: {
		width: 42,
		height: 42,
		// borderTopLeftRadius: 21,
		// borderBottomLeftRadius: 21,
		// borderBottomRightRadius: 21,
		borderRadius: 21,
		backgroundColor: '#DCFFFB',
		marginHorizontal: 6,
		// position: 'absolute',
		// right: 10,
		// top: 10,
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center',
	},
});
