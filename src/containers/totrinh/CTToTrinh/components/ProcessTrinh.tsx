import {BackGrayIcon, LSGuiIcon, LSNhanIcon} from '@images/index';
import {LSXL} from '@models/LSXL';
import {foramtDate} from '@utils/index';
import React, {memo} from 'react';
import {View, Text} from 'react-native';
import styles from './style';

export interface Props {
	data?: LSXL;
    item?: any;
    userInfo? : any;

}

const ProcessTrinh = (props: Props) => {
	return (
		<View style={styles.lsxl}>
			<View style={styles.infoDate}>
				<View style={styles.infoDateL}>
					<Text style={styles.textUserName}>{props.userInfo?.displayName}</Text>
					<Text style={styles.textPosition}>{props.userInfo?.roleName}</Text>
				</View>
				<View style={styles.infoDateC}>
					{/* <View style={styles.viewsendDate}>
						<LSGuiIcon />
						<Text style={styles.textsendDate}>{foramtDate(props.data?.sendDate)}</Text>
					</View> */}
					{/* {props.data?.dateProcess && (
						<View style={styles.viewrecDate}>
							<LSNhanIcon />
							<Text>{foramtDate(props.data?.dateProcess)}</Text>
						</View>
					)} */}
                    <View style={{}}>
					<BackGrayIcon />
                    </View>
				</View>
				<View style={styles.infoDateR}>
					<Text style={styles.textUserName}>
						{props.item.userName}
					</Text>
					<Text style={styles.textPosition}>{props.item?.deptName}</Text>
				</View>
			</View>
			<View>
			</View>
		</View>
	);
};

ProcessTrinh.defaultProps = {};

export default memo(ProcessTrinh);
