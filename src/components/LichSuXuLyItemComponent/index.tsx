import {BackGrayIcon, LSGuiIcon, LSNhanIcon} from '@images/index';
import {LSXL} from '@models/LSXL';
import {foramtDate} from '@utils/index';
import React, {memo} from 'react';
import {View, Text} from 'react-native';
import styles from './style';

export interface Props {
	data?: LSXL;
}

const LichSuXuLyItemComponent = (props: Props) => {
	return (
		<View style={styles.lsxl}>
			<View style={styles.infoDate}>
				<View style={styles.infoDateL}>
					<Text style={styles.textUserName}>{props.data?.sendUserName}</Text>
					<Text style={styles.textPosition}>{props.data?.sendPositionName}</Text>
					{/* <Text style={styles.textPosition}>{props.data?.sendGroupName}</Text> */}
				</View>
				<View style={styles.infoDateC}>
					<View style={styles.viewsendDate}>
						<LSGuiIcon />
						<Text style={styles.textsendDate}>{foramtDate(props.data?.sendDate)}</Text>
					</View>
					{props.data?.dateProcess && (
						<View style={styles.viewrecDate}>
							<LSNhanIcon />
							<Text>{foramtDate(props.data?.dateProcess)}</Text>
						</View>
					)}
					<View style={{marginTop: 10}}>
						<BackGrayIcon />
					</View>
				</View>
				<View style={styles.infoDateR}>
					<Text style={styles.textUserName}>
						{props.data?.receiceUserName ||
							props.data?.receiveUserName ||
							props.data?.receiceGroupName}
					</Text>
					<Text style={styles.textPosition}>{props.data?.receicePositionName}</Text>
				</View>
			</View>
			<View style={styles.infoSend} />
			<View>
				<Text style={styles.des}>{props.data?.note || props.data?.actionName}</Text>
			</View>
		</View>
	);
};

LichSuXuLyItemComponent.defaultProps = {};

export default memo(LichSuXuLyItemComponent);
