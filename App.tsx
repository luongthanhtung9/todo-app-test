/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
	SafeAreaView,
	StatusBar,
	StyleSheet,
	Text,
	useColorScheme,
	View,
	ActivityIndicator,
	Platform,
} from 'react-native';
import {Provider, TypedUseSelectorHook, useSelector} from 'react-redux';
import {Navigation} from '@navigations/index';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {configureStore} from '@redux/index';
import codePush from 'react-native-code-push';
import {Config} from './src/configs';
import FlashMessage from 'react-native-flash-message';
import ModalApp from 'react-native-modal';
import AppColors from '@commons/AppColors';
import ButtonComponent from '@components/ButtonComponent';
import {XacNhanIcon} from '@images/index';
import {moderateScale} from 'react-native-size-matters';
import {saveVersion} from '@redux/actions/configs';
import {getVersion} from 'react-native-device-info';
import rootReducer from '@redux/reducers';
import './src/utils/storage';
import {once} from 'lodash';

export type RootState = ReturnType<typeof rootReducer>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const Section: React.FC<{
	title: string;
}> = ({children, title}) => {
	const isDarkMode = useColorScheme() === 'dark';
	return (
		<View style={styles.sectionContainer}>
			<Text
				style={[
					styles.sectionTitle,
					{
						color: isDarkMode ? Colors.white : Colors.black,
					},
				]}>
				{title}
			</Text>
			<Text
				style={[
					styles.sectionDescription,
					{
						color: isDarkMode ? Colors.light : Colors.dark,
					},
				]}>
				{children}
			</Text>
		</View>
	);
};

export declare const global: {
	showLoading: () => void | null;
	dismissLoading: () => void | null;
	showAlert: (data: AppAlertProps) => void | null;
	dismissAlert: () => void | null;
};

export interface AppAlertProps {
	icon?: any;
	title?: string;
	message?: string;
	leftTitle?: string;
	isInfo?: boolean;
	hasBackdrop?: boolean;
	leftAction?: () => void;
	rightTitle?: string;
	rightAction?: () => void;
	dismissWhenClick?: boolean;
}

const AppAlert = () => {
	const [isShow, setIsShow] = useState<boolean>(false);
	const [isDismissWhenClick, setIsDismissWhenClick] = useState<boolean>(true);
	const [alertData, setAlertData] = useState<AppAlertProps>({});

	useEffect(() => {
		global.showAlert = (data: AppAlertProps) => {
			if (data.dismissWhenClick != undefined) {
				setIsDismissWhenClick(data.dismissWhenClick);
			}
			setAlertData({
				...data,
			});
			setIsShow(true);
		};

		global.dismissAlert = () => {
			setIsShow(false);
		};

		return () => {};
	}, []);

	const _rightAction = () => {
		setIsShow(false);
		if (alertData.rightAction) once(alertData.rightAction)();
	};

	return (
		<View>
			<ModalApp
				isVisible={isShow}
				onBackdropPress={() => isDismissWhenClick && setIsShow(false)}
				animationIn="slideInUp"
				animationOut="slideOutDown"
				useNativeDriver
				hideModalContentWhileAnimating
				style={styles.modalApp}>
				<View style={styles.modalAppContainer}>
					<XacNhanIcon />
					<Text style={styles.modalAppTitle}>
						{alertData.title ? alertData.title : 'Xác nhận'}
					</Text>
					<Text style={styles.modalAppMess}>
						{alertData.message ? alertData.message : 'Bạn chắc chắn muốn xác nhận.'}
					</Text>
					<View style={styles.modalAppButton}>
						<ButtonComponent
							style={{width: '45%'}}
							title={alertData.leftTitle ? alertData.leftTitle : 'Đóng'}
							onPress={() =>
								alertData.leftAction ? alertData.leftAction() : setIsShow(false)
							}
						/>
						{!alertData.isInfo && (
							<ButtonComponent
								style={{width: '45%'}}
								title={alertData.rightTitle ? alertData.rightTitle : 'Xác nhận'}
								onPress={_rightAction}
							/>
						)}
					</View>
				</View>
			</ModalApp>
		</View>
	);
};

