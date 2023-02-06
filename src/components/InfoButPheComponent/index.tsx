import React, {memo} from 'react';
import {View, StyleProp, ViewStyle, Text} from 'react-native';
import styles from './style';

export interface Props {
	label?: string;
	content?: Array<string>;
}

const InfoButPheComponent = (props: Props) => {
	return (
		<View style={styles.info}>
			<Text numberOfLines={2} style={styles.label}>
				{props.label}{' '}
			</Text>
			<View style={{flex: 6, paddingHorizontal: 16}}>
				{props.content &&
					props.content.map((item, index) => {
						return (
							<View key={index}>
								<Text style={styles.content}>{item}</Text>
							</View>
						);
					})}
			</View>
		</View>
	);
};

InfoButPheComponent.defaultProps = {};

export default memo(InfoButPheComponent);
