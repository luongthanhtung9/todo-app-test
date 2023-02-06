import {StyleSheet, Dimensions} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

export default StyleSheet.create({
	notiContainer: {
		paddingHorizontal: moderateScale(12),
		backgroundColor: '#fff',
	},
	notiCard: {
		backgroundColor: '#FFFFFF',
		width: '100%',
		height: Dimensions.get('window').height,
		paddingTop: moderateScale(15),
		borderTopLeftRadius: 6,
		borderTopRightRadius: 6,
	},
	infoUserView: {
		flexDirection: 'row',
		flex: 1,
		marginBottom: 10,
		alignItems: 'center',
	},
	borderAvatar: {
		width: 45,
		height: 45,
		borderRadius: 22.5,
		borderColor: '#40A840',
		borderWidth: 2,
		alignItems: 'center',
		alignContent: 'center',
		justifyContent: 'center',
	},
	nameView: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginLeft: moderateScale(10),
	},
	fullName: {
		color: '#4A4A4A',
		fontFamily: 'arial',
		fontSize: moderateScale(12),
		lineHeight: moderateScale(14),
		fontWeight: 'bold',
	},
	userName: {
		color: '#25989A',
		fontFamily: 'arial',
		fontSize: moderateScale(12),
	},
	time: {
		color: '#7C86A2',
		fontFamily: 'arial',
		fontSize: moderateScale(10),
		lineHeight: moderateScale(11),
		textAlign: 'right',
		// position: 'absolute',
		// right: moderateScale(50),
		marginRight: 10,
	},
	description: {
		color: '#7C86A2',
		fontFamily: 'arial',
		fontSize: moderateScale(12),
		marginLeft: moderateScale(10),
		marginVertical: moderateScale(4),
		// marginRight: moderateScale(50),
	},
});
