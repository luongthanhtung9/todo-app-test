import React, {memo} from 'react';
import {FlatList, StyleSheet, View, Text, TextInput} from 'react-native';
import {GhiLaiIcon} from '@images/index';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

export interface Props {
	label?: string;
	content?: string;
}

const ViewInfoComponent = (props: Props) => {
	const {label, content} = props;
	return (
		<View>
			<Text style={[styles.label, {paddingVertical: 4, marginVertical: 4}]}>{label}</Text>
			<View
				style={{
					backgroundColor: '#F8F8F8',
					paddingVertical: 4,
					paddingHorizontal: 8,
				}}>
				<Text style={{fontSize: 12, color: '#4A4A4A'}}>{content}</Text>
			</View>
		</View>
	);
};

ViewInfoComponent.defaultProps = {
	isActive: true,
};

export default memo(ViewInfoComponent);

const styles = StyleSheet.create({
	label: {
		flex: 4,
		marginEnd: 4,
		color: '#4A4A4A',
		fontWeight: '700',
		lineHeight: 14,
		fontSize: 12,
	},
	content: {
		flex: 6,
		marginStart: 4,
		lineHeight: 18,
		marginEnd: 4,
		color: '#4A4A4A',
		fontSize: 12,
	},
});
