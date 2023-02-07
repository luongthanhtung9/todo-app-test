import AppColors from '@commons/AppColors';
import {StyleSheet} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

export default StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
		backgroundColor: AppColors.white,
	},
	flex: {
		flex: 1,
	},
	row: {
		flexDirection: 'row',
	},
	priority: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10,
	},
	containerPriority: {
		marginHorizontal: 10,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		borderRadius: 10,
	},
	description: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonAdd: {
		marginHorizontal: 10,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 10,
		borderRadius: 15,
		backgroundColor: AppColors.blue,
	},
	containerAdd: {
		justifyContent: 'flex-end',
		paddingVertical: 16,
	},
});
