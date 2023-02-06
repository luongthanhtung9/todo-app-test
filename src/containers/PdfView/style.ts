import { Dimensions, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default StyleSheet.create({
    bgView: {
        with: '100%',
        height: '100%'
    },
    logoView: {
        position: 'absolute',
        top: moderateScale(18),
        right: moderateScale(22)
    },
    loginForm: {
        position: 'absolute', top: moderateScale(186), width: '100%', flexDirection: 'column', alignContent: 'center', alignItems: 'center'
    },
    loginTitle: {
        width: '100%',
        textAlign: 'center',
        fontFamily: 'arial',
        color: '#FFFFFF',
        fontSize: moderateScale(24),
        lineHeight: moderateScale(28),
        fontWeight: 'bold'
    },
    rememberView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: moderateScale(51),
        marginTop: moderateScale(10)
    },
    rememberText: {
        textAlign: 'center',
        fontFamily: 'arial',
        color: '#FFFFFF',
        fontSize: moderateScale(12),
        lineHeight: moderateScale(14)
    },
    buttonView: {
        width: 125,
        height: 32,
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        shadowColor: "#1b5306",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 2,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 19
    },
    buttonText: {
        width: '100%',
        textAlign: 'center',
        color: '#187779',
        fontFamily: 'arial',
        fontSize: 12,
        lineHeight: 14,
        fontWeight: 'bold'
    },
    pdf: {
        flex:1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
});
