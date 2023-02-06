import {ButtonComponent, InputComponent, TouchComponent, InfoComponent} from '@components/index';
import {CloseIcon} from '@images/index';
import {showMessageWarning} from '@utils/index';
import React, {memo, useState, useEffect, useMemo} from 'react';
import {Keyboard, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {connect, useDispatch} from 'react-redux';
import styles from './style';
import {actionThongTinTraVB} from '@redux/actions/vbden';
import {ApiResponse} from '@models/ApiResponse';
import DocumentType from '@commons/DocumentType';
import {actionThongTinTraVBDI} from '@redux/actions/vbdi';
import { ScrollView } from 'react-native-gesture-handler';

export interface Props {
	id?: string;
	type?: number;
	isVisible?: boolean;
	closePopup: () => void;
	onAccept: (noiDung: string, userId: string) => void;
	thongtinTraVBResponse: ApiResponse<Array<any>>;
	thongtinTraVBDIResponse: ApiResponse<Array<any>>;
	chuyenxuly?: boolean;
}

const ModalTraVBComponent = (props: Props) => {
	const dispatch = useDispatch();
	const {thongtinTraVBResponse, thongtinTraVBDIResponse} = props;
	const [listTra, setListTra] = useState<Array<any>>();
	const [noiDung, setNoiDung] = useState<string>();

	useEffect(() => {
		if (props.type === DocumentType.VAN_BAN_DEN && props.id) {
			dispatch(actionThongTinTraVB({id: props.id}));
		}

		if (
			(props.type === DocumentType.VAN_BAN_DI || props.type === DocumentType.TO_TRINH) &&
			props.id
		) {
			dispatch(actionThongTinTraVBDI({id: props.id}));
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
		if (!noiDung) {
			showMessageWarning('Bạn phải nhập nội dung.');
		} else {
			if (props.chuyenxuly) {
				props.onAccept(noiDung, '');
				return;
			}
			if (listTra && listTra.length > 0 && listTra[0].userId) {
				props.onAccept(noiDung, listTra[0].userId);
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
						<Text style={styles.textTitle}>
							{props.chuyenxuly ? 'Chuyển xử lý' : 'Trả văn bản'}
						</Text>
						<TouchComponent style={styles.close} onPress={props.closePopup}>
							<CloseIcon />
						</TouchComponent>
					</View>
					{!props.chuyenxuly && (
						<View style={{width: '100%'}}>
							{listTra?.map((tra, idx) => {
								return (
									<View key={idx}>
										<InfoComponent label="Tên" content={tra.userName} />
										<InfoComponent label="Chức vụ" content={tra.vaiTro} />
										<InfoComponent label="Đơn vị" content={tra.deptName} />
										{/* <Text>{tra.userName}</Text>
                  <Text>{tra.vaiTro}</Text>
                  <Text>{tra.deptName}</Text> */}
									</View>
								);
							})}
						</View>
					)}
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

ModalTraVBComponent.defaultProps = {
	isVisible: false,
};

const mapStateToProps = (state: any) => {
	return {
		thongtinTraVBResponse: state.vbden.thongtinTraVBResponse,
		thongtinTraVBDIResponse: state.vbdi.thongtinTraVBDIResponse,
	};
};

export default connect(mapStateToProps)(memo(ModalTraVBComponent));
