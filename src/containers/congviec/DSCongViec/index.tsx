import React, { memo, useState, useEffect, useMemo } from 'react';
import { Text, View, ImageBackground, Dimensions, FlatList } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import styles from './style';
import { TouchComponent, HeaderComponent, SearchModalComponent, MenuBottomComponent } from '@components/index'
import { StackNavigationProp } from '@react-navigation/stack';
import { CTCongViecRoute, CTToTrinhRoute, RootStackParamList } from '@navigations/NameRoute';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ApiResponse } from '@models/ApiResponse';
import { showLoading, dismissLoading } from '@utils/index';
import { VanBan } from '@models/VanBan';
import DocumentType from '@commons/DocumentType';
import { actionLayFileDinhKem } from '@redux/actions/quanly';
import FlatListComponent from '@components/FlatListComponent';
import { Menu } from '@models/Menu';
import dayjs from 'dayjs';
import { actionDefaultHSCV, actionDSHSCV } from '@redux/actions/congviec';
import  DSCongViecItemComponent from'./components/DSCongViecItemComponent';
import CTCongViec from '../CTCongViec';
export interface Props {
  dsCongViecResponse?: ApiResponse<Array<VanBan>>
}

export interface RouteParams {
  status?: number;
  menu?: Array<Menu>
}

const DSCongViecScreen = (props: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const routeParams: RouteParams = useRoute().params as RouteParams;
  const dispatch = useDispatch();
  const { dsCongViecResponse } = props
  const [dsThongTinVanBan, setdsThongTinVanBan] = useState<Array<VanBan>>([])
  const [isVisibleSearch, setIsVisibleSearch] = useState<boolean>(false)
  const [menuData, setMenuData] = useState()
  const [paramDS, setParamDS] = useState<{
    pageInfo: { page: number, pageSize: number }
    isLoadMore: boolean,
    needMore: boolean,
    sorts:any,
    status: number | undefined,

  }>({
    pageInfo: {
      page: 1,
      pageSize: 10
    },
    sorts: [],
    isLoadMore: false,
    needMore: true,
    status: 0,
  })

  useEffect(() => {
    const newMenu: any = routeParams?.menu?.map((menu, index) => {
      return {
        ...menu,
        isActive: index == 0
      }
    })
    setMenuData(newMenu)
    setdsThongTinVanBan([])
    showLoading()
    _getDSThongTinVanBan()
    return () => {
			dispatch(actionDefaultHSCV());
		};
  }, [])

  function _getDSThongTinVanBan() {
    dispatch(actionDSHSCV(paramDS))
  }

  useMemo(() => {
    if (!dsCongViecResponse) return
    dismissLoading()
    if (dsCongViecResponse.success) {
      
      if (dsCongViecResponse.data && dsCongViecResponse.data?.length > 0) {
        const pageInfo = {
          ...paramDS.pageInfo,
          page: paramDS.pageInfo.page + 1
        }
        setParamDS({ ...paramDS, isLoadMore: false, needMore: dsCongViecResponse.data?.length == paramDS.pageInfo.pageSize, pageInfo })
        const ds = dsThongTinVanBan.concat(dsCongViecResponse.data)
        setdsThongTinVanBan(ds)
      } else {
        setParamDS({ ...paramDS, isLoadMore: false, needMore: false })
      }

    }
  }, [dsCongViecResponse])

  function _onLoadMore() {
    setParamDS({ ...paramDS, isLoadMore: true })
    _getDSThongTinVanBan()
  }

  function _onSearch(type?: string, param?: any) {
    setIsVisibleSearch(false)
    setdsThongTinVanBan([])
    showLoading()
    paramDS.pageInfo.page = 1
    if (type === 'Y') {
      const start = dayjs().startOf('year')
      const end = dayjs().endOf('year')
      _getDSThongTinVanBan()
      return
    }

    if (type === 'M') {
      const start = dayjs().startOf('month')
      const end = dayjs().endOf('month')
      
      _getDSThongTinVanBan()
      return
    }

    if (type === 'W') {
      const start = dayjs().startOf('week')
      const end = dayjs().endOf('week')
     
      _getDSThongTinVanBan()
      return
    }

    if (type === 'D') {
      const start = dayjs().startOf('day')
      const end = dayjs().endOf('day')
     
      _getDSThongTinVanBan()
      return
    }

    if (param) {
			paramDS.keyword = param.keyword;
			_getDSThongTinVanBan();
			return;
		}

  }

  function _onMenuBottom(status?: number) {
    const newMenu: any = routeParams?.menu?.map((menu, index) => {
      return {
        ...menu,
        isActive: menu.status == status
      }
    })
    setMenuData(newMenu)
    setdsThongTinVanBan([])
    showLoading()
    paramDS.pageInfo.page = 1
    paramDS.status = status
    _getDSThongTinVanBan()
  }

  function _onDocumentItem(id?: string) {
    navigation.push(CTCongViecRoute, { id, status: paramDS.status, onRefresh: _onRefresh })
  }



  function _onRefresh() {
    setdsThongTinVanBan([])
    const paramRefresh: any = {
      pageInfo: {
        page: 1,
        pageSize: 10
      },
      isLoadMore: false,
      needMore: true,
      status: routeParams?.status
    }
    setParamDS(paramRefresh)
    dispatch(actionDSHSCV(paramRefresh))
  }

  const renderItem = (item: any, index: number) => (
    <DSCongViecItemComponent
      key={index}
      item={item}
      onItemPress={_onDocumentItem}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <HeaderComponent
        title='Danh sách công việc'
        isSearch={true}
        showFilter={() => setIsVisibleSearch(true)}
         />
      <View style={styles.documentReceived}>
        <View style={styles.viewList}>
          <FlatListComponent
            listData={dsThongTinVanBan}
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
        type={DocumentType.CONG_VIEC}
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
    dsCongViecResponse: state.congviec.dsHSCVResponse,
  };
};

export default connect(mapStateToProps)(memo(DSCongViecScreen));
