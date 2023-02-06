import {StyleSheet} from 'react-native';

export default StyleSheet.create({
	formView: {
		width: '100%',
		// paddingHorizontal: moderateScale(54)
	},
	form: {
		width: '100%',
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
		alignContent: 'center',
		alignItems: 'center',
		borderRadius: 3,
		borderWidth: 1,
		borderColor: '#C4C4C4',
		paddingEnd: 12,
		justifyContent: 'center',
	},
	input: {
		// width: '100%',
		// backgroundColor: 'red',
		flex: 1,
		// opacity: 0.7,
		height: 36,
		// borderRadius: 3,
		// borderWidth: 1,
		// borderColor: '#C4C4C4',
		// justifyContent: 'center',
		paddingHorizontal: 10,
		// marginTop: 8,
		textAlignVertical: 'top',
		// paddingHorizontal: 12,
	},
	viewDate: {
		position: 'absolute',
		right: 15,
	},
});
