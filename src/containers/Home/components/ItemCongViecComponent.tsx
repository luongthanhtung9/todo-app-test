import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export interface Props {
	number: number;
	content: string;
	viewStyle?: any;
	textStyles?: any;
}

const CongViecComponent = (props: Props) => {
	const {viewStyle, number, content, textStyles} = props;
	return (
		<View style={[styles.container, viewStyle]}>
			<Text style={[styles.number, textStyles]}>{number}</Text>
			<Text style={styles.content}>{content}</Text>
		</View>
	);
};

CongViecComponent.defaultProps = {};

export default memo(CongViecComponent);

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 72,
		height: 72,
		borderWidth: 1,
		borderColor: '#DFDFDF',
		borderRadius: 6,
		shadowColor: '#000000',
		shadowOpacity: 0.1,
		shadowOffset: {width: 2, height: 4},
	},
	number: {color: '#444444', fontSize: 28, fontWeight: '900', lineHeight: 28},
	content: {
		color: '#444444',
		fontSize: 12,
		fontWeight: '700',
		lineHeight: 12,
		paddingHorizontal: 10,
		textAlign: 'center',
	},
});
