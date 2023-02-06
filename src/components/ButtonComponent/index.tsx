import React, {memo} from 'react';
import {StyleProp, ViewStyle, Text} from 'react-native';
import {TouchComponent} from '@components/index';
import styles from './style';

export interface Props {
	style?: StyleProp<ViewStyle>;
	title?: string;
	isActive?: boolean;
	onPress?: () => void;
	disable?: boolean;
}

const ButtonComponent = (props: Props) => {
	return (
		<TouchComponent
			disabled={props.disable}
			style={[styles.button, props.style]}
			onPress={props.onPress}>
			<Text style={[styles.title, {color: props.disable ? '#ccc' : '#000'}]}>
				{props.title}
			</Text>
		</TouchComponent>
	);
};

ButtonComponent.defaultProps = {
	title: 'Trình',
	isActive: false,
};

export default memo(ButtonComponent);
