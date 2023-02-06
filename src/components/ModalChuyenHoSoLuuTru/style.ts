import AppColors from '@commons/AppColors';
import {Dimensions, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
const deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
	modal: {
		// justifyContent: 'center',
		margin: 0,
		paddingHorizontal: 10,
	},
	container: {
		backgroundColor: AppColors.white,
		borderRadius: 6,
		padding: 16,
		position: 'absolute',
		bottom: 0,
		top: 50,
		// maxHeight: '80%'
	},
	viewTitle: {
		width: '100%',
		alignItems: 'center',
		flexDirection: 'row',
		marginBottom: 30,
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
		fontWeight: 'bold',
		lineHeight: moderateScale(22),
	},
	textItem: {
		color: '#000000',
		fontSize: moderateScale(12),
		fontFamily: 'arial',
		lineHeight: moderateScale(22),
		marginVertical: 5,
	},
	viewInfoName: {
		fontFamily: 'arial',
		fontSize: moderateScale(14),
		lineHeight: moderateScale(16),
		fontWeight: 'bold',
		color: '#4A4A4A',
		marginTop: 4,
		marginLeft: 4,
		marginBottom: 4,
		marginRight: 40,
	},
	viewInfoPosition: {
		fontFamily: 'arial',
		fontSize: moderateScale(12),
		lineHeight: moderateScale(14),
		color: '#4A4A4A',
		margin: 4,
	},
	viewButton: {
		width: deviceWidth,
		flexDirection: 'row',
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		bottom: 0,
		marginBottom: 20,
	},
	viewTouch: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		height: 40,
	},
	viewTextInfo: {flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10},
	titleView: {
		width: '45%',
		fontWeight: 'bold',
		marginRight: 10,
	},
	contentView: {
		flex: 1,
	},
	viewCheckBox: {
		width: 30,
		marginRight: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
