import React, {memo} from 'react';
import {View} from 'react-native';
import styles from './styles';
import Swipeout from 'react-native-swipeout';
import AppColors from '@commons/AppColors';
import Icon from '@commons/Icon';

export interface Props {
	children: React.ReactNode;
	onDelete?: () => void;
	onComplete?: () => void;
}

const SwipeoutComponent = (props: Props) => {
	const swipeoutsBtn = [
		{
			component: (
				<View style={[styles.container, {backgroundColor: AppColors.red1}]}>
					<Icon size={20} color={AppColors.white} name={'delete'} />
				</View>
			),
			backgroundColor: '#FFF',
			onPress: props.onDelete,
		},
		{
			component: (
				<View
					style={[
						styles.container,
						{
							backgroundColor: AppColors.blue,
							borderTopEndRadius: 8,
							borderBottomEndRadius: 8,
						},
					]}>
					<Icon size={20} color={AppColors.black} name={'complete'} />
				</View>
			),
			backgroundColor: '#FFF',
			onPress: props.onComplete,
		},
	];
	return (
		<Swipeout style={{backgroundColor: '#fff'}} autoClose={true} right={swipeoutsBtn}>
			{props.children}
		</Swipeout>
	);
};

SwipeoutComponent.defaultProps = {};

export default memo(SwipeoutComponent);
