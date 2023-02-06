import AppColors from '@commons/AppColors';
import {Dimensions, StyleSheet} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default StyleSheet.create({
	viewTabItem: {
		width: '100%',
		height: '100%',
	},
	viewItemList: {
		// backgroundColor: '#FFFFFF',
        flex:1,
		borderRadius: 6,
		marginVertical: 6,
		paddingHorizontal: 14,
		paddingVertical: 7,
	},
	viewInfoLeader: {
		flexDirection: 'row',
		backgroundColor: '#F6FFFE',
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderBottomColor: '#F1F1F1',
		borderBottomWidth: 1,
	},
	circle: {
		width: 46,
		height: 46,
		borderRadius: 23,
		backgroundColor: '#F8F8F8',
		justifyContent: 'center',
		alignItems: 'center',
	},
	number: {
		color: '#202020',
		fontWeight: '700',
		fontFamily: 'Arial',
		fontSize: 14,
	},
	containerInfo: {
		justifyContent: 'space-around',
		flex: 1,
		marginHorizontal: 16,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	infoLeader: {
		fontSize: 12,
		color: '#4A4A4A',
		marginStart: 8,
		fontWeight: 'bold',
	},
	viewDestination: {
		backgroundColor: '#F6FFFE',
		flexDirection: 'row',
		paddingVertical: 8,
		paddingHorizontal: 10,
	},
	label: {
		flex: 4,
		marginEnd: 4,
		color: '#4A4A4A',
		fontWeight: '700',
		lineHeight: 14,
		fontSize: 12,
	},
	hours: {textAlign: 'right', paddingVertical: 2, fontSize: 11},
	destination: {fontSize: 12, color: '#4A4A4A', marginStart: 8},
	buttonContainer: {
		flex: 4,
		paddingVertical: 12,
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 12,
        marginVertical:16,
        borderRadius: 6
	},
    bottomButtonContainer: {
        flexDirection: 'row',
        backgroundColor: AppColors.while,
        paddingHorizontal: 16,
        paddingVertical:10,
        justifyContent: 'flex-end',
    }
});
