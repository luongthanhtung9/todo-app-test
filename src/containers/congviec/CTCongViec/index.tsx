import React, { memo, useRef, useState, useEffect, useMemo, createRef } from 'react';
import { Text, View, ImageBackground, Dimensions } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { LogoIcon, LoginBG, LoginBGImage } from '@images/index';
import styles from './style';
import TabTitleComponent from './components/TabTitleComponent'
import CheckBox from '@react-native-community/checkbox';
import { HeaderComponent, TouchComponent, ThongTinChungComponent, XuLyComponent, LichSuDeXuatComponent, LichSuXuLyComponent } from '@components/index'
import ViewPager from '@react-native-community/viewpager';
import { actionCTVBDi } from '@redux/actions/vbdi';
import { VanBan } from '@models/VanBan';
import { ApiResponse } from '@models/ApiResponse';
import { useNavigation, useRoute } from '@react-navigation/native';
import { showLoading, dismissLoading, showMessageWarning, showAlert, showMessageSuccess, getUserLogin } from '@utils/index';
import ButtonBottomComponent from '@components/ButtonBottomComponent';
import { actionCTHSCV, actionDefaultHSCV, actionDongHS, actionXoaLKVB } from '@redux/actions/congviec';
import DocumentType from '@commons/DocumentType';
import { CongViec } from '@models/Congviec';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@navigations/NameRoute';
import { ApiResponseNoData } from '@models/ApiResponseNoData';

export interface Props {
  token?: string
  ctHSCVResponse?: ApiResponse<VanBan>
  dongHSResponse?: ApiResponseNoData
  xoaLKVBResponse?: ApiResponseNoData
}

export interface RouteParams {
  id?: string;
  status?: number
  onRefresh?: () => void
}

const CTCongViecScreen = (props: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const viewPagerRef = createRef<ViewPager>()
  const dispatch = useDispatch();
  const routeParams: RouteParams = useRoute().params as RouteParams;
  const { ctHSCVResponse, dongHSResponse, xoaLKVBResponse, token } = props

  const [tabSelected, setTabSelected] = useState(0)
  const [dataCongViec, setData] = useState<CongViec>()
  // const tabData = routeParams.status == 1 ? [
  //   "Thông tin chung",
  //   "Xử lý",
  //   "Lịch sử xử lý",
  // ] : [
  //   "Thông tin chung",
  //   "Lịch sử xử lý",
  // ]

  const tabData = [
    "Thông tin chung",
    "Xử lý",
  ]

  const listButton = [
    {
      label: 'Trình',
      isActive: true
    },
    {
      label: 'Cho ý kiến',
      isActive: false
    },
    {
      label: 'Chuyển đơn vị',
      isActive: false
    },
    {
      label: 'Chuyển trả',
      isActive: false
    },
  ]

  useEffect(() => {
    showLoading()
    dispatch(actionCTHSCV({ id: routeParams.id }))
    return () => {
      dispatch(actionDefaultHSCV());
    };
  }, [])

  useMemo(() => {
    if (!ctHSCVResponse) return
    dismissLoading()
    if (ctHSCVResponse.success) {
      setData(ctHSCVResponse.data)
    } else
      showMessageWarning(ctHSCVResponse.error)
  }, [ctHSCVResponse])

  useMemo(() => {
    if (!dongHSResponse) return
    dismissLoading()
    if (dongHSResponse.success) {
      showMessageSuccess("Đóng hồ sơ thành công")
      dispatch(actionCTHSCV({ id: routeParams.id }))
    } else
      showMessageWarning(dongHSResponse.message)
  }, [dongHSResponse])

  useMemo(() => {
    if (!xoaLKVBResponse) return
    dismissLoading()
    if (xoaLKVBResponse.success) {
      showMessageSuccess("Huỷ liên kết thành công")
      dispatch(actionCTHSCV({ id: routeParams.id }))
    } else
      showMessageWarning(xoaLKVBResponse.message)
  }, [xoaLKVBResponse])

  const _onDongHS = () => {
    showAlert({
      message: 'Bạn chắc chắn muốn đóng hồ sơ',
      rightAction: () => {
        showLoading();
        dispatch(
          actionDongHS({
            id: routeParams?.id
          }),
        );
      },
    });
  }

  const isXoaLBVK = () => {
    if (!dataCongViec || !token) return false
    const user = getUserLogin(token)
    if (dataCongViec.status && dataCongViec.status > 1) return false; //văn bản đã kết thúc thì ko xử lý

    if (dataCongViec.createdBy && dataCongViec.createdBy != user.userId) return false;

    return true;
  }

  const _onXoaLBVK = (item?: any) => {
    showAlert({
      message: 'Bạn chắc chắn muốn xoá liên kết văn bản?',
      rightAction: () => {
        showLoading();
        dispatch(
          actionXoaLKVB({
            ...item,
            workingProfileId: routeParams?.id
          }),
        );
      },
    });
  }


  function _backandrefresh() {
    navigation.pop()
    if (routeParams.onRefresh)
      routeParams.onRefresh()
  }

  function _getViewDS(index: number) {
    if (dataCongViec) {
      if (index == 0)
        return <ThongTinChungComponent
          key={index}
          dataCongViec={dataCongViec}
          type={DocumentType.CONG_VIEC}
          isXoaVBLK={isXoaLBVK()}
          onXoaVBLK={_onXoaLBVK}
        />
      if (index == 1)
        return <XuLyComponent
          type={DocumentType.CONG_VIEC}
          key={index}
          id={routeParams.id}
          onDongHS={_onDongHS} />
      // if (routeParams.status == 1) {
      //   if (index == 1)
      //     return <XuLyComponent type={DocumentType.CONG_VIEC} key={index} id={routeParams.id} />
      //   if (index == 2)
      //     return <LichSuXuLyComponent type={DocumentType.CONG_VIEC} key={index} id={routeParams.id} />
      // } else {
      //   if (index == 1)
      //     return <LichSuXuLyComponent type={DocumentType.CONG_VIEC} key={index} id={routeParams.id} />
      // }

    }

  }

  function _onTrinh() {
    console.log('_onTrinh')
    // setIsVisibleTrinh(true)
  }



  return (
    <View style={{ flex: 1 }}>
      <HeaderComponent
        title='Chi tiết công việc'
      />
      <View style={{ padding: 10, flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.tab}>
          {
            tabData.map((item, index) => (
              <TouchComponent key={index} onPress={() => viewPagerRef?.current?.setPage(index)}>
                <TabTitleComponent title={item} isActive={index == tabSelected} />
              </TouchComponent>
            ))
          }
        </View>
        <View style={styles.pagerView}>
          <ViewPager ref={viewPagerRef} style={styles.viewPager} initialPage={0} onPageSelected={(event) => setTabSelected(event.nativeEvent.position)}>
            {
              tabData.map((item, index) => (
                <View key={index}>
                  {
                    _getViewDS(index)
                  }
                </View>
              ))
            }
          </ViewPager>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state: any) => {
  return {
    ctHSCVResponse: state.congviec.ctHSCVResponse,
    dongHSResponse: state.congviec.dongHSResponse,
    xoaLKVBResponse: state.congviec.xoaLKVBResponse,
    token: state.configs.token,
  };
};

export default connect(mapStateToProps)(memo(CTCongViecScreen));
