import { ArrowDownIcon } from '@images/index';
import { ApiResponse } from '@models/ApiResponse';
import React, { memo, useEffect, useMemo, useState } from 'react';
import { Text, View, Modal, ScrollView } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { InputComponent, SelectComponent, TouchComponent, SelectDateComponent, ButtonComponent } from '@components/index';
import styles from './style';
import { Select } from '@models/Select';
import { actionLayTatCaSo, actionLayTatCaFilterTree, actionLoaiVB, actionlayDanhSachLienKet } from '@redux/actions/quanly';
import { dsDoKhanAction } from '@redux/actions/setting';
import DocumentType from '@commons/DocumentType';

export interface Props {
  listLienKetResponse?: ApiResponse<any>
  dsDoKhanResponse?: ApiResponse<any>
  listTatCaFilterTreeResponse?: ApiResponse<any>
  loaiVBResponse?: ApiResponse<any>
  isVisible?: boolean
  type?: number
  closePopup: () => void
  onSearchForm: (param: any) => void

}

// abstract: null
// bookId: null
// deadlineDate: null
// documentCode: null
// documentDateFrom: null
// documentDateTo: null
// documentType: null
// exceptDocumentType: [5]
// page: 1
// pageSize: 10
// status: null

const listLoaiVanBan: Array<Select> = [
  {
    value: DocumentType.VAN_BAN_DEN,
    label: 'Văn bản đến'
  },
  {
    value: DocumentType.VAN_BAN_DI,
    label: 'Văn bản đi'
  },
  {
    value: DocumentType.TO_TRINH,
    label: 'Tờ trình'
  },

];


const ModalLienKetVanBanComponent = (props: Props) => {
  const {
    isVisible,
    type,
    listLienKetResponse,

  } = props
  const dispatch = useDispatch();
  const [listDonVi, setListDonVi] = useState<Array<Select>>([])
  const [paramSearch, setParamSearch] = useState<any>({})
  const [paramDS, setParamDS] = useState<{
    pageInfo: { page: number, pageSize: number }
    status: any,
    abstract: any
    bookId: any
    exceptDocumentType: any
    deadlineDate: any
    documentCode: any
    documentDateFrom: any
    documentDateTo: any
    documentType: any
  }>({
    pageInfo: {
      page: 1,
      pageSize: 10
    },
    status: null,
    abstract: null,
    bookId: null,
    deadlineDate: null,
    documentCode: null,
    documentDateFrom: null,
    documentDateTo: null,
    documentType: null,
    exceptDocumentType: [5]
  })
  useEffect(() => {
    if (type == DocumentType.CONG_VIEC) {
      dispatch(actionlayDanhSachLienKet(paramDS))
    }


  }, [])

  useMemo(() => {
    if (!listLienKetResponse) return
    if (listLienKetResponse.success) {
      if (listLienKetResponse.data && listLienKetResponse.data.length > 0) {

      }
    }
  }, [listLienKetResponse])




  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        props.closePopup()
      }}>
      <View
        style={styles.container}>
        <TouchComponent onPress={props.closePopup}>
          <ArrowDownIcon />
        </TouchComponent>
        <Text style={styles.titleModal}>Tìm kiếm nâng cao</Text>
        {/* <View style={styles.viewButton}>
          <TouchComponent style={styles.buttonYear} onPress={props.onYear}>
            <Text style={styles.titleButton}>Năm nay</Text>
          </TouchComponent>
          <TouchComponent style={styles.buttonMonth} onPress={props.onMonth}>
            <Text style={styles.titleButton}>Tháng này</Text>
          </TouchComponent>
          <TouchComponent style={styles.buttonWeek} onPress={props.onWeek}>
            <Text style={styles.titleButton}>Tuần này</Text>
          </TouchComponent>
          <TouchComponent style={styles.buttonDay} onPress={props.onDay}>
            <Text style={styles.titleButton}>Hôm nay</Text>
          </TouchComponent>
        </View> */}

        <ScrollView style={{ width: '100%', maxHeight: '80%', marginBottom: 60 }} showsVerticalScrollIndicator={false}>

          {
            props.type == DocumentType.CONG_VIEC &&
            <View style={{ width: '100%', paddingHorizontal: 16 }}>

              <SelectComponent title='Phân loại' data={listLoaiVanBan} onChange={(text) => setParamSearch({ ...paramSearch, searchTrangThai: text })} />
              <SelectComponent title='Loại sổ' data={listDonVi} onChange={(text) => setParamSearch({ ...paramSearch, searchDViSoanThao: text })} />
              <SelectDateComponent title='Ngày tạo(từ ngày)' value={paramSearch.searchHanXuLyTuNgay} onChange={(text) => setParamSearch({ ...paramSearch, searchHanXuLyTuNgay: text })} />
              <SelectDateComponent title='Ngày tạo(đến ngày' value={paramSearch.searchHanXuLyDenNgay} onChange={(text) => setParamSearch({ ...paramSearch, searchHanXuLyDenNgay: text })} />

            </View>
          }

        </ScrollView>

        <View style={styles.bottom}>
          <ButtonComponent title='Chọn' onPress={() => props.onSearchForm(paramSearch)} />
          <ButtonComponent title='Đóng' onPress={props.closePopup} />
        </View>

      </View>
    </Modal>
  );
};

ModalLienKetVanBanComponent.defaultProps = {
};

const mapStateToProps = (state: any) => {
  return {
    listLienKetResponse: state.quanly.listLienKetResponse
  };
};

export default connect(mapStateToProps)(memo(ModalLienKetVanBanComponent));
