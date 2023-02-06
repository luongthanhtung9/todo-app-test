import {Dimensions, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default StyleSheet.create({
	tep: {
		flexDirection: 'column',
		paddingHorizontal: 12,
		paddingVertical: 8,
		// backgroundColor: 'green'
	},
	title: {
		fontFamily: 'arial',
		fontSize: moderateScale(12),
		lineHeight: moderateScale(14),
		fontWeight: 'bold',
		color: '#4A4A4A',
		marginBottom: 10,
	},
	viewListFile: {
		backgroundColor: '#FAFAFA',
		borderRadius: 6,
	},
	viewFile: {
		flexDirection: 'row',
		paddingVertical: 6,
		paddingHorizontal: 10,
		justifyContent: 'space-between',
	},
	fileName: {
		fontFamily: 'arial',
		fontSize: moderateScale(12),
		lineHeight: moderateScale(14),
		color: '#4A4A4A',
		marginLeft: 8,
	},
});