// const ProgressUpdate = (props: any) => {
// 	return (
// 		<>
// 			{props.messageUpdate !== '' && (
// 				<View
// 					style={{
// 						position: 'absolute',
// 						top: 0,
// 						left: 0,
// 						right: 0,
// 						bottom: 0,
// 						backgroundColor: 'rgba(0, 0, 0, 0.7)',
// 						alignItems: 'center',
// 						justifyContent: 'center',
// 					}}>
// 					<View
// 						style={{
// 							backgroundColor: 'rgba(0, 0, 0, 0.7)',
// 							alignItems: 'center',
// 							justifyContent: 'center',
// 							padding: 20,
// 							borderRadius: 4,
// 						}}>
// 						<Text
// 							style={{
// 								color: 'white',
// 							}}>
// 							{props.messageUpdate}
// 						</Text>
// 					</View>
// 				</View>
// 			)}
// 		</>
// 	);
// };

const AppLoading = () => {
	const [isShowLoading, setIsShowLoading] = useState<boolean>(false);
	useEffect(() => {
		global.showLoading = () => {
			setIsShowLoading(true);
		};
		global.dismissLoading = () => {
			setIsShowLoading(false);
		};
	}, []);

	return (
		<ModalApp isVisible={isShowLoading}>
			<View style={styles.loading}>
				<ActivityIndicator size="large" color={AppColors.mainColor} />
			</View>
		</ModalApp>
	);
};

