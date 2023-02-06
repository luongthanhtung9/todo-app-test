import {TouchComponent} from '@components/index';
import {ExitIcon, HeaderBGImage, LogoHeaderIcon, NotiIcon} from '@images/index';
import React, {memo} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

export interface Props {
	numberNoti?: number;
	onPressNoti?: () => void;
	onPressLog?: () => void;
}

const HeaderHomeComponent = (props: Props) => {
	return (
		<ImageBackground source={HeaderBGImage} style={styles.header}>
			<LogoHeaderIcon width={scale(43)} height={verticalScale(30)} style={styles.logo} />
			<View style={styles.titleView}>
				<Text style={styles.title}>HỆ THỐNG QUẢN LÝ</Text>
				<Text style={styles.title}>VĂN BẢN VÀ ĐIỀU HÀNH</Text>
			</View>
			<View style={styles.buttonView}>
				<TouchComponent style={styles.buttonViewButton} onPress={props.onPressNoti}>
					<View style={styles.iconView}>
						<NotiIcon />
					</View>
					<View style={styles.notiView}>
						<Text style={styles.notiText}>
							{props.numberNoti && props.numberNoti > 99 ? '99+' : props.numberNoti}
						</Text>
					</View>
				</TouchComponent>
				<TouchComponent style={styles.buttonViewButton} onPress={props.onPressLog}>
					<View style={styles.iconView}>
						<ExitIcon />
					</View>
				</TouchComponent>
			</View>
		</ImageBackground>
	);
};

HeaderHomeComponent.defaultProps = {};

export default memo(HeaderHomeComponent);

const styles = StyleSheet.create({
	header: {
		width: '100%',
		height: verticalScale(45),
		flexDirection: 'row',
		alignItems: 'center',
		alignContent: 'center',
	},
	logo: {
		marginHorizontal: moderateScale(8),
	},
	titleView: {
		flexDirection: 'column',
		alignContent: 'center',
	},
	title: {
		color: 'white',
		fontSize: moderateScale(8),
		fontFamily: 'arial',
		lineHeight: moderateScale(12),
		fontWeight: 'bold',
	},
	buttonView: {
		flexDirection: 'row',
		position: 'absolute',
		right: moderateScale(4),
	},
	buttonViewButton: {
		width: 28,
		height: 28,
		borderRadius: 14,
		backgroundColor: '#25989A',
		flexDirection: 'row',
		alignItems: 'center',
		margin: moderateScale(7),
	},
	iconView: {
		width: '100%',
		flexDirection: 'column',
		alignItems: 'center',
	},
	notiView: {
		width: 20,
		height: 14,
		borderRadius: 6,
		backgroundColor: '#FF7A00',
		position: 'absolute',
		right: -5,
		top: -5,
		flexDirection: 'row',
		alignItems: 'center',
	},
	notiText: {
		fontSize: 11,
		lineHeight: 13,
		width: '100%',
		textAlign: 'center',
		color: '#FFFFFF',
		fontFamily: 'arial',
	},
});
