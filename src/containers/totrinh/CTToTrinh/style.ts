import AppColors from '@commons/AppColors';
import {Dimensions, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default StyleSheet.create({
	pagerView: {
		flex: 1,
		alignContent: 'center',
		alignItems: 'center',
	},
	viewPager: {
		flex: 1,
		width: width,
		height: height,
		backgroundColor: 'white',
	},
	tab: {
		width: '100%',
		flexDirection: 'row',
		backgroundColor: '#FAFAFA',
		justifyContent: 'space-evenly',
	},
	modal: {
		justifyContent: 'center',
		margin: 0,
		paddingHorizontal: 16,
		paddingBottom: 38,
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
	},
	textItem: {
		color: '#000000',
		fontSize: moderateScale(12),
		fontFamily: 'arial',
		lineHeight: moderateScale(22),
		marginVertical: 5,
	},
	viewButton: {
		width: width,
		flexDirection: 'row',
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center',
		marginTop: 16,
	},
});
