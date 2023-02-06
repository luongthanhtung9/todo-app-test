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
});
