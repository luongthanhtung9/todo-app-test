import {
	ButtonComponent,
	InputComponent,
	SelectDateComponent,
	TouchComponent,
} from '@components/index';
import {CloseIcon, DropDown} from '@images/index';
import dayjs from 'dayjs';
import React, {memo, useMemo, useState} from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import {Menu, MenuItem} from 'react-native-material-menu';
import Modal from 'react-native-modal';
import styles from './style';

export interface Props {
	id?: string;
	type?: number;
	isVisible?: boolean;
	listAllLeader: Array<any>;
	closePopup: () => void;
	onAccept: (data: any) => void;
}

interface LeaderSelected {
	id: string;
	name: string;
}

const ModalThuHoiVBComponent = (props: Props) => {
	const {listAllLeader} = props;
	const [noiDung, setNoiDung] = useState<string>();

	const [visible, setVisible] = useState(false);
	const [leaderSelected, setLeaderSelected] = useState<LeaderSelected>({} as LeaderSelected);
	const [dateSelected, setDateSelected] = useState();
	const [errNoiDung, setErrNoiDung] = useState(false);

	useMemo(() => {
		if (listAllLeader && listAllLeader.length !== 0) {
			setLeaderSelected(listAllLeader[0]);
		}
	}, [listAllLeader]);

	const hideMenu = (dataSelected: LeaderSelected) => {
		setLeaderSelected(dataSelected);
		setVisible(false);
	};

	const showMenu = () => setVisible(true);

	const onSelectHXL = (date: any) => {
		setDateSelected(date);
	};

	function _onAccept() {
		if (!noiDung) {
			setErrNoiDung(true);
		} else {
			const param = {
				actionType: 1,
				hanXuLy: `${dayjs(dateSelected).format('YYYY-MM-DDT00:00:00')}.000Z`,
				// idVanBan: ,
				noiDung: noiDung,
				receiceUserId: leaderSelected.id,
			};
			props.onAccept(param);
		}
	}

	return (
		<View>
			<Modal
				isVisible={props.isVisible}
				onBackdropPress={() => props.closePopup}
				animationIn="slideInUp"
				animationOut="slideOutDown"
				useNativeDriver
				hideModalContentWhileAnimating
				style={styles.modal}>
				<View style={styles.container}>
					<View style={styles.viewTitle}>
						<Text style={styles.textTitle}>Bổ sung ý kiến</Text>
						<TouchComponent style={styles.close} onPress={props.closePopup}>
							<CloseIcon />
						</TouchComponent>
					</View>
					<View style={{width: '100%'}}>
						<Text style={styles.title}>Trình lãnh đạo</Text>
						<TouchableOpacity
							onPress={showMenu}
							style={{
								borderWidth: 1,
								padding: 10,
								borderColor: '#ccc',
								alignItems: 'center',
								flexDirection: 'row',
							}}>
							<Text style={{flex: 1}}>{leaderSelected.name}</Text>
							<Image
								style={{width: 15, height: 15, marginLeft: 10}}
								source={DropDown}
							/>
						</TouchableOpacity>
					</View>
					<View style={{width: '100%', alignItems: 'flex-end'}}>
						<Menu
							style={{width: '83.5%'}}
							visible={visible}
							// anchor={<Text onPress={showMenu}>Show menu</Text>}
							onRequestClose={() => setVisible(false)}>
							{listAllLeader.length !== 0 ? (
								listAllLeader?.map((_item, idx) => (
									<MenuItem key={idx} onPress={() => hideMenu(_item)}>
										<View
											style={{
												justifyContent: 'center',
												paddingLeft: 10,
											}}>
											<Text style={{fontWeight: 'bold'}}>{_item.name}</Text>
											<Text style={{fontSize: 12, color: '#858585'}}>
												{_item.positionName}
											</Text>
										</View>
									</MenuItem>
								))
							) : (
								<MenuItem disabled>Danh sách trống</MenuItem>
							)}
						</Menu>
					</View>
					<InputComponent
						title="Nôi dung xử lý"
						multiline={true}
						numberOfLines={3}
						onChange={setNoiDung}
					/>
					{errNoiDung && (
						<Text
							style={{
								fontSize: 10,
								color: 'red',
								textAlign: 'left',
								width: '100%',
								marginTop: 12,
							}}>
							Trường nội dung không được để trống!
						</Text>
					)}
					<SelectDateComponent
						title="Hạn xử lý"
						value={dateSelected}
						onChange={date => onSelectHXL(date)}
					/>
					<View style={styles.viewButton}>
						<ButtonComponent
							style={{width: '40%'}}
							title="Đóng"
							onPress={props.closePopup}
						/>
						{listAllLeader.length !== 0 && (
							<ButtonComponent
								style={{width: '40%'}}
								title="Xác nhận"
								onPress={_onAccept}
							/>
						)}
					</View>
				</View>
			</Modal>
		</View>
	);
};

ModalThuHoiVBComponent.defaultProps = {
	isVisible: false,
};

export default memo(ModalThuHoiVBComponent);
