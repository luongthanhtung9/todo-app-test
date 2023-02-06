import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

export default StyleSheet.create({
    itemView: {
        width: '28%',
        height: verticalScale(89),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F6FFFE',
        margin: moderateScale(10),
        borderRadius: moderateScale(6)
    },
    numberView: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: scale(24),
        height: verticalScale(18),
        borderRadius: moderateScale(6),
        flexDirection: 'row',
        alignItems: 'center'
    },
    numberText: {
        fontFamily: 'arial',
        fontSize: moderateScale(12),
        lineHeight: moderateScale(14),
        color: 'white',
        width: '100%',
        textAlign: 'center'
    },
    titleView: {
        width: '100%',
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontFamily: 'arial',
        textAlign: 'center',
        fontSize: moderateScale(12),
        color: '#444444',
        marginTop: moderateScale(11),
        marginHorizontal: moderateScale(10),
    }
});
