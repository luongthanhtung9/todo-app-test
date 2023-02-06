import {
	InputComponent,
	SelectComponent,
	SelectDateComponent,
	TouchComponent,
} from '@components/index';
import React, {memo} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Icon from '@commons/Icon';
import SelectUser from '@components/SelectUser';
import {TextInput} from 'react-native-gesture-handler';
const deviceWidth = Dimensions.get('window').width;

export interface Props {
	item?: any;
	// itemDV?: any
	onItemPress?: () => void;
	onSelectHT: (item: any, processType?: string) => void;
	onSelectHXL: (item: any, hanXuly: any) => void;
	onSelectND: (item: any, noiDung: string) => void;
	indexItem: number;
	onDeleteItem?: (index: number) => void;
	listData?: any[];
	onUpdateUser?: (value: any, index: number) => void;
	listDataSelect?: any[];
	isDonVi?: boolean;
}

const listHT = [
	{
		value: 0,
		label: 'Chủ trì',
	},
	{
		value: 1,
		label: 'Phối hợp',
	},
	{
		value: 2,
		label: 'Thông báo',
	},
];

const SelectItemComponent = (props: Props) => {
	const {
		item,
		isDonVi,
		onItemPress,
		onSelectHT,
		onSelectHXL,
		onSelectND,
		onDeleteItem,
		indexItem,
		listData,
		onUpdateUser,
		listDataSelect,
	} = props;

	function getHT(processType?: number) {
		if (processType === 0) return 'Chủ trì';
		if (processType === 1) return 'Phối hợp';
		if (processType === 2) return 'Thông báo';
		if (processType === undefined) return 'Chủ trì';
	}

	const checkProcessType = () => {
		const filter = listDataSelect?.filter(item => {
			return item.processType === 0 || item.kieuXuLy === 0;
		});
		if (filter?.length === 0) return false;

		return true;
	};

	return (
		<View>
			<TouchComponent style={styles.viewLeader} onPress={onItemPress}>
				<View style={styles.viewInfo}>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}>
						{/* <Text style={styles.viewInfoName}>
                            {item?.title || item?.name || item?.tenDonVi}
                        </Text> */}
						{/* <View style={styles.viewInfoName}> */}
						{isDonVi ? (
							<Text style={styles.viewInfoName}>
								{item?.userName || item?.title || item?.name || item?.tenDonVi}
							</Text>
						) : (
							<SelectUser
								title={item?.title || item?.name || item?.tenDonVi}
								data={listData}
								onChange={value => {
									if (onUpdateUser) onUpdateUser(value, indexItem);
									// console.log('value', value)
								}}
								selectTitle={item?.title || item?.name || item?.tenDonVi}
							/>
						)}

						{/* </View> */}
						<TouchComponent
							onPress={() => {
								if (onDeleteItem) onDeleteItem(indexItem);
							}}>
							<Icon name="xoa1" color="#DB0000" size={20} />
						</TouchComponent>
					</View>
					{/* {
                        item && <Text style={styles.viewInfoPosition}>{item?.positionName}</Text>
                    }
                    <Text style={styles.viewInfoPosition}>{getHT(item?.processType) || getHT(itemDV?.processType)}</Text>
                    {
                        (item?.hanXuLy || itemDV?.hanXuLy) && <Text style={styles.viewInfoPosition}>{foramtDate(item?.hanXuLy) || foramtDate(itemDV?.hanXuLy)}</Text>
                    }
                    {
                        (item?.noiDung || itemDV?.noiDung) && <Text style={styles.viewInfoPosition}>{item?.noiDung || itemDV?.noiDung}</Text>
                    } */}
					{item?.positionName && item?.vaiTro && (
						<>
							<Text
								style={{
									color: '#7C86A2',
									fontSize: 12,
									marginBottom: 4,
									fontWeight: '400',
								}}>
								Vai trò
							</Text>
							<Text style={{fontFamily: 'arial', fontSize: 14, marginTop: 5}}>
								{item?.vaiTro}
							</Text>
						</>
					)}
					<View>
						<SelectComponent
							title="Hình thức"
							data={listHT}
							onChange={(value: any) => {
								onSelectHT(item, value);
							}}
							selectTitle={getHT(
								item?.processType ? item?.processType : item?.kieuXuLy,
							)}
							checkListItem={checkProcessType()}
						/>
						<SelectDateComponent
							title="Hạn xử lý"
							value={item.hanXuLy}
							onChange={date => onSelectHXL(item, date)}
						/>
						<InputComponent
							title="Nội dung xử lý"
							value={item.noiDung}
							multiline={true}
							numberOfLines={3}
							onChange={text => onSelectND(item, text)}
						/>
						{/* <TextInput value='dd' placeholder='ddd'/> */}
					</View>
				</View>
			</TouchComponent>
		</View>
	);
};

SelectItemComponent.defaultProps = {};

export default memo(SelectItemComponent);

const styles = StyleSheet.create({
	viewLeader: {
		flexDirection: 'row',
		alignContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 8,
		paddingVertical: 8,
	},
	viewInfo: {
		marginLeft: 8,
	},
	viewInfoName: {
		fontFamily: 'arial',
		fontSize: moderateScale(14),
		lineHeight: moderateScale(16),
		fontWeight: 'bold',
		color: '#4A4A4A',
		// marginTop: 4,
		// marginLeft: 4,
		// marginBottom: 4,
		// marginRight: 20,
	},
	viewInfoPosition: {
		fontFamily: 'arial',
		fontSize: moderateScale(12),
		lineHeight: moderateScale(14),
		color: '#4A4A4A',
		marginTop: 4,
		marginLeft: 4,
		marginRight: 20,
	},
	viewIcon: {
		width: 44,
		height: 44,
		borderRadius: 22,
		borderColor: '#C4C4C4',
		borderWidth: 1,
		alignContent: 'center',
		alignItems: 'center',
	},
	avatarImg: {
		borderRadius: 21,
		borderColor: 'white',
		borderWidth: 1,
		width: 42,
		height: 42,
		justifyContent: 'center',
	},
	viewSelect: {
		position: 'absolute',
		right: 6,
	},
	viewList: {
		marginBottom: 100,
	},
	viewButton: {
		width: deviceWidth,
		flexDirection: 'row',
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		bottom: 0,
	},
});
