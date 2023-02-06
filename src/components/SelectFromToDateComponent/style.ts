import {StyleSheet} from 'react-native';
import {
	scale,
	verticalScale,
	moderateScale,
	moderateVerticalScale,
} from 'react-native-size-matters';

export default StyleSheet.create({
	formView: {
		width: '100%',
		// paddingHorizontal: moderateScale(54)
	},
	form: {
		// width: '100%'
	},
	title: {
		marginVertical: 12,
		fontFamily: 'arial',
		color: '#7C86A2',
		fontSize: 12,
		lineHeight: 14,
	},
	viewInput: {
		flexDirection: 'row',
		alignItems: 'center',
		// justifyContent:'space-between',
		justifyContent: 'center',
		borderRadius: 3,
		borderWidth: 1,
		borderColor: '#C4C4C4',
	},
	input: {
		flex: 1,
		backgroundColor: '#FFFFFF',
		// opacity: 0.7,
		height: 36,
		// borderRadius: 3,
		// borderWidth: 1,
		// borderColor: '#C4C4C4',
		// marginTop: 8,
		paddingHorizontal: 12,
		flexDirection: 'row',
		alignItems: 'center',
	},
	viewDate: {
		position: 'absolute',
		right: 15,
	},
});
