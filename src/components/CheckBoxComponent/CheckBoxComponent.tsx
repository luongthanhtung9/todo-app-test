import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {memo, useState} from 'react';
import {TouchComponent} from '@components/index';
import Icon from '@commons/Icon';

interface Props {
	defaultChecked?: boolean;
	onChecked?: () => void;
	title?: string;
	style?: StyleProp<ViewStyle>;
	numberOfLines?: number;
	color?: string;
	disable?: boolean;
	checkedDisable?: boolean;
	checked?: boolean;
}

const CheckBoxComponent = ({
	onChecked,
	defaultChecked,
	title,
	style,
	numberOfLines,
	disable,
	color,
	checked,
}: Props) => {
	// const [checked, setChecked] = useState<boolean>(defaultChecked || false);
	//   const svgChecked = radiusBtn ? <Icon_radius_checked /> : <Icon_checked />;
	//   const svgUnChecked = radiusBtn ? <Icon_radius_disable /> : <Icon_unChecked />;
	return (
		<>
			<TouchComponent onPress={onChecked} style={[{flexDirection: 'row'}, style]}>
				{!checked ? (
					<View style={styles.checkBoxContainer} />
				) : (
					<Icon name="luu-thanh-cong" size={16} color={color} />
				)}
				<View style={{flex: 1}}>
					<Text numberOfLines={numberOfLines || 0} style={styles.title}>
						{title || ''}
					</Text>
				</View>
			</TouchComponent>
		</>
	);
};

export default memo(CheckBoxComponent);

const styles = StyleSheet.create({
	title: {
		fontSize: 14,
		marginLeft: 8,
	},
	checkBoxContainer: {
		width: 16,
		height: 16,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#C4C4C4',
	},
});
