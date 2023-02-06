import { Dimensions, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default StyleSheet.create({
    info: {
        flexDirection: 'column',
        paddingHorizontal: 12,
        paddingVertical: 8
    },
    label: {
        fontFamily: 'arial',
        fontSize: moderateScale(12),
        lineHeight: moderateScale(14),
        fontWeight: 'bold',
        color: '#4A4A4A',
    },
    note: {
        flexDirection: 'column'
    },
    content: {
        fontFamily: 'arial',
        fontSize: moderateScale(12),
        lineHeight: moderateScale(14),
        color: '#7C86A2',
    }
});
