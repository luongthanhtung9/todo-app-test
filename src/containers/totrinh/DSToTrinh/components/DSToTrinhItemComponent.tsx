import React, {memo, useState} from 'react';
import {FlatList, StyleSheet, View, Text} from 'react-native';
import {TimeWaitIcon, FileIcon, SettingIcon} from '@images/index';
import {
	scale,
	verticalScale,
	moderateScale,
	moderateVerticalScale,
} from 'react-native-size-matters';
import {
	TouchComponent,
	Divide,
	CardName,
	DSFilesModalComponent,
	MenuHDComponent,
} from '@components/index';
import {VanBan} from '@models/VanBan';
import {foramtDate, foramtDateTime} from '@utils/index';
import DocumentType from '@commons/DocumentType';
export interface Props {
	item?: VanBan;
	title?: String;
	isTrinh?: boolean;
	isDuyet?: boolean;
	onItemPress?: (id?: string) => void;
	onFilePress?: (id?: string) => void;
	onTrinhPress?: (id?: string) => void;
	onDuyetPress?: (id?: string) => void;
}

const DSToTrinhItemComponent = (props: Props) => {
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

	function _onTrinhPress() {
		if (props.onTrinhPress) props.onTrinhPress(props?.item?.id);
	}

	function _onDuyetPress() {
		if (props.onDuyetPress) props.onDuyetPress(props?.item?.id);
	}

	function _priorityName() {
		if (props.item?.priorityId === 0) {
			return (
				<View
					style={[styles.statusView, {backgroundColor: '#FAFAFA', paddingHorizontal: 8}]}>
					<Text style={[styles.status, {color: '#4A4A4A'}]}>
						{props?.item?.priorityName}
					</Text>
				</View>
			);
		}
		if (props.item?.priorityId === 1) {
			return (
				<View
					style={[styles.statusView, {backgroundColor: '#FAFAFA', paddingHorizontal: 8}]}>
					<Text style={[styles.status, {color: '#4A4A4A'}]}>
						{props?.item?.priorityName}
					</Text>
				</View>
			);
		}
		if (props.item?.priorityId === 2) {
			return (
				<View
					style={[styles.statusView, {backgroundColor: '#FF7A00', paddingHorizontal: 8}]}>
					<Text style={styles.status}>{props?.item?.priorityName}</Text>
				</View>
			);
		}
		if (props.item?.priorityId === 3) {
			return (
				<View
					style={[styles.statusView, {backgroundColor: '#FF7A00', paddingHorizontal: 8}]}>
					<Text style={styles.status}>{props?.item?.priorityName}</Text>
				</View>
			);
		}
		if (props.item?.priorityId === 4) {
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
						{/* <Text style={styles.dateSend}>Số tờ trình</Text> */}
						<Text style={styles.code}>{props?.item?.documentCode}</Text>
					</View>
					{/* <View style={styles.viewHeaderMenu}>
						<MenuHDComponent
							isTrinh={props.isTrinh}
							onTrinhPress={_onTrinhPress}
							isDuyet={props.isDuyet}
							onDuyetPress={_onDuyetPress}
							isTra={false}
							isChuyenBS={false}
						/>
					</View> */}
				</View>
				<View style={styles.viewDate}>
					<View style={styles.viewinDate}>
						<Text style={styles.viewDateLabel}>Ngày tạo: </Text>
						<Text style={styles.viewDateContent}>
							{foramtDate(props?.item?.created)}
						</Text>
					</View>
					<View style={styles.documentDate}>
						<Text style={styles.viewDateLabel}>Hạn xử lý:</Text>
						<Text style={styles.viewDateContent}>
							{foramtDate(props?.item?.deadlineByDate)}
						</Text>
					</View>
				</View>
				<View style={styles.viewDate}>
					<View>
						{/* <Text style={styles.dateSend}>Số tờ trình</Text> */}
						<Text style={[styles.code, {color: '#4A4A4A'}]}>
							{props?.item?.sendUserName}
						</Text>
					</View>
					{/* {_priorityName()} */}
					{/* <View style={styles.deadlineByDate}>
                        <Text style={styles.viewDateLabel}>Hạn xử lý:</Text>
                        <Text style={styles.viewDateContent}>{foramtDate(props?.item?.deadlineByDate)}</Text>
                    </View> */}
				</View>
				<Text style={styles.description}>{props?.item?.abstract}</Text>
				{/* <View style={styles.statusView}>
                    <TimeWaitIcon style={styles.statusIcon} />
                    <Text style={styles.status}>{props?.item?.statusName}</Text>
                </View> */}
			</TouchComponent>
			<Divide style={{marginVertical: moderateVerticalScale(10)}} />
			<TouchComponent style={styles.fileView} onPress={() => _onFilePress()}>
				<FileIcon />
				<Text style={styles.fileName}>File đính kèm</Text>
				<Text style={styles.fileDate}>{props?.item?.bookName}</Text>
			</TouchComponent>
			<DSFilesModalComponent
				isVisible={isVisible}
				id={props?.item?.id}
				type={DocumentType.TO_TRINH}
				closePopup={() => setIsVisible(false)}
			/>
		</View>
	);
};

DSToTrinhItemComponent.defaultProps = {};

export default memo(DSToTrinhItemComponent);

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
		flexDirection: 'row',
		width: scale(86),
		height: verticalScale(22),
		borderRadius: 10,
		alignItems: 'center',
		alignContent: 'center',
		justifyContent: 'center',
	},
	statusIcon: {
		margin: 4,
	},
	status: {
		fontFamily: 'arial',
		fontSize: 11,
		lineHeight: 13,
		color: '#FFFFFF',
	},
	fileView: {
		flexDirection: 'row',
		marginTop: moderateVerticalScale(6),
		alignItems: 'center',
	},
	fileName: {
		fontFamily: 'arial',
		fontSize: 12,
		lineHeight: 14,
		color: '#7C86A2',
		marginLeft: 5,
	},
	fileDate: {
		fontFamily: 'arial',
		fontSize: 12,
		lineHeight: 12,
		color: '#7C86A2',
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
		width: '40%',
		position: 'absolute',
		right: 0,
	},
	viewDateLabel: {
		fontFamily: 'arial',
		fontSize: moderateScale(12),
		lineHeight: moderateScale(14),
		color: '#187779',
	},
	viewDateContent: {
		fontFamily: 'arial',
		fontSize: moderateScale(12),
		lineHeight: moderateScale(14),
		color: '#4A4A4A',
		marginLeft: 8,
	},
});
