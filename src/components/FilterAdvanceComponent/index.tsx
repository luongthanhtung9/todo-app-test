import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  StyleProp, ViewStyle, Text, TextInput
} from 'react-native';
import { ComfirmModalComponent, TouchComponent } from '@components/index';
import styles from './style';
import DatePicker from 'react-native-date-picker'
import { Picker } from '@react-native-picker/picker';
import { ApiResponse } from '@models/ApiResponse';
import { dismissLoading, showLoading } from '@utils/index';
import { dsDoKhanAction, dsLoaiVBAction } from '@redux/actions/setting';
import dayjs from 'dayjs';

export interface Props {
  closeFilterAdvance: () => void;
  searchData: (item: any) => void;
  dsLoaiVBResponse: Array<any>;
  dsDoKhanResponse: any;
  statusSelected: number;
}

const FilterAdvanceComponent = (props: Props,) => {
  const [value, setValue] = useState('');

  const [fromDateVBDen, setFromDateVBDen] = useState(null);
  const [toDateVBDen, setToDateVBDen] = useState(null);

  const [fromDateVBDenTemp, setFromDateVBDenTemp] = useState(new Date());
  const [toDateVBDenTemp, setToDateVBDenTemp] = useState(new Date());

  const [slectedLoaiVB, setSlectedLoaiVB] = useState<any>(null);
  const [slectedDoKhan, setSlectedDoKhan] = useState<any>(null);

  const [showFromDate, setShowFromDate] = useState(false);
  const [showToDate, setShowToDate] = useState(false);

  const [showModalError, setShowModalError] = useState(false);

  const showFromDatepicker = useCallback(() => {
    setShowFromDate(true);
  }, [setShowFromDate, showFromDate]);

  const showToDatepicker = useCallback(() => {
    setShowToDate(true);
  }, [showToDate, setShowToDate]);


  const searchAdvance = () => {
    let item = {
      page: 1,
      text: value,
      status: props.statusSelected,
      doKhan: slectedDoKhan,
      vanBanDenFromDate: fromDateVBDen ? dayjs(fromDateVBDen).format("YYYY-MM-DD") : null,
      vanBanDenToDate: toDateVBDen? dayjs(toDateVBDen).format("YYYY-MM-DD") : null,
    }
    props.closeFilterAdvance();
    props.searchData(item);
  }

  useEffect(() => {
  }, [])

  useMemo(() => {
  }, [])

  return (
    <View style={styles.contentModal}>
      <Text style={styles.textFilterHeader}>Tìm kiếm nâng cao</Text>
      <Text style={styles.textLabel}>Từ khóa</Text>
      <View style={styles.inputFindStyle}>
        <TextInput
          placeholder="Tìm kiếm"
          multiline={false}
          style={styles.inputSearchStyle}
          onChangeText={text => setValue(text)}
          value={value}
        />
      </View>
      <Text style={styles.textLabel}>Ngày văn bản</Text>
      <View style={styles.dateSelect}>
        <TouchComponent onPress={showFromDatepicker} style={styles.selectFromDate}>
          <Text style={styles.textDate}>{fromDateVBDen != null ? dayjs(fromDateVBDen).format('DD-MM-YYYY') : 'Chọn từ ngày'}</Text>
        </TouchComponent>
        <DatePicker
          modal
          mode="date"
          open={showFromDate}
          date={fromDateVBDenTemp}
          onConfirm={(date: any) => {
            if((toDateVBDen && dayjs(toDateVBDen) > dayjs(date)) || !toDateVBDen){
              setFromDateVBDen(date);
              setFromDateVBDenTemp(date);
            }
            else {
              setShowModalError(true);
            }
            setShowFromDate(false);
          }}
          onCancel={() => {
            setShowFromDate(false)
          }}
          title="Chọn từ ngày"
          confirmText="Chọn"
          cancelText="Hủy"
        />
        <TouchComponent onPress={showToDatepicker} style={styles.selectToDate}>
          <Text style={styles.textDate}>{toDateVBDen != null ? dayjs(toDateVBDen).format('DD-MM-YYYY') : 'Chọn đến ngày'}</Text>
        </TouchComponent>
        <DatePicker
          modal
          mode="date"
          open={showToDate}
          date={toDateVBDenTemp}
          onConfirm={(date: any) => {
            if((fromDateVBDen && dayjs(fromDateVBDen) < dayjs(date)) || !fromDateVBDen){
              setToDateVBDen(date);
              setToDateVBDenTemp(date);
            }
            else {
              setShowModalError(true);
            }
            setShowToDate(false);
          }}
          onCancel={() => {
            setShowToDate(false)
          }}
          title="Chọn đến ngày"
          confirmText="Chọn"
          cancelText="Hủy"
        />
      </View>
      <Text style={styles.textLabel}>Loại văn bản</Text>
      <View style={styles.inputFindStyle}>
        <View style={styles.inputSearchStyle}>
          <Picker
            mode="dropdown"
            selectedValue={slectedLoaiVB}
            onValueChange={value => setSlectedLoaiVB(value)}
          >
            {props.dsLoaiVBResponse && props.dsLoaiVBResponse.map(item => (
              <Picker.Item label={item.typeName} value={item.id} key={item.id} />
            ))}
          </Picker>
        </View>
      </View>
      <Text style={styles.textLabel}>Độ khẩn</Text>
      <View style={styles.inputFindStyle}>
        <View style={styles.inputSearchStyle}>
          <Picker
            mode="dropdown"
            selectedValue={slectedDoKhan}
            onValueChange={value => setSlectedDoKhan(value)}
            style={styles.inputSearchStyle}
          >
            {props.dsDoKhanResponse.dokhan && props.dsDoKhanResponse.dokhan.map((item: { name: string | undefined; id: React.Key | null | undefined; }) => (
              <Picker.Item label={item.name} value={item.id} key={item.id} />
            ))}
          </Picker>
        </View>
      </View>
      <View style={styles.buttonSearch}>
        <View style={styles.itemBox1}>
          <TouchComponent onPress={searchAdvance} style={[styles.buttonBottom, styles.timKiem]}>
            <Text style={styles.textButton}>Tìm kiếm</Text>
          </TouchComponent>
        </View>
        <View style={styles.itemBox2}>
          <TouchComponent onPress={props.closeFilterAdvance} style={[styles.buttonBottom, styles.dong]}>
            <Text style={styles.textDongButton}>Đóng</Text>
          </TouchComponent>
        </View>
      </View>
      <ComfirmModalComponent 
        isShow={showModalError}
        title="Thông báo"
        content="Chọn từ ngày phải nhỏ hơn chọn đến ngày."
        closeModal={() => setShowModalError(false)}
      />
    </View>
  );
};

FilterAdvanceComponent.defaultProps = {
};

export default memo(FilterAdvanceComponent);

