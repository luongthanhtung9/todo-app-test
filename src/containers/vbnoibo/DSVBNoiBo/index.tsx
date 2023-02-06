import React, { memo, useEffect, useMemo, useState } from 'react';
import { Text, View, ImageBackground, Dimensions, FlatList } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { LogoIcon, LoginBG, LoginBGImage } from '@images/index';
import styles from './style';
import CheckBox from '@react-native-community/checkbox';
import { TouchComponent, HeaderComponent, ItemPageComponent } from '@components/index'
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import DocumentDetail from '@containers/vbden/CTVBDen';
import { GhiLaiIcon, ChoXuLyIcon, DaXuLyIcon, ThuHoiIcon, VBTrinhBanHanhIcon, ChoChoYKienIcon, NhanDeBietIcon, BaoCaoInSoIcon, DaChoYKienIcon } from '@images/index'
import DocumentReceivedItemComponent from './components/DocumentReceivedItemComponent';
import { RootStackParamList } from '@navigations/NameRoute';
import { VanBan } from '@models/VanBan';
import { dismissLoading, showLoading } from '@utils/index';
import { actionDSToTrinh } from '@redux/actions/totrinh';
import DocumentType from '@commons/DocumentType';
import { actionLayFileDinhKem } from '@redux/actions/quanly';
import { ApiResponse } from '@models/ApiResponse';
export interface Props {
  status?: number
  dsToTrinhResponse?: ApiResponse<Array<VanBan>>
}

const DSVBNoiBoScreen = (props: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const { dsToTrinhResponse } = props
  const [dsToTrinh, setDSToTrinh] = useState<Array<VanBan>>()

  useEffect(() => {
    const param = {
      pageInfo: {
        page: 1,
        pageSize: 10
      },
      status: 13
    }
    showLoading()
  }, [])

  useMemo(() => {
    if (!dsToTrinhResponse) return
    dismissLoading()
    if (dsToTrinhResponse.success) {
      setDSToTrinh(dsToTrinhResponse.data)
    }
  }, [dsToTrinhResponse])

  function _onDocumentReceivedItem() {
    // navigation.push(PdfViewRoute)
  }

  function _onFilePress(id?: string) {
    const param = {
      idVanBan: id,
      loai: DocumentType.TO_TRINH,
      onlyFilePublic: false
    }
    showLoading()
    dispatch(actionLayFileDinhKem(param));
  }

  const renderItem = ({ item }: any) => (
    <DocumentReceivedItemComponent
      key={item.title}
      item={item}
      onItemPress={_onDocumentReceivedItem}
      />
  );

  return (
    <View>
      <HeaderComponent
        title='Danh sách văn bản nội bộ'
        isSearch={true} />
      <View style={styles.documentReceived}>
        <FlatList
          data={dsToTrinh}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item: VanBan, index: number) => index.toString()}
        />
      </View>

    </View>
  );
};

const mapStateToProps = (state: any) => {
  return {
    dsToTrinhResponse: state.totrinh.dsToTrinhResponse,
  };
};

export default connect(mapStateToProps)(memo(DSVBNoiBoScreen));
