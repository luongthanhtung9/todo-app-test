import { Dimensions, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    lsxl: {
        width: deviceWidth,
        alignContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: 'white'
    },
    infoDate: {
        flexDirection: 'row'
    },
    infoDateL: {
        width: '35%',
        alignContent: 'center',
        alignItems: 'center'
    },
    infoDateC: {
        width: '30%',
        alignContent: 'center',
        alignItems: 'center'
    },
    infoDateR: {
        width: '35%',
        alignContent: 'center',
        alignItems: 'center'
    },
    viewsendDate: {
        flexDirection: 'row',
        backgroundColor: '#40A840',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
        alignContent: 'center',
        alignItems: 'center'
    },
    viewrecDate: {
        flexDirection: 'row',
        // backgroundColor: '#40A840',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
        alignContent: 'center',
        alignItems: 'center'
    },
    textsendDate: {
        fontFamily: 'arial',
        fontSize: moderateScale(12),
        lineHeight: moderateScale(15),
        color: '#ffffff',
        textAlign: 'center'
    },
    textUserName: {
        fontFamily: 'arial',
        fontSize: moderateScale(16),
        lineHeight: moderateScale(20),
        fontWeight: 'bold',
        color: '#323F4B',
        textAlign: 'center'
    },
    textPosition: {
        fontFamily: 'arial',
        fontSize: moderateScale(12),
        lineHeight: moderateScale(15),
        color: '#7B8794',
        textAlign: 'center'
    },
    infoSend: {

    },
    des: {
        fontFamily: 'arial',
        fontSize: moderateScale(12),
        lineHeight: moderateScale(14),
        color: '#4A4A4A',
    }
});