const App = () => {
	const isDarkMode = useColorScheme() === 'light';

	const _store = configureStore();
	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
	};
	const [messageProgressUpdate, setMessageProgressUpdate] = useState<string>('');

	// useEffect(() => {
	// 	fetch(`${Config.API_URL_SERVICE}api/MobileApp/GetVersion`, {
	// 		method: 'GET',
	// 		headers: {
	// 			Accept: 'application/json',
	// 			'Content-Type': 'application/json',
	// 		},
	// 	})
	// 		.then(res => res.json())
	// 		.then(resJson => {
	// 			console.log('GetVersion=>>>>>>>>>>>>>>>', resJson);
	// 			let isUpdate = false;
	// 			const version = getVersion();
	// 			if (Platform.OS == 'ios') {
	// 				if (version !== resJson.iosVersion) {
	// 					isUpdate = true;
	// 				}
	// 			} else {
	// 				if (version !== resJson.androidVersion) {
	// 					isUpdate = true;
	// 				}
	// 			}
	// 			if (!isUpdate) setupCodePush();
	// 		});
	// }, []);

	// const setupCodePush = () => {
	// 	codePush
	// 		.sync(
	// 			{
	// 				deploymentKey: Config.CODE_PUSH_KEY,
	// 				// installMode: codePush.InstallMode.IMMEDIATE,
	// 				updateDialog: {
	// 					title: 'Thông báo',
	// 					optionalInstallButtonLabel: 'Cài đặt',
	// 					optionalIgnoreButtonLabel: 'Bỏ qua',
	// 					optionalUpdateMessage:
	// 						'Có bản cập nhật mới từ nhà phát triển. Bạn muốn cài đặt nó?',
	// 				},
	// 			},
	// 			codePushStatusDidChange,
	// 			codePushDownloadDidProgress,
	// 		)
	// 		.then((res: any) => {
	// 			codePush.getUpdateMetadata().then(current => {
	// 				if (current) {
	// 					console.log('appVersion --------', current?.appVersion, current?.label);
	// 					const v = `${current?.appVersion} ${current?.label}`;
	// 					_store.dispatch(saveVersion(v));
	// 				} else {
	// 					console.log('getVersion() ---------', getVersion());
	// 					_store.dispatch(saveVersion(getVersion()));
	// 				}
	// 			});
	// 		});
	// };

	// const codePushStatusDidChange = (status: any) => {
	// 	switch (status) {
	// 		case codePush.SyncStatus.CHECKING_FOR_UPDATE:
	// 			// console.log('codePush::Checking for updates.');
	// 			break;
	// 		case codePush.SyncStatus.DOWNLOADING_PACKAGE:
	// 			// console.log('codePush::Downloading package.');
	// 			setMessageProgressUpdate('Đang tải');
	// 			break;
	// 		case codePush.SyncStatus.INSTALLING_UPDATE:
	// 			// console.log('codePush::Installing update.');
	// 			setMessageProgressUpdate('Đang cài đặt vui lòng không tắt máy...');
	// 			break;
	// 		case codePush.SyncStatus.UP_TO_DATE: {
	// 			setMessageProgressUpdate('');
	// 			// console.log('codePush::Up-to-date.');
	// 			break;
	// 		}
	// 		case codePush.SyncStatus.UPDATE_INSTALLED:
	// 			// console.log('codePush::Update installed.');
	// 			setMessageProgressUpdate('Đang khởi động lại ứng dụng...');
	// 			setTimeout(() => {
	// 				codePush.restartApp();
	// 			}, 500);
	// 			break;
	// 	}
	// };

	// const codePushDownloadDidProgress = (progress: any) => {
	// 	// console.log(
	// 	//   'codePush::',
	// 	//   progress.receivedBytes + ' of ' + progress.totalBytes + ' received.',
	// 	// );
	// 	setMessageProgressUpdate(
	// 		`Đang tải : ${
	// 			progress &&
	// 			progress.receivedBytes &&
	// 			progress.totalBytes &&
	// 			progress.totalBytes != 0
	// 				? Math.floor((progress.receivedBytes * 100) / progress.totalBytes)
	// 				: 0
	// 		}%`,
	// 	);
	// };

	return (
		<SafeAreaView
			style={[
				backgroundStyle,
				{paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0},
			]}>
			<StatusBar
				translucent
				backgroundColor="transparent"
				barStyle={isDarkMode ? 'light-content' : 'dark-content'}
			/>
			<Provider store={_store}>
				<Navigation />
			</Provider>
			<AppAlert />
			<AppLoading />
			<FlashMessage style={styles.flashMessage} position="top" titleStyle={{margin: 8}} />
			{/* <ProgressUpdate messageUpdate={messageProgressUpdate} /> */}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	loading: {
		flex: 1,
		justifyContent: 'center',
	},
	sectionContainer: {
		marginTop: 32,
		paddingHorizontal: 24,
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: '600',
	},
	sectionDescription: {
		marginTop: 8,
		fontSize: 18,
		fontWeight: '400',
	},
	highlight: {
		fontWeight: '700',
	},
	flashMessage: {
		paddingHorizontal: '0px !important',
		paddingVertical: '0px !important',
		flexDirection: 'column',
		alignItems: 'center',
		alignContent: 'center',
		marginTop: StatusBar.currentHeight,
	},
	modalApp: {
		justifyContent: 'center',
		margin: 0,
		paddingHorizontal: 16,
		paddingBottom: 38,
	},
	modalAppContainer: {
		backgroundColor: AppColors.white,
		borderColor: '#F0F0F0',
		borderWidth: 1,
		borderRadius: 6,
		padding: 16,
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center',
	},
	modalAppTitle: {
		fontFamily: 'arial',
		fontSize: moderateScale(16),
		lineHeight: moderateScale(18),
		fontWeight: 'bold',
		color: '#187779',
		marginTop: 16,
	},
	modalAppMess: {
		fontFamily: 'arial',
		fontSize: moderateScale(14),
		lineHeight: moderateScale(16),
		fontWeight: 'bold',
		color: '#4A4A4A',
		margin: 16,
	},
	modalAppButton: {
		flexDirection: 'row',
	},
});

export default App;
