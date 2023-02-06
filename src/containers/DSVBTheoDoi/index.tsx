import React, { memo, useState, useEffect, useMemo } from 'react';
import { Text, View, ImageBackground, Dimensions, FlatList } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { LogoIcon, LoginBG, LoginBGImage } from '@images/index';
import styles from './style';
import DSToTrinhItemComponent from './components/DSToTrinhItemComponent'
import CheckBox from '@react-native-community/checkbox';
import { TouchComponent, HeaderComponent, SearchModalComponent, MenuBottomComponent } from '@components/index'
import { StackNavigationProp } from '@react-navigation/stack';
import { CTToTrinhRoute, RootStackParamList } from '@navigations/NameRoute';
import { useNavigation, useRoute } from '@react-navigation/native';
import DocumentDetail from '@containers/vbden/CTVBDen';
import { actionDSToTrinh } from '@redux/actions/totrinh';
import { ApiResponse } from '@models/ApiResponse';
import { showLoading, dismissLoading } from '@utils/index';
import { VanBan } from '@models/VanBan';
import DocumentType from '@commons/DocumentType';
import { actionLayFileDinhKem } from '@redux/actions/quanly';
import FlatListComponent from '@components/FlatListComponent';
import { Menu } from '@models/Menu';
import dayjs from 'dayjs';
export interface Props {
  dsToTrinhResponse?: ApiResponse<Array<VanBan>>
}

// export interface RouteParams {
//   menu?: Array<Menu>
// }

