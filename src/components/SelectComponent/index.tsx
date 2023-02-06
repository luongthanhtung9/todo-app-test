import React, {memo, useState, useMemo} from 'react';
import {View, Text, Modal} from 'react-native';
import {TouchComponent, FlatListComponent, InputComponent} from '@components/index';
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
	checkListItem?: boolean;
}

const SelectComponent = (props: Props) => {
	const [isSelect, setIsSelect] = useState<boolean>(false);
	const [indexSelect, setIndexSelect] = useState<number>(0);
	const [listData, setListData] = useState<Array<Select>>([]);
	const [disable, setDisable] = useState<boolean>(false);

	useMemo(() => {
		if (!props.data) return;
		setListData(props.data);
	}, [props.data]);

	function _onSelect(item: Select, index: number) {
		setIndexSelect(index);
	}

	useMemo(() => {
		if (indexSelect === 0 && props.checkListItem) {
			setDisable(true);
		} else {
			setDisable(false);
		}
	}, [indexSelect]);

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
			<View style={{flexDirection: 'row', alignItems: 'center'}}>
				{props.isRequire && <Text style={{color: 'red'}}>* </Text>}
				<Text
					style={[
						styles.title,
						props.isLogin ? {color: AppColors.black} : {color: '#7C86A2'},
					]}>
					{props.title}
				</Text>
			</View>
			<TouchComponent style={styles.viewInput} onPress={() => setIsSelect(true)}>
				<View style={props.isLogin ? styles.inputlogin : styles.input}>
					<Text
						numberOfLines={1}
						style={[
							styles.textInput,
							props.isLogin ? {color: AppColors.black} : {color: '#4A4A4A'},
						]}>
						{props.selectTitle ? props.selectTitle : ''}
					</Text>
					<View style={styles.viewEye}>
						<Ic_DropDrow />
					</View>
				</View>
			</TouchComponent>
			<Modal
				// animationType="slide"
				animationType={'none'}
				transparent={true}
				visible={isSelect}
				onRequestClose={() => {
					setIsSelect(false);
				}}>
				{/* onPress={() => setIsSelect(false)}  */}
				<TouchComponent style={styles.centeredView}>
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
							<ButtonRadius disable={disable} onPress={_onAccept} title={'Chọn'} />
						</View>
					</View>
				</TouchComponent>
			</Modal>
		</View>
	);
};

SelectComponent.defaultProps = {
	isLogin: false,
	isSearch: false,
};

export default memo(SelectComponent);
