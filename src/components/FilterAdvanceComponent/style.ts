import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { StyleSheet, Dimensions } from 'react-native';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    contentModal: {
        height: deviceHeight,
        width: deviceWidth - 100,
        backgroundColor: "#fff",
        position:'absolute',
        right: -24,
        paddingTop: 16,
        paddingLeft: 8,
        paddingRight: 8,
        paddingBottom: 16
    },
    rowHeader: {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    rowContent: {
        backgroundColor: "#fff",
        paddingLeft: 16,
        paddingRight: 16,
    },
    arrowIconStyle: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'transparent',
        shadowColor: 'transparent',
        marginTop: 8,
        borderWidth: 0
    },
    textFilterHeader: {
        color: '#187779',
        fontWeight: 'bold',
        fontSize: 14
    },
    textLabel: {
        color: '#7C86A2',
        fontSize: 12,
        marginTop: 9
    },
    inputSearchStyle: {
        borderColor: '#C4C4C4',
        borderWidth: 1,
        borderRadius: 4,
        height: 32,
        justifyContent: 'center',
    },
    inputFindStyle: {
        marginTop: 7,
        marginBottom: 6,
    },
    textSearchStyle: {
        fontSize: 12,
        color: '#4A4A4A'
    },
    inputSearchNam: {
        flexDirection: 'row'
    },
    inputItemBoxNam: {
        height: 32,
    },
    itemBox1: {
        width: (deviceWidth - 150) / 2,
        paddingRight: 5
    },
    itemBox2: {
        width: (deviceWidth - 150) / 2,
        paddingLeft: 5,
        marginLeft: 'auto'
    },
    buttonSearch: {
        marginTop: 20,
        flexDirection: 'row'
    },
    buttonBottom: {
        justifyContent: 'center',
        height: 32,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#C4C4C4',
        borderRadius:  3
    },
    timKiem: {
        backgroundColor: '#0EACAF'
    },
    dong: {
        backgroundColor: '#F0F0F0'
    },
    textDongButton: {
        color: '#4A4A4A',
        fontSize: 12,
        textAlign: 'center'
    },
    inputDateRange: {
        marginTop: 7,
        height: 32,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#C4C4C4',
        borderRadius: 3,
        backgroundColor: '#fff',
        flexDirection: 'row',
        paddingTop: 6,
    },
    valueDateRange: {
        fontSize: 12,
    },
    iconDateRange: {
        paddingLeft: (deviceWidth - 10) / 4,
        paddingRight: (deviceWidth - 10) / 4
    },
    textButton: {
        color: '#fff',
        fontSize: 12,
        textAlign: 'center'
    },
    dateSelect:{
        marginTop: 7,
        flexDirection: 'row'
    },
    selectFromDate: {
        height: 32,
        borderColor: '#C4C4C4',
        borderRadius: 3,
        borderWidth: 1,
        justifyContent: 'center',
        textAlign: 'center',
        width: '45%'
    },
    selectToDate: {
        marginLeft: 'auto',
        height: 32,
        borderColor: '#C4C4C4',
        borderRadius: 3,
        borderWidth: 1,
        justifyContent: 'center',
        width: '45%'
    },
    textDate: {
        textAlign: 'center',
    }
});
