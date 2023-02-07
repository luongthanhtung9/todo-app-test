import React, {memo, useState, useMemo} from 'react';
import {View, Text, Modal} from 'react-native';
import {TouchComponent, FlatListComponent} from '@components/index';
import styles from './style';
import {Select} from '@models/Select';
import ButtonRadius from '@components/ButtonRadiusComponent/ButtonRadius';
import {Success} from '@images/index';

export interface Props {
	title?: string;
	selectTitle?: string;
	data?: Array<Select>;
	isLogin?: boolean;
	isRequire?: boolean;
	isSearch?: boolean;
	onChange?: (select: Select) => void;
	onClose?: () => void;
	isVisible?: boolean;
}

const SelectUser = (props: Props) => {
	const [isSelect, setIsSelect] = useState<boolean>(false);
	const [indexSelect, setIndexSelect] = useState<number>(0);
	const [listData, setListData] = useState<Array<Select>>([]);

	useMemo(() => {
		if (!props.data) return;
		setListData(props.data);
	}, [props.data]);

	//   console.log('listData', listData)

	function _onSelect(item: Select, index: number) {
		setIndexSelect(index);
	}

	function _onClose() {
		if (props.onClose && listData) {
			props.onClose();
		}
		// const i = listData?.findIndex(item => item.label === props.selectTitle);
		// if (i) setIndexSelect(i);
		// setIsSelect(false);
		// if (props.data) setListData(props.data);
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
			<Text style={styles.textItemSelect}>{item.label}</Text>
			{indexSelect === index && <Success />}
		</TouchComponent>
	);

	return (
		<View style={styles.formView}>
			<Modal
				// animationType="slide"
				animationType={'none'}
				transparent={true}
				visible={props.isVisible}
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
						<View style={styles.viewList}>
							<FlatListComponent listData={listData} buildItem={renderItem} />
						</View>
						<View style={styles.viewBottom}>
							<ButtonRadius transparentBg onPress={_onClose} title={'Close'} />
							<ButtonRadius onPress={_onAccept} title={'Select'} />
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