const DSVBTheoDoiScreen = (props: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  // const routeParams: RouteParams = useRoute().params as RouteParams;
  const dispatch = useDispatch();
  const { dsToTrinhResponse } = props
  const [dsToTrinh, setDSToTrinh] = useState<Array<VanBan>>([])
  const [isVisibleSearch, setIsVisibleSearch] = useState<boolean>(false)
  // const [menuData, setMenuData] = useState()
  const [paramDS, setParamDS] = useState<{
    pageInfo: {page: number,pageSize: number}
    isLoadMore: boolean,
    needMore: boolean,
    status: number,
    searchNgayTaoTuNgay: any
    searchNgayTaoDenNgay: any,
    seachTrichYeu: string,
    searchDViSoanThao: string,
    searchHanXuLyTuNgay: any,
    searchHanXuLyDenNgay: any,
    searchDoKhan: string,
    searchKeyword: string,
    searchSo: string,
    searchSoVanBan: string,
    searchTrangThai: string,
  }>({
    pageInfo: {
      page: 1,
      pageSize: 10
    },
    isLoadMore: false,
    needMore: true,
    status: 14,
    searchNgayTaoTuNgay: undefined,
    searchNgayTaoDenNgay: undefined,
    seachTrichYeu: '',
    searchDViSoanThao: '',
    searchHanXuLyTuNgay: undefined,
    searchHanXuLyDenNgay: undefined,
    searchDoKhan: '',
    searchKeyword: '',
    searchSo: '',
    searchSoVanBan: '',
    searchTrangThai: '',
  })

  useEffect(() => {
    // const newMenu: any = routeParams?.menu?.map((menu, index) => {
    //   return {
    //     ...menu,
    //     isActive: index == 0
    //   }
    // })
    // setMenuData(newMenu)
    setDSToTrinh([])
    showLoading()
    _getDSToTrinh()
  }, [])

  function _getDSToTrinh() {
    dispatch(actionDSToTrinh(paramDS))
  }

  useMemo(() => {
    if (!dsToTrinhResponse) return
    dismissLoading()
    if (dsToTrinhResponse.success) {
      if (dsToTrinhResponse.data && dsToTrinhResponse.data?.length > 0) {
        const pageInfo = {
          ...paramDS.pageInfo,
          page: paramDS.pageInfo.page + 1
        }
        setParamDS({ ...paramDS, isLoadMore: false, needMore: dsToTrinhResponse.data?.length == paramDS.pageInfo.pageSize, pageInfo })
        const ds = dsToTrinh.concat(dsToTrinhResponse.data)
        setDSToTrinh(ds)
      } else {
        setParamDS({ ...paramDS, isLoadMore: false, needMore: false })
      }

    }
  }, [dsToTrinhResponse])

  function _onLoadMore() {
    setParamDS({ ...paramDS, isLoadMore: true })
    _getDSToTrinh()
  }

  function _onSearch(type?: string, param?: any) {
    setIsVisibleSearch(false)
    setDSToTrinh([])
    showLoading()
    paramDS.pageInfo.page = 1
    if (type === 'Y') {
      const start = dayjs().startOf('year')
      const end = dayjs().endOf('year')
      paramDS.searchNgayTaoTuNgay = start
      paramDS.searchNgayTaoDenNgay = end
      _getDSToTrinh()
      return
    }

    if (type === 'M') {
      const start = dayjs().startOf('month')
      const end = dayjs().endOf('month')
      paramDS.searchNgayTaoTuNgay = start
      paramDS.searchNgayTaoDenNgay = end
      _getDSToTrinh()
      return
    }

    if (type === 'W') {
      const start = dayjs().startOf('week')
      const end = dayjs().endOf('week')
      paramDS.searchNgayTaoTuNgay = start
      paramDS.searchNgayTaoDenNgay = end
      _getDSToTrinh()
      return
    }

    if (type === 'D') {
      const start = dayjs().startOf('day')
      const end = dayjs().endOf('day')
      paramDS.searchNgayTaoTuNgay = start
      paramDS.searchNgayTaoDenNgay = end
      _getDSToTrinh()
      return
    }

    if (param) {
      paramDS.seachTrichYeu = param.seachTrichYeu
      paramDS.searchDViSoanThao = param.searchDViSoanThao
      paramDS.searchDoKhan = param.searchDoKhan
      paramDS.searchHanXuLyTuNgay = param.searchHanXuLyTuNgay
      paramDS.searchHanXuLyDenNgay = param.searchHanXuLyDenNgay
      paramDS.searchKeyword = param.searchKeyword
      paramDS.searchNgayTaoTuNgay = param.searchNgayTaoTuNgay
      paramDS.searchNgayTaoDenNgay = param.searchNgayTaoDenNgay
      paramDS.searchSo = param.searchSo
      paramDS.searchSoVanBan = param.searchSoVanBan
      paramDS.searchTrangThai = param.searchTrangThai
      _getDSToTrinh()
      return
    }

  }

  // function _onMenuBottom(status?: number) {
  //   const newMenu: any = routeParams?.menu?.map((menu, index) => {
  //     return {
  //       ...menu,
  //       isActive: menu.status == status
  //     }
  //   })
  //   setMenuData(newMenu)
  //   setDSToTrinh([])
  //   showLoading()
  //   paramDS.pageInfo.page = 1
  //   // paramDS.status = status
  //   _getDSToTrinh()
  // }

  function _onDocumentItem(id?: string) {
    navigation.push(CTToTrinhRoute, { id })
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

  function _onRefresh() {
    setDSToTrinh([])
    const paramRefresh: any = {
      pageInfo: {
        page: 1,
        pageSize: 10
      },
      isLoadMore: false,
      needMore: true,
      status: 14
    }
    setParamDS(paramRefresh)
    dispatch(actionDSToTrinh(paramRefresh))
  }

  const renderItem = (item: any, index: number) => (
    <DSToTrinhItemComponent
      key={index}
      item={item}
      onItemPress={_onDocumentItem}
      onFilePress={_onFilePress}
    />
  );

  return (
    <View>
      <HeaderComponent
        title='Danh sách văn bản theo dõi'
        isSearch={true}
        showFilter={() => setIsVisibleSearch(true)} />
      <View style={styles.documentReceived}>
        <View style={styles.viewList}>
          <FlatListComponent
            listData={dsToTrinh}
            isLoadMore={paramDS.isLoadMore}
            needMore={paramDS.needMore}
            buildItem={renderItem}
            onLoadMore={_onLoadMore}
            onRefresh={_onRefresh}
          />
        </View>
        {/* <MenuBottomComponent menu={menuData} getDS={_onMenuBottom} /> */}
      </View>

      <SearchModalComponent
        isVisible={isVisibleSearch}
        closePopup={() => setIsVisibleSearch(false)}
        onYear={() => _onSearch('Y')}
        onMonth={() => _onSearch('M')}
        onWeek={() => _onSearch('W')}
        onDay={() => _onSearch('D')}
        onSearchForm={(param) => _onSearch('S', param)} />
    </View>
  );
};

const mapStateToProps = (state: any) => {
  return {
    dsToTrinhResponse: state.totrinh.dsToTrinhResponse,
  };
};

export default connect(mapStateToProps)(memo(DSVBTheoDoiScreen));
