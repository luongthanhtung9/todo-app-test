import { Dimensions, StyleSheet, Platform } from 'react-native';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const platform = Platform.OS

export default StyleSheet.create({
    documentReceived: {
        flex: 1
    },
    viewList: {
        flex: 1,
        height: (deviceHeight - 150),
        marginBottom: 55,
        padding: moderateScale(6),
    }
});
