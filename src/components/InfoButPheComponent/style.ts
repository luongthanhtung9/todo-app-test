import {Dimensions, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default StyleSheet.create({
	info: {
		flexDirection: 'row',
		paddingHorizontal: 12,
		paddingVertical: 8,
		alignItems: 'center',
	},
	label: {
		flex: 3,
		fontFamily: 'arial',
		fontSize: moderateScale(12),
		lineHeight: moderateScale(14),
		fontWeight: 'bold',
		color: '#4A4A4A',
		paddingVertical: 2,
	},
	content: {
		fontFamily: 'arial',
		fontSize: moderateScale(12),
		lineHeight: moderateScale(14),
		color: '#7C86A2',
		paddingVertical: 4,
	},
});
