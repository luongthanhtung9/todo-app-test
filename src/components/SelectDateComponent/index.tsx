import React, {memo, useState} from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import DatePicker from 'react-native-date-picker';
import {TouchComponent} from '..';
import {foramtDate} from '@utils/index';
import Icon from '@commons/Icon';

export interface Props {
	value?: any;
	title?: string;
	onChange?: (date: any) => void;
	placeHolder?: string;
}

const SelectDateComponent = (props: Props) => {
	const [date, setDate] = useState();
	const [open, setOpen] = useState(false);

	return (
		<View style={styles.formView}>
			<View style={styles.form}>
				<Text style={styles.title}>{props.title}</Text>
				<View style={styles.viewInput}>
					<TouchComponent style={styles.input} onPress={() => setOpen(true)}>
						<Text style={{color: '#4A4A4A'}}>
							{props.value
								? foramtDate(props.value)
								: props.placeHolder
								? `${props.placeHolder}`
								: `Chọn ${props.title}`}
						</Text>
						<Icon name="calendar" size={16} color={'#C4C4C4'} />
					</TouchComponent>
					<DatePicker
						modal
						locale={'vi'}
						mode="date"
						open={open}
						date={props.value ? props.value : new Date()}
						onConfirm={(date: any) => {
							setOpen(false);
							setDate(date);
							if (props.onChange) props.onChange(date);
						}}
						onCancel={() => {
							setOpen(false);
						}}
						title={props.title}
						confirmText="Chọn"
						cancelText="Hủy"
					/>
				</View>
			</View>
		</View>
	);
};

SelectDateComponent.defaultProps = {};

export default memo(SelectDateComponent);
