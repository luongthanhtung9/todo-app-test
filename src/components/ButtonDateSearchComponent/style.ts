import { Dimensions, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const width = Dimensions.get('window').width

export default StyleSheet.create({
    viewButton: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    buttonYear: {
        backgroundColor: '#0EACAF',
        width: width / 4 - 14,
        margin: 6,
        borderRadius: 3
    },
    buttonMonth: {
        backgroundColor: '#C6699F',
        width: width / 4 - 14,
        margin: 6,
        borderRadius: 3
    },
    buttonWeek: {
        backgroundColor: '#40A840',
        width: width / 4 - 14,
        margin: 6,
        borderRadius: 3
    },
    buttonDay: {
        backgroundColor: '#FB6363',
        width: width / 4 - 14,
        margin: 6,
        borderRadius: 3
    },
    titleButton: {
        fontFamily: 'arial',
        fontSize: moderateScale(12),
        lineHeight: moderateScale(14),
        fontWeight: 'bold',
        color: '#FFFFFF',
        margin: 8,
        textAlign: 'center'
    },
});
