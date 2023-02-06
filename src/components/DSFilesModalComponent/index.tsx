import React, {memo, useMemo, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import styles from './style';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import {ApiResponse} from '@models/ApiResponse';
import {dismissLoading} from '@utils/index';
import {TouchComponent} from '..';
import {File} from '@models/File';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {PdfViewRoute, RootStackParamList} from '@navigations/NameRoute';
import {CloseIcon} from '@images/index';

export interface Props {
	id?: string;
	type?: number;
	onlyFilePublic?: boolean;
	isVisible?: boolean;
	closePopup: () => void;
	listFileResponse: ApiResponse<Array<File>>;
}

const DSFilesModalComponent = (props: Props) => {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
	const {listFileResponse} = props;
	const [listFile, setListFile] = useState<Array<File>>();

	useMemo(() => {
		if (!listFileResponse) return;
		dismissLoading();
		if (listFileResponse.success) {
			setListFile(listFileResponse.data);
		}
	}, [listFileResponse]);

	function onViewPdf(item?: File) {
		props.closePopup();
		navigation.push(PdfViewRoute, {fileId: item?.id, fileName: item?.fileName});
	}

	const renderItem = ({item}: any) => (
		<TouchComponent onPress={() => onViewPdf(item)}>
			<Text style={styles.textItem}>{item.fileName}</Text>
		</TouchComponent>
	);

	return (
		<View>
			<Modal
				isVisible={props.isVisible}
				onBackdropPress={() => props.closePopup()}
				animationIn="slideInUp"
				animationOut="slideOutDown"
				useNativeDriver
				hideModalContentWhileAnimating
				style={styles.modal}>
				<View style={styles.container}>
					<View style={styles.viewTitle}>
						<Text style={styles.textTitle}>Danh sách file</Text>
						<TouchComponent style={styles.close} onPress={props.closePopup}>
							<CloseIcon />
						</TouchComponent>
					</View>
					<FlatList
						data={listFile}
						renderItem={renderItem}
						showsVerticalScrollIndicator={false}
						keyExtractor={(item: File, index: number) => index.toString()}
					/>
				</View>
			</Modal>
		</View>
	);
};

DSFilesModalComponent.defaultProps = {
	isVisible: false,
	onlyFilePublic: false,
};

const mapStateToProps = (state: any) => {
	return {
		listFileResponse: state.quanly.listFileResponse,
	};
};

export default connect(mapStateToProps)(memo(DSFilesModalComponent));
