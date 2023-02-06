import {StyleSheet, Dimensions} from 'react-native';
import {verticalScale, moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {ifIphoneX} from 'react-native-iphone-x-helper';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default StyleSheet.create({
	home: {
		flexDirection: 'column',
		alignContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
	infomationParent: {
		width: '100%',
		paddingHorizontal: moderateScale(12),
	},
	infomation: {
		width: '100%',
		height: verticalScale(275),
		borderRadius: 6,
		backgroundColor: '#F7FFFE',
		marginTop: moderateVerticalScale(10),
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatarView: {
		alignItems: 'center',
	},
	avatarBorder: {
		width: 120,
		height: 120,
		borderColor: '#0EACAF',
		borderWidth: 3,
		borderRadius: 60,
		marginTop: moderateVerticalScale(20),
	},
	avatarImg: {
		borderRadius: 57,
		borderColor: 'white',
		borderWidth: 4,
		width: 114,
		height: 114,
		justifyContent: 'center',
	},
	updateIcon: {
		position: 'absolute',
		top: moderateVerticalScale(120),
	},
	infoname: {
		fontFamily: 'arial',
		fontSize: moderateScale(18),
		lineHeight: moderateScale(21),
		fontWeight: 'bold',
		color: '#4A4A4A',
		marginTop: moderateVerticalScale(15),
	},
	infoaddressParent: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: moderateVerticalScale(6),
	},
	infoaddress: {
		fontFamily: 'arial',
		fontSize: moderateScale(12),
		color: '#7C86A2',
		marginLeft: moderateScale(7),
	},
	textCare: {
		fontFamily: 'arial',
		fontSize: moderateScale(12),
		lineHeight: moderateScale(14),
		fontWeight: 'bold',
		color: '#187779',
		marginTop: moderateScale(10),
		textDecorationLine: 'underline',
	},
	tabTitleView: {
		backgroundColor: '#FFFFFF',
		paddingHorizontal: 12,
		paddingVertical: 14,
		alignItems: 'center',
		flexDirection: 'row',
		borderBottomEndRadius: 6,
		borderBottomStartRadius: 6,
	},
	tabTitleItemView: {
		flexDirection: 'column',
		alignContent: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 6,
		paddingBottom: 6,
	},
	tabTitleItem: {
		fontSize: 12,
		lineHeight: 14,
		fontWeight: 'bold',
		fontFamily: 'arial',
		textAlign: 'center',
	},
	selectedView: {
		width: '100%',
		height: 2,
		backgroundColor: '#187779',
		position: 'absolute',
		bottom: 0,
	},
	pagerView: {
		width: '100%',
		alignItems: 'center',
		alignContent: 'center',
		// marginTop: moderateVerticalScale(5)
	},
	viewPager: {
		width: width,
		...ifIphoneX(
			{
				height: height - verticalScale(400),
			},
			{
				height: height - verticalScale(330),
			},
		),
	},
});
