import { Dimensions, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default StyleSheet.create({
    modalContainer: {
        padding: 12,
        backgroundColor: "#fff"
    },
    buttonBottom: {
        justifyContent: 'center',
        height: 32,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#C4C4C4',
        borderRadius:  3
    },
    dong: {
        backgroundColor: '#F0F0F0'
    },
    textDongButton: {
        color: '#4A4A4A',
        fontSize: 12,
        textAlign: 'center'
    },
    titleText: {
        fontWeight: 'bold',
        paddingBottom: 16,
        fontSize: 24
    },
    contentText: {
        fontSize: 14,
        paddingBottom: 16
    }
});
