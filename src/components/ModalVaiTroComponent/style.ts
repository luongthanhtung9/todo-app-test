import AppColors from '@commons/AppColors';
import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default StyleSheet.create({
    modal: {
        justifyContent: 'center',
        margin: 0,
        paddingHorizontal: 16,
        paddingBottom: 38
    },
    container: {
        backgroundColor: AppColors.white,
        borderRadius: 6,
        padding: 16
    },
    viewTitle: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 16
    },
    close: {
        right: 20
    },
    textTitle: {
        width: '100%',
        textAlign: 'center',
        color: '#000000',
        fontSize: moderateScale(17),
        fontFamily: 'arial',
        fontWeight: 'bold',
        lineHeight: moderateScale(22)
    },
    viewItem: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
    },
    textItem: {
        color: '#000000',
        fontSize: moderateScale(12),
        fontFamily: 'arial',
        lineHeight: moderateScale(22),
        marginVertical: 5
    },
    viewCheck: {
        position: 'absolute',
        right: 0
    }
});
