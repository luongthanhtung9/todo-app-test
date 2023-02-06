import { ArrowDownIcon } from '@images/index';
import { ApiResponse } from '@models/ApiResponse';
import React, { memo, useEffect, useMemo, useState } from 'react';
import { Text, View, ScrollView, Modal, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import {
	InputComponent,
	SelectComponent,
	TouchComponent,
	SelectDateComponent,
	ButtonComponent,
	ButtonDateSearchComponent,
	SelectFromToDateComponent,
} from '@components/index';
import styles from './style';
import { Select } from '@models/Select';
import {
	actionLayTatCaSo,
	actionLayTatCaFilterTree,
	actionLoaiVB,
	actionLayTatCaSoDi,
} from '@redux/actions/quanly';
import { dsDoKhanAction } from '@redux/actions/setting';
import DocumentType from '@commons/DocumentType';
import ButtonRadius from '@components/ButtonRadiusComponent/ButtonRadius';
export interface Props {
	listTatCaSoResponse?: ApiResponse<
		Array<{
			id?: string;
			name?: string;
		}>
	>;
	listTatCaSoDiResponse?: ApiResponse<
		Array<{
			id?: string;
			typeName?: string;
		}>
	>;
	dsDoKhanResponse?: ApiResponse<any>;
	listTatCaFilterTreeResponse?: ApiResponse<any>;
	loaiVBResponse?: ApiResponse<any>;
	isVisible?: boolean;
	type?: number;
	closePopup: () => void;
	onSearchForm: (param: any) => void;
	onYear: () => void;
	onMonth: () => void;
	onWeek: () => void;
	onDay: () => void;
}

const listStatus: Array<Select> = [
	{
		value: '1',
		label: 'Chờ xử lý',
	},
	{
		value: '2',
		label: 'Đang xử lý',
	},
	{
		value: '3',
		label: 'Đã ký duyệt',
	},
	{
		value: '4',
		label: 'Đã cấp số',
	},
	{
		value: '5',
		label: 'Từ chối',
	},
	{
		value: '6',
		label: 'Thu hồi',
	},
];

const listStatusKS: Array<Select> = [
	{
		value: '1',
		label: 'Chưa ký số',
	},
	{
		value: '2',
		label: 'Đã ký số',
	},
];

const sendDeptType: Array<Select> = [
	{
		value: '0',
		label: 'Trong ngành',
	},
	{
		value: '1',
		label: 'Ngoài ngành',
	},
	{
		value: '2',
		label: 'Thuộc TCDT',
	},
	{
		value: '3',
		label: 'Đơn vị khác',
	},
];

const SearchModalComponent = (props: Props) => {
	const {
		isVisible,
		type,
		listTatCaSoResponse,
		listTatCaFilterTreeResponse,
		dsDoKhanResponse,
		loaiVBResponse,
		listTatCaSoDiResponse,
	} = props;
	const dispatch = useDispatch();
	const [listSo, setListSo] = useState<Array<Select>>([]);
	const [listDonVi, setListDonVi] = useState<Array<Select>>([]);
	const [listDoKhan, setListDoKhan] = useState<Array<Select>>([]);
	const [listLoaiVB, setListLoaiVB] = useState<Array<Select>>([]);
	const [paramSearch, setParamSearch] = useState<any>({});
	const [statusSign, setStatusSign] = useState<Select>(listStatusKS[0]);

	useEffect(() => {
		dispatch(dsDoKhanAction({}));
		dispatch(actionLayTatCaFilterTree({}));
		if (type === DocumentType.VAN_BAN_DEN) {
			dispatch(actionLoaiVB());
			dispatch(actionLayTatCaSo({ loai: DocumentType.VAN_BAN_DEN }));
		}

		if (type === DocumentType.TO_TRINH) {
			dispatch(actionLayTatCaSo({ loai: DocumentType.TO_TRINH }));
		}
		if (type === DocumentType.VAN_BAN_DI) {
			dispatch(actionLayTatCaSoDi());
		}
	}, []);

	useMemo(() => {
		if (!listTatCaSoResponse) return;
		if (listTatCaSoResponse.success) {
			if (listTatCaSoResponse.data && listTatCaSoResponse.data.length > 0) {
				const list: any = listTatCaSoResponse.data.map(so => {
					return {
						value: so.id,
						label: so.name,
					};
				});
				setListSo(list);
			}
		}
	}, [listTatCaSoResponse]);

	useMemo(() => {
		if (!listTatCaSoDiResponse) return;
		if (listTatCaSoDiResponse.success) {
			if (listTatCaSoDiResponse.data && listTatCaSoDiResponse.data.length > 0) {
				const list: any = listTatCaSoDiResponse.data.map(so => {
					return {
						value: so.id,
						label: so.typeName,
					};
				});
				setListSo(list);
			}
		}
	}, [listTatCaSoDiResponse]);

	// useMemo(() => {
	//   if (!listTatCaFilterTreeResponse) return
	//   if (listTatCaFilterTreeResponse.success) {
	//     const list = listTatCaFilterTreeResponse.data[0].children.map((donvi: any) => {
	//       return {
	//         value: donvi.key,
	//         label: donvi.title,
	//       }
	//     })
	//     setListDonVi(list)
	//   }
	// }, [listTatCaFilterTreeResponse])

	useMemo(() => {
		if (!dsDoKhanResponse) return;
		if (dsDoKhanResponse.success) {
			if (dsDoKhanResponse.data.dokhan && dsDoKhanResponse.data.dokhan.length > 0) {
				const list: any = dsDoKhanResponse.data.dokhan.map((dokhan: any) => {
					return {
						value: dokhan.id,
						label: dokhan.name,
					};
				});
				setListDoKhan(list);
			}
		}
	}, [dsDoKhanResponse]);

	useMemo(() => {
		if (!loaiVBResponse) return;
		if (loaiVBResponse.success) {
			if (loaiVBResponse.data && loaiVBResponse.data.length > 0) {
				const list: any = loaiVBResponse.data.map((lvb: any) => {
					return {
						value: lvb.id,
						label: lvb.typeName,
					};
				});
				setListLoaiVB(list);
			}
		}
	}, [loaiVBResponse]);

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={isVisible}
			onRequestClose={() => {
				props.closePopup();
			}}>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : undefined}
				style={{
					flex: 1,
					justifyContent:'flex-end',
				}}
			>
				<View style={styles.container}>
					<TouchComponent onPress={props.closePopup}>
						<ArrowDownIcon />
					</TouchComponent>
					<Text style={styles.titleModal}>Tìm kiếm nâng cao</Text>
					{/* <View style={styles.viewButton}>
          <TouchComponent style={styles.buttonYear} onPress={props.onYear}>
            <Text style={styles.titleButton}>Năm nay</Text>
          </TouchComponent>
          <TouchComponent style={styles.buttonMonth} onPress={props.onMonth}>
            <Text style={styles.titleButton}>Tháng này</Text>
          </TouchComponent>
          <TouchComponent style={styles.buttonWeek} onPress={props.onWeek}>
            <Text style={styles.titleButton}>Tuần này</Text>
          </TouchComponent>
          <TouchComponent style={styles.buttonDay} onPress={props.onDay}>
            <Text style={styles.titleButton}>Hôm nay</Text>
          </TouchComponent>
        </View> */}
					<TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
						<ScrollView
							style={{ width: '100%', maxHeight: '80%', marginBottom: 60 }}
							showsVerticalScrollIndicator={false}>
							{props.type == DocumentType.VAN_BAN_DEN && (
								<View style={{ width: '100%', paddingHorizontal: 16 }}>
									<InputComponent
										icon="search"
										title="Từ khóa"
										onChange={text =>
											setParamSearch({ ...paramSearch, searchKeyword: text })
										}
									/>

									<SelectComponent
										title="Loại văn bản"
										data={listLoaiVB}
										onChange={text => {
											setParamSearch({ ...paramSearch, documentTypeId: text });
										}}
										selectTitle={paramSearch.documentTypeId?.label}
									/>

									<SelectComponent
										title="Sổ văn bản"
										data={listSo}
										onChange={text => setParamSearch({ ...paramSearch, soVanBan: text })}
										selectTitle={paramSearch.soVanBan?.label}
									/>
									<InputComponent
										title="Số đến"
										onChange={text => setParamSearch({ ...paramSearch, soDen: text })}
									/>
									<InputComponent
										title="Số ký hiệu"
										onChange={text =>
											setParamSearch({ ...paramSearch, documentCode: text })
										}
									/>
									<SelectFromToDateComponent
										title="Ngày đến"
										valueFrom={paramSearch.ngayVanBanDenTuNgay}
										valueTo={paramSearch.ngayVanBanDenDenNgay}
										onChangeFromDate={text =>
											setParamSearch({ ...paramSearch, ngayVanBanDenTuNgay: text })
										}
										onChangeToDate={text =>
											setParamSearch({ ...paramSearch, ngayVanBanDenDenNgay: text })
										}
										placeHolderFromDate={'Từ ngày'}
										placeHolderToDate={'Đến ngày'}
									/>

									<SelectFromToDateComponent
										title="Ngày văn bản"
										valueFrom={paramSearch.ngayVanBanTuNgay}
										valueTo={paramSearch.ngayVanBanDenNgay}
										onChangeFromDate={text =>
											setParamSearch({ ...paramSearch, ngayVanBanTuNgay: text })
										}
										onChangeToDate={text =>
											setParamSearch({ ...paramSearch, ngayVanBanDenNgay: text })
										}
										placeHolderFromDate={'Từ ngày'}
										placeHolderToDate={'Đến ngày'}
									/>

									{/* <SelectComponent
								title="Cơ quan ban hành trong ngành"
								data={sendDeptType}
								onChange={text => {
									setParamSearch({...paramSearch, documentTypeId: text});
								}}
								selectTitle={paramSearch.documentTypeId?.label}
							/> */}
									{/* <SelectDateComponent
								title="Ngày văn bản đến(từ ngày)"
								value={paramSearch.ngayVanBanDenTuNgay}
								onChange={text =>
									setParamSearch({...paramSearch, ngayVanBanDenTuNgay: text})
								}
							/>
							<SelectDateComponent
								title="Ngày văn bản đến(đến ngày)"
								value={paramSearch.ngayVanBanDenDenNgay}
								onChange={text =>
									setParamSearch({...paramSearch, ngayVanBanDenDenNgay: text})
								}
							/>
							<SelectDateComponent
								title="Ngày văn bản(từ ngày)"
								value={paramSearch.ngayVanBanTuNgay}
								onChange={text =>
									setParamSearch({...paramSearch, ngayVanBanTuNgay: text})
								}
							/>
							<SelectDateComponent
								title="Ngày văn bản(đến ngày)"
								value={paramSearch.ngayVanBanDenNgay}
								onChange={text =>
									setParamSearch({...paramSearch, ngayVanBanDenNgay: text})
								}
							/> */}
									<SelectComponent
										title="Độ khẩn"
										data={listDoKhan}
										onChange={text =>
											setParamSearch({ ...paramSearch, searchDoKhan: text })
										}
										selectTitle={paramSearch.searchDoKhan?.label}
									/>
									{/* <SelectComponent
								title="Trạng thái ký số"
								data={listStatusKS}
								onChange={text => {
									setStatusSign(text);
									setParamSearch({
										...paramSearch,
										trangThaiKySo: text ? Number(text) - 1 : '',
									});
								}}
								selectTitle={statusSign.label}
							/> */}
									{/* <SelectComponent
								title="Nơi gửi"
								data={listDonVi}
								onSelectChange={text =>
									setParamSearch({...paramSearch, searchNoiGui: text})
								}
							/> */}
								</View>
							)}

							{props.type == DocumentType.TO_TRINH && (
								<View style={{ width: '100%', paddingHorizontal: 16 }}>
									<ButtonDateSearchComponent
										onYear={props.onYear}
										onMonth={props.onMonth}
										onWeek={props.onWeek}
										onDay={props.onDay}
									/>
									<InputComponent
										title="Từ khóa"
										onChange={text =>
											setParamSearch({ ...paramSearch, searchKeyword: text })
										}
									/>
									<SelectComponent
										title="Loại sổ"
										data={listSo}
										onChange={text =>
											setParamSearch({ ...paramSearch, searchSoVanBan: text })
										}
										selectTitle={paramSearch.searchSoVanBan?.label}
									/>
									<InputComponent
										title="Số tờ trình"
										onChange={text => setParamSearch({ ...paramSearch, searchSo: text })}
									/>
									<InputComponent
										title="Trích yếu"
										onChange={text =>
											setParamSearch({ ...paramSearch, seachTrichYeu: text })
										}
									/>
									<SelectFromToDateComponent
										title="Ngày tạo"
										valueFrom={paramSearch.searchNgayTaoTuNgay}
										valueTo={paramSearch.searchNgayTaoDenNgay}
										onChangeFromDate={text =>
											setParamSearch({ ...paramSearch, searchNgayTaoTuNgay: text })
										}
										onChangeToDate={text =>
											setParamSearch({ ...paramSearch, searchNgayTaoDenNgay: text })
										}
										placeHolderFromDate={'Từ ngày'}
										placeHolderToDate={'Đến ngày'}
									/>
									<SelectFromToDateComponent
										title="Hạn xử lý"
										valueFrom={paramSearch.searchHanXuLyTuNgay}
										valueTo={paramSearch.searchHanXuLyDenNgay}
										onChangeFromDate={text =>
											setParamSearch({ ...paramSearch, searchHanXuLyTuNgay: text })
										}
										onChangeToDate={text =>
											setParamSearch({ ...paramSearch, searchHanXuLyDenNgay: text })
										}
										placeHolderFromDate={'Từ ngày'}
										placeHolderToDate={'Đến ngày'}
									/>
									<SelectComponent
										title="Đơn vị soạn thảo"
										data={listDonVi}
										onChange={text =>
											setParamSearch({ ...paramSearch, searchDViSoanThao: text })
										}
										selectTitle={paramSearch.searchDoKhan?.label}
									/>
									<SelectComponent
										title="Độ khẩn"
										data={listDoKhan}
										onChange={text =>
											setParamSearch({ ...paramSearch, searchDoKhan: text })
										}
										selectTitle={paramSearch.searchDoKhan?.label}
									/>

									<SelectComponent
										title="Trạng thái"
										data={listStatus}
										onChange={text => {
											setParamSearch({ ...paramSearch, searchTrangThai: text });
										}}
										selectTitle={paramSearch.searchTrangThai?.label}
									/>
								</View>
							)}
							{props.type == DocumentType.CONG_VIEC && (
								<View style={{ width: '100%', paddingHorizontal: 16, maxHeight: 400 }}>

									<ButtonDateSearchComponent
										onYear={props.onYear}
										onMonth={props.onMonth}
										onWeek={props.onWeek}
										onDay={props.onDay}
									/>

									<InputComponent
										title="Từ khóa"
										onChange={text =>
											setParamSearch({ ...paramSearch, keyword: text })
										}
									/>
									{/* <SelectComponent
								title="Loại sổ"
								data={listSo}
								onChange={text =>
									setParamSearch({...paramSearch, searchSoVanBan: text})
								}
								selectTitle={paramSearch.searchSoVanBan?.label}
							/>
							<InputComponent
								title="Số tờ trình"
								onChange={text => setParamSearch({...paramSearch, searchSo: text})}
							/>
							<InputComponent
								title="Trích yếu"
								onChange={text =>
									setParamSearch({...paramSearch, searchTrichYeu: text})
								}
							/>
							<SelectDateComponent
								title="Ngày tạo,từ ngày"
								value={paramSearch.searchNgayTaoTuNgay}
								onChange={text =>
									setParamSearch({...paramSearch, searchNgayTaoTuNgay: text})
								}
							/>
							<SelectDateComponent
								title="Ngày tạo,đến ngày"
								value={paramSearch.searchNgayTaoDenNgay}
								onChange={text =>
									setParamSearch({...paramSearch, searchNgayTaoDenNgay: text})
								}
							/>
							<SelectComponent
								title="Đơn vị soạn thảo"
								data={listDonVi}
								onChange={text =>
									setParamSearch({...paramSearch, searchDViSoanThao: text})
								}
								selectTitle={paramSearch.searchDViSoanThao?.label}
							/>
							<SelectComponent
								title="Độ khẩn"
								data={listDoKhan}
								onChange={text =>
									setParamSearch({...paramSearch, searchDoKhan: text})
								}
								selectTitle={paramSearch.searchDoKhan?.label}
							/>
							<SelectDateComponent
								title="Hạn xử lý từ ngày"
								value={paramSearch.searchHanXuLyTuNgay}
								onChange={text =>
									setParamSearch({...paramSearch, searchHanXuLyTuNgay: text})
								}
							/>
							<SelectDateComponent
								title="Hạn xử lý đến ngày"
								value={paramSearch.searchHanXuLyDenNgay}
								onChange={text =>
									setParamSearch({...paramSearch, searchHanXuLyDenNgay: text})
								}
							/>
							<SelectComponent
								title="Trạng thái"
								data={listStatus}
								onChange={text =>
									setParamSearch({...paramSearch, searchTrangThai: text})
								}
								selectTitle={paramSearch.searchTrangThai?.label}
							/> */}
								</View>
							)}
							{props.type == DocumentType.VAN_BAN_DI && (
								<View style={{ width: '100%', paddingHorizontal: 16 }}>
									<ButtonDateSearchComponent
										onYear={props.onYear}
										onMonth={props.onMonth}
										onWeek={props.onWeek}
										onDay={props.onDay}
									/>

									{/* <InputComponent
								title="Từ khóa"
								onChange={text =>
									setParamSearch({...paramSearch, searchKeyword: text})
								}
							/> */}
									<SelectComponent
										title="Loại văn bản"
										data={listSo}
										onChange={text =>
											setParamSearch({ ...paramSearch, searchLoaiVanBan: text })
										}
										selectTitle={paramSearch.searchLoaiVanBan?.label}
									/>
									{/* <InputComponent
								title="Số tờ trình"
								onChange={text => setParamSearch({...paramSearch, searchSo: text})}
							/> */}
									<InputComponent
										title="Trích yếu"
										onChange={text =>
											setParamSearch({ ...paramSearch, seachTrichYeu: text })
										}
									/>

									<SelectFromToDateComponent
										title="Ngày tạo"
										valueFrom={paramSearch.searchNgayTaoTuNgay}
										valueTo={paramSearch.searchNgayTaoDenNgay}
										onChangeFromDate={text =>
											setParamSearch({ ...paramSearch, searchNgayTaoTuNgay: text })
										}
										onChangeToDate={text =>
											setParamSearch({ ...paramSearch, searchNgayTaoDenNgay: text })
										}
										placeHolderFromDate={'Từ ngày'}
										placeHolderToDate={'Đến ngày'}
									/>
									<SelectFromToDateComponent
										title="Hạn xử lý"
										valueFrom={paramSearch.searchHanXuLyTuNgay}
										valueTo={paramSearch.searchHanXuLyDenNgay}
										onChangeFromDate={text => {
											setParamSearch({ ...paramSearch, searchHanXuLyTuNgay: text });
										}}
										onChangeToDate={text =>
											setParamSearch({ ...paramSearch, searchHanXuLyDenNgay: text })
										}
										placeHolderFromDate={'Từ ngày'}
										placeHolderToDate={'Đến ngày'}
									/>

									<SelectComponent
										title="Đơn vị soạn thảo"
										data={listDonVi}
										onChange={text =>
											setParamSearch({ ...paramSearch, searchDViSoanThao: text })
										}
										selectTitle={paramSearch.searchDViSoanThao?.label}
									/>
									<SelectComponent
										title="Độ khẩn"
										data={listDoKhan}
										onChange={text =>
											setParamSearch({ ...paramSearch, searchDoKhan: text })
										}
										selectTitle={paramSearch.searchDoKhan?.label}
									/>
									{/* <SelectDateComponent
								title="Hạn xử lý từ ngày"
								value={paramSearch.searchHanXuLyTuNgay}
								onChange={text =>
									setParamSearch({...paramSearch, searchHanXuLyTuNgay: text})
								}
							/> 
							<SelectDateComponent
								title="Hạn xử lý đến ngày"
								value={paramSearch.searchHanXuLyDenNgay}
								onChange={text =>
									setParamSearch({...paramSearch, searchHanXuLyDenNgay: text})
								}
							/> */}
									<SelectComponent
										title="Trạng thái"
										data={listStatus}
										onChange={text =>
											setParamSearch({ ...paramSearch, searchTrangThai: text })
										}
										selectTitle={paramSearch.searchTrangThai?.label}
									/>
								</View>
							)}
						</ScrollView>
					</TouchableWithoutFeedback>


					<View style={styles.bottom}>
						<ButtonRadius
							title="Tìm kiếm"
							onPress={() => props.onSearchForm(paramSearch)}
						/>
						<ButtonRadius
							style={{ backgroundColor: '#F0F0F0', borderColor: '#F0F0F0' }}
							styleText={{ color: '#4A4A4A' }}
							title="Đóng"
							onPress={props.closePopup}
						/>
					</View>
				</View>
			</KeyboardAvoidingView>
		</Modal>
	);
};

SearchModalComponent.defaultProps = {};

const mapStateToProps = (state: any) => {
	return {
		listTatCaSoResponse: state.quanly.listTatCaSoResponse,
		listTatCaFilterTreeResponse: state.quanly.listTatCaFilterTreeResponse,
		loaiVBResponse: state.quanly.loaiVBResponse,
		dsDoKhanResponse: state.setting.dsDoKhanResponse,
		listTatCaSoDiResponse: state.quanly.listTatCaSoDiResponse,
	};
};

export default connect(mapStateToProps)(memo(SearchModalComponent));
