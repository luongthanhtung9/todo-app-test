import {ApiResponse} from '@models/ApiResponse';
import React, {memo, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import styles from './style';
import {File} from '@models/File';
import {InfoComponent} from '..';
import {RootStackParamList} from '@navigations/NameRoute';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {actionCTVBDinhKem} from '@redux/actions/giaoviec';
import {VanBan} from '@models/VanBan';
import TepComponent from '@components/TepComponent';

export interface Props {
	title?: string;
	fileUploads?: string;
	ctvbResponse?: ApiResponse<VanBan>;
	type?: number;
}

const TepDinhKemComponent = (props: Props) => {
	const dispatch = useDispatch();
	const {title, fileUploads, ctvbResponse, type} = props;
	const [data, setData] = useState<VanBan>();

	// http://14.248.82.147:81/api/VanBanDi/TimTheoId/d964e22f-eb67-4155-b1c0-6eae218fdd3c
	useEffect(() => {
		dispatch(actionCTVBDinhKem(fileUploads));
	}, [fileUploads]);

	useEffect(() => {
		if (ctvbResponse) {
			// dispatch(actionCTVBDinhKem(fileUploads));
			setData(ctvbResponse.data);
		}
	}, [ctvbResponse]);

	const getPhanLoai = (typeVB?: number) => {
        console.log("type",type);
        
		if (typeVB === 1) {
			return 'Văn bản đến';
		}
		if (typeVB === 3) {
			return 'Văn bản đi';
		}
		if (typeVB === 4) {
			return 'Tờ trình';
		}
		return '';
	};

	return (
		<View style={styles.tep}>
			<Text style={styles.title}>{title}</Text>
			<View style={styles.viewListFile}>
				<InfoComponent label="Phân loại" content={getPhanLoai(type)} />
				<InfoComponent label="Số / Ký hiệu" content={data?.documentCode} />
				<InfoComponent label="Ngày văn bản" content={data?.publishDate} />
				<InfoComponent label="Trích yếu" content={data?.abstract} />
				<TepComponent title="Tệp đính kèm" fileUploads={[data?.fileUpload]} />
			</View>
		</View>
	);
};

TepDinhKemComponent.defaultProps = {};

const mapStateToProps = (state: any) => {
	return {
		ctvbResponse: state.giaoviec.ctvbResponse,
	};
};

export default connect(mapStateToProps)(memo(TepDinhKemComponent));
