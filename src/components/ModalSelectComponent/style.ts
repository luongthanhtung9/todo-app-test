import AppColors from '@commons/AppColors';
import AppFont from '@commons/AppFont';
import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default StyleSheet.create({
  formView: {
    // flex:1,
    // paddingTop: verticalScale(12),
    // paddingTop: moderateScale(1),
    // paddingHorizontal: moderateScale(6),
    paddingVertical: moderateScale(8),
  },
  title: {
    // fontFamily: AppFont.Roboto,
    // color: '#D3EFFF',
    // fontSize: moderateScale(14),
    // lineHeight: moderateScale(16),
    // fontWeight: '500'
    color: '#202020',
    fontSize: moderateScale(14),
    marginBottom: 1,
    // lineHeight: moderateScale(16),
    fontWeight: '500'
  },
  viewInput: {
    flexDirection: 'row',
    width: '100%',
  },
  inputlogin: {
    backgroundColor: AppColors.white,
    // opacity: 0.7,
    width: '100%',
    height: 42,
    paddingHorizontal: 10,
    marginTop: verticalScale(8),
    borderRadius: 3,
    borderWidth: 1,
    borderColor: AppColors.borderColor,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  input: {
    backgroundColor: '#FFFFFF',
    // opacity: 0.7,
    width: '100%',
    height: 42,
    paddingHorizontal: 10,
    marginTop: verticalScale(6),
    borderRadius: 3,
    borderWidth: 1,
    borderColor: AppColors.borderColor,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
    // justifyContent: 'center',
  },
  textInput: {
    color: '#FFFFFF',
    fontFamily: 'arial',
    fontSize: 12,
    lineHeight: 14,
    // fontWeight: '500',
    marginRight: 40
  },
  viewEyelogin: {
    width: scale(40),
    height: 40,
    marginTop: verticalScale(8),
    backgroundColor: AppColors.gray,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
  },
  viewEye: {
    width: scale(40),
    height: verticalScale(42),
    marginTop: verticalScale(8),
    backgroundColor: '#F2F2F2',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3
  },
  centeredView: {
    flex: 1,
    backgroundColor: '#49494996'
    // justifyContent: "center",
    // alignItems: "center",
  },
  modalView: {
    // margin: 20,
    width: '100%',
    flexDirection: 'column',
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // paddingTop: 15,
    paddingBottom: 25,
    // paddingVertical: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'absolute',
    bottom: 0,
    overflow: 'hidden'
  },
  button: {
    width: '40%', height: 40, marginHorizontal: 5, marginTop: 15, marginBottom: 5
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  viewTitle: {
    backgroundColor: '#ffffff',
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 15
  },
  modalText: {
    textAlign: "center",
    fontFamily: 'arial',
    fontSize: 16,
    lineHeight: 18,
    fontWeight: 'bold',
    color: '#187779',
  },
  viewBottom: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent:'space-around',
    paddingHorizontal:36,
    width:'100%'
    // position: 'absolute',
    // bottom: 40
  },
  viewList: {
    maxHeight: 250,
    padding: 15
  },
  viewItemSelect: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems:'center',
  },
  textItemSelect: {
    width: '100%',
    fontFamily: 'arial',
    fontSize: 12,
    lineHeight: 14,
    // fontWeight: '500',
    color: '#4A4A4A'
  },
});



