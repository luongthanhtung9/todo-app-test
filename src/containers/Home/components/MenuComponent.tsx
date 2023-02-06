import React, {memo} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {ItemPageComponent} from '@components/index';
import {Menu} from '@models/Menu';

export interface Props {
	data?: Array<Menu>;
	onItemPress?: (status?: number) => void;
}

const MenuComponent = (props: Props) => {
	function _onItemPress(item: Menu) {
		if (props.onItemPress) props?.onItemPress(item?.status);
	}

	const renderItem = ({item}: any) => (
		<ItemPageComponent key={item.title} {...item} onItemPress={() => _onItemPress(item)} />
	);
	return (
		<FlatList
			data={props.data}
			showsVerticalScrollIndicator={false}
			renderItem={renderItem}
			numColumns={3}
			keyExtractor={(item: any, index: number) => index.toString()}
		/>
	);
};

MenuComponent.defaultProps = {};

export default memo(MenuComponent);

const styles = StyleSheet.create({});
