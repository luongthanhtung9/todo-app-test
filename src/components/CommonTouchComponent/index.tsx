import {throttle, once} from 'lodash';
import React from 'react';
import {Keyboard, StyleProp, Pressable, ViewStyle} from 'react-native';

interface PropsType {
	children: React.ReactNode;
	onPress?: () => void;
	style?: StyleProp<ViewStyle>;
	activeOpacity?: number;
	disabled?: boolean;
}

const CommonTouchComponent = (props: PropsType) => {
	const _onClickButton = throttle(_debounceClickHandler, 1000, {
		trailing: false,
		leading: true,
	});

	function _debounceClickHandler() {
		Keyboard.dismiss();
		if (props.onPress) once(props.onPress)();
	}

	return (
		<Pressable
			style={props.style}
			hitSlop={5}
			onPress={_onClickButton}
			disabled={props.disabled}>
			{props.children}
		</Pressable>
	);
};

CommonTouchComponent.defaultProps = {
	disabled: false,
	activeOpacity: 0.6,
};

export default React.memo(CommonTouchComponent);
