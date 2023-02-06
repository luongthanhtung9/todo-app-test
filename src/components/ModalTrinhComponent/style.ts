import AppColors from '@commons/AppColors';
import { Dimensions, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
const deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    modal: {
        // justifyContent: 'center',
        margin: 0,
        paddingHorizontal: 10,
    },
    container: {
        backgroundColor: AppColors.white,
        borderRadius: 6,
        padding: 16,
        position: 'absolute',
        bottom: 0,
        top: 50
        // maxHeight: '80%'
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
    textItem: {
        color: '#000000',
        fontSize: moderateScale(12),
        fontFamily: 'arial',
        lineHeight: moderateScale(22),
        marginVertical: 5
    },
    viewLeader: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 8
    },
    viewInfo: {
        marginLeft: 8
    },
    viewInfoName: {
        fontFamily: 'arial',
        fontSize: moderateScale(14),
        lineHeight: moderateScale(16),
        fontWeight: 'bold',
        color: '#4A4A4A',
        margin: 4
    },
    viewInfoPosition: {
        fontFamily: 'arial',
        fontSize: moderateScale(12),
        lineHeight: moderateScale(14),
        color: '#4A4A4A',
        margin: 4
    },
    viewIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        borderColor: '#C4C4C4',
        borderWidth: 1,
        alignContent: 'center',
        alignItems: 'center'
    },
    avatarImg: {
        borderRadius: 21,
        borderColor: 'white',
        borderWidth: 1,
        width: 42,
        height: 42,
        justifyContent: 'center',
    },
    viewSelect: {
        position: 'absolute',
        right: 6
    },
    viewList: {
        marginBottom: 100
    },
    viewButton: {
        width: deviceWidth,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
    }
});
