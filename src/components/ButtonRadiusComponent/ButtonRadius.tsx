import {StyleProp, StyleSheet, Text, TextStyle, ViewStyle} from 'react-native';
import React from 'react';
import {TouchComponent} from '@components/index';
import AppColors from '@commons/AppColors';

interface Props {
	style?: StyleProp<ViewStyle>;
	onPress: () => void;
	title: string;
	transparentBg?: boolean;
	disable?: boolean;
	width?: number;
	styleText?: StyleProp<TextStyle>;
}

const ButtonRadius = ({onPress, title, transparentBg, disable, width, style, styleText}: Props) => {
	return (
		<TouchComponent
			style={[
				styles.btnBox,
				{
					backgroundColor: transparentBg
						? AppColors.gray1
						: disable
						? '#FAFAFA'
						: AppColors.green,
					borderColor: transparentBg
						? AppColors.gray1
						: disable
						? '#FAFAFA'
						: AppColors.green,
					width,
				},
				style,
			]}
			disabled={disable}
			onPress={onPress}>
			<Text
				style={[
					styles.textBtn,
					{
						color: transparentBg
							? AppColors.black1
							: disable
							? AppColors.black
							: AppColors.while,
					},
					styleText,
				]}>
				{title}
			</Text>
		</TouchComponent>
	);
};

export default ButtonRadius;

const styles = StyleSheet.create({
	textBtn: {
		fontSize: 18,
		fontWeight: '400',
		paddingHorizontal: 30,
		paddingVertical: 11,
	},
	btnBox: {
		borderRadius: 6,
		minWidth: 157,
		borderWidth: 1,
		alignItems: 'center',
	},
});
