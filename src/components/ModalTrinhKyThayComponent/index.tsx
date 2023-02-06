import {ButtonComponent, InputComponent, TouchComponent, InfoComponent} from '@components/index';
import {CloseIcon} from '@images/index';
import {showMessageWarning} from '@utils/index';
import React, {memo, useState, useEffect, useMemo} from 'react';
import {Keyboard, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import styles from './style';
import {actionTimLanhDaoKyThay} from '@redux/actions/totrinh';
import CheckBoxComponent from '@components/CheckBoxComponent/CheckBoxComponent';

export interface Props {
	id?: string;
	type?: number;
	isVisible?: boolean;
	closePopup: () => void;
	onAccept: (noiDung: string, userId: string) => void;
	chuyenxuly?: boolean;
}

const ModalTrinhKyThayComponent = (props: Props) => {
	const dispatch = useDispatch();
	const {lanhDaoKyThay} = useSelector((state: RootStateOrAny) => state.totrinh);
	// const [listTra, setListTra] = useState<Array<any>>();
	const [noiDung, setNoiDung] = useState<string>();
	const [listLeaderKyThay, setListLeaderKyThay] = useState<Array<any>>([]);
	const [indexSelected, setIndexSelected] = useState<number>(0);
	useEffect(() => {
		dispatch(actionTimLanhDaoKyThay());
	}, []);

	useMemo(() => {
		if (!lanhDaoKyThay) return;
		if (lanhDaoKyThay.success) {
			// let test = [];
			// test.push(lanhDaoKyThay.data);
			// test.push(lanhDaoKyThay.data);
			// test.push(lanhDaoKyThay.data);
			// setListLeaderKyThay(test);
			setListLeaderKyThay(lanhDaoKyThay.data);
		}
	}, [lanhDaoKyThay]);

	// useEffect(() => {
	// 	if (props.type === DocumentType.VAN_BAN_DEN && props.id) {
	// 		dispatch(actionThongTinTraVB({id: props.id}));
	// 	}

	// 	if (
	// 		(props.type === DocumentType.VAN_BAN_DI || props.type === DocumentType.TO_TRINH) &&
	// 		props.id
	// 	) {
	// 		dispatch(actionThongTinTraVBDI({id: props.id}));
	// 	}
	// }, []);

	// useMemo(() => {
	// 	if (!thongtinTraVBDIResponse) return;
	// 	if (thongtinTraVBDIResponse.success) {
	// 		setListTra(thongtinTraVBDIResponse.data);
	// 	}
	// }, [thongtinTraVBDIResponse]);

	// useMemo(() => {
	// 	if (!thongtinTraVBResponse) return;
	// 	if (thongtinTraVBResponse.success) {
	// 		setListTra(thongtinTraVBResponse.data);
	// 	}
	// }, [thongtinTraVBResponse]);

	function _onAccept() {
		if (!noiDung) {
			showMessageWarning('Bạn phải nhập nội dung.');
		} else {
			if (listLeaderKyThay && listLeaderKyThay.length > 0) {
				props.onAccept(noiDung, listLeaderKyThay[indexSelected]);
			}
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
				<TouchComponent style={styles.container} onPress={Keyboard.dismiss}>
					<View style={styles.viewTitle}>
						<Text style={styles.textTitle}>Chuyển lãnh đạo ký thay</Text>
						<TouchComponent style={styles.close} onPress={props.closePopup}>
							<CloseIcon />
						</TouchComponent>
					</View>

					{listLeaderKyThay.length > 0 &&
						listLeaderKyThay?.map((tra, idx) => {
							return (
								<TouchComponent
									onPress={() => setIndexSelected(idx)}
									style={{
										// width: '100%',
										flexDirection: 'row',
										justifyContent: 'center',
										alignItems: 'center',
									}}
									key={idx}>
									<View style={{paddingHorizontal: 10}}>
										<CheckBoxComponent
											checked={idx === indexSelected}
											onChecked={() => setIndexSelected(idx)}
										/>
									</View>
									<View style={{flex: 1}}>
										<InfoComponent label="Tên" content={tra.displayName} />
										<InfoComponent label="Chức vụ" content={tra.roleName} />
										<InfoComponent label="Đơn vị" content={tra.deptName} />
									</View>
									{/* <Text>{tra.userName}</Text>
                  <Text>{tra.vaiTro}</Text>
                  <Text>{tra.deptName}</Text> */}
								</TouchComponent>
							);
						})}

					<InputComponent
						title="Nôi dung"
						multiline={true}
						numberOfLines={3}
						onChange={setNoiDung}
					/>
					<View style={styles.viewButton}>
						<ButtonComponent
							style={{width: '40%'}}
							title="Đóng"
							onPress={props.closePopup}
						/>
						<ButtonComponent
							style={{width: '40%'}}
							title="Xác nhận"
							onPress={_onAccept}
						/>
					</View>
				</TouchComponent>
			</Modal>
		</View>
	);
};

ModalTrinhKyThayComponent.defaultProps = {
	isVisible: false,
};

export default memo(ModalTrinhKyThayComponent);
