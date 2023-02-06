import React, {memo} from 'react';
import {View, ScrollView, Text} from 'react-native';
import {
	InfoButPheComponent,
	InfoComponent,
	InfoNDXLComponent,
	SelectDateComponent,
	TepDinhKemComponent,
} from '@components/index';
import styles from './style';
import {Process, VanBan} from '@models/VanBan';
import TepComponent from '@components/TepComponent';
import DocumentType from '@commons/DocumentType';
import {foramtDate, formatDateTimeZ} from '@utils/index';
import {CongViec} from '@models/Congviec';
import Icon from '@commons/Icon';

export interface Props {
	data?: VanBan;
	dataDen?: {
		documentIn?: VanBan;
		process?: Process;
	};
	dataCongViec?: CongViec;
	type?: number;
	kyNhay?: boolean;
	kySo?: boolean;
	kyNhayRef?: boolean;
	kySoRef?: boolean;
	isXoaVBLK?: boolean;
	onXoaVBLK?: (item?: any) => void;
	onPressKyNhay?: (id?: string) => void;
	onPressKySo?: (id?: string) => void;
	onPressKyNhayFileRef?: (id?: string) => void;
	onPressKySoFileRef?: (id?: string) => void;
}

const ThongTinChungComponent = (props: Props) => {
	const getTypeBook = (type?: string) => {
		if (type === 'DV') return 'Tờ trình lãnh đạo đơn vị';
		if (type === 'TCDT') return 'Tờ trình lãnh đạo tổng cục';
		if (type === 'BTC') return 'Tờ trình lãnh đạo bộ';
		return '';
	};

	const _xoaVBLK = (item?: any) => {
		if (props.onXoaVBLK) props.onXoaVBLK(item);
	};

	const _dsVanBan = (arr: Array<any>) => {
		return (
			<View style={{padding: 12}}>
				<Text style={styles.titleds}>Danh sách văn bản trong hồ sơ</Text>
				{arr.map((item: any) => (
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							marginTop: 10,
						}}>
						<Text style={styles.text_item}>{item.typeName}</Text>
						<Text style={styles.text_item}>{item.documentCode}</Text>
						{props.isXoaVBLK && (
							<TouchComponent onPress={() => _xoaVBLK(item)}>
								<Icon name="xoa" size={12} />
							</TouchComponent>
						)}
					</View>
				))}
			</View>
		);
	};

	function _viewInfo() {
		if (props.type === DocumentType.VAN_BAN_DEN) {
			return (
				<View style={styles.thongtin}>
					<View>
						<InfoComponent
							label="Sổ văn bản"
							content={props?.dataDen?.documentIn?.bookName}
						/>
						<InfoComponent
							label="Loại văn bản"
							content={props?.dataDen?.documentIn?.documentTypeName}
						/>
						<InfoComponent
							label="Số đến"
							content={`${
								props?.dataDen?.documentIn?.bookNumber
									? props?.dataDen?.documentIn?.bookNumber
									: ''
							}${
								props?.dataDen?.documentIn?.bookNumberSub
									? props?.dataDen?.documentIn?.bookNumberSub
									: ''
							}`}
						/>
						<InfoComponent
							label="Số ký hiệu"
							content={props?.dataDen?.documentIn?.documentCode}
						/>
						<InfoComponent
							label="Nơi gửi"
							content={props?.dataDen?.documentIn?.sendDeptName}
						/>
						<InfoComponent
							label="Ngày đến"
							content={foramtDate(props?.dataDen?.documentIn?.inDate)}
						/>
						<InfoComponent
							label="Ngày văn bản"
							content={foramtDate(props?.dataDen?.documentIn?.documentDate)}
						/>
						<InfoComponent
							label="Người ký"
							content={props?.dataDen?.documentIn?.signName}
						/>
						<InfoComponent
							label="Chức vụ người ký"
							content={props?.dataDen?.documentIn?.signPosition}
						/>
						<InfoComponent
							label="Độ khẩn"
							content={props?.dataDen?.documentIn?.priorityName}
						/>
						<InfoComponent
							label="Hạn xử lý"
							content={foramtDate(props?.dataDen?.documentIn?.deadlineByDate)}
						/>
						<InfoComponent
							label="Ngôn ngữ"
							content={props?.dataDen?.documentIn?.languageName}
						/>
						<InfoComponent
							label="Văn bản điện tử"
							content={props?.dataDen?.documentIn?.isElectron ? 'Có' : 'Không'}
						/>
						<InfoComponent
							label="Phân loại văn bản"
							content={props?.dataDen?.documentIn?.typeName}
						/>
						<InfoComponent
							label="Trích yếu"
							content={props?.dataDen?.documentIn?.abstract}
						/>
						<InfoComponent
							label="Ghi chú"
							content={props?.dataDen?.documentIn?.description}
						/>
						<InfoNDXLComponent
							label="Nội dung xử lý"
							processNote={props?.dataDen?.documentIn?.processNote}
						/>
						<InfoComponent
							label="Số trang"
							content={props?.dataDen?.documentIn?.numberOfPage?.toString()}
						/>
						<InfoNDXLComponent
							label="Bút phê lãnh đạo"
							processNote={props?.dataDen?.documentIn?.butPheLanhDao}
						/>
					</View>
					<TepComponent
						title="Tệp nội dung"
						fileUploads={props?.dataDen?.documentIn?.fileUploads}
					/>
				</View>
			);
		}

		if (props.type === DocumentType.TO_TRINH) {
			return (
				<View style={styles.thongtin}>
					<View>
						<InfoComponent
							label="Loại sổ"
							content={getTypeBook(props?.data?.noiPhatHanh)}
						/>
						<InfoComponent label="Số tờ trình" content={props?.data?.documentCode} />
						<InfoComponent
							label="Hạn xử lý"
							content={foramtDate(props?.data?.deadlineByDate)}
						/>
						<SelectDateComponent
							title="Hạn xử lý"
							value={new Date(formatDateTimeZ(props?.data?.documentDate))}
							onChange={date => null}
						/>
						<InfoComponent
							label="Ngày tạo"
							content={foramtDate(props?.data?.documentDate)}
						/>
						<InfoComponent label="Người tạo" content={props?.data?.sendUserName} />
						<InfoComponent
							label="Đơn vị soạn thảo"
							content={props?.data?.sendGroupName}
						/>
						<InfoComponent
							label="Phòng ban/Bộ phận"
							content={props?.data?.sendGroupName}
						/>
						<InfoComponent
							label="Người ký"
							content={`${
								props?.data?.signPosition ? props?.data?.signPosition : ''
							} ${props?.data?.signName ? props?.data?.signName : ''}`}
						/>
						<InfoComponent label="Độ khẩn" content={props?.data?.priorityName} />
						<InfoComponent label="Trích yếu" content={props?.data?.abstract} />
						{props?.data?.danhSachButPheLanhDao &&
							props?.data?.danhSachButPheLanhDao?.length > 0 && (
								<InfoButPheComponent
									label="Bút phê lãnh đạo"
									content={props?.data?.danhSachButPheLanhDao}
								/>
							)}
						<InfoComponent label="Ghi chú" content={props?.data?.description} />
						<InfoNDXLComponent
							label="Nội dung xử lý"
							processNote={props?.data?.processNote}
						/>
					</View>
					<TepComponent
						key={'File'}
						title="Tệp nội dung"
						fileUploads={props?.data?.fileUploads}
						kyNhay={props.kyNhay}
						kySo={props.kySo}
						kyNhayRef={props.kyNhayRef}
						kySoRef={props.kySoRef}
						onPressKyNhay={(id?: string) => {
							if (props.onPressKyNhay) props.onPressKyNhay(id);
						}}
						onPressKySo={(id?: string) => {
							if (props.onPressKySo) props.onPressKySo(id);
						}}
						onPressKyNhayFileRef={(id?: string) => {
							if (props.onPressKyNhayFileRef) props.onPressKyNhayFileRef(id);
						}}
						onPressKySoFileRef={(id?: string) => {
							if (props.onPressKySoFileRef) props.onPressKySoFileRef(id);
						}}
						titleRef="DỰ THẢO VĂN BẢN ĐI"
						fileRef={props?.data?.vanBanDiRef?.fileUpload.split(';')}
						titleToTrinhRef="DỰ THẢO TỜ TRÌNH TỔNG CỤC"
						fileToTrinhRef={props?.data?.toTrinhTCRef?.fileUpload.split(';')}
					/>
				</View>
			);
		}

		if (props.type === DocumentType.GIAO_VIEC) {
			console.log('dataaa', props?.data);

			return (
				<View style={styles.thongtin}>
					<View>
						<InfoComponent
							label="Lãnh đạo chỉ đạo"
							content={props?.data?.leaderUserName}
						/>
						<InfoComponent
							label="Ngày chỉ đạo"
							content={foramtDate(props?.data?.commandDate)}
						/>
						<InfoComponent
							label="Số ký hiệu văn bản"
							content={props?.data?.documentCode}
						/>
						<InfoComponent
							label="Ngày văn bản"
							content={foramtDate(props?.data?.documentDate)}
						/>
						<InfoComponent
							label="Hạn xử lý"
							content={foramtDate(props?.data?.deadlineByDate)}
						/>
						<InfoComponent label="Loại công việc" content={props?.data?.jobTypeName} />
						<InfoComponent
							label="Loại cuộc họp"
							content={props?.data?.meetingTypeName}
						/>
						<InfoComponent
							label="Số công việc cha"
							content={props?.data?.parentBookNumber?.toString()}
						/>
						<InfoComponent
							label="Tên công việc cha"
							content={props?.data?.parentName}
						/>
						<InfoComponent label="Số công việc" content={props?.data?.bookNumber} />
						<InfoComponent label="Tên công việc" content={props?.data?.name} />
						<InfoComponent label="Nội dung" content={props?.data?.content} />
						<InfoComponent label="Trích yếu" content={props?.data?.abstract} />
						<InfoComponent label="Ghi chú" content={props?.data?.description} />
						<TepDinhKemComponent
							title="Danh sách văn bản liên quan"
							fileUploads={props?.data?.documentLink?.documentId}
							type={props?.data?.documentLink?.documentType}
						/>
					</View>
				</View>
			);
		}
		if (props.type === DocumentType.VAN_BAN_DI) {
			return (
				<View style={styles.thongtin}>
					<View>
						<InfoComponent
							label="Loại văn bản"
							content={props?.data?.documentTypeName}
						/>
						<InfoComponent label="Trích yếu" content={props?.data?.abstract} />
						<InfoComponent
							label="Đơn vị soạn thảo"
							content={props?.data?.sendGroupName}
						/>
						<InfoComponent label="Người tạo" content={props?.data?.sendUserName} />
						<InfoComponent label="Số / Ký hiệu" content={props?.data?.documentCode} />
						<InfoComponent
							label="Ngày tạo"
							content={foramtDate(props?.data?.documentDate)}
						/>

						<InfoComponent label="Người ký" content={props?.data?.signName} />
						<InfoComponent
							label="Hạn xử lý"
							content={foramtDate(props?.data?.deadlineByDate)}
						/>
						<InfoComponent label="Độ khẩn" content={props?.data?.priorityName} />
						<InfoComponent label="Ngôn ngữ" content={props?.data?.languageName} />
						<InfoComponent label="Trạng thái" content={props?.data?.statusName} />
						<InfoComponent
							label="Số lượng văn bản phát hành"
							content={props?.data?.numberOfDocument}
						/>
						<InfoComponent
							label="Số trang"
							content={props?.data?.numberOfPage?.toString()}
						/>
						<InfoComponent
							label="VB có phản hồi"
							content={props?.data?.isConfirmed ? 'Có' : 'Không'}
						/>
						<InfoComponent
							label="Đã ký duyệt ngoài VB giấy"
							content={props?.data?.isSigned ? 'Có' : 'Không'}
						/>
						<InfoComponent
							label="Ngày văn bản"
							content={foramtDate(props?.data?.publishDate)}
						/>
						<InfoComponent
							label="Đơn vị phát hành"
							content={props?.data?.publishDeptName}
						/>
						{props?.data?.butPheLanhDao && (
							<InfoComponent
								label="Bút phê lãnh đạo"
								content={props?.data?.butPheLanhDao}
							/>
						)}
						<InfoComponent label="Ghi chú" content={props?.data?.description} />
						<InfoNDXLComponent
							label="Nội dung xử lý"
							processNote={props?.data?.historyProcess}
						/>
					</View>
					<TepComponent
						title="Tệp nội dung"
						fileUploads={props?.data?.fileUploads}
						kyNhay={props.kyNhay}
						kySo={props.kySo}
						onPressKySo={(id?: string) => {
							if (props.onPressKySo) props.onPressKySo(id);
						}}
						onPressKyNhay={(id?: string) => {
							if (props.onPressKyNhay) props.onPressKyNhay(id);
						}}
					/>
				</View>
			);
		}
		if (props.type === DocumentType.CONG_VIEC) {
			return (
				<View style={styles.thongtin}>
					<View>
						<InfoComponent
							label="Đề mục lớn"
							content={props?.dataCongViec?.bigCategoryProfileName}
						/>
						<InfoComponent
							label="Đề mục nhỏ"
							content={props?.dataCongViec?.smallCategoryProfileName}
						/>
						<InfoComponent
							label="Số và ký hiệu"
							content={`${props?.dataCongViec?.bookNumber}${props?.dataCongViec?.symbol}`}
						/>
						<InfoComponent label="Tên hồ sơ" content={props?.dataCongViec?.title} />
						<InfoComponent
							label="Loại công việc"
							content={props?.dataCongViec?.typeName}
						/>
						<InfoComponent
							label="Thời gian bắt đầu"
							content={foramtDate(props?.dataCongViec?.endDate)}
						/>
						<InfoComponent
							label="Thời gian kết thúc"
							content={foramtDate(props?.dataCongViec?.endDate)}
						/>
						<InfoComponent label="Người tạo" content={props?.dataCongViec?.userName} />
						<InfoComponent label="Đơn vị" content={props?.dataCongViec?.userName} />
						<InfoComponent
							label="Thời hạn bảo quản"
							content={props?.dataCongViec?.expiryDateName}
						/>
						<InfoComponent
							label="Tình trạng vật lý"
							content={props?.dataCongViec?.totalPage}
						/>
						<InfoComponent
							label="Số lượng VB"
							content={props?.dataCongViec?.totalPage}
						/>
						<InfoComponent label="Số trang" content={props?.dataCongViec?.totalPage} />
						<InfoComponent
							label="Trạng thái hồ sơ"
							content={props?.dataCongViec?.statusName}
						/>
						<InfoComponent label="Ngôn ngữ" content={props?.dataCongViec?.statusName} />
						<InfoComponent
							label="Nộp lưu cơ quan"
							content={props?.dataCongViec?.statusName}
						/>
						<InfoComponent
							label="Đơn vị lưu trữ"
							content={props?.dataCongViec?.deptName}
						/>
						<InfoComponent
							label="Nội dung xử lý"
							content={props?.dataCongViec?.description}
						/>
					</View>
					{_dsVanBan(props?.dataCongViec?.documentLink)}
					<TepComponent
						title="Tệp nội dung"
						fileUploads={props?.dataCongViec?.fileUpload}
					/>
				</View>
			);
		}
	}

	return (
		// <View style={{ flex: 1 }}>
		<ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
			{_viewInfo()}
		</ScrollView>

		// </View>
	);
};

ThongTinChungComponent.defaultProps = {};

export default memo(ThongTinChungComponent);
