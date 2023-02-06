import React, {memo, useEffect, useState, useMemo} from 'react';
import {
	Text,
	View,
	ImageBackground,
	TouchableWithoutFeedback,
	Keyboard,
	Platform,
	Linking,
} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import {LogoIcon, LoginBGImage, Icon_user} from '@images/index';
import styles from './style';
import CheckBox from '@react-native-community/checkbox';
import {TouchComponent} from '@components/index';
import {actionDefault, actionGetVersion, actionLogin} from '@redux/actions/authen';
import {ApiResponse} from '@models/ApiResponse';
import {saveToken} from '@redux/actions/configs';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeRoute, RootStackParamList} from '@navigations/NameRoute';
import {useNavigation} from '@react-navigation/native';
import {
	dismissLoading,
	showLoading,
	showMessageWarning,
	getUserLogin,
	showAlert,
} from '@utils/index';
import Input from './components/InputComponent';
import {userInfoComplete} from '@redux/actions/setting';
import {getVersion} from 'react-native-device-info';
import {Version} from '@models/Version';
import Icon from '@commons/Icon';
export interface Props {
	loginResponse: ApiResponse<{
		token?: string;
	}>;
	getVersionResponse: Version;
	token?: string;
	version?: string;
	userName?: string;
}

const LoginScreen = (props: Props) => {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
	const dispatch = useDispatch();
	const {loginResponse, version, userName, getVersionResponse} = props;
	const platform = Platform.OS;
	const [toggleCheckBox, setToggleCheckBox] = useState<boolean>();
	const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
	const [paramLogin, setParamLogin] = useState({
		userName: '',
		password: 'HangChuoi1$',
		// password: '',
	});

	useEffect(() => {
		if (userName) {
			setToggleCheckBox(true);
			setParamLogin({...paramLogin, userName});
		}
		dispatch(actionGetVersion());
		return () => {
			dispatch(actionDefault());
		};
	}, [userName]);

	useMemo(() => {
		if (!getVersionResponse) return;
		const version = getVersion();
		let isUpdate = false;
		if (platform === 'ios') {
			if (version !== getVersionResponse.iosVersion) {
				isUpdate = true;
			}
		} else {
			if (version !== getVersionResponse.androidVersion) {
				isUpdate = true;
			}
		}
		if (isUpdate) {
			showAlert({
				title: 'Cập Nhật',
				message: 'Có bản cập nhật mới.Bạn có muốn cập nhật?',
				hasBackdrop: false,
				rightTitle: 'Cập nhật',
				rightAction: () => {
					if (platform == 'android') {
						Linking.openURL('market://details?id=com.edocapp');
					} else {
						Linking.openURL('itms-apps://itunes.apple.com/us/app/id1620996673?mt=8');
					}
				},
			});
		}
	}, [getVersionResponse]);

	useMemo(() => {
		if (!loginResponse) return;
		dismissLoading();
		if (loginResponse.success) {
			dispatch(
				saveToken({
					token: loginResponse?.data?.token,
					userName: toggleCheckBox ? paramLogin.userName : undefined,
				}),
			);
			if (loginResponse?.data?.token) {
				const user = getUserLogin(loginResponse?.data?.token);
				dispatch(userInfoComplete(user));
			}

			navigation.replace(HomeRoute);
		} else {
			showMessageWarning(loginResponse.error);
		}
	}, [loginResponse]);

	function _goLogin() {
		if (!paramLogin.userName) {
			showMessageWarning('Bạn phải nhập thông tin đăng nhập.');
			return;
		}
		if (!paramLogin.password) {
			showMessageWarning('Bạn phải nhập thông tin đăng nhập.');
			return;
		}
		showLoading();
		dispatch(actionLogin(paramLogin));
	}

	return (
		<View>
			<ImageBackground source={LoginBGImage} style={styles.bgView}>
				<LogoIcon style={styles.logoView} />
				<TouchableWithoutFeedback
					style={styles.loginForm}
					onPress={Keyboard.dismiss}
					accessible={false}>
					<View style={styles.loginForm}>
						<Text style={styles.loginTitle}>Đăng nhập</Text>
						<Input
							leftIcon={<Icon_user />}
							title="Tài khoản"
							value={paramLogin.userName}
							onChange={text => setParamLogin({...paramLogin, userName: text})}
						/>
						<Input
							onPressIcon={() => {
								setSecureTextEntry(!secureTextEntry);
							}}
							leftIcon={
								<Icon
									name={secureTextEntry ? 'eye-blocked' : 'eye'}
									size={16}
									color="#D9D9D9"
								/>
							}
							title="Mật khẩu"
							secureTextEntry={secureTextEntry}
							onChange={text => setParamLogin({...paramLogin, password: text})}
						/>
						<View style={styles.rememberView}>
							<CheckBox
								tintColors={{true: '#FFFFFF', false: '#FFFFFF'}}
								style={{width: 25, height: 25, marginRight: 10}}
								value={toggleCheckBox}
								onValueChange={newValue => setToggleCheckBox(newValue)}
							/>
							<Text style={styles.rememberText}>Nhớ mật khẩu</Text>
						</View>
						<TouchComponent style={styles.buttonView} onPress={_goLogin}>
							<Text style={styles.buttonText}>Đăng nhập</Text>
						</TouchComponent>
					</View>
				</TouchableWithoutFeedback>

				<View style={styles.viewVersion}>
					<Text style={styles.textVersion}>{version || getVersion()} </Text>
				</View>
			</ImageBackground>
		</View>
	);
};

const mapStateToProps = (state: any) => {
	return {
		loginResponse: state.authen.loginResponse,
		getVersionResponse: state.authen.getVersionResponse,
		token: state.configs.token,
		version: state.configs.version,
		userName: state.configs.userName,
	};
};

export default connect(mapStateToProps)(memo(LoginScreen));
