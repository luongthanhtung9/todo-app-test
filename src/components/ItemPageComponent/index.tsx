import React, {memo} from 'react';
import {View, Text} from 'react-native';
import {TouchComponent} from '@components/index';
import styles from './style';

export interface Props {
	title?: string;
	count: number;
	icon?: any;
	onItemPress?: () => void;
}

const ItemPageComponent = (props: Props) => {
	return (
		<TouchComponent style={styles.itemView} onPress={props.onItemPress}>
			{props.count > 0 && (
				<View style={[styles.numberView, {backgroundColor: '#FF7A00'}]}>
					<Text style={styles.numberText}>{props.count}</Text>
				</View>
			)}
			<View style={styles.titleView}>
				{/* <props.icon /> */}
				{props.icon}
				<Text style={styles.titleText}>{props.title}</Text>
			</View>
		</TouchComponent>
	);
};

ItemPageComponent.defaultProps = {};

export default memo(ItemPageComponent);
