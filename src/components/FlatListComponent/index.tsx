import AppColors from '@commons/AppColors';
import DivideComponent from '@components/DivideComponent';
import React, {memo} from 'react';
import {
	View,
	FlatList,
	RefreshControl,
	Text,
	ActivityIndicator,
	StyleProp,
	ViewStyle,
} from 'react-native';
import styles from './style';

export interface Props {
	listData?: Array<any>;
	isLoadMore?: boolean;
	needMore?: boolean;
	isRefreshing?: boolean;
	buildItem: (item: any, index: number) => any;
	onRefresh?: () => void;
	onLoadMore?: () => void;
	contentContainerStyle?: StyleProp<ViewStyle>;
}

const FlatListComponent = (props: Props) => {
	function _onRefresh() {
		if (props.onRefresh) props.onRefresh();
	}

	function _loadMore() {
		if (props.isLoadMore || !props.needMore) return;
		if (props.onLoadMore) props.onLoadMore();
	}

	const _refreshControl = props.onRefresh ? (
		<RefreshControl refreshing={props.isRefreshing == true} onRefresh={_onRefresh} />
	) : undefined;

	function _buildEmpty() {
		return (
			<View style={styles.empty}>
				<Text style={styles.emptyTitle}>Danh sách trống</Text>
			</View>
		);
	}

	function _buildFooter() {
		return (
			<>
				{props.isLoadMore ? (
					<ActivityIndicator size="small" color={AppColors.mainColor} />
				) : (
					<></>
				)}
			</>
		);
	}

	return (
		<FlatList
			data={props.listData}
			refreshControl={_refreshControl}
			ListEmptyComponent={_buildEmpty}
			renderItem={({item, index}) => props.buildItem(item, index)}
			ListFooterComponent={_buildFooter}
			showsVerticalScrollIndicator={false}
			keyExtractor={(item: any, index: number) => index.toString()}
			ItemSeparatorComponent={() => <DivideComponent />}
			// contentContainerStyle={{ paddingBottom: 50 }}
			contentContainerStyle={props.contentContainerStyle}
			onEndReachedThreshold={0.4}
			onEndReached={_loadMore}
		/>
	);
};

FlatListComponent.defaultProps = {
	listData: [],
};

export default memo(FlatListComponent);
