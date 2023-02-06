import {
  ButtonComponent,
  InputComponent,
  TouchComponent,
} from '@components/index';
import {CloseIcon, LSNhanIcon} from '@images/index';
import {showMessageWarning} from '@utils/index';
import React, {memo, useState} from 'react';
import {Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import styles from './style';

export interface Props {
  isVisible?: boolean;
  closePopup: () => void;
  onAccept: (noiDung: string) => void;
}

const ModalTraLoiComponent = (props: Props) => {
  const [noiDung, setNoiDung] = useState<string>();

  function _onAccept() {
    if (!noiDung) {
      showMessageWarning('Bạn phải nhập nội dung duyệt.');
    } else props.onAccept(noiDung);
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
        <View style={styles.container}>
          <View style={styles.viewTitle}>
            <Text style={styles.textTitle}>Trả văn bản</Text>
            <TouchComponent style={styles.close} onPress={props.closePopup}>
              <CloseIcon />
            </TouchComponent>
          </View>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#fff000',
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 10,
             
            }}>
            
            <LSNhanIcon />
            <Text>20/02/2022</Text>
          </View>

          <InputComponent
            title="Nôi dung"
            multiline={true}
            numberOfLines={3}
            onChange={setNoiDung}
          />
          <View style={styles.viewButton}>
            <ButtonComponent
              style={{width: '40%'}}
              title="Đóng"
              onPress={props.closePopup}
            />
            <ButtonComponent
              style={{width: '40%'}}
              title="Xác nhận"
              onPress={_onAccept}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

ModalTraLoiComponent.defaultProps = {
  isVisible: false,
};

const mapStateToProps = (state: any) => {
  return {};
};

export default connect(mapStateToProps)(memo(ModalTraLoiComponent));
