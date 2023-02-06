import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default StyleSheet.create({
    empty: {
        flexDirection:'column',
        alignContent: 'center',
        alignItems: 'center'
    },
    emptyTitle: {
        fontFamily: 'arial',
        fontSize: moderateScale(12),
        lineHeight: moderateScale(21),
        fontWeight: 'bold',
        color: '#4A4A4A',
        marginTop: 50
    }
});
