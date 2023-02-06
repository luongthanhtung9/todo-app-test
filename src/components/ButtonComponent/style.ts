import {Dimensions, StyleSheet} from 'react-native';
const width = Dimensions.get('window').width;

export default StyleSheet.create({
	button: {
		width: width / 2 - 24,
		flexDirection: 'row',
		backgroundColor: '#F0F0F0',
		borderRadius: 6,
		alignContent: 'center',
		alignItems: 'center',
		margin: 12,
	},
	title: {
		width: '100%',
		textAlign: 'center',
		marginVertical: 12,
	},
});
