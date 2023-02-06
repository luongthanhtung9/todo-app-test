import Icon from '@commons/Icon';
import {FlatListComponent, TouchComponent} from '@components/index';
import {Dkxe} from '@models/dkxe';
import {formatHours, formatHoursXe} from '@utils/index';
import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export interface Props {
	title?: string;
	listData?: Array<Dkxe>;
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

	const renderItem = (item: Dkxe, index: number) => (
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
						<Text style={styles.infoLeader}>{item.leaderUserName}</Text>
					</View>
					<View style={styles.row}>
						<Icon name="phone" size={11} color={'#187779'} />
						<Text style={styles.infoLeader}>{item.leaderPhoneNumber}</Text>
					</View>
				</View>
			</View>
			<View style={styles.viewDestination}>
				<View style={{flex: 1}}>
					<View style={styles.row}>
						<Text style={styles.hours}>{formatHoursXe(item.fromDate)}</Text>
						<View
							style={[
								styles.row,
								{
									paddingHorizontal: 8,
								},
							]}>
							<Icon name="diemdi" size={12} color={'#187779'} />
							<Text style={styles.destination}>{item.pickUpPlace}</Text>
						</View>
					</View>
					<View style={styles.row}>
						<Text style={styles.hours}>{formatHoursXe(item.toDate)}</Text>
						<View
							style={[
								styles.row,
								{
									paddingHorizontal: 8,
								},
							]}>
							<Icon name="diemden" size={12} color={'#187779'} />
							<Text style={styles.destination}>{item.destination}</Text>
						</View>
					</View>
				</View>
			</View>
		</TouchComponent>
	);

	return (
		<View style={styles.viewTabItem}>
			<View style={{paddingHorizontal: 12}}>
				<FlatListComponent
					listData={listData}
					isLoadMore={param.isLoadMore}
					needMore={true}
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
	viewTabItem: {
		width: '100%',
		height: '100%',
	},
	viewItemList: {
		// backgroundColor: '#FFFFFF',
		borderRadius: 6,
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
		borderTopStartRadius: 6,
		borderTopEndRadius: 6,
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
	hours: {textAlign: 'right', paddingVertical: 2, fontSize: 11},
	destination: {fontSize: 12, color: '#4A4A4A', marginStart: 8},
});
