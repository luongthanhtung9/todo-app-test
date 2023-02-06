import AppColors from '@commons/AppColors';
import Icon from '@commons/Icon';
import { useStateCallback } from '@commons/useStateCallBack';
import { HeaderComponent, ModalSelectComponent } from '@components/index';
import { ApiResponse } from '@models/ApiResponse';
import { Lich } from '@models/Lich';
import { Select } from '@models/Select';
import { UserInfo } from '@models/UserInfo';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { actionDefaultLich, actionLichLD } from '@redux/actions/lich';
import { CONTANTS } from '@commons/ActionCheck';
import { showLoading, dismissLoading, getCurrentNumberWeek, getUserLogin } from '@utils/index';
import dayjs from 'dayjs';
import React, { memo, useEffect, useMemo, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import TabComponent from './components/TabComponent';

export interface Props {
  token?: string
  lichLDResponse: ApiResponse<Array<Lich>>;
}

const LICHTYPE = {
  TONGCUC: 'TONGCUC',
  CUC: 'CUC',
};

const LichLDScreen = (props: Props) => {
  const Tab = createBottomTabNavigator();
  const dispatch = useDispatch();
  const {
    token,
    lichLDResponse,
  } = props
  const thuhientai = dayjs().day()
  const monthNow = dayjs().month() + 1
  const [dayStartWeek, setDayStartWeek] = useState(dayjs().startOf('week').add(1, 'days').format('DD/MM/YYYY'))
  const [dayEndWeek, setDayEndWeek] = useState(dayjs().endOf('week').add(1, 'days').format('DD/MM/YYYY'))
  const [currentNumberWeek, setCurrentNumberWeek] = useState<number>(getCurrentNumberWeek())
  const [currentMonth, setCurrentMonth] = useState<number>(monthNow)
  const [listDataAll, setListDataAll] = useState<Array<Lich>>([])
  const [listData, setListData] = useState<Array<Lich>>([])
  const [listLD, setListLD] = useState<Array<Select>>([])
  const [isSelectLD, setIsSelectLD] = useState<boolean>(false)
  const [leadUserName, setLeadUserName] = useState<string>('Chọn lãnh đạo')
  const [userInfo, setUserInfo] = useState<UserInfo>()
  const [param, setParam] = useState({
    fromDate: dayjs().startOf('week').add(1, 'days').format('YYYY-MM-DD'),
    toDate: dayjs().endOf('week').add(1, 'days').format('YYYY-MM-DD'),
    type: LICHTYPE.CUC,
  })

  const [listDayofWeek, setListDayofWeek] = useState([
    {
      stt: 1,
      thu: 'T2',
      ngay: getDayInWeek(1),
      isNow: thuhientai == 1,
      isSelect: false
    },
    {
      stt: 2,
      thu: 'T3',
      ngay: getDayInWeek(2),
      isNow: thuhientai == 2,
      isSelect: false
    },
    {
      stt: 3,
      thu: 'T4',
      ngay: getDayInWeek(3),
      isNow: thuhientai == 3,
      isSelect: false
    },
    {
      stt: 4,
      thu: 'T5',
      ngay: getDayInWeek(4),
      isNow: thuhientai == 4,
      isSelect: false
    },
    {
      stt: 5,
      thu: 'T6',
      ngay: getDayInWeek(5),
      isNow: thuhientai == 5,
      isSelect: false
    },
    {
      stt: 6,
      thu: 'T7',
      ngay: getDayInWeek(6),
      isNow: thuhientai == 6,
      isSelect: false
    },
    {
      stt: 7,
      thu: 'CN',
      ngay: getDayInWeek(7),
      isNow: thuhientai == 7,
      isSelect: false
    }
  ])

  useEffect(() => {
    showLoading()
    kiemTraND()
    getLich()
    return () => {
      dispatch(actionDefaultLich())
    }
  }, [])

  useMemo(() => {
    if (!lichLDResponse) return
    dismissLoading()
    if (lichLDResponse.success) {
      if (lichLDResponse.data && lichLDResponse.data.length > 0) {
        const dsLD: Array<Select> = lichLDResponse.data.filter(ld => ld.type === 's').map((ld) => {
          return {
            label: ld.leadUserName,
            value: ld.leadUserId
          }
        })

        setListLD(dsLD)
        var ds: Array<Lich> = []
        lichLDResponse.data.forEach(element => {
          if (element.cvT2) {
            const title = element.cvT2.split('</h1>')[0].split('>')[1]
            const content = element.cvT2.split('</h1>')[1]
            ds.push({ ...element, thu: 'T2', thuText: 'Thứ 2', title, content })
          }
          if (element.cvT3) {
            const title = element.cvT3.split('</h1>')[0].split('>')[1]
            const content = element.cvT3.split('</h1>')[1]
            ds.push({ ...element, thu: 'T3', thuText: 'Thứ 3', title, content })
          }
          if (element.cvT4) {
            const title = element.cvT4.split('</h1>')[0].split('>')[1]
            const content = element.cvT4.split('</h1>')[1]
            ds.push({ ...element, thu: 'T4', thuText: 'Thứ 4', title, content })
          }
          if (element.cvT5) {
            const title = element.cvT5.split('</h1>')[0].split('>')[1]
            const content = element.cvT5.split('</h1>')[1]
            ds.push({ ...element, thu: 'T5', thuText: 'Thứ 5', title, content })
          }
          if (element.cvT6) {
            const title = element.cvT6.split('</h1>')[0].split('>')[1]
            const content = element.cvT6.split('</h1>')[1]
            ds.push({ ...element, thu: 'T6', thuText: 'Thứ 6', title, content })
          }
          if (element.cvT7) {
            const title = element.cvT7.split('</h1>')[0].split('>')[1]
            const content = element.cvT7.split('</h1>')[1]
            ds.push({ ...element, thu: 'T7', thuText: 'Thứ 7', title, content })
          }
          if (element.cvCN) {
            const title = element.cvCN.split('</h1>')[0].split('>')[1]
            const content = element.cvCN.split('</h1>')[1]
            ds.push({ ...element, thu: 'CN', thuText: 'Chủ nhật', title, content })
          }
        });
        setListData(ds)
        setListDataAll(ds)
      }
    }
  }, [lichLDResponse])

  function kiemTraND() {
    if (!token) return
    const user: UserInfo = getUserLogin(token)
    setUserInfo(user)
    if (user.deptCode === CONTANTS.CodeTCDT) {
      setParam({ ...param, type: LICHTYPE.TONGCUC })
    } else {
      setParam({ ...param, type: LICHTYPE.CUC })
    }
  }

  function getLich() {
    dispatch(actionLichLD(param))
  }

  function getDayInWeek(index: number) {
    return dayjs().startOf('week').add(index, 'days').format('DD')
  }

  function _onRefresh() {
    setLeadUserName('Chọn lãnh đạo')
    setListData([])
    setCurrentNumberWeek(getCurrentNumberWeek())
    setCurrentMonth(monthNow)
    setListDayofWeek([
      {
        stt: 1,
        thu: 'T2',
        ngay: getDayInWeek(1),
        isNow: thuhientai == 1,
        isSelect: false
      },
      {
        stt: 2,
        thu: 'T3',
        ngay: getDayInWeek(2),
        isNow: thuhientai == 2,
        isSelect: false
      },
      {
        stt: 3,
        thu: 'T4',
        ngay: getDayInWeek(3),
        isNow: thuhientai == 3,
        isSelect: false
      },
      {
        stt: 4,
        thu: 'T5',
        ngay: getDayInWeek(4),
        isNow: thuhientai == 4,
        isSelect: false
      },
      {
        stt: 5,
        thu: 'T6',
        ngay: getDayInWeek(5),
        isNow: thuhientai == 5,
        isSelect: false
      },
      {
        stt: 6,
        thu: 'T7',
        ngay: getDayInWeek(6),
        isNow: thuhientai == 6,
        isSelect: false
      },
      {
        stt: 7,
        thu: 'CN',
        ngay: getDayInWeek(7),
        isNow: thuhientai == 7,
        isSelect: false
      }
    ])
    const paramRefresh = {
      fromDate: dayjs().startOf('week').add(1, 'days').format('YYYY-MM-DD'),
      toDate: dayjs().endOf('week').add(1, 'days').format('YYYY-MM-DD'),
      type: param.type,
    }
    setParam(paramRefresh)
    dispatch(actionLichLD(paramRefresh))
  }

  function _onLDTC() {
    setLeadUserName('Chọn lãnh đạo')
    setListData([])
    const paramLDTC = {
      fromDate: dayjs().startOf('week').add(1, 'days').format('YYYY-MM-DD'),
      toDate: dayjs().endOf('week').add(1, 'days').format('YYYY-MM-DD'),
      type: LICHTYPE.TONGCUC,
    }
    setParam(paramLDTC)
    dispatch(actionLichLD(paramLDTC))
  }

  function _onLDDV() {
    setLeadUserName('Chọn lãnh đạo')
    setListData([])
    const paramLDDV = {
      fromDate: dayjs().startOf('week').add(1, 'days').format('YYYY-MM-DD'),
      toDate: dayjs().endOf('week').add(1, 'days').format('YYYY-MM-DD'),
      type: LICHTYPE.CUC,
    }
    setParam(paramLDDV)
    dispatch(actionLichLD(paramLDDV))
  }

  function _onSelectLD() {
    setIsSelectLD(true)
  }

  function _onAcceptLD(select: Select) {
    setIsSelectLD(false)
    setLeadUserName(select?.label || 'Chọn lãnh đạo')
    const newDS = listDataAll.filter(item => item.leadUserId === select.value)
    setListData(newDS)
  }

  function _onWeekNow() {
    _onRefresh()
  }


  function onChangeDate(fromDate: string, toDate: string, newList: Array<any>, newWeek: number, newMonth: string) {
    setListData([])
    setLeadUserName('Chọn lãnh đạo')
    showLoading()
    setListDayofWeek(newList)
    setCurrentNumberWeek(newWeek)
    setCurrentMonth(Number(newMonth))
    dispatch(actionLichLD({ ...param, fromDate, toDate }))

  }

  const _onDaySelect = (item?: any) => {
    const newDS = listDataAll.filter(lich => lich.thu === item.thu)
    const newListDayofWeek = listDayofWeek.map((day) => {
      return {
        ...day,
        isSelect: item.thu == day.thu
      }
    })
    setListDayofWeek(newListDayofWeek)
    setListData(newDS)
  }

  return (
    <>
      <HeaderComponent
        title='Lịch lãnh đạo'
      />
      <TabComponent
        title='LichLanhDao'
        listData={listData}
        listDayofWeek={listDayofWeek}
        currentNumberWeek={currentNumberWeek}
        currentMonth={currentMonth}
        leadUserName={leadUserName}
        onLDTC={_onLDTC}
        onLDDV={_onLDDV}
        isUserTc={userInfo?.deptCode === CONTANTS.CodeTCDT}
        onWeekNow={_onWeekNow}
        onChangeLD={_onSelectLD}
        onRefresh={_onRefresh}
        onChangeDate={onChangeDate}
        onDaySelect={_onDaySelect}
        param={param} />


      <ModalSelectComponent
        title="Chọn lãnh đạo"
        isSelect={isSelectLD}
        data={listLD}
        onClose={() => setIsSelectLD(false)}
        onAccept={_onAcceptLD}
      />

      {/* <Tab.Navigator
        initialRouteName="LichHop"
        screenOptions={{ headerShown: false }}
        screenListeners={{
          tabPress: e => {
            showLoading()
            if (e.target?.split('-')[0] === LICHTYPE.LICHHOP)
              param.type = 1
            if (e.target?.split('-')[0] === LICHTYPE.LICHLANHDAO)
              param.type = 2
            if (e.target?.split('-')[0] === LICHTYPE.LICHXE)
              param.type = 3
            _onRefresh()
          },
        }}
      >
        <Tab.Screen
          name="LichHop"
          options={{
            title: "Lịch họp",
            tabBarInactiveTintColor: 'gray',
            tabBarActiveTintColor: AppColors.iconColor,
            tabBarIcon: ({ color, size }) => (
              <Icon name="meetingroom" color={color} size={size} />
            ),
          }}
          component={() => (
            <TabComponent
              title='LichHop'
              listData={listData}
              listDayofWeek={listDayofWeek}
              currentNumberWeek={currentNumberWeek}
              currentMonth={currentMonth}
              onRefresh={_onRefresh}
              onLoadMore={_onLoadMore}
              onChangeDate={onChangeDate}
              param={param} />
          )}
        />
        <Tab.Screen
          name="LichLanhDao"
          options={{
            title: "Lịch lãnh đạo",
            tabBarInactiveTintColor: 'gray',
            tabBarActiveTintColor: AppColors.iconColor,
            tabBarIcon: ({ color, size }) => (
              <Icon name="use-21" color={color} size={size} />
            ),
          }}
          component={() => (
            <TabComponent
              title='LichLanhDao'
              listData={listData}
              listDayofWeek={listDayofWeek}
              currentNumberWeek={currentNumberWeek}
              currentMonth={currentMonth}
              onRefresh={_onRefresh}
              onLoadMore={_onLoadMore}
              onChangeDate={onChangeDate}
              param={param} />
          )}
        />
        <Tab.Screen
          name="LichXe"
          options={{
            title: 'Lịch xe',
            tabBarInactiveTintColor: 'gray',
            tabBarActiveTintColor: AppColors.iconColor,
            tabBarIcon: ({ color, size }) => (
              <Icon name="laixe" color={color} size={size} />
            ),
          }}
          component={() => (
            <TabComponent
              title='LichXe'
              listData={listData}
              listDayofWeek={listDayofWeek}
              currentNumberWeek={currentNumberWeek}
              currentMonth={currentMonth}
              onRefresh={_onRefresh}
              onLoadMore={_onLoadMore}
              onChangeDate={onChangeDate}
              param={param} />
          )}
        />

      </Tab.Navigator> */}
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    lichLDResponse: state.lich.lichLDResponse,
    ktraNDResponse: state.quanly.ktraNDResponse,
    token: state.configs.token,
  };
};

export default connect(mapStateToProps)(memo(LichLDScreen));
