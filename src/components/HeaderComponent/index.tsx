import {TouchComponent} from '@components/index';
import {ArrowBackWhiteIcon, HeaderBGImage, SearchIcon} from '@images/index';
import {useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';
import {ImageBackground, Text} from 'react-native';
import styles from './style';

export interface Props {
	title?: string;
	isSearch?: boolean;
	showFilter?: () => void;
	onBack?: () => void;
	isBack?: boolean;
}

const HeaderComponent = (props: Props) => {
	const navigation = useNavigation();

	function _back() {
		if (props.onBack) props.onBack();
		else navigation.goBack();
	}

	return (
		<ImageBackground source={HeaderBGImage} style={styles.header}>
			{props.isBack && <TouchComponent style={styles.backView} onPress={_back}>
				<ArrowBackWhiteIcon />
				{/* <Icon icon="pencil" size={20} color="#fff" />; */}
			</TouchComponent>}
			<Text style={styles.titleCenter} numberOfLines={1}>
				{props.title}
			</Text>
			{/* not use */}
			{props.isBack && (
				<TouchComponent style={styles.searchView} onPress={props.showFilter}>
					<SearchIcon />
				</TouchComponent>
			)}
		</ImageBackground>
	);
};

HeaderComponent.defaultProps = {
	title: '',
	isSearch: false,
};

export default memo(HeaderComponent);
