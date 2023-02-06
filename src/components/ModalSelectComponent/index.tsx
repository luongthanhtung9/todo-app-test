import Icon from '@commons/Icon';
import React, { memo, useState, useEffect, useMemo } from 'react';
import { View, StyleProp, ViewStyle, Text, Modal, Pressable } from 'react-native';
import {
  ButtonComponent,
  TouchComponent,
  FlatListComponent,
  InputComponent,
} from '@components/index';
import styles from './style';
import { Select } from '@models/Select';
import AppColors from '@commons/AppColors';
import ButtonRadius from '@components/ButtonRadiusComponent/ButtonRadius';
import { Ic_DropDrow, Success } from '@images/index';

export interface Props {
  title?: string;
  data?: Array<Select>;
  // isSearch?: boolean;
  isSelect: boolean;
  onClose: () => void;
  onAccept?: (select: Select) => void;
}

const ModalSelectComponent = (props: Props) => {
  const { isSelect, data, onClose, onAccept } = props
  const [indexSelect, setIndexSelect] = useState<number>(0);

  useMemo(() => {
    if (!data) return;
    setIndexSelect(0);
  }, [data]);

  function _onSelect(item: Select, index: number) {
    setIndexSelect(index);
  }

  // function _onSearch(text: string) {
  //   if (props.data) {
  //     if (text) {
  //       const newlist = props.data.filter((item: any) =>
  //         item?.title.includes(text.toUpperCase()),
  //       );
  //       setListData(newlist);
  //     } else {
  //       setListData(props.data);
  //     }
  //   }
  // }

  function _onAccept() {
    if (onAccept && data) {
      onAccept(data[indexSelect]);
    }
  }

  const renderItem = (item: Select, index: number) => (
    <TouchComponent
      style={styles.viewItemSelect}
      key={index}
      onPress={() => _onSelect(item, index)}>
      <Text style={styles.textItemSelect}>{item.label}</Text>
      {indexSelect == index && (
        <Success />
      )}
    </TouchComponent>
  );

  return (
    <Modal
      // animationType="slide"
      animationType={"none"}
      transparent={true}
      visible={isSelect}
      onRequestClose={() => {
        setIndexSelect(0);
      }}>
      <TouchComponent style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{ backgroundColor: '#C8C8CA', width: '15%', height: 5, marginTop: 12, borderRadius: 5 }} />
          <View style={styles.viewTitle}>
            <Text style={styles.modalText}>{props.title}</Text>
          </View>
          {/* {props.isSearch && (
            <InputComponent
              title="Tìm đơn vị tiền tệ"
              placeholder="Nhập mã tiền tệ"
              onChange={_onSearch}
            />
          )} */}

          <View style={styles.viewList}>
            <FlatListComponent listData={data} buildItem={renderItem} />
          </View>
          <View style={styles.viewBottom}>

            <ButtonRadius
              transparentBg
              onPress={onClose}
              title={"Đóng"}
            />
            <ButtonRadius onPress={_onAccept} title={"Chọn"} />

          </View>
        </View>
      </TouchComponent>
    </Modal>
  );
};

ModalSelectComponent.defaultProps = {
  isLogin: false,
  isSearch: false,
};

export default memo(ModalSelectComponent);
