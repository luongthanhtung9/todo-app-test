import {Dimensions, StyleSheet} from 'react-native';
import { moderateScale } from 'react-native-size-matters';

export default StyleSheet.create({
	thongtin: {
		width: Dimensions.get('window').width,
		// backgroundColor: 'red',
		paddingVertical: 10,
		// ...ifIphoneX({
		//     marginBottom: 200
		//   }, {
		//     marginBottom: 140,
		//   })
	},
	titleds: {
		fontFamily: 'arial',
		fontSize: moderateScale(12),
		lineHeight: moderateScale(14),
		fontWeight: 'bold',
		color: '#4A4A4A',
	},
	text_item: {
		fontFamily: 'arial',
		fontSize: moderateScale(12),
		lineHeight: moderateScale(14),
		color: '#7C86A2',
	},
});
