import HeaderComponent from '@components/HeaderComponent';
import {ApiResponse} from '@models/ApiResponse';
import {RootStackParamList} from '@navigations/NameRoute';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {showLoading, dismissLoading, showMessageWarning} from '@utils/index';
import React, {memo} from 'react';
import {View} from 'react-native';
import Pdf from 'react-native-pdf';
import {connect} from 'react-redux';
import {Config} from 'src/configs';
import styles from './style';

export interface Props {
	loginResponse: ApiResponse<{
		token?: string;
	}>;
	token?: string;
}

export interface RouteParams {
	fileId?: string;
	fileName?: string;
}

const PdfViewScreen = (props: Props) => {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
	showLoading();
	const routeParams: RouteParams = useRoute().params as RouteParams;
	const urlPdf = routeParams.fileName?.includes('.pdf')
		? `${Config.API_URL_SERVICE}api/QuanLyFilesServer/DownloadFile?fileId=${routeParams.fileId}`
		: `${Config.API_URL_SERVICE}api/QuanLyFilesServer/DownloadFilePdf?fileId=${routeParams.fileId}`;

	return (
		<>
			<HeaderComponent title={routeParams.fileName} />
			<View style={{flex: 1}}>
				{
					<Pdf
						source={{uri: urlPdf}}
						onLoadComplete={(numberOfPages, filePath) => {
							dismissLoading();
							console.log(`Number of pages: ${numberOfPages}`);
						}}
						onPageChanged={(page, numberOfPages) => {
							console.log(`Current page: ${page}`);
						}}
						onError={error => {
							console.log(
								error,
								urlPdf,
								routeParams.fileName,
								routeParams.fileName?.includes('.pdf'),
							);
							showMessageWarning('Không xem được file.');
							navigation.goBack();
							dismissLoading();
						}}
						onPressLink={uri => {
							console.log(`Link pressed: ${uri}`);
						}}
						style={styles.pdf}
					/>
				}
			</View>
		</>
	);
};

const mapStateToProps = (state: any) => {
	return {
		loginResponse: state.authen.loginResponse,
		token: state.configs.token,
	};
};

export default connect(mapStateToProps)(memo(PdfViewScreen));
