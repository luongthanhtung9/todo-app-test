import {ButtonComponent, InputComponent, TouchComponent} from '@components/index';
import {CloseIcon} from '@images/index';
import {showMessageWarning} from '@utils/index';
import React, {memo, useState} from 'react';
import {Keyboard, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import styles from './style';

export interface Props {
	id?: string;
	type?: number;
	isVisible?: boolean;
	closePopup: () => void;
	onAccept: (noiDung: string) => void;
	chuyenxuly?: boolean;
}

const ModalHoanThienVBComponent = (props: Props) => {
	const [noiDung, setNoiDung] = useState<string>();

	function _onAccept() {
		if (!noiDung) {
			showMessageWarning('Bạn phải nhập nội dung.');
		} else {
			if (props.onAccept) {
				props.onAccept(noiDung);
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
						<Text style={styles.textTitle}>Yêu cầu hoàn thiện</Text>
						<TouchComponent style={styles.close} onPress={props.closePopup}>
							<CloseIcon />
						</TouchComponent>
					</View>
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

ModalHoanThienVBComponent.defaultProps = {
	isVisible: false,
};

export default memo(ModalHoanThienVBComponent);
