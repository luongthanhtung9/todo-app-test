import AppColors from '@commons/AppColors';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
	priority: {
		fontSize: 14,
		color: AppColors.white,
		paddingBottom: 10,
		fontWeight: 'bold',
	},
	buttonComplete: {
		backgroundColor: AppColors.blue,
		paddingVertical: 10,
		justifyContent: 'flex-end',
		alignItems: 'center',
		marginHorizontal: 80,
		borderRadius: 8,
	},
	description: {
		fontSize: 14,
		color: AppColors.white,
		paddingBottom: 10,
	},
	title: {
		fontSize: 12,
		fontWeight: 'bold',
		paddingVertical: 10,
	},
	containerTask: {
		marginVertical: 8,
		borderRadius: 8,
		paddingVertical: 10,
		paddingHorizontal: 16,
		justifyContent: 'flex-start',
	},
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: AppColors.white,
		justifyContent: 'space-between',
	},
});
