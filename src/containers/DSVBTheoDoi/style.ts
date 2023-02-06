import { Dimensions, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    documentReceived: {
        marginBottom: moderateVerticalScale(130),
        // alignContent: 'center',
        // alignItems: 'center',
    },
    viewList: {
        // height: deviceHeight-170,
        padding: moderateScale(6),
        // marginBottom: 80
    }
});
