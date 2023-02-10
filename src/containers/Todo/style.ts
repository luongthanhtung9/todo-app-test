import AppColors from '@commons/AppColors';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
	containerItem: {
		flex: 1,
		// marginVertical: 8,
		borderRadius: 8,
		paddingVertical: 10,
		paddingHorizontal: 16,
	},
	row: {
		flexDirection: 'row',
	},
	title: {
		fontSize: 12,
		fontWeight: 'bold',
		flex: 1,
		paddingVertical: 10,
	},
	deleteButton: {
		width: 36,
		height: 36,
		borderRadius: 18,
		backgroundColor: AppColors.red1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	white: {
		color: AppColors.white,
	},
	description: {
		fontSize: 14,
		color: AppColors.white,
		paddingBottom: 10,
	},
	priority: {
		fontSize: 14,
		color: AppColors.white,
		fontWeight: 'bold',
		paddingVertical: 4,
	},
	container: {
		flex: 1,
		paddingHorizontal: 16,
		backgroundColor: AppColors.white,
	},
	countTotal: {
		marginVertical: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	containerSort: {
		marginVertical: 10,
		flexDirection: 'row',
	},
	completeButton: {
		width: 36,
		height: 36,
		borderRadius: 18,
		backgroundColor: AppColors.blue,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
