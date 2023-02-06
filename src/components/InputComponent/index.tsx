import React, {memo} from 'react';
import {View, Text, TextInput, NativeSyntheticEvent, TextInputChangeEventData} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import styles from './style';
import Icon from '@commons/Icon';

export interface Props {
	value?: string;
	title?: string;
	placeholder?: string;
	secureTextEntry?: boolean;
	multiline?: boolean;
	numberOfLines?: number;
	onChange?: (text: string) => void;
	icon?: string;
}

const InputComponent = (props: Props) => {
	function _onChanged(event: NativeSyntheticEvent<TextInputChangeEventData>) {
		const text = event.nativeEvent.text;
		if (props.onChange) props.onChange(text);
	}

	return (
		<View style={styles.formView}>
			<View style={styles.form}>
				<Text style={styles.title}>{props.title}</Text>

				<View style={styles.viewInput}>
					{props.icon && (
						<View style={{marginStart: 10}}>
							<Icon name={props.icon} size={14} color={'#C4C4C4'} />
						</View>
					)}
					<TextInput
						style={[
							styles.input,
							props.multiline
								? {height: verticalScale(72)}
								: {height: verticalScale(36)},
						]}
						multiline={props.multiline}
						numberOfLines={props.numberOfLines}
						placeholder={props.placeholder}
						maxLength={props.multiline ? 1000 : 200}
						editable
						defaultValue={props.value}
						underlineColorAndroid="transparent"
						secureTextEntry={props.secureTextEntry}
						onChange={_onChanged}
						scrollEnabled={false}
					/>
				</View>
			</View>
		</View>
	);
};

InputComponent.defaultProps = {
	secureTextEntry: false,
	multiline: false,
	numberOfLines: 1,
};

export default memo(InputComponent);
