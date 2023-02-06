import DocumentType from '@commons/DocumentType';
import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ItemCongViecComponent from './ItemCongViecComponent';

export interface Props {
	title?: string;
	type?: number;
	data?: any;
}

const CongViecComponent = (props: Props) => {
	const {title, type, data} = props;

	const getNumber = (index?: number) => {
		if (type === DocumentType.VAN_BAN_DEN) {
			if (index === 0) {
				return data?.VBD_CHUABATDAU;
			}
			if (index === 1) {
				return data?.VBD_DANGXULY;
			}
			if (index === 2) {
				return data?.VBD_QUAHAN;
			}
		} else if (type === DocumentType.VAN_BAN_DI) {
			if (index === 0) {
				return data?.VBDI_CHUABATDAU;
			}
			if (index === 1) {
				return data?.VBDI_DANGXULY;
			}
			if (index === 2) {
				return data?.VBDI_QUAHAN;
			}
		} else if (type === DocumentType.TO_TRINH) {
			if (index === 0) {
				return data?.TOTRINH_CHUABATDAU;
			}
			if (index === 1) {
				return data?.TOTRINH_DANGXULY;
			}
			if (index === 2) {
				return data?.TOTRINH_QUAHAN;
			}
		}
	};

	return (
		<View style={{paddingVertical: 10, flex: 1}}>
			<Text style={styles.title}>{title}</Text>
			<View style={{flexDirection: 'row'}}>
				<ItemCongViecComponent
					viewStyle={{backgroundColor: '#FAFAFA'}}
					number={getNumber(0)}
					content="Chưa bắt đầu"
				/>
				<ItemCongViecComponent
					textStyles={{color: '#FFFFFF'}}
					viewStyle={{backgroundColor: '#8BC34C', marginHorizontal: 16}}
					number={getNumber(1)}
					content="Trong hạn"
				/>
				<ItemCongViecComponent
					textStyles={{color: '#FFFFFF'}}
					viewStyle={{backgroundColor: '#E00606'}}
					number={getNumber(2)}
					content="Quá hạn"
				/>
			</View>
		</View>
	);
};

CongViecComponent.defaultProps = {};

export default memo(CongViecComponent);

const styles = StyleSheet.create({
	title: {color: '#767676', fontWeight: '700', fontSize: 12, paddingBottom: 10},
});
