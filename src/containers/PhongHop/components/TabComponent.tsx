import Icon from '@commons/Icon';
import {FlatListComponent, TouchComponent} from '@components/index';
import {PhongHop} from '@models/PhongHop';
import {formatHours} from '@utils/index';
import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export interface Props {
	title?: string;
	listData?: Array<PhongHop>;
	listDayofWeek?: Array<any>;
	currentNumberWeek?: number;
	currentMonth?: number;
	param?: any;
	onRefresh?: () => void;
	onLoadMore?: () => void;
	onClickItem?: (idDangKy?: string) => void;
	onChangeDate?: (
		fromDate: string,
		toDate: string,
		newList: Array<any>,
		newWeek: number,
		newMonth: string,
	) => void;
}

const TabComponent = (props: Props) => {
	const {listData, param, onLoadMore, onRefresh, onClickItem} = props;

	const renderItem = (item: PhongHop, index: number) => (
		<TouchComponent
			onPress={() => {
				if (onClickItem) onClickItem(item?.id);
			}}
			key={index}
			style={styles.viewItemList}>
			<View style={styles.viewInfoLeader}>
				<View style={styles.circle}>
					<Text style={styles.number}>{item.numberUser}</Text>
					<Text style={{fontSize: 12}}>người</Text>
				</View>
				<View style={styles.containerInfo}>
					<View style={styles.row}>
						<Icon name="vai-tro1" size={11} color={'#187779'} />
						<Text style={styles.infoLeader}>
							{item.userLeadPosition} - {item.userLead}
						</Text>
					</View>
					<View style={styles.row}>
						<Icon name="phone" size={11} color={'#187779'} />
						<Text style={styles.infoLeader}>{item.phone}</Text>
					</View>
					<Text style={styles.meetRoomName}>{item.meetingName}</Text>
					<Text style={styles.content}>{item.content}</Text>
				</View>
			</View>
			<View style={styles.viewDestination}>
				<View style={[styles.row, {flex: 1}]}>
					<Text style={styles.hours}>{formatHours(item.fromDate)}</Text>
					<View
						style={[
							styles.row,
							{
								paddingHorizontal: 8,
								flex: 3,
							},
						]}>
						<Icon name="location" size={12} color={'#187779'} />
						<Text style={styles.destination}>{item.roomName}</Text>
					</View>
					<Text style={styles.hours}>{formatHours(item.toDate)}</Text>
				</View>
			</View>
		</TouchComponent>
	);

	return (
		<View style={styles.viewTabItem}>
			<View style={{paddingHorizontal: 10}}>
				<FlatListComponent
					listData={listData}
					isLoadMore={param.isLoadMore}
					needMore={param.needMore}
					buildItem={renderItem}
					onLoadMore={onLoadMore}
					onRefresh={onRefresh}
				/>
			</View>
		</View>
	);
};

export default memo(TabComponent);

const styles = StyleSheet.create({
	meetRoomName: {
		color: '#4A4A4A',
		fontWeight: '700',
		fontFamily: 'Arial',
		fontSize: 12,
		paddingVertical: 3,
	},
	content: {
		color: '#4A4A4A',
		fontFamily: 'Arial',
		fontSize: 11,
		paddingVertical: 3,
	},
	viewTabItem: {
		width: '100%',
		height: '100%',
	},
	viewItemList: {
		// backgroundColor: '#FFFFFF',
		borderRadius: 16,
		marginVertical: 6,
		// paddingHorizontal: 14,
		paddingVertical: 7,
	},
	viewInfoLeader: {
		flexDirection: 'row',
		backgroundColor: '#F6FFFE',
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderBottomColor: '#F1F1F1',
		borderBottomWidth: 1,
		alignItems: 'center',
		borderTopRightRadius: 6,
		borderTopStartRadius: 6,
	},
	circle: {
		width: 46,
		height: 46,
		borderRadius: 23,
		backgroundColor: '#F8F8F8',
		justifyContent: 'center',
		alignItems: 'center',
	},
	number: {
		color: '#202020',
		fontWeight: '700',
		fontFamily: 'Arial',
		fontSize: 14,
	},
	containerInfo: {
		justifyContent: 'space-around',
		flex: 1,
		marginHorizontal: 16,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 3,
	},
	infoLeader: {
		fontSize: 12,
		color: '#4A4A4A',
		marginStart: 8,
	},
	viewDestination: {
		backgroundColor: '#FFFFFF',
		flexDirection: 'row',
		paddingVertical: 8,
		paddingHorizontal: 10,
		borderBottomStartRadius: 6,
		borderBottomEndRadius: 6,
	},
	hours: {textAlign: 'right', paddingVertical: 2, fontSize: 11, flex: 1},
	destination: {fontSize: 12, color: '#4A4A4A', marginStart: 8},
});
