import { ButtonComponent, InputComponent, TouchComponent, InfoComponent } from '@components/index';
import { CloseIcon } from '@images/index';
import { showMessageWarning } from '@utils/index';
import React, { memo, useState, useEffect, useMemo } from 'react';
import { Text, View } from 'react-native';
import Modal from "react-native-modal";
import { connect, useDispatch } from 'react-redux';
import styles from './style';
import { actionThongTinTraVB } from '@redux/actions/vbden';
import { ApiResponse } from '@models/ApiResponse';
import DocumentType from '@commons/DocumentType';
import { actionThongTinTraVBDI } from '@redux/actions/vbdi';
import { UserInfo } from '@models/UserInfo';

export interface Props {
  id?: string
  type?: number
  isVisible?: boolean
  userInfo?: UserInfo
  closePopup: () => void
  onAccept: (noiDung: string) => void
}

const ModalThuHoiVBComponent = (props: Props) => {
  const dispatch = useDispatch();
  const { userInfo } = props
  const [listTra, setListTra] = useState<Array<any>>()
  const [noiDung, setNoiDung] = useState<string>()

  function _onAccept() {
    if (!noiDung) {
      showMessageWarning('Bạn phải nhập nội dung.')
    } else {
      props.onAccept(noiDung)
    }

  }

  return (
    <View>
      <Modal
        isVisible={props.isVisible}
        onBackdropPress={() => props.closePopup}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        useNativeDriver
        hideModalContentWhileAnimating
        style={styles.modal}>
        <View style={styles.container} >
          <View style={styles.viewTitle}>
            <Text style={styles.textTitle}>Thu hồi văn bản</Text>
            <TouchComponent style={styles.close} onPress={props.closePopup}>
              <CloseIcon />
            </TouchComponent>
          </View>
          <View style={{ width: '100%' }}>
            <InfoComponent label='Người thu hồi' content={userInfo?.displayName} />
            <InfoComponent label='Chức vụ' content={userInfo?.roleName} />
            <InfoComponent label='Đơn vị' content={userInfo?.deptName} />
          </View>
          <InputComponent
            title='Nôi dung'
            multiline={true}
            numberOfLines={3}
            onChange={setNoiDung} />
          <View style={styles.viewButton}>
            <ButtonComponent style={{ width: '40%' }} title='Đóng' onPress={props.closePopup} />
            <ButtonComponent style={{ width: '40%' }} title='Xác nhận' onPress={_onAccept} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

ModalThuHoiVBComponent.defaultProps = {
  isVisible: false,
};

const mapStateToProps = (state: any) => {

  return {
    // userInfo: state.setting.userInfo
  };
};

export default connect(mapStateToProps)(memo(ModalThuHoiVBComponent));
