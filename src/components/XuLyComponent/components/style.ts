import AppColors from '@commons/AppColors';
import {Dimensions, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
const deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
	modal: {
		justifyContent: 'center',
		margin: 0,
		paddingHorizontal: 16,
		paddingBottom: 38,
	},
	title: {
		marginVertical: 12,
		fontFamily: 'arial',
		color: '#7C86A2',
		fontSize: 12,
		lineHeight: 14,
	},
	container: {
		backgroundColor: AppColors.white,
		borderRadius: 6,
		padding: 16,
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center',
	},
	viewTitle: {
		width: '100%',
		alignItems: 'center',
		flexDirection: 'row',
		marginBottom: 16,
	},
	close: {
		right: 20,
	},
	textTitle: {
		width: '100%',
		textAlign: 'center',
		color: '#000000',
		fontSize: moderateScale(17),
		fontFamily: 'arial',
		lineHeight: moderateScale(22),
		fontWeight: 'bold',
	},
	textItem: {
		color: '#000000',
		fontSize: moderateScale(12),
		fontFamily: 'arial',
		lineHeight: moderateScale(22),
		marginVertical: 5,
	},
	viewButton: {
		width: deviceWidth,
		flexDirection: 'row',
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center',
		marginTop: 16,
	},
});
