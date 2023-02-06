import {ButtonComponent, TouchComponent} from '@components/index';
import {CloseIcon, IconChecked} from '@images/index';
import React, {memo, useCallback, useMemo, useState} from 'react';
import {ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {connect, useDispatch} from 'react-redux';
import styles from './style';
import {ChiCuc, City, UncheckBox, ItemSelectNomalIcon} from '@images/index';
import {actionLayDonViDeXuat} from '@redux/actions/quanly';
import {DonViType} from './typesDonVi';
import _ from 'lodash';
import {ApiResponse} from '@models/ApiResponse';
interface dataSelected {
	hanXuLy: any;
	tenDonVi: string;
	unitId: string;
	userId?: any;
}
export interface Props {
	data?: any;
	listSelect?: Array<any>;
	isBoXungDonVi: boolean;
	isVisible?: boolean;
	onSelect?: (item: any) => void;
	// onSelectHT: (item: Leader, processType?: String) => void
	// onSelectHXL: (item: Leader, hanXuly: any) => void
	// onSelectND: (item: Leader, noiDung: string) => void
	onSelectAccept: (data: dataSelected[]) => void;
	closePopup: () => void;
	defaultSelcted?: any;
	timTheoIdResponse?: ApiResponse<any>;
}

const ModalDonViComponent = (props: Props) => {
	const {
		data,
		isVisible,
		listSelect,
		onSelectAccept,
		closePopup,
		timTheoIdResponse,
		isBoXungDonVi,
	} = props;
	const [listDonVi, setListDonVi] = useState<DonViType[]>([]);
	const [textSearch, setTextSearch] = useState('');
	const [isCucKV, setIsCucKV] = useState<boolean>(false);
	const [isCaNhan, setIsCaNhan] = useState<boolean>(false);
	const dispatch = useDispatch();
	const [paramLayDonVi, setParamLayDonVi] = useState<any>({
		isChiCuc: false,
		isCucKhuVuc: false,
		isLayUser: false,
		isPhong: false,
		keyword: '',
	});

	const mapDataExits = (dataChild: DonViType[], checkedItem: DonViType): DonViType[] => {
		return dataChild.map(item => {
			// if (item.id === checkedItem?.unitId || item.parentId === checkedItem?.unitId) {
			if (checkedItem?.userId) {
				if (
					checkedItem?.unitId &&
					item.parentId === checkedItem?.unitId &&
					item.id.split('_')[0] === checkedItem.userId
				) {
					return {
						...item,
						isChecked: true,
						isDisable: isBoXungDonVi,
						children:
							item?.children && item?.children.length !== 0
								? mapDataExits(item.children, checkedItem)
								: [],
					};
				} else {
					return {
						...item,
						children:
							item?.children && item?.children.length !== 0
								? mapDataExits(item.children, checkedItem)
								: [],
					};
				}
			} else {
				if (item.id === checkedItem?.unitId) {
					return {
						...item,
						isChecked: true,
						isDisable: isBoXungDonVi,
						children:
							item?.children && item?.children.length !== 0
								? mapDataExits(item.children, checkedItem)
								: [],
					};
				} else {
					return {
						...item,
						children:
							item?.children && item?.children.length !== 0
								? mapDataExits(item.children, checkedItem)
								: [],
					};
				}
			}
		});
	};

	useMemo(() => {
		if (data) {
			if (listSelect && listSelect.length !== 0) {
				let dataClone = [...data];
				listSelect.forEach(item => {
					dataClone = mapDataExits(dataClone, item);
				});
				setListDonVi(dataClone);
				return;
			}
			setListDonVi(data);
		}
	}, [data, listSelect]);

	useMemo(() => {
		if (timTheoIdResponse && timTheoIdResponse.success) {
			if (timTheoIdResponse.data.deptType === 0 && timTheoIdResponse.data.type === 0) {
				setIsCucKV(true);
			} else {
				setIsCucKV(false);
			}
			if (timTheoIdResponse.data.deptType === 4 || timTheoIdResponse.data.type === 1) {
				setIsCaNhan(true);
			} else {
				setIsCaNhan(false);
			}
		}
	}, [timTheoIdResponse]);

	const _layUser = () => {
		const newParam = {
			...paramLayDonVi,
			isLayUser: !paramLayDonVi.isLayUser,
		};
		setParamLayDonVi(newParam);
		dispatch(actionLayDonViDeXuat(newParam));
	};

	const _cucKhuVuc = () => {
		const newParam = {
			...paramLayDonVi,
			isCucKhuVuc: !paramLayDonVi.isCucKhuVuc,
			isChiCuc: paramLayDonVi.isChiCuc && !paramLayDonVi.isCucKhuVuc,
		};
		setParamLayDonVi(newParam);
		dispatch(actionLayDonViDeXuat(newParam));
	};

	const _chiCuc = () => {
		const newParam = {
			...paramLayDonVi,
			isChiCuc: !paramLayDonVi.isChiCuc,
		};
		setParamLayDonVi(newParam);
		dispatch(actionLayDonViDeXuat(newParam));
	};

	const getParent = (_data: DonViType[], _id: string) => {
		let result = null;
		function _findDonVi(dataChild: DonViType[], id: string) {
			for (let i = 0; i < dataChild.length; i++) {
				if (dataChild[i].key === id) {
					result = dataChild[i].data;
					break;
				} else {
					dataChild[i].children &&
						dataChild[i].children.length !== 0 &&
						_findDonVi(dataChild[i].children, id);
				}
			}
		}
		_findDonVi(_data, _id);
		return result;
	};

	const mapNewData = (dataChild: DonViType[], checkedItem: DonViType): DonViType[] => {
		return dataChild.map(item => {
			if (item.id === checkedItem.id) {
				// setListChecked(item);
				return {
					...item,
					isChecked: item?.isChecked ? !item.isChecked : true,
					children: item?.children && item?.children.length !== 0 ? item.children : [],
				};
			} else if (item?.isChecked === undefined) {
				return {
					...item,
					isChecked: false,
					children:
						item?.children && item?.children.length !== 0
							? mapNewData(item.children, checkedItem)
							: [],
				};
			} else {
				return {
					...item,
					children:
						item?.children && item?.children.length !== 0
							? mapNewData(item.children, checkedItem)
							: [],
				};
			}
		});
	};

	const pressItem = (checkedItem: DonViType) => {
		const newData = mapNewData(listDonVi, checkedItem);
		setListDonVi(newData);
	};

	const childView = (item: DonViType, idx: number) => {
		return (
			<View key={idx} style={{marginLeft: 20}}>
				<View style={styles.viewChild}>
					{paramLayDonVi.isLayUser && item.isPerson ? (
						<TouchableOpacity disabled={item.isDisable} onPress={() => pressItem(item)}>
							<View
								style={[
									styles.viewCheckBox,
									{
										backgroundColor: item.isDisable
											? '#4e4d4d97'
											: item?.isChecked
											? '#187779'
											: '#ffffff',
									},
								]}>
								{item?.isChecked && !item.isDisable ? (
									<IconChecked />
								) : item.isDisable ? (
									<ItemSelectNomalIcon />
								) : null}
							</View>
						</TouchableOpacity>
					) : !paramLayDonVi.isLayUser ? (
						<TouchableOpacity disabled={item.isDisable} onPress={() => pressItem(item)}>
							<View
								style={[
									styles.viewCheckBox,
									{
										backgroundColor: item.isDisable
											? '#4e4d4d97'
											: item?.isChecked
											? '#187779'
											: '#ffffff',
									},
								]}>
								{item?.isChecked && !item.isDisable ? (
									<IconChecked />
								) : item.isDisable ? (
									<ItemSelectNomalIcon />
								) : null}
							</View>
						</TouchableOpacity>
					) : null}
					<Text>{item.name}</Text>
				</View>
				{item?.children &&
					item.children.map((temChild: DonViType, idxChild: number) =>
						childView(temChild, idxChild),
					)}
			</View>
		);
	};

	const debounceFn = useCallback(_.debounce(handleDebounceFn, 700), [paramLayDonVi]);

	function handleDebounceFn(inputValue: any) {
		const paramSearh = {
			...paramLayDonVi,
			keyword: inputValue,
		};
		setParamLayDonVi(paramSearh);
		dispatch(actionLayDonViDeXuat(paramSearh));
	}

	const _changeText = (text: string) => {
		setTextSearch(text);
		debounceFn(text);
	};

	const _backPassData = () => {
		const result: dataSelected[] = [] as dataSelected[];
		const _mapData = (dataInput: DonViType[]) => {
			dataInput.map(_item => {
				if (
					_item.isChecked === true &&
					!_item.isDisable &&
					(paramLayDonVi.isLayUser ? _item.children.length === 0 : true)
				) {
					const parentData: any = paramLayDonVi.isLayUser
						? getParent(listDonVi, _item.parentId)
						: null;
					const newData = paramLayDonVi.isLayUser
						? {
								hanXuLy: null,
								unitId: _item.parentId,
								userId: _item.id.split('_')[0],
								roleId: _item.id.split('_')[1],
								isPerson: _item.isPerson,
								tenDonVi: parentData && parentData.deptName,
								userName: _item.name,
								vaiTro: _item.vaitro,
						  }
						: {
								id: _item.id,
								hanXuLy: null,
								tenDonVi: _item.name,
								unitId: _item.id,
						  };
					result.push(newData);
				} else {
					_item.children && _item.children.length !== 0 && _mapData(_item.children);
				}
			});
		};
		_mapData(listDonVi);
		onSelectAccept(result);
	};

	return (
		<View>
			<Modal
				isVisible={isVisible}
				onBackdropPress={closePopup}
				animationIn="slideInUp"
				animationOut="slideOutDown"
				useNativeDriver
				hideModalContentWhileAnimating
				style={styles.modal}>
				<View style={styles.container}>
					<View style={styles.viewTitle}>
						<Text style={styles.textTitle}>Đề xuất đơn vị xử lý thông tin</Text>
						<TouchComponent style={styles.close} onPress={closePopup}>
							<CloseIcon />
						</TouchComponent>
					</View>
					<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
						{isCucKV ? (
							<>
								<TouchableOpacity
									onPress={_cucKhuVuc}
									style={[styles.viewTouch, {backgroundColor: '#0EACAF'}]}>
									<ChiCuc />
									<Text style={styles.textTouch}>Cục khu vực</Text>
									{paramLayDonVi.isCucKhuVuc ? (
										<ItemSelectNomalIcon />
									) : (
										<UncheckBox />
									)}
								</TouchableOpacity>
								<View style={{width: 10}} />
								<TouchableOpacity
									disabled={!paramLayDonVi.isCucKhuVuc}
									onPress={_chiCuc}
									style={[
										styles.viewTouch,
										{
											backgroundColor: '#C6699F',
											opacity: !paramLayDonVi.isCucKhuVuc ? 0.5 : 1,
										},
									]}>
									<City />
									<Text style={styles.textTouch}>Chi cục</Text>
									{paramLayDonVi.isChiCuc ? (
										<ItemSelectNomalIcon />
									) : (
										<UncheckBox />
									)}
								</TouchableOpacity>
							</>
						) : (
							<>
								<View style={styles.viewTouch} />
								<TouchableOpacity
									onPress={_layUser}
									style={[styles.viewTouch, {backgroundColor: '#0EACAF'}]}>
									<ChiCuc />
									<Text style={styles.textTouch}>Chọn người xử lý</Text>
									{paramLayDonVi.isLayUser ? (
										<ItemSelectNomalIcon />
									) : (
										<UncheckBox />
									)}
								</TouchableOpacity>
							</>
						)}
					</View>
					<View style={{borderWidth: 1, padding: 10, marginTop: 10, borderColor: '#ccc'}}>
						<TextInput
							placeholder="Tìm kiếm"
							value={textSearch}
							onChangeText={_changeText}
						/>
					</View>
					<ScrollView contentContainerStyle={{paddingBottom: 50}} style={{marginTop: 10}}>
						{listDonVi &&
							listDonVi.length !== 0 &&
							listDonVi.map((item: DonViType, idx: number) => (
								<View key={idx}>
									<View style={styles.viewChild}>
										<Text>{item.name}</Text>
									</View>
									{item?.children &&
										item.children.map((temChild: DonViType, idxChild: number) =>
											childView(temChild, idxChild),
										)}
								</View>
							))}
					</ScrollView>
					<View style={styles.viewButton}>
						<ButtonComponent title="Chọn" onPress={_backPassData} />
						<ButtonComponent title="Đóng" onPress={closePopup} />
					</View>
				</View>
			</Modal>
		</View>
	);
};

ModalDonViComponent.defaultProps = {
	isVisible: false,
	onlyFilePublic: false,
};

const mapStateToProps = (state: any) => {
	return {
		listFileResponse: state.quanly.listFileResponse,
		timTheoIdResponse: state.quanly.timTheoIdResponse,
	};
};

export default connect(mapStateToProps)(memo(ModalDonViComponent));
