import { StyleSheet, Dimensions, Platform } from 'react-native';
import { scale, verticalScale, moderateVerticalScale, moderateScale } from 'react-native-size-matters';
import { ifIphoneX } from 'react-native-iphone-x-helper'

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const platform = Platform.OS

export default StyleSheet.create({
    menu: {
        width: deviceWidth,
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F6FFFE',
        position: 'absolute',
        bottom: 0
    },
    menuItem: {
        flexDirection: 'column',
        padding: 10,
        alignItems: 'center',
        alignContent: 'center'
    },
    menuTitle: {
        textAlign: 'center',
        color: '#000000',
        fontSize: moderateScale(11),
        fontFamily: 'arial',
        lineHeight: moderateScale(13),
    }
});
