import { Dimensions, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default StyleSheet.create({
    pagerView: {
        // flex: 1, 
        // alignItems: 'center', 
        // alignContent: 'center', 
        // marginTop: 12,
        
    },
    viewPager: {
        width: width-24,
        height: height-230,
    }
});
