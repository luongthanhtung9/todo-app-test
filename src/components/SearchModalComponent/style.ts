import AppColors from '@commons/AppColors';
import {StyleSheet, Dimensions, Platform} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const platform = Platform.OS;

export default StyleSheet.create({
	container: {
		height: 'auto',
		marginTop: 'auto',
		backgroundColor: 'white',
		alignItems: 'center',
		paddingVertical: 8,
        justifyContent:'flex-end',
		borderWidth: 1,
		borderColor: '#F6F6F6',
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8
	},
	viewButton: {
		flexDirection: 'row',
	},
	buttonYear: {
		backgroundColor: '#0EACAF',
		width: width / 4 - 12,
		margin: 6,
		borderRadius: 3,
	},
	buttonMonth: {
		backgroundColor: '#C6699F',
		width: width / 4 - 12,
		margin: 6,
		borderRadius: 3,
	},
	buttonWeek: {
		backgroundColor: '#40A840',
		width: width / 4 - 12,
		margin: 6,
		borderRadius: 3,
	},
	buttonDay: {
		backgroundColor: '#FB6363',
		width: width / 4 - 12,
		margin: 6,
		borderRadius: 3,
	},
	titleButton: {
		fontFamily: 'arial',
		fontSize: moderateScale(12),
		lineHeight: moderateScale(14),
		fontWeight: 'bold',
		color: '#FFFFFF',
		margin: 8,
		textAlign: 'center',
	},
	titleModal: {
		fontSize: 16,
		lineHeight: 18,
		fontWeight: 'bold',
		color: '#187779',
		margin: 8,
		textAlign: 'center',
		marginVertical: 12,
	},
	bottom: {
		width: '100%',
		flexDirection: 'row',
		marginBottom: 16,
		justifyContent: 'space-around',
		paddingHorizontal: 16,
	},
});
