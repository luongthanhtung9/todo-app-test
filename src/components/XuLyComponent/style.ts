import {Dimensions, StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
const deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
	xuly: {
		flex: 1,
		backgroundColor: 'white',
		// marginHorizontal: 6
	},
	viewAdd: {
		// width: '60%',
		flexDirection: 'row',
		alignContent: 'center',
		alignItems: 'center',
		marginVertical: 10,
		alignSelf: 'flex-start',
	},
	viewAddTitle: {
		fontFamily: 'arial',
		fontSize: moderateScale(12),
		lineHeight: moderateScale(14),
		color: '#4A4A4A',
		fontWeight: 'bold',
		marginTop: 10,
		marginLeft: 16,
		marginRight: 50,
	},
	viewButton: {
		width: deviceWidth,
		// height:80,
		// position: 'absolute',
		// bottom: 180,
		flexDirection: 'row',
		flexWrap: 'wrap',
		// alignContent: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		// marginBottom: verticalScale(65),
		// position: 'absolute',
		// bottom: 0,
		backgroundColor: '#fff',
		// flex:1
	},
});
