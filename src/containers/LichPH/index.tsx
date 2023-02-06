import AppColors from '@commons/AppColors';
import Icon from '@commons/Icon';
import { useStateCallback } from '@commons/useStateCallBack';
import { HeaderComponent, ModalSelectComponent } from '@components/index';
import { ApiResponse } from '@models/ApiResponse';
import { Lich } from '@models/Lich';
import { Select } from '@models/Select';
import { UserInfo } from '@models/UserInfo';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CONTANTS } from '@commons/ActionCheck';
import { showLoading, dismissLoading, getCurrentNumberWeek, getUserLogin } from '@utils/index';
import dayjs from 'dayjs';
import React, { memo, useEffect, useMemo, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import TabComponent from './components/TabComponent';
import { actionDefaultPhongHop, actionGetAllRoom, actionGetPhongHop } from '@redux/actions/phonghop';
import { PhongHop } from '@models/PhongHop';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ChiTietPhongHopRoute, RootStackParamList } from '@navigations/NameRoute';

export interface Props {
  token?: string
  daDuyetResponse: ApiResponse<Array<PhongHop>>;
  roomResponse: ApiResponse<Array<any>>;
}

const LICHTYPE = {
  TONGCUC: 'TONGCUC',
  CUC: 'CUC',
};

const LichPHScreen = (props: Props) => {
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const {
    token,
    daDuyetResponse,
    roomResponse
  } = props
  const thuhientai = dayjs().day()
  const monthNow = dayjs().month() + 1
  const [dayStartWeek, setDayStartWeek] = useState(dayjs().startOf('week').add(1, 'days').format('DD/MM/YYYY'))
  const [dayEndWeek, setDayEndWeek] = useState(dayjs().endOf('week').add(1, 'days').format('DD/MM/YYYY'))
  const [currentNumberWeek, setCurrentNumberWeek] = useState<number>(getCurrentNumberWeek())
  const [currentMonth, setCurrentMonth] = useState<number>(monthNow)
  const [listDataAll, setListDataAll] = useState<Array<Lich>>([])
  const [listData, setListData] = useState<Array<PhongHop>>([])
  const [listLD, setListLD] = useState<Array<Select>>([])
  const [isSelectLD, setIsSelectLD] = useState<boolean>(false)
  const [leadUserName, setLeadUserName] = useState<string>('Chọn phòng họp')
  const [userInfo, setUserInfo] = useState<UserInfo>()
  const [param, setParam] = useState({
    fromDate: dayjs().startOf('week').add(1, 'days').format('YYYY-MM-DD'),
    toDate: dayjs().endOf('week').add(1, 'days').format('YYYY-MM-DD')
  })

  const [listDayofWeek, setListDayofWeek] = useState([
    {
      stt: 1,
      thu: 'T2',
      ngay: getDayInWeek(1),
      isSelect: thuhientai == 1
    },
    {
      stt: 2,
      thu: 'T3',
      ngay: getDayInWeek(2),
      isSelect: thuhientai == 2
    },
    {
      stt: 3,
      thu: 'T4',
      ngay: getDayInWeek(3),
      isSelect: thuhientai == 3
    },
    {
      stt: 4,
      thu: 'T5',
      ngay: getDayInWeek(4),
      isSelect: thuhientai == 4
    },
    {
      stt: 5,
      thu: 'T6',
      ngay: getDayInWeek(5),
      isSelect: thuhientai == 5
    },
    {
      stt: 6,
      thu: 'T7',
      ngay: getDayInWeek(6),
      isSelect: thuhientai == 6
    },
    {
      stt: 7,
      thu: 'CN',
      ngay: getDayInWeek(7),
      isSelect: thuhientai == 7
    }
  ])

  useEffect(() => {
    showLoading()
    getPH()
    getLichPH()
    return () => {
      dispatch(actionDefaultPhongHop())
    }
  }, [])

  useMemo(() => {
    if (!daDuyetResponse) return
    dismissLoading()
    if (daDuyetResponse.success) {
      if (daDuyetResponse.data) {
        setListData(daDuyetResponse?.data)
      }
    }
  }, [daDuyetResponse])

  useMemo(() => {
    if (!roomResponse) return
    dismissLoading()
    if (roomResponse.success) {
      if (roomResponse.data && roomResponse.data.length > 0) {
        const dsLD: Array<Select> = roomResponse.data.map((ld) => {
          return {
            label: ld.name,
            value: ld.id
          }
        })

        setListLD(dsLD)
      }
    }
  }, [roomResponse])

  function getPH() {
    const body = {
      pageInfo: {
        page: '1',
        pageSize: '100',
      },
      sorts: [],
      filters: [],
      keyword: '',
    };
    dispatch(actionGetAllRoom(body));
  }

  function getLichPH() {
    dispatch(actionGetPhongHop(param))
  }

  function getDayInWeek(index: number) {
    return dayjs().startOf('week').add(index, 'days').format('DD')
  }

  const onItemPress = (item?: PhongHop) => {
    navigation.push(ChiTietPhongHopRoute, { id: item?.id, onRefresh: _onRefresh });
  };

  function _onRefresh() {
    setLeadUserName('Chọn phòng họp')
    setListData([])
    setCurrentNumberWeek(getCurrentNumberWeek())
    setCurrentMonth(monthNow)
    setListDayofWeek([
      {
        stt: 1,
        thu: 'T2',
        ngay: getDayInWeek(1),
        isSelect: thuhientai == 1
      },
      {
        stt: 2,
        thu: 'T3',
        ngay: getDayInWeek(2),
        isSelect: thuhientai == 2
      },
      {
        stt: 3,
        thu: 'T4',
        ngay: getDayInWeek(3),
        isSelect: thuhientai == 3
      },
      {
        stt: 4,
        thu: 'T5',
        ngay: getDayInWeek(4),
        isSelect: thuhientai == 4
      },
      {
        stt: 5,
        thu: 'T6',
        ngay: getDayInWeek(5),
        isSelect: thuhientai == 5
      },
      {
        stt: 6,
        thu: 'T7',
        ngay: getDayInWeek(6),
        isSelect: thuhientai == 6
      },
      {
        stt: 7,
        thu: 'CN',
        ngay: getDayInWeek(7),
        isSelect: thuhientai == 7
      }
    ])
    const paramRefresh = {
      fromDate: dayjs().startOf('week').add(1, 'days').format('YYYY-MM-DD'),
      toDate: dayjs().endOf('week').add(1, 'days').format('YYYY-MM-DD'),
    }
    setParam(paramRefresh)
    dispatch(actionGetPhongHop(paramRefresh))
  }

  function _onSelectLD() {
    setIsSelectLD(true)
  }

  function _onAcceptLD(select: Select) {
    setIsSelectLD(false)
    setLeadUserName(select?.label || 'Chọn lãnh đạo')
    const paramSelect = {
      ...param,
      meetingRoomId: select.value
    }
    setParam(paramSelect)
    dispatch(actionGetPhongHop(paramSelect))
  }

  function _onWeekNow() {
    _onRefresh()
  }


  function onChangeDate(fromDate: string, toDate: string, newList: Array<any>, newWeek: number, newMonth: string) {
    setListData([])
    setLeadUserName('Chọn phòng họp')
    showLoading()
    setListDayofWeek(newList)
    setCurrentNumberWeek(newWeek)
    setCurrentMonth(Number(newMonth))
    dispatch(actionGetPhongHop({ ...param, fromDate, toDate }))

  }

  return (
    <>
      <HeaderComponent
        title='Phòng họp'
      />
      <TabComponent
        title='LichLanhDao'
        listData={listData}
        listDayofWeek={listDayofWeek}
        currentNumberWeek={currentNumberWeek}
        currentMonth={currentMonth}
        leadUserName={leadUserName}
        isUserTc={userInfo?.deptCode === CONTANTS.CodeTCDT}
        onItemClick={onItemPress}
        onWeekNow={_onWeekNow}
        onChangeLD={_onSelectLD}
        onRefresh={_onRefresh}
        onChangeDate={onChangeDate}
        param={param} />


      <ModalSelectComponent
        title="Chọn phòng họp"
        isSelect={isSelectLD}
        data={listLD}
        onClose={() => setIsSelectLD(false)}
        onAccept={_onAcceptLD}
      />
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    daDuyetResponse: state.phonghop.daDuyetResponse,
    roomResponse: state.phonghop.roomResponse,
    token: state.configs.token,
  };
};

export default connect(mapStateToProps)(memo(LichPHScreen));
