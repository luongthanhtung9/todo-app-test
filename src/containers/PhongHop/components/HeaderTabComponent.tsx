import AppColors from '@commons/AppColors';
import Icon from '@commons/Icon';
import { TouchComponent } from '@components/index';
import { getCurrentNumberWeek } from '@utils/index';
import dayjs from 'dayjs';
import React, { memo } from 'react';
import {
    StyleSheet, Text,
    View
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';

export interface Props {
    title?: string
    listDayofWeek?: Array<any>
    currentNumberWeek?: number
    currentMonth?: number
    onChangeDate?: (fromDate: string, toDate: string, newList: Array<any>, newWeek: number, newMonth: string) => void;
}

const HeaderTabComponent = (props: Props) => {
    const { title, listDayofWeek, currentNumberWeek, currentMonth } = props
    const thuhientai = dayjs().day()
    const dayNow = Number(dayjs(new Date()).format('DD'))
    const monthNow = dayjs().month() + 1
    const yearNow = dayjs().year()
    const nowNumberWeek = getCurrentNumberWeek()
    // const [currentNumberWeek, setCurrentNumberWeek] = useState<number>(getCurrentNumberWeek())
    // const [currentMonth, setCurrentMonth] = useState<number>(monthNow)
    // const listDayofWeekCurrent = props.listDayofWeek

    // const [listDayofWeek, setListDayofWeek] = useState([
    //     {
    //       stt: 1,
    //       thu: 'Thứ2',
    //       ngay: getDayInWeek(1),
    //       isSelect: thuhientai == 1
    //     },
    //     {
    //       stt: 2,
    //       thu: 'Thứ3',
    //       ngay: getDayInWeek(2),
    //       isSelect: thuhientai == 2
    //     },
    //     {
    //       stt: 3,
    //       thu: 'Thứ4',
    //       ngay: getDayInWeek(3),
    //       isSelect: thuhientai == 3
    //     },
    //     {
    //       stt: 4,
    //       thu: 'Thứ5',
    //       ngay: getDayInWeek(4),
    //       isSelect: thuhientai == 4
    //     },
    //     {
    //       stt: 5,
    //       thu: 'Thứ6',
    //       ngay: getDayInWeek(5),
    //       isSelect: thuhientai == 5
    //     },
    //     {
    //       stt: 6,
    //       thu: 'Thứ7',
    //       ngay: getDayInWeek(6),
    //       isSelect: thuhientai == 6
    //     },
    //     {
    //       stt: 7,
    //       thu: 'CN',
    //       ngay: getDayInWeek(7),
    //       isSelect: thuhientai == 7
    //     }
    //   ])

    //   function getDayInWeek(index: number) {
    //     return dayjs().startOf('week').add(index, 'days').format('DD')
    //   }

    function _onChangeDate(isNext: boolean) {
        if (!listDayofWeek || !currentNumberWeek) return
        if ((currentNumberWeek > 1 && !isNext) || (isNext && currentNumberWeek < 52)) {
            const newWeek = isNext ? (currentNumberWeek + 1) : (currentNumberWeek - 1)
            // setCurrentNumberWeek(newWeek)
            if (newWeek > nowNumberWeek) {
                const newList: any = listDayofWeek.map((item, index) => {
                    return {
                        ...item,
                        ngay: dayjs().add(newWeek - nowNumberWeek, 'weeks').startOf('week').add(index + 1, 'days').format('DD'),
                        isSelect: dayjs().add(newWeek - nowNumberWeek, 'weeks').startOf('week').add(index + 1, 'days').format('DD/MM/YYYY') == dayjs(new Date()).format('DD/MM/YYYY')
                    }
                })
                const newstartOf = dayjs().add(newWeek - nowNumberWeek, 'weeks').startOf('week').add(1, 'days').format('DD/MM/YYYY')
                // setDayStartWeek(newstartOf)
                const newendOf = dayjs().add(newWeek - nowNumberWeek, 'weeks').endOf('week').add(1, 'days').format('DD/MM/YYYY')
                // setDayEndWeek(newendOf)
                const newMonth = dayjs().add(newWeek - nowNumberWeek, 'weeks').startOf('week').add(4, 'days').format('MM')
                if (props.onChangeDate)
                    props.onChangeDate(newstartOf, newendOf, newList, newWeek, newMonth)
                // setCurrentMonth(Number(newMonth))
                // setListDayofWeek(newList)
            } else {
                const newList: any = listDayofWeek.map((item, index) => {
                    return {
                        ...item,
                        ngay: dayjs().subtract(nowNumberWeek - newWeek, 'weeks').startOf('week').add(index + 1, 'days').format('DD'),
                        isSelect: dayjs().subtract(nowNumberWeek - newWeek, 'weeks').startOf('week').add(index + 1, 'days').format('DD/MM/YYYY') == dayjs(new Date()).format('DD/MM/YYYY')
                    }
                })
                const newstartOf = dayjs().subtract(nowNumberWeek - newWeek, 'weeks').startOf('week').add(1, 'days').format('DD/MM/YYYY')
                // setDayStartWeek(newstartOf)
                const newendOf = dayjs().subtract(nowNumberWeek - newWeek, 'weeks').endOf('week').add(1, 'days').format('DD/MM/YYYY')
                // setDayEndWeek(newendOf)
                const newMonth = dayjs().subtract(nowNumberWeek - newWeek, 'weeks').startOf('week').add(4, 'days').format('MM')
                if (props.onChangeDate)
                    props.onChangeDate(newstartOf, newendOf, newList, newWeek, newMonth)
                // setCurrentMonth(Number(newMonth))
                // setListDayofWeek(newList)
            }

        }

    }



    function header() {
        return <View style={styles.header}>
            <Text style={styles.textDay}>{dayNow}</Text>
            <View>
                <Text style={styles.textMonth}>Tháng {monthNow}</Text>
                <Text style={styles.textYear}>Năm {yearNow}</Text>
            </View>
            <View style={styles.viewNow}>
                <Text style={styles.textNow}>Hôm nay</Text>
            </View>
        </View>
    }

    return (
        <View style={styles.viewHeaderTab}>
            {
                header()
            }
            <View style={styles.viewCalenda}>
                <View style={styles.viewTuan}>
                    <View>
                        <View style={styles.viewTuan}>
                            <Icon name="lich" color={AppColors.iconColor} size={20} />
                            <Text style={styles.textTuan}>Tuần {currentNumberWeek}</Text>
                        </View>
                        <Text>Tháng {currentMonth}-{yearNow}</Text>
                    </View>
                    <View style={styles.viewArrow}>
                        <TouchComponent style={{ marginHorizontal: 6 }} onPress={() => _onChangeDate(false)}>
                            <Icon name="arrowleft" color={AppColors.iconColor} size={22} />
                        </TouchComponent>
                        <TouchComponent style={{ marginHorizontal: 6 }} onPress={() => _onChangeDate(true)}>
                            <Icon name="arrowright" color={AppColors.iconColor} size={22} />
                        </TouchComponent>
                    </View>
                </View>
                <View style={styles.viewNgayThu}>
                    {
                        props.listDayofWeek?.map((item, index) => {
                            return <View key={index} style={{ width: '14%', alignContent: 'center', alignItems: 'center' }}>
                                <Text style={[styles.textThu, item.isSelect ? { color: '#18787A' } : { color: '#7C86A2' }]}>{item.thu}</Text>
                                <View style={item.isSelect ? styles.viewNgayS : styles.viewNgay}>
                                    <Text style={[styles.textNgay, item.isSelect ? { color: '#4A4A4A' } : { color: '#7C86A2' }]}>{item.ngay?.toString()}</Text>
                                </View>
                            </View>
                        })
                    }
                </View>
            </View>
        </View>
    );
};

HeaderTabComponent.defaultProps = {

};

export default memo(HeaderTabComponent);

const styles = StyleSheet.create({
    viewHeaderTab: {
        // height: 200,
        borderRadius: 6,
        margin: 12
    },
    header: {
        backgroundColor: '#F6FFFE',
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6
    },
    textDay: {
        fontFamily: 'arial',
        fontSize: moderateScale(44),
        lineHeight: moderateScale(53),
        fontWeight: '700',
        color: '#18787A',
        marginHorizontal: 14
    },
    textMonth: {
        fontFamily: 'arial',
        fontSize: moderateScale(15),
        lineHeight: moderateScale(17),
        fontWeight: '700',
        color: '#18787A',
    },
    textYear: {
        fontFamily: 'arial',
        fontSize: moderateScale(15),
        lineHeight: moderateScale(17),
        fontWeight: '700',
        color: '#18787A',
    },
    viewNow: {
        position: 'absolute',
        right: 15,
        width: 72,
        height: 32,
        backgroundColor: '#0EACAF',
        borderRadius: 6,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textNow: {
        fontFamily: 'arial',
        fontSize: moderateScale(12),
        lineHeight: moderateScale(14),
        fontWeight: '700',
        color: '#FFFFFF',
    },
    viewCalenda: {
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        padding: 16
    },
    viewTuan: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center'
    },
    viewArrow: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 0
    },
    textTuan: {
        fontFamily: 'arial',
        fontSize: moderateScale(15),
        lineHeight: moderateScale(17),
        fontWeight: '700',
        color: '#18787A',
        textAlign: 'center',
        marginLeft: 6
    },
    textThu: {
        fontFamily: 'arial',
        fontSize: moderateScale(16),
        lineHeight: moderateScale(19),
        fontWeight: '400',
        color: '#7C86A2',
        textAlign: 'center'
    },
    viewNgayS: {
        width: 28,
        height: 28,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#C8FAF4',
        borderRadius: 14,
        marginTop: 6
    },
    viewNgay: {
        width: 28,
        height: 28,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        marginTop: 6
    },
    textNgay: {
        fontFamily: 'arial',
        fontSize: moderateScale(14),
        lineHeight: moderateScale(17),
        fontWeight: '400',
        textAlign: 'center'
    },
    viewNgayThu: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        marginTop: 12
    }
});
