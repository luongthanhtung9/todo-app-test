import AppColors from '@commons/AppColors';
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

export default StyleSheet.create({
	modal: {
		justifyContent: 'flex-end',
		margin: 0,
		// paddingHorizontal: 16,
		paddingBottom: 38,
	},
	container: {
		height: 300,
		backgroundColor: AppColors.white,
		borderRadius: 6,
		padding: 16,
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
		color: '#187779',
		fontSize: moderateScale(14),
		fontFamily: 'arial',
		lineHeight: moderateScale(22),
		fontWeight: 'bold',
	},
	textItem: {
		color: '#7C86A2',
		fontSize: moderateScale(14),
		fontFamily: 'arial',
		lineHeight: moderateScale(22),
		marginVertical: 5,
	},
});
