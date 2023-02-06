import {Dimensions, StyleSheet} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default StyleSheet.create({
	pagerView: {
		flex: 1,
		alignContent: 'center',
		alignItems: 'center',
	},
	viewPager: {
		width: width,
		height: height,
		flex: 1,
	},
	tab: {
		flexDirection: 'row',
		backgroundColor: '#FAFAFA',
		justifyContent: 'space-evenly',
	},
});
