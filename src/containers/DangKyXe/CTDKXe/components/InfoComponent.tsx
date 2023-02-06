import React, {memo} from 'react';
import {FlatList, StyleSheet, View, Text, TextInput} from 'react-native';
import {GhiLaiIcon} from '@images/index';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

export interface Props {
	label?: string;
	content?: string;
}

const InfoComponent = (props: Props) => {
    const {label, content} = props
	return (
		<View style={{flexDirection: 'row', paddingVertical: 8, alignItems: 'center'}}>
			<Text 	numberOfLines={2} style={styles.label}>{label}</Text>
			<Text
				numberOfLines={2}
				style={styles.content}>
				{content}
			</Text>
		</View>
	);
};

InfoComponent.defaultProps = {
	isActive: true,
};

export default memo(InfoComponent);

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
        lineHeight:18, 
		marginEnd: 4,
		color: '#4A4A4A',
		fontSize: 12,
    }
});
