import {CloseIcon} from '@images/index';
import {RootStackParamList} from '@navigations/NameRoute';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {Component, memo} from 'react';
import {Alert, Text, Pressable, View, Button} from 'react-native';
import {connect} from 'react-redux';
import styles from '../style';
import Modal from 'react-native-modal';
import {TouchComponent} from '../..';
import globalStyle from '../../../theme/style';

export interface Props {
  isVisible?: boolean;
  closePopup: () => void;
}

const ModalActionItemInListComponent = (props: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.centeredView}>
      <Modal
        isVisible={props.isVisible}
        onBackdropPress={() => props.closePopup}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        useNativeDriver
        hideModalContentWhileAnimating>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <View style={globalStyle.row2}> */}
              <Text style={styles.modalText}>Hello World!</Text>
              <TouchComponent onPress={props.closePopup}>
                <Text style={styles.modalText}>Hello World!</Text>
              </TouchComponent>
            {/* </View> */}
            <View>icon</View>
          </View>
        </View>
      </Modal>
      {/* <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable> */}
    </View>
  );
};

ModalActionItemInListComponent.defaultProps = {
  isVisible: false,
  onlyFilePublic: false,
};

const mapStateToProps = (state: any) => {
  return {
    listFileResponse: state.quanly.listFileResponse,
  };
};

export default connect(mapStateToProps)(memo(ModalActionItemInListComponent));
