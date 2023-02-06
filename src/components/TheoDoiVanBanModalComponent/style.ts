import { Dimensions, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default StyleSheet.create({

    traVanBanComponent: {
        backgroundColor: '#fff',
        paddingTop: 16,
        paddingBottom: 16,
        width: deviceWidth,
        position: 'absolute',
        bottom: moderateScale(-20),
        left: moderateScale(-20),
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8
    },
    traVanBanTitle: {
        paddingLeft: 16,
        paddingRight: 16,
        color: '#187779',
        fontSize: 16,
        fontWeight: 'bold'
    },
    detailTraVB: {
        marginTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 8,
        paddingTop: 8,
        backgroundColor: '#FAFAFA',
    },
    detailMaVB: {
        color: "#7C86A2",
        fontSize: 12,
        fontWeight: 'bold',
    },
    contentTimeTraVB: {
        flexDirection: 'row',
        marginTop: 7,
    },
    textTimeVB: {
        color: "#7C86A2",
        fontSize: 12,
        paddingLeft: 6,
        paddingRight: 20
    },
    textLocation: {
        marginTop: 10,
        color: "#7C86A2",
        fontSize: 12,
    },
    textTitleXuLy: {
        color: "#7C86A2",
        fontSize: 12,
        paddingLeft: 16,
        paddingRight: 16
    },
    textContentXuLy: {
        color: "#4A4A4A",
        fontSize: 12,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 4,
        paddingBottom: 4,
        marginLeft: 16,
        marginRight: 16,
        marginTop: 8,
        height: moderateScale(64),
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#c4c4c4'
    },
    buttonBottomModal: {
        flexDirection: 'row',
        marginTop: 24,
        marginLeft: 16,
        marginRight: 16,
        paddingBottom: 18,
    },
    itemBox1: {
        width: '100%',
        paddingRight: 5
    },
    itemBox2: {
        width: (deviceWidth - 82),
        paddingLeft: 5,
        marginLeft: 'auto'
    },
    buttonSearch: {
        marginTop: 20,
        flexDirection: 'row'
    },
    buttonBottomVB: {
        justifyContent: 'center',
        height: 32,
        textAlign: 'center',
        borderRadius: 6
    },
    textTraButton: {
        color: '#fff',
        fontSize: 14,
        textTransform: 'uppercase',
        textAlign: 'center',
    },
    timKiem: {
        backgroundColor: '#0EACAF'
    },
    dong: {
        backgroundColor: '#F0F0F0'
    },
    textDongButton: {
        color: '#4A4A4A',
        fontSize: 14,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    rowFlowContent: {
        marginTop: 16
    },
    fisrtContent: { 
        flexDirection: 'row', 
        width: '100%',
    },
    tagContent: { 
        flexDirection: 'row', 
        marginTop: 16 
    },
    imageProfile: {
        alignItems: 'center',
        width: 70,
        justifyContent: 'center',
    },
    avatarBorder: {
        width: 46,
        height: 46,
        borderColor: '#40A840',
        borderWidth: 1,
        borderRadius: 23,
        marginTop: moderateVerticalScale(8)
    },
    avatarImg: {
        borderRadius: 22,
        borderColor: 'white',
        borderWidth: 2,
        width: 44,
        height: 44,
        justifyContent: 'center',
    },
    contentFlow: {
        width: deviceWidth - 70,
    },
    firstContentFlow: {
        flexDirection: 'row',
    },
    textFullName: {
        color: '#4A4A4A',
        fontSize: 14,
        fontWeight: 'bold'
    },
    textUserName: {
        color: '#0EACAF',
        fontSize: 12,
    },
    textTime: {
        marginLeft: 'auto',
        fontSize: 12,
        color: '#7C86A2',
        marginRight: 16
    },
    noiDungXuLy: {
        marginTop: 4,
        color: '#4A4A4A',
        fontSize: 12,
    },
    textTag: {
        backgroundColor: '#FAFAFA',
        borderRadius: 8,
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 8,
        paddingRight: 8,
        fontSize: 12,
        color: '#4A4A4A',
        marginLeft: 8
    },
    tagThemMoi: {
        backgroundColor: '#25989A',
        color: '#fff',
    },
    tagXem: {
        backgroundColor: '#40A840',
        color: '#fff',
    },
});
