import React, {memo, useState} from 'react';
import {
	FlatList,
	StyleSheet,
	View,
	Text,
	TextInput,
	NativeSyntheticEvent,
	TextInputChangeEventData,
} from 'react-native';
import {CalendarIcon, GhiLaiIcon} from '@images/index';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import styles from './style';
import DatePicker from 'react-native-date-picker';
import {TouchComponent} from '..';
import {foramtDate} from '@utils/index';
import dayjs from 'dayjs';
import Icon from '@commons/Icon';

export interface Props {
	valueTo?: any;
	valueFrom?: any;
	title?: string;
	onChangeFromDate?: (date: any) => void;
	placeHolderFromDate?: string;
	placeHolderToDate?: string;
	onChangeToDate?: (date: any) => void;
}

const SelectFromToDateComponent = (props: Props) => {
	const [dateFrom, setDateFrom] = useState();
	const [dateTo, setDateTo] = useState();
	const [openFrom, setOpenFrom] = useState(false);
	const [openTo, setOpenTo] = useState(false);

	return (
		<View style={styles.formView}>
			<View style={styles.form}>
				<Text style={styles.title}>{props.title}</Text>
				<View style={styles.viewInput}>
					<TouchComponent style={styles.input} onPress={() => setOpenFrom(true)}>
						<Text style={{color: '#4A4A4A', fontSize: 12}}>
							{props.valueFrom
								? foramtDate(props.valueFrom)
								: props.placeHolderFromDate
								? `${props.placeHolderFromDate}`
								: `Chọn ${props.title}`}
						</Text>
					</TouchComponent>
					<Icon name="calendar" size={16} color={'#C4C4C4'} />
					<TouchComponent
						style={[styles.input, {justifyContent: 'flex-end'}]}
						onPress={() => setOpenTo(true)}>
						<Text style={{color: '#4A4A4A', fontSize: 12}}>
							{props.valueTo
								? foramtDate(props.valueTo)
								: props.placeHolderToDate
								? `${props.placeHolderToDate}`
								: `Chọn ${props.title}`}
						</Text>
					</TouchComponent>
					<DatePicker
						modal
						locale={'vi'}
						mode="date"
						open={openFrom}
						date={props.valueFrom ? props.valueFrom : new Date()}
						onConfirm={(date: any) => {
							setOpenFrom(false);
							setDateFrom(date);
							if (props.onChangeFromDate) props.onChangeFromDate(date);
						}}
						onCancel={() => {
							setOpenFrom(false);
						}}
						title={props.placeHolderFromDate}
						confirmText="Chọn"
						cancelText="Hủy"
					/>
					<DatePicker
						modal
						locale={'vi'}
						mode="date"
						open={openTo}
						date={props.valueTo ? props.valueTo : new Date()}
						onConfirm={(date: any) => {
							setOpenTo(false);
							setDateTo(date);
							if (props.onChangeToDate) props.onChangeToDate(date);
						}}
						onCancel={() => {
							setOpenTo(false);
						}}
						title={props.placeHolderToDate}
						confirmText="Chọn"
						cancelText="Hủy"
					/>
				</View>
			</View>
		</View>
	);
};

SelectFromToDateComponent.defaultProps = {};

export default memo(SelectFromToDateComponent);
