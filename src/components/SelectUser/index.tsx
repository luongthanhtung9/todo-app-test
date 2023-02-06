import Icon from '@commons/Icon';
import React, {memo, useState, useEffect, useMemo} from 'react';
import {View, StyleProp, ViewStyle, Text, Modal, Pressable} from 'react-native';
import {
	ButtonComponent,
	TouchComponent,
	FlatListComponent,
	InputComponent,
} from '@components/index';
import styles from './style';
import {Select} from '@models/Select';
import AppColors from '@commons/AppColors';
import ButtonRadius from '@components/ButtonRadiusComponent/ButtonRadius';
import {Ic_DropDrow, Success} from '@images/index';

export interface Props {
	title?: string;
	selectTitle?: string;
	data?: Array<Select>;
	isLogin?: boolean;
	isRequire?: boolean;
	isSearch?: boolean;
	onChange?: (select: Select) => void;
}

const SelectUser = (props: Props) => {
	const [isSelect, setIsSelect] = useState<boolean>(false);
	const [indexSelect, setIndexSelect] = useState<number>(0);
	const [listData, setListData] = useState<Array<Select>>([]);
	//   <Text style={styles.viewInfoName}>
	//   {item?.title || item?.name || item?.tenDonVi}
	// </Text>
	useMemo(() => {
		if (!props.data) return;
		setListData(props.data);
	}, [props.data]);

	//   console.log('listData', listData)

	function _onSelect(item: Select, index: number) {
		setIndexSelect(index);
	}

	function _onSearch(text: string) {
		if (props.data) {
			if (text) {
				const newlist = props.data.filter((item: any) =>
					item?.title.includes(text.toUpperCase()),
				);
				setListData(newlist);
			} else {
				setListData(props.data);
			}
		}
	}

	function _onClose() {
		const i = listData?.findIndex(item => item.label === props.selectTitle);
		if (i) setIndexSelect(i);
		setIsSelect(false);
		if (props.data) setListData(props.data);
	}

	function _onAccept() {
		setIsSelect(false);
		if (props.onChange && listData) {
			props.onChange(listData[indexSelect]);
		}
		if (props.data) setListData(props.data);
	}

	const renderItem = (item: Select, index: number) => (
		<TouchComponent
			style={styles.viewItemSelect}
			key={index}
			onPress={() => _onSelect(item, index)}>
			<Text style={styles.textItemSelect}>{item.title || item.name || item.label}</Text>
			{indexSelect == index && <Success />}
		</TouchComponent>
	);

	return (
		<View style={styles.formView}>
			<TouchComponent
				onPress={() => setIsSelect(true)}
				style={{flexDirection: 'row', alignItems: 'center'}}>
				{props.isRequire && <Text style={{color: 'red'}}>* </Text>}
				<Text
					style={[
						styles.title,
						props.isLogin ? {color: AppColors.black} : {color: '#7C86A2'},
					]}>
					{props.title}
				</Text>
				<Ic_DropDrow />
			</TouchComponent>

			<Modal
				// animationType="slide"
				animationType={'none'}
				transparent={true}
				visible={isSelect}
				onRequestClose={() => {
					setIsSelect(false);
				}}>
				<TouchComponent onPress={() => setIsSelect(false)} style={styles.centeredView}>
					<View style={styles.modalView}>
						<View
							style={{
								backgroundColor: '#C8C8CA',
								width: '15%',
								height: 5,
								marginTop: 12,
								borderRadius: 5,
							}}
						/>
						<View style={styles.viewTitle}>
							<Text style={styles.modalText}>{props.title}</Text>
						</View>
						{props.isSearch && (
							<InputComponent
								title="Tìm đơn vị tiền tệ"
								placeholder="Nhập mã tiền tệ"
								onChange={_onSearch}
							/>
						)}

						<View style={styles.viewList}>
							<FlatListComponent listData={listData} buildItem={renderItem} />
						</View>
						<View style={styles.viewBottom}>
							<ButtonRadius transparentBg onPress={_onClose} title={'Đóng'} />
							<ButtonRadius onPress={_onAccept} title={'Chọn'} />
						</View>
					</View>
				</TouchComponent>
			</Modal>
		</View>
	);
};

SelectUser.defaultProps = {
	isLogin: false,
	isSearch: false,
};

export default memo(SelectUser);
