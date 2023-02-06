import { Dimensions, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default StyleSheet.create({
    pagerView: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
    },
    viewPager: {
        width: width,
        height: height-200,
    },
    tab: {
        flexDirection: 'row',
        backgroundColor: '#FAFAFA',
        justifyContent: 'space-evenly',
    }
});
