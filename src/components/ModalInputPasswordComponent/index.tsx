import {ButtonComponent, InputComponent, TouchComponent} from '@components/index';
import {CloseIcon, LSNhanIcon} from '@images/index';
import {showMessageWarning} from '@utils/index';
import React, {memo, useState} from 'react';
import {Text, View} from 'react-native';
import ModalApp from 'react-native-modal';
import {connect} from 'react-redux';
import styles from './style';
import Input from '../../containers/Login/components/InputComponent';
import Icon from '@commons/Icon';
export interface Props {
	isShowModal?: boolean;
	reset?: () => void;
	onPressIcon?: () => void;
	secureTextEntry?: boolean;
	value?: string;
	setValue?: (text: string) => void;
	oncedPressKyNhay?: () => void;
}

const ModalTraLoiComponent = (props: Props) => {
	const {isShowModal, reset, onPressIcon, secureTextEntry, value, setValue, oncedPressKyNhay} =
		props;
	return (
		<View>
			<ModalApp
				isVisible={isShowModal}
				onBackdropPress={() => {
					if (reset) reset();
				}}
				animationIn="slideInUp"
				animationOut="slideOutDown"
				useNativeDriver
				hideModalContentWhileAnimating
				style={styles.modal}>
				<View style={styles.container}>
					<View style={styles.viewTitle}>
						<Text style={styles.textTitle}>Nhập mật khẩu</Text>
						<TouchComponent
							style={styles.close}
							onPress={() => {
								if (reset) reset();
							}}>
							<CloseIcon />
						</TouchComponent>
					</View>
					<Input
						onPressIcon={() => {
							if (onPressIcon) onPressIcon();
						}}
						leftIcon={
							<Icon
								name={secureTextEntry ? 'eye-blocked' : 'eye'}
								size={16}
								color="#D9D9D9"
							/>
						}
						title="Mật khẩu"
						value={value}
						secureTextEntry={secureTextEntry}
						onChange={text => {
							if (setValue) setValue(text);
						}}
					/>
					<View style={styles.viewButton}>
						<ButtonComponent
							style={{width: '40%'}}
							title="Xác nhận"
							onPress={() => {
								if (reset && oncedPressKyNhay) {
									reset();
									oncedPressKyNhay();
								}
							}}
						/>
					</View>
				</View>
			</ModalApp>
		</View>
	);
};

ModalTraLoiComponent.defaultProps = {
	isVisible: false,
};

const mapStateToProps = (state: any) => {
	return {};
};

export default connect(mapStateToProps)(memo(ModalTraLoiComponent));
