import {ButtonComponent, TouchComponent} from '@components/index';
import {CloseIcon, IconChecked} from '@images/index';
import {ApiResponse} from '@models/ApiResponse';
import React, {memo, useMemo, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import styles from './style';

export interface Props {
	isVisible: boolean;
	closePopup: () => void;
	timTheoDieuKienResponse: ApiResponse<any>;
	onAcceptData: (data: string[]) => void;
	danhSachCV: ApiResponse<any>;
}

const ModalChuyenHoSoLuuTru = (props: Props) => {
	const {isVisible, closePopup, timTheoDieuKienResponse, onAcceptData, danhSachCV} = props;

	const [listContractWork, setListContractWork] = useState<any[]>([]);
	const [idContractSelected, setIdContractSelected] = useState<string[]>([]);

	useMemo(() => {
		if (timTheoDieuKienResponse && timTheoDieuKienResponse.success) {
			setListContractWork(timTheoDieuKienResponse.data);
			setIdContractSelected([]);
		}
	}, [timTheoDieuKienResponse]);

	useMemo(() => {
		if (danhSachCV && danhSachCV.success) {
			setListContractWork(danhSachCV.data);
			setIdContractSelected([]);
		}
	}, [danhSachCV]);

	const _backPassData = () => {
		onAcceptData(idContractSelected);
		closePopup();
	};

	const _renderItem = ({item, index}: {item: any; index: number}) => {
		const dataSelected = [...idContractSelected];
		const findIdExits = dataSelected.findIndex(_index => _index === item?.id);
		return (
			<View
				style={{
					flexDirection: 'row',
					marginBottom: 10,
					backgroundColor: '#f5f2f2',
					paddingTop: 10,
					borderRadius: 10,
				}}
				key={index + item?.id}>
				<View style={styles.viewCheckBox}>
					<TouchableOpacity
						onPress={() => {
							if (findIdExits === -1) {
								dataSelected.push(item?.id);
							} else {
								dataSelected.splice(findIdExits, 1);
							}
							setIdContractSelected(dataSelected);
						}}>
						{findIdExits !== -1 ? (
							<IconChecked />
						) : (
							<View style={{width: 15, height: 15, borderWidth: 1}} />
						)}
					</TouchableOpacity>
				</View>
				<View style={{flex: 1}}>
					<View style={styles.viewTextInfo}>
						<Text style={styles.titleView}>Số và ký hiệu hồ sơ</Text>
						<Text style={styles.contentView}>{item?.documentCode}</Text>
					</View>
					<View style={styles.viewTextInfo}>
						<Text style={styles.titleView}>Tiêu đề</Text>
						<Text style={styles.contentView}>{item?.title}</Text>
					</View>
					<View style={styles.viewTextInfo}>
						<Text style={styles.titleView}>Đề mục lớn</Text>
						<Text style={styles.contentView}>{item?.bigCategoryProfileName}</Text>
					</View>
					<View style={styles.viewTextInfo}>
						<Text style={styles.titleView}>Đề mục nhỏ</Text>
						<Text style={styles.contentView}>{item?.smallCategoryProfileName}</Text>
					</View>
					<View style={styles.viewTextInfo}>
						<Text style={styles.titleView}>Thời hạn bảo quản</Text>
						<Text style={styles.contentView}>{item?.expiryDateName}</Text>
					</View>
				</View>
			</View>
		);
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
						<Text style={styles.textTitle}>Chọn hồ sơ công việc</Text>
						<TouchComponent style={styles.close} onPress={closePopup}>
							<CloseIcon />
						</TouchComponent>
					</View>
					<View>
						{/* <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
							<Text>Số và ký hiệu hồ sơ</Text>
							<Text>Tiêu đề</Text>
							<Text>Đề mục lớn</Text>
							<Text>Đề mục nhỏ</Text>
						</View> */}
						<FlatList
							contentContainerStyle={{paddingBottom: 110}}
							showsVerticalScrollIndicator={false}
							keyExtractor={(item, index) => item.smallCategoryProfileId + index}
							data={listContractWork}
							renderItem={_renderItem}
						/>
					</View>
					<View style={styles.viewButton}>
						<ButtonComponent title="Đóng" onPress={closePopup} />
						<ButtonComponent
							disable={idContractSelected.length === 0}
							title="Chọn"
							onPress={_backPassData}
						/>
					</View>
				</View>
			</Modal>
		</View>
	);
};

ModalChuyenHoSoLuuTru.defaultProps = {
	isVisible: false,
	onlyFilePublic: false,
};

const mapStateToProps = (state: any) => {
	return {
		timTheoDieuKienResponse: state.vbden.timTheoDieuKienResponse,
		danhSachCV: state.vbdi.danhSachCV,
	};
};

export default connect(mapStateToProps)(memo(ModalChuyenHoSoLuuTru));
