import {ButtonComponent, TouchComponent} from '@components/index';
import {CloseIcon} from '@images/index';
import React, {memo, useState, useEffect, useMemo} from 'react';
import {Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {connect, useDispatch} from 'react-redux';
import styles from './style';
import {actionThongTinTraVB} from '@redux/actions/vbden';
import {ApiResponse} from '@models/ApiResponse';
import DocumentType from '@commons/DocumentType';
import {actionThongTinTraVBDI} from '@redux/actions/vbdi';

export interface Props {
	id?: string;
	type?: number;
	isVisible?: boolean;
	closePopup: () => void;
	onAccept?: (noiDung?: string, userId?: string) => void;
	thongtinTraVBResponse: ApiResponse<Array<any>>;
	thongtinTraVBDIResponse: ApiResponse<Array<any>>;
}

const ModalChuyenCapSoVBDiComponent = (props: Props) => {
	const dispatch = useDispatch();
	const {thongtinTraVBResponse, thongtinTraVBDIResponse} = props;
	const [listTra, setListTra] = useState<Array<any>>();
	const [noiDung, setNoiDung] = useState<string>();

	useEffect(() => {
		if (props.type == DocumentType.VAN_BAN_DI) {
			dispatch(actionThongTinTraVBDI({id: props.id}));
		} else {
			dispatch(actionThongTinTraVB({id: props.id}));
		}
	}, []);

	useMemo(() => {
		if (!thongtinTraVBDIResponse) return;
		if (thongtinTraVBDIResponse.success) {
			setListTra(thongtinTraVBDIResponse.data);
		}
	}, [thongtinTraVBDIResponse]);

	useMemo(() => {
		if (!thongtinTraVBResponse) return;
		if (thongtinTraVBResponse.success) {
			setListTra(thongtinTraVBResponse.data);
		}
	}, [thongtinTraVBResponse]);

	function _onAccept() {
		// if (!noiDung) {
		// 	showMessageWarning('Bạn phải nhập nội dung.');
		// } else {
		if (props.onAccept) {
			if (listTra && listTra.length > 0 && listTra[0].userId) {
				props.onAccept(noiDung, listTra[0].userId);
			} else {
				props.onAccept(noiDung, '');
			}
		}
		// }
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
						<Text style={styles.textTitle}>Chuyển cấp số</Text>
						<TouchComponent style={styles.close} onPress={props.closePopup}>
							<CloseIcon />
						</TouchComponent>
					</View>
					{/* <InputComponent
						title="Nôi dung"
						multiline={true}
						numberOfLines={3}
						onChange={setNoiDung}
					/> */}
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
				</View>
			</Modal>
		</View>
	);
};

ModalChuyenCapSoVBDiComponent.defaultProps = {
	isVisible: false,
};

const mapStateToProps = (state: any) => {
	return {
		thongtinTraVBResponse: state.vbden.thongtinTraVBResponse,
		thongtinTraVBDIResponse: state.vbdi.thongtinTraVBDIResponse,
	};
};

export default connect(mapStateToProps)(memo(ModalChuyenCapSoVBDiComponent));
