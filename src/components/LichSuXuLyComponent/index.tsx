import {showLoading, dismissLoading} from '@utils/index';
import React, {memo, useEffect, useMemo, useState} from 'react';
import {View} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import {actionLichSuXuLy} from '@redux/actions/totrinh';
import {actionLSXLVBD, xemLuongVanBan} from '@redux/actions/quanly';
import {actionLichSuXLGV} from '@redux/actions/giaoviec';
import {ApiResponse} from '@models/ApiResponse';
import {LSXL} from '@models/LSXL';
import {FlatListComponent, LichSuXuLyItemComponent} from '@components/index';
import DocumentType from '@commons/DocumentType';
import {actionLichSuXuLyVBDI} from '@redux/actions/vbdi';

export interface Props {
	id?: string;
	type?: number;
	lichSuXuLyResponse?: ApiResponse<Array<LSXL>>;
	lsxlVBDResponse?: ApiResponse<Array<LSXL>>;
	luongVanBanRes?: ApiResponse<Array<LSXL>>;
	lichSuXLGVResponse?: ApiResponse<Array<LSXL>>;
	lsxlVBDIResponse?: ApiResponse<Array<LSXL>>;
}

const LichSuXuLyComponent = (props: Props) => {
	const dispatch = useDispatch();
	const {
		id,
		type,
		lichSuXuLyResponse,
		lsxlVBDResponse,
		luongVanBanRes,
		lichSuXLGVResponse,
		lsxlVBDIResponse,
	} = props;
	const [lichSuXuLyData, setLichSuXuLyData] = useState<Array<LSXL>>();

	useEffect(() => {
		showLoading();
		const param = {
			pageInfo: {page: 1, pageSize: 20},
			idVanBan: id,
		};
		if (type == DocumentType.VAN_BAN_DEN) {
			dispatch(actionLSXLVBD(param));
			// const newParam = {
			// 	filters: [],
			// 	idVanBan: id,
			// 	loai: 1,
			// 	pageInfo: {page: 1, pageSize: 20},
			// 	sorts: [],
			// };
			// dispatch(xemLuongVanBan(newParam));
		}

		if (type == DocumentType.TO_TRINH) {
			dispatch(actionLichSuXuLy(param));
		}

		if (type == DocumentType.GIAO_VIEC) {
			const paramCV = {
				pageInfo: {page: 1, pageSize: 10},
				idCongViec: id,
			};
			dispatch(actionLichSuXLGV(paramCV));
		}

		if (type == DocumentType.CONG_VIEC) {
			dismissLoading()
			// const paramCV = {
			// 	pageInfo: {page: 1, pageSize: 10},
			// 	idCongViec: id,
			// };
			// dispatch(actionLichSuXLGV(paramCV));
		}

		if (type === DocumentType.VAN_BAN_DI) {
			const paramVBDi = {
				pageInfo: {
					page: 1,
					pageSize: 10,
				},
				sorts: [
					{
						field: '',
						dir: 0,
					},
				],
				filters: [
					{
						field: '',
						value: '',
					},
				],
				idVanBan: id,
			};
			dispatch(actionLichSuXuLyVBDI(paramVBDi));
		}
	}, []);

	useMemo(() => {
		if (!lichSuXuLyResponse) return;
		dismissLoading();
		if (lichSuXuLyResponse.success) {
			setLichSuXuLyData(lichSuXuLyResponse.data);
		}
	}, [lichSuXuLyResponse]);

	useMemo(() => {
		if (!lsxlVBDResponse) return;
		dismissLoading();
		if (lsxlVBDResponse.success) {
			setLichSuXuLyData(lsxlVBDResponse.data);
		}
	}, [lsxlVBDResponse]);

	// useMemo(() => {
	// 	if (!luongVanBanRes) return;
	// 	dismissLoading();
	// 	if (luongVanBanRes.success) {
	// 		setLichSuXuLyData(luongVanBanRes.data && luongVanBanRes.data.reverse());
	// 	}
	// }, [luongVanBanRes]);

	useMemo(() => {
		if (!lsxlVBDIResponse) return;
		dismissLoading();
		if (lsxlVBDIResponse.success) {
			setLichSuXuLyData(lsxlVBDIResponse.data);
		}
	}, [lsxlVBDIResponse]);
	useMemo(() => {
		if (!lichSuXLGVResponse) return;
		dismissLoading();
		if (lichSuXLGVResponse.success) {
			setLichSuXuLyData(lichSuXLGVResponse.data);
		}
	}, [lichSuXLGVResponse]);

	const renderItem = (item: LSXL, index: number) => <LichSuXuLyItemComponent data={item} />;

	return (
		<View style={{flex: 1}}>
			<FlatListComponent listData={lichSuXuLyData} buildItem={renderItem} />
		</View>
	);
};

LichSuXuLyComponent.defaultProps = {};

const mapStateToProps = (state: any) => {
	return {
		lichSuXuLyResponse: state.totrinh.lichSuXuLyResponse,
		lsxlVBDResponse: state.quanly.lsxlVBDResponse,
		luongVanBanRes: state.quanly.luongVanBanRes,
		lichSuXLGVResponse: state.giaoviec.lichSuXLGVResponse,
		lsxlVBDIResponse: state.vbdi.lichSuXuLyResponse,
	};
};

export default connect(mapStateToProps)(memo(LichSuXuLyComponent));
