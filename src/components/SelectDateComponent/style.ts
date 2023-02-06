import {StyleSheet} from 'react-native';
import {verticalScale, moderateScale} from 'react-native-size-matters';

export default StyleSheet.create({
	formView: {
		width: '100%',
		// paddingHorizontal: moderateScale(54)
	},
	form: {
		width: '100%',
	},
	title: {
		// marginTop: moderateScale(8),
		fontFamily: 'arial',
		color: '#7C86A2',
		fontSize: moderateScale(12),
		lineHeight: moderateScale(14),
		marginBottom: 4,
	},
	viewInput: {
		flexDirection: 'row',
		alignContent: 'center',
		alignItems: 'center',
	},
	input: {
		width: '100%',
		backgroundColor: '#FFFFFF',
		// opacity: 0.7,
		height: verticalScale(36),
		borderRadius: 3,
		borderWidth: 1,
		borderColor: '#C4C4C4',
		justifyContent: 'space-between',
		marginTop: 8,
		paddingHorizontal: 12,
		flexDirection: 'row',
		alignItems: 'center',
	},
	viewDate: {
		position: 'absolute',
		right: 15,
	},
});
