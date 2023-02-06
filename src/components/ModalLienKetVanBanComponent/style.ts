import AppColors from '@commons/AppColors';
import { StyleSheet, Dimensions } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default StyleSheet.create({
  container: {
    height: 'auto',
    marginTop: 'auto',
    backgroundColor: 'white',
    alignContent: 'center',
    alignItems: 'center',
    paddingVertical: 8
  },
  viewButton: {
    flexDirection: 'row'
  },
  buttonYear: {
    backgroundColor: '#0EACAF',
    width: width / 4 - 12,
    margin: 6,
    borderRadius: 3
  },
  buttonMonth: {
    backgroundColor: '#C6699F',
    width: width / 4 - 12,
    margin: 6,
    borderRadius: 3
  },
  buttonWeek: {
    backgroundColor: '#40A840',
    width: width / 4 - 12,
    margin: 6,
    borderRadius: 3
  },
  buttonDay: {
    backgroundColor: '#FB6363',
    width: width / 4 - 12,
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
  titleModal: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: 'bold',
    color: '#187779',
    margin: 8,
    textAlign: 'center',
    marginVertical: 12
  },
  bottom: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0
  }

});
