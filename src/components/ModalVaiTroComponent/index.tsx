import { CloseIcon } from '@images/index';
import { ApiResponse } from '@models/ApiResponse';
import { File } from '@models/File';
import { UserInfo } from '@models/UserInfo';
import { actionDefault, actionLayVaiTro, actionChuyenVaiTro } from '@redux/actions/setting';
import { dismissLoading, getUserLogin, showAlert, showLoading } from '@utils/index';
import React, { memo, useEffect, useMemo, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import Modal from "react-native-modal";
import { connect, useDispatch } from 'react-redux';
import { TouchComponent } from '@components/index';
import styles from './style';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { HomeRoute, RootStackParamList } from '@navigations/NameRoute';
import { saveToken } from '@redux/actions/configs';
import Icon from '@commons/Icon';
import FlatListComponent from '@components/FlatListComponent';

export interface Props {
  token?: string
  isVisible?: boolean
  closePopup: () => void
  listVaiTroRespone: ApiResponse<Array<UserInfo>>;
  chuyenVaiTroRespone: ApiResponse<any>;
}

const ModalVaiTroComponent = (props: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState<UserInfo>()
  const { listVaiTroRespone, chuyenVaiTroRespone } = props
  const [listVaiTro, setListVaiTro] = useState<Array<UserInfo>>()

  useEffect(() => {
    if (props.token) {
      const user: UserInfo = getUserLogin(props.token)
      setUserInfo(user)
    }

    dispatch(actionLayVaiTro());
  }, [])

  useMemo(() => {
    if (!listVaiTroRespone) return
    dismissLoading()
    if (listVaiTroRespone.success) {
      setListVaiTro(listVaiTroRespone.data)
    }
  }, [listVaiTroRespone])

  useMemo(() => {
    if (!chuyenVaiTroRespone) return
    dismissLoading()
    if (chuyenVaiTroRespone.success) {
      dispatch(saveToken({ token: chuyenVaiTroRespone?.data?.token }));
      dispatch(actionDefault())
      navigation.replace(HomeRoute)
    }
  }, [chuyenVaiTroRespone])

  function chuyenvaitro(item?: any) {
    props.closePopup()
    if(userInfo?.roleId !== item?.roleId){
      setTimeout(() => {
        showAlert({
          title: 'Xác nhận',
          message: 'Bạn chắc chắn muốn đổi vai trò?',
          rightAction: () => {
            showLoading()
            dispatch(actionChuyenVaiTro({ idVaiTro: item?.id }));
          }
        })
      }, 500);
    }
  }

  const renderItem = (item: UserInfo, index: number) => (
    <TouchComponent style={styles.viewItem} onPress={() => chuyenvaitro(item)}>
      <Text style={styles.textItem}>
        {item.roleName}
      </Text>
      {
        userInfo?.roleId === item.roleId &&
        <View style={styles.viewCheck}>
          <Icon name='checkmark' size={14} />
        </View>
      }
    </TouchComponent>
  );

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
            <Text style={styles.textTitle}>Đổi vai trò</Text>
            <TouchComponent style={styles.close} onPress={props.closePopup}>
              <CloseIcon />
            </TouchComponent>

          </View>
          <FlatListComponent
            listData={listVaiTro}
            buildItem={renderItem} />
        </View>
      </Modal>
    </View>
  );
};

ModalVaiTroComponent.defaultProps = {
  isVisible: false,
};

const mapStateToProps = (state: any) => {
  return {
    listVaiTroRespone: state.setting.listVaiTroRespone,
    chuyenVaiTroRespone: state.setting.chuyenVaiTroRespone,
    token: state.configs.token,
  };
};

export default connect(mapStateToProps)(memo(ModalVaiTroComponent));
