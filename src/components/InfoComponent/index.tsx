import React, {memo} from 'react';
import {View, StyleProp, ViewStyle, Text} from 'react-native';
import styles from './style';

export interface Props {
	label?: string;
	content?: string;
}

const InfoComponent = (props: Props) => {
	return (
		<View style={styles.info}>
			<Text numberOfLines={2} style={styles.label}>
				{props.label}{' '}
			</Text>
			<Text numberOfLines={2} style={styles.content}>
				{props.content ? props.content : ''}
			</Text>
		</View>
	);
};

InfoComponent.defaultProps = {};

export default memo(InfoComponent);
