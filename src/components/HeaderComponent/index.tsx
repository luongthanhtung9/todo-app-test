import Icon from '@commons/Icon';
import {TouchComponent} from '@components/index';
import {ArrowBackWhiteIcon, HeaderBGImage, SearchIcon} from '@images/index';
import {useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';
import {ImageBackground, Text, View} from 'react-native';
import styles from './style';

export interface Props {
	title?: string;
	isSearch?: boolean;
	onRightPress?: () => void;
	onBack?: () => void;
	isBack?: boolean;
	isRight?: boolean;
}

const HeaderComponent = (props: Props) => {
	const navigation = useNavigation();

	function _back() {
		if (props.onBack) props.onBack();
		else navigation.goBack();
	}

	return (
		<ImageBackground source={HeaderBGImage} style={styles.header}>
			{props.isBack ? (
				<TouchComponent style={styles.backView} onPress={_back}>
					<ArrowBackWhiteIcon />
					{/* <Icon icon="pencil" size={20} color="#fff" />; */}
				</TouchComponent>
			) : (
				<View style={styles.backView} />
			)}
			<Text style={styles.titleCenter} numberOfLines={1}>
				{props.title}
			</Text>
			{props.isRight ? (
				<TouchComponent style={styles.searchView} onPress={props.onRightPress}>
					<Icon name={'plus'} size={16} color={'#FFF'} />
				</TouchComponent>
			) : (
				<View style={styles.searchView} />
			)}
		</ImageBackground>
	);
};

HeaderComponent.defaultProps = {
	title: '',
	isSearch: false,
};

export default memo(HeaderComponent);
