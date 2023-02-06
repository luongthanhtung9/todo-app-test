import {Dimensions, StyleSheet, Platform} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const platform = Platform.OS;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default StyleSheet.create({
	documentReceived: {
		flex: 1,
	},
	viewList: {
		flex: 1,
		height: deviceHeight - 150,
		marginBottom: 55,
		padding: moderateScale(6),
	},
	btnTop: {
		flex: 1,
		padding: 5,
	},
	viewPager: {
		width: Dimensions.get('window').width,
		flex: 1,
	},
});
