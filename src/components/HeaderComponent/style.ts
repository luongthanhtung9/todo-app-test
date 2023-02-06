import { Dimensions, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    header: {
        width: '100%',
        height: verticalScale(65),
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
    },
    titleCenter: {
        width: deviceWidth - moderateScale(72),
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: moderateScale(17),
        fontFamily: 'arial',
        lineHeight: moderateScale(22),
    },
    backView: {
        width: scale(30),
        height: verticalScale(65),
        justifyContent: 'center',
        marginLeft: 16
    },
    searchView: {
        width: scale(30),
        height: verticalScale(65),
        marginLeft: 'auto',
        justifyContent: 'center',
        marginRight: 6
    }
});
