import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

export default StyleSheet.create({
    card: {
        backgroundColor: '#FAFAFA',
        borderRadius: 10,
        paddingHorizontal: moderateScale(8),
        paddingVertical: moderateVerticalScale(4),
        marginRight: moderateScale(10),
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center'
    }
});
