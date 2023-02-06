import React, {memo, useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {FileIcon} from '@images/index';
import {verticalScale, moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {TouchComponent, Divide} from '@components/index';
import {VanBan} from '@models/VanBan';
import {foramtDate, showLoading} from '@utils/index';
import {useDispatch, useSelector} from 'react-redux';
import {dsDoKhanAction} from '@redux/actions/setting';
import DocumentType from '@commons/DocumentType';
import {actionLayFileDinhKem} from '@redux/actions/quanly';
export interface Props {
	item?: VanBan;
	title?: string;
	isTrinh?: boolean;
	isDuyet?: boolean;
	isTra?: boolean;
	isChuyenBS?: boolean;
	onTraPress?: (id?: string) => void;
	onTrinhPress?: (id?: string) => void;
	onChuyenBSPress?: (id?: string) => void;
	onDuyetPress?: (id?: string) => void;
	onItemPress?: (id?: string) => void;
	onFilePress?: (id?: string) => void;
}

const DSVBDenItemComponent = (props: Props) => {
	const dispatch = useDispatch();
	const dsDoKhanResponse = useSelector((state: any) => state.setting.dsDoKhanResponse);
	useEffect(() => {
		dispatch(dsDoKhanAction({}));
	}, []);

	const {
		isTrinh,
		isDuyet,
		isTra,
		isChuyenBS,
		onTraPress,
		onTrinhPress,
		onChuyenBSPress,
		onDuyetPress,
		item,
	} = props;
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [priority, setPriority] = useState<any>();

	useEffect(() => {
		if (props?.item?.id) return;
		const param = {
			idVanBan: props?.item?.id,
			loai: DocumentType.VAN_BAN_DEN,
			onlyFilePublic: false,
		};
		showLoading();
		dispatch(actionLayFileDinhKem(param));
	}, []);
	// useMemo(() => {
	// 	if (dsDoKhanResponse && dsDoKhanResponse.success && item !== undefined) {
	// 		const listPriority: any[] = dsDoKhanResponse.data.dokhan;
	// 		const namePriority = listPriority.find(item => item.id === item.id);
	// 		setPriority(namePriority);
	// 	}
	// }, [dsDoKhanResponse]);

	function _onFilePress() {
		if (props.onFilePress) {
			props.onFilePress(props?.item?.id);
			setIsVisible(true);
		}
	}

	function _onItemPress() {
		if (props.onItemPress) {
			props.onItemPress(props?.item?.id);
		}
	}

	function _onTraPress() {
		if (onTraPress) {
			onTraPress(props?.item?.id);
		}
	}

	function _onTrinhPress() {
		if (onTrinhPress) {
			onTrinhPress(props?.item?.id);
		}
	}

	function _onChuyenBSPress() {
		if (onChuyenBSPress) {
			onChuyenBSPress(props?.item?.id);
		}
	}

	function _onDuyetPress() {
		if (onDuyetPress) {
			onDuyetPress(props?.item?.id);
		}
	}

	function _priorityName() {
		if (props.item?.priorityId == 0) {
			return (
				<View style={[styles.statusView, {backgroundColor: '#0EACAF'}]}>
					<Text style={[styles.status, {color: '#ffffff'}]}>
						{props?.item?.priorityName}
					</Text>
				</View>
			);
		}
		if (props.item?.priorityId == 1) {
			return (
				<View style={[styles.statusView, {backgroundColor: '#f1cc23'}]}>
					<Text style={[styles.status, {color: '#4A4A4A'}]}>
						{props?.item?.priorityName}
					</Text>
				</View>
			);
		}
		if (props.item?.priorityId == 2) {
			return (
				<View style={[styles.statusView, {backgroundColor: '#FF7A00'}]}>
					<Text style={styles.status}>{props?.item?.priorityName}</Text>
				</View>
			);
		}
		if (props.item?.priorityId == 3) {
			return (
				<View style={[styles.statusView, {backgroundColor: '#FF7A00'}]}>
					<Text style={styles.status}>{props?.item?.priorityName}</Text>
				</View>
			);
		}
		if (props.item?.priorityId == 4) {
			return (
				<View style={[styles.statusView, {backgroundColor: '#DB0000'}]}>
					<Text style={styles.status}>{props?.item?.priorityName}</Text>
				</View>
			);
		}
	}

	return (
		<View style={styles.itemView}>
			<TouchComponent style={styles.infoView} onPress={_onItemPress}>
				<View style={styles.viewHeader}>
					<View style={{marginBottom: 8}}>
						{/* <Text style={styles.dateSend}>Số / Ký hiệu</Text> */}
						<Text style={styles.code}>{props?.item?.documentCode}</Text>
					</View>
					{/* <View style={styles.viewHeaderMenu}>
						<MenuHDComponent
							isTrinh={isTrinh}
							onTrinhPress={_onTrinhPress}
							isDuyet={isDuyet}
							onDuyetPress={_onDuyetPress}
							isTra={isTra}
							onTraPress={_onTraPress}
							isChuyenBS={isChuyenBS}
							onChuyenBSPress={_onChuyenBSPress}
						/>
					</View> */}
				</View>
				<View style={[styles.viewDate]}>
					<View style={styles.viewinDate}>{_priorityName()}</View>
					<View style={styles.documentDate}>
						<Text style={styles.viewDateLabel}>Hạn xử lý:</Text>
						<Text style={styles.viewDateContent}>
							{foramtDate(props?.item?.deadlineByDate)}
						</Text>
					</View>
				</View>
				<View style={styles.viewDate}>
					<View style={styles.viewinDate}>
						<Text style={styles.viewDateLabel}>Ngày văn bản: </Text>
						<Text style={styles.viewDateContent}>
							{foramtDate(props?.item?.inDate)}
						</Text>
					</View>
					<View style={styles.documentDate}>
						<Text style={styles.viewDateLabel}>Ngày đến:</Text>
						<Text style={styles.viewDateContent}>
							{foramtDate(props?.item?.documentDate)}
						</Text>
					</View>
				</View>
				{/* <View style={styles.viewDate}>
					<View style={styles.deadlineByDate}>
						<Text style={styles.viewDateLabel}>Hạn xử lý:</Text>
						<Text style={styles.viewDateContent}>
							{foramtDate(props?.item?.deadlineByDate)}
						</Text>
					</View>
				</View> */}
				<Text style={styles.description}>{props?.item?.abstract}</Text>
				{/* <View style={styles.statusView}>
                    <TimeWaitIcon style={styles.statusIcon} />
                    <Text style={styles.status}>{props?.item?.statusName}</Text>
                </View> */}
			</TouchComponent>
			<Divide style={{marginVertical: moderateVerticalScale(10)}} />
			<TouchComponent style={styles.fileView} onPress={_onFilePress}>
				<FileIcon />
				<Text style={styles.fileName}>Xem file đính kèm</Text>
				<Text style={styles.fileDate}>{props?.item?.bookName}</Text>
			</TouchComponent>
		</View>
	);
};

DSVBDenItemComponent.defaultProps = {};

export default memo(DSVBDenItemComponent);

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
		marginVertical: 10,
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
	dateSend: {
		fontFamily: 'arial',
		fontSize: 12,
		lineHeight: 14,
		fontWeight: '400',
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
		height: verticalScale(22),
		borderRadius: 10,
		alignItems: 'center',
		alignContent: 'center',
		justifyContent: 'center',
		alignSelf: 'flex-start',
		paddingHorizontal: 10,
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
	viewPriority: {
		marginVertical: 10,
		borderRadius: 10,
		paddingVertical: 6,
		flexDirection: 'row',
		flex: 1,
	},
	textPriority: {
		// color: '#fff',
		fontSize: 12,
		fontWeight: '700',
	},
});
