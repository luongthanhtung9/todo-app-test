import {Dimensions, StyleSheet} from 'react-native';
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  documentReceived: {
    padding: moderateScale(6),
    height: deviceHeight - 230,
  },
  boxSearchTime: {
    flexDirection: 'row',
    margin: moderateVerticalScale(12),
    marginBottom: 0,
  },
  buttonSearchTime: {
    paddingTop: 9,
    paddingBottom: 9,
    paddingLeft: 12,
    paddingRight: 13,
    marginRight: verticalScale(12),
  },
  textButton: {
    color: '#fff',
    fontSize: 12,
  },
  namNay: {
    backgroundColor: '#0EACAF',
  },
  thangNay: {
    backgroundColor: '#C6699F',
  },
  tuanNay: {
    backgroundColor: '#40A840',
  },
  homNay: {
    backgroundColor: '#FB6363',
    marginRight: 0,
  },
  button: {
    height: moderateScale(205),
    margin: moderateScale(10),
    marginBottom: 0,
  },
  leftButton: {
    aspectRatio: 1,
    flexDirection: 'column',
    marginRight: 10,
    backgroundColor: '#0EACAF',
    height: moderateScale(205), justifyContent: 'center', width: moderateScale(60),
  },
  textSwipe: {
    color: '#fff',
    justifyContent: 'center',
    textAlign: 'center',
  },
  rightButton: {
    alignSelf: 'center',
    aspectRatio: 1,
    flexDirection: 'column',
    padding: 10,
    backgroundColor: '#861B1B',
    height: moderateScale(205),
    justifyContent: 'center',
    width: moderateScale(60),
  },
  bottomMenuStyle: {
    backgroundColor: '#F6FFFE',
    paddingTop: 10,
    paddingBottom: 10,
    position: 'absolute',
    bottom: 0,
    width: deviceWidth,
  },
  boxButton: {
    marginLeft: 12,
    marginRight: 12,
    justifyContent: 'center',
  },
  buttonBottom: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  buttonBottomActive: {
    padding: 16,
    backgroundColor: '#187779',
    borderRadius: 10,
  },
  textButtonActive: {
    paddingTop: 4,
    fontSize: 12,
    color: '#861B1B',
  },
  iconDefaultStyle: {
    color: '#C4C4C4',
  },
  iconActive: {
    color: '#fff',
  },
  containerTrinh: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
    paddingBottom: 44,
    alignItems: 'center',
  },
  titleTrinh: {
    paddingTop: 16,
    fontSize: 16,
    color: '#187779',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  contentTrinh: {
    paddingTop: 4,
    color: '#4A4A4A',
    fontSize: 14,
    fontWeight: 'bold',
  },
  contentCodeDoc: {
    paddingTop: 4,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#DB0000',
  },
  buttonBottomModal: {
    flexDirection: 'row',
    marginTop: 24,
    marginLeft: 16,
    marginRight: 16,
    paddingBottom: 18,
  },
  itemBox1: {
    width: (deviceWidth - 112) / 2,
    paddingRight: 5,
  },
  itemBox2: {
    width: (deviceWidth - 112) / 2,
    paddingLeft: 5,
    marginLeft: 'auto',
  },
  buttonSearch: {
    marginTop: 20,
    flexDirection: 'row',
  },
  buttonBottomVB: {
    justifyContent: 'center',
    height: 32,
    textAlign: 'center',
    borderRadius: 6,
  },
  textTraButton: {
    color: '#fff',
    fontSize: 14,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  timKiem: {
    backgroundColor: '#0EACAF',
  },
  dong: {
    backgroundColor: '#F0F0F0',
  },
  textDongButton: {
    color: '#4A4A4A',
    fontSize: 14,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  row2: {
    flexDirection: 'row',
  },
  column2: {
    flexDirection: 'column',
    flex: 1,
  },
});
