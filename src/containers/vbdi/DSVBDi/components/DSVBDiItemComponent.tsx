import React, {memo, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {foramtDate, foramtDateTime} from '@utils/index';
import {FileIcon, TimeWaitIcon} from '@images/index';
import {
	scale,
	verticalScale,
	moderateVerticalScale,
	moderateScale,
} from 'react-native-size-matters';
import {TouchComponent, Divide, MenuHDComponent, DSFilesModalComponent} from '@components/index';
import {VanBan} from '@models/VanBan';
import DocumentType from '@commons/DocumentType';
import logger from 'redux-logger';

export interface Props {
	item?: VanBan;
	title?: String;
	onItemPress?: (id?: string) => void;
	onFilePress?: (id?: string) => void;
}

const DSVBDiItemComponent = (props: Props) => {
	const [isVisible, setIsVisible] = useState<boolean>(false);

	function _onFilePress() {
		if (props.onFilePress) {
			setIsVisible(true);
			props.onFilePress(props?.item?.id);
		}
	}

	function _onItemPress() {
		if (props.onItemPress) {
			props.onItemPress(props?.item?.id);
		}
	}
	function _priorityName() {
		if (props.item?.priorityId == 0) {
			return (
				<View
					style={[styles.statusView, {backgroundColor: '#FAFAFA', paddingHorizontal: 8}]}>
					<Text style={[styles.status, {color: '#4A4A4A'}]}>
						{props?.item?.priorityName}
					</Text>
				</View>
			);
		}
		if (props.item?.priorityId == 1) {
			return (
				<View
					style={[styles.statusView, {backgroundColor: '#FAFAFA', paddingHorizontal: 8}]}>
					<Text style={[styles.status, {color: '#4A4A4A'}]}>
						{props?.item?.priorityName}
					</Text>
				</View>
			);
		}
		if (props.item?.priorityId == 2) {
			return (
				<View
					style={[styles.statusView, {backgroundColor: '#FF7A00', paddingHorizontal: 8}]}>
					<Text style={styles.status}>{props?.item?.priorityName}</Text>
				</View>
			);
		}
		if (props.item?.priorityId == 3) {
			return (
				<View
					style={[styles.statusView, {backgroundColor: '#FF7A00', paddingHorizontal: 8}]}>
					<Text style={styles.status}>{props?.item?.priorityName}</Text>
				</View>
			);
		}
		if (props.item?.priorityId == 4) {
			return (
				<View
					style={[styles.statusView, {backgroundColor: '#DB0000', paddingHorizontal: 8}]}>
					<Text style={styles.status}>{props?.item?.priorityName}</Text>
				</View>
			);
		}
	}

	return (
		<View style={styles.itemView}>
			<TouchComponent style={styles.infoView} onPress={_onItemPress}>
				<View style={styles.viewHeader}>
					<View>
						<Text style={{color: '#187779', fontFamily: 'Arial', fontWeight: '700'}}>
							{props?.item?.documentCode}
						</Text>

						<Text style={styles.code}>{props?.item?.bookName}</Text>
					</View>
					{/* <View style={styles.viewHeaderMenu}>
						<MenuHDComponent isTrinh={true} isDuyet={false} />
					</View> */}
				</View>
				<View style={styles.viewDate}>
					<View style={styles.viewinDate}>
						<Text style={{color: '#4A4A4A', fontWeight: '700'}}>
							{props?.item?.sendUserName}
						</Text>
					</View>
					<View style={styles.documentDate}></View>
				</View>
				<View style={styles.viewDate}>
					<View style={{flexDirection: 'row'}}>
						<View
							style={[
								styles.statusView,
								{backgroundColor: '#187779', marginRight: 8, paddingHorizontal: 8},
							]}>
							<Text style={styles.status}>{props?.item?.documentTypeName}</Text>
						</View>
						{_priorityName()}
					</View>
				</View>

				<View style={styles.statusView}>
					<View style={styles.deadlineByDate}>
						<Text style={styles.viewDateLabel}>
							Ngày tạo: {foramtDate(props?.item?.created)}
						</Text>
					</View>
					<View style={styles.deadlineByDate}>
						<Text style={styles.viewDateLabel}>
							Hạn xử lý: {foramtDate(props?.item?.deadlineByDate)}
						</Text>
					</View>
				</View>
				<Text style={styles.description}>{props?.item?.abstract}</Text>
			</TouchComponent>
			<Divide style={{marginVertical: moderateVerticalScale(10)}} />
			<TouchComponent style={styles.fileView} onPress={_onFilePress}>
				<FileIcon />
				<Text style={styles.fileName}>File đính kèm</Text>
			</TouchComponent>
			<DSFilesModalComponent
				isVisible={isVisible}
				id={props?.item?.id}
				type={DocumentType.VAN_BAN_DI}
				closePopup={() => setIsVisible(false)}
			/>
		</View>
	);
};

DSVBDiItemComponent.defaultProps = {};

export default memo(DSVBDiItemComponent);

const styles = StyleSheet.create({
	itemView: {
		backgroundColor: '#FFFFFF',
		borderRadius: 6,
		padding: 9,
		margin: moderateVerticalScale(6),
	},
	infoView: {
		margin: 3,
	},
	viewHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		alignContent: 'center',
	},
	viewHeaderMenu: {
		position: 'absolute',
		right: 0,
	},
	viewDate: {
		flexDirection: 'row',
		alignContent: 'center',
		alignItems: 'center',
		marginVertical: 4,
	},
	viewinDate: {
		flexDirection: 'row',
		width: '40%',
	},
	documentDate: {
		flexDirection: 'row',
		width: '40%',
		position: 'absolute',
		right: 0,
	},
	deadlineByDate: {
		flexDirection: 'row',
		flex: 1,
	},
	viewDateLabel: {
		fontFamily: 'arial',
		// fontSize: moderateScale(12),
		// lineHeight: moderateScale(14),
		color: '#187779',
	},
	viewDateContent: {
		fontFamily: 'arial',
		fontSize: moderateScale(12),
		lineHeight: moderateScale(14),
		color: '#4A4A4A',
		marginLeft: 8,
	},
	dateSend: {
		fontFamily: 'arial',
		fontSize: 10,
		lineHeight: 11,
		color: '#7C86A2',
		margin: 3,
	},
	code: {
		fontFamily: 'arial',
		fontSize: 14,
		lineHeight: 16,
		color: '#187779',
		fontWeight: 'bold',
	},
	sendDeptName: {
		flexDirection: 'row',
		marginTop: 8,
	},
	nameView: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 10,
	},
	name: {
		fontFamily: 'arial',
		fontSize: 11,
		lineHeight: 13,
		color: '#4A4A4A',
	},
	description: {
		fontFamily: 'arial',
		fontSize: 12,
		lineHeight: 18,
		color: '#7C86A2',
		marginTop: 6,
	},
	statusView: {
		// backgroundColor: '#FF7A00',
		flexDirection: 'row',
		// width: scale(86),

		height: verticalScale(22),
		borderRadius: 10,
		alignItems: 'center',
		alignContent: 'center',
		justifyContent: 'center',
		// marginTop: moderateVerticalScale(10)
	},
	statusIcon: {
		margin: 4,
	},
	status: {
		fontFamily: 'arial',
		fontSize: 12,
		lineHeight: 14,
		color: '#FFFFFF',
	},
	fileView: {
		flexDirection: 'row',
		marginTop: moderateVerticalScale(6),
		alignItems: 'center',
	},
	fileName: {
		fontFamily: 'arial',
		fontSize: 11,
		lineHeight: 13,
		color: '#7C86A2',
		marginLeft: 5,
	},
	fileDate: {
		fontFamily: 'arial',
		fontSize: 12,
		lineHeight: 15,
		color: '#7C86A2',
		fontWeight: 'bold',
		position: 'absolute',
		right: 0,
	},
});
