import AppColors from '@commons/AppColors';
import Icon from '@commons/Icon';
import { TouchComponent } from '@components/index';
import { DropDownIcon, Ic_DropDrow } from '@images/index';
import { getCurrentNumberWeek } from '@utils/index';
import dayjs from 'dayjs';
import React, { memo, useEffect, useState } from 'react';
import {
    NativeSyntheticEvent, StyleSheet, Text,
    TextInput, TextInputChangeEventData, View
} from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

export interface Props {
    title?: string
    listDayofWeek?: Array<any>
    currentNumberWeek?: number
    currentMonth?: number
    leadUserName?: string
    onChangeLD?: () => void
    onWeekNow?: () => void
    onDaySelect: (item?: any) => void
    onChangeDate?: (fromDate: string, toDate: string, newList: Array<any>, newWeek: number, newMonth: string) => void;
}

const HeaderTabComponent = (props: Props) => {
    const { title, listDayofWeek, currentNumberWeek, currentMonth, leadUserName, onChangeLD, onWeekNow, onDaySelect } = props
    const [startDay, setStartDay] = useState(dayjs().startOf('week').add(1, 'days').format('DD/MM/YYYY'))
    const [endDay, setEndDay] = useState(dayjs().endOf('week').add(1, 'days').format('DD/MM/YYYY'))
    const dayNow = Number(dayjs(new Date()).format('DD'))
    const monthNow = dayjs().month() + 1
    const yearNow = dayjs().year()
    const nowNumberWeek = getCurrentNumberWeek()

    function _onChangeDate(isNext: boolean) {
        if (!listDayofWeek) return
        // if ((currentNumberWeek > 1 && !isNext) || (isNext && currentNumberWeek < 52)) {
        const newWeek = isNext ? (currentNumberWeek + 1) : (currentNumberWeek - 1)
        if (isNext) {
            const newList: any = listDayofWeek.map((item, index) => {
                return {
                    ...item,
                    ngay: dayjs().add(newWeek - nowNumberWeek, 'weeks').startOf('week').add(index + 1, 'days').format('DD'),
                    isNow: dayjs().add(newWeek - nowNumberWeek, 'weeks').startOf('week').add(index + 1, 'days').format('YYYY-MM-DD') == dayjs(new Date()).format('YYYY-MM-DD'),
                    isSelect: false//dayjs().add(newWeek - nowNumberWeek, 'weeks').startOf('week').add(index + 1, 'days').format('DD/MM/YYYY') == dayjs(new Date()).format('DD/MM/YYYY')
                }
            })
            const newstartOf = dayjs().add(newWeek - nowNumberWeek, 'weeks').startOf('week').add(1, 'days').format('YYYY-MM-DD')
            setStartDay(dayjs(newstartOf).format('DD/MM/YYYY'))
            const newendOf = dayjs().add(newWeek - nowNumberWeek, 'weeks').endOf('week').add(1, 'days').format('YYYY-MM-DD')
            setEndDay(dayjs(newendOf).format('DD/MM/YYYY'))
            const newMonth = dayjs().add(newWeek - nowNumberWeek, 'weeks').startOf('week').add(4, 'days').format('MM')
            if (props.onChangeDate)
                props.onChangeDate(newstartOf, newendOf, newList, newWeek, newMonth)

        } else {
            const newList: any = listDayofWeek.map((item, index) => {
                return {
                    ...item,
                    ngay: dayjs().subtract(nowNumberWeek - newWeek, 'weeks').startOf('week').add(index + 1, 'days').format('DD'),
                    isNow: dayjs().subtract(nowNumberWeek - newWeek, 'weeks').startOf('week').add(index + 1, 'days').format('YYYY-MM-DD') == dayjs(new Date()).format('YYYY-MM-DD'),
                    isSelect: false//dayjs().subtract(nowNumberWeek - newWeek, 'weeks').startOf('week').add(index + 1, 'days').format('DD/MM/YYYY') == dayjs(new Date()).format('DD/MM/YYYY')
                }
            })
            const newstartOf = dayjs().subtract(nowNumberWeek - newWeek, 'weeks').startOf('week').add(1, 'days').format('YYYY-MM-DD')
            setStartDay(dayjs(newstartOf).format('DD/MM/YYYY'))
            const newendOf = dayjs().subtract(nowNumberWeek - newWeek, 'weeks').endOf('week').add(1, 'days').format('YYYY-MM-DD')
            setEndDay(dayjs(newendOf).format('DD/MM/YYYY'))
            const newMonth = dayjs().subtract(nowNumberWeek - newWeek, 'weeks').startOf('week').add(4, 'days').format('MM')
            if (props.onChangeDate)
                props.onChangeDate(newstartOf, newendOf, newList, newWeek, newMonth)

        }

        // }

    }

    const _onWeek = () => {
        setStartDay(dayjs().startOf('week').add(1, 'days').format('DD/MM/YYYY'))
        setEndDay(dayjs().endOf('week').add(1, 'days').format('DD/MM/YYYY'))
        if (onWeekNow) onWeekNow()
    }

    const _onDay = (item?: any) => {
        if (onDaySelect) onDaySelect(item)
    }



    function header() {
        return <View style={styles.header}>
            {/* <Text style={styles.textDay}>{dayNow}</Text> */}
            <TouchComponent onPress={onChangeLD}>
                <DropDownIcon style={styles.textDay} />
            </TouchComponent>

            <TouchComponent onPress={onChangeLD}>
                {/* <Text style={styles.textMonth}>Tháng {monthNow}</Text>
                <Text style={styles.textYear}>Năm {yearNow}</Text> */}
                <Text style={styles.textYear}>{leadUserName}</Text>
            </TouchComponent>
            <TouchComponent style={styles.viewNow} onPress={_onWeek} >
                <Text style={styles.textNow}>Tuần này</Text>
            </TouchComponent>
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
                            <Text style={styles.textTuan}>{startDay} - {endDay}</Text>
                        </View>
                        {/* <Text>{startDay}-{endDay}</Text> */}
                    </View>
                    <View style={styles.viewArrow}>
                        <TouchComponent style={{ marginHorizontal: 6 }} onPress={() => _onChangeDate(false)}>
                            <Icon name="arrowleft" color={AppColors.iconColor} size={25} />
                        </TouchComponent>
                        <TouchComponent style={{ marginHorizontal: 6 }} onPress={() => _onChangeDate(true)}>
                            <Icon name="arrowright" color={AppColors.iconColor} size={25} />
                        </TouchComponent>
                    </View>
                </View>
                <View style={styles.viewNgayThu}>
                    {
                        props.listDayofWeek?.map((item, index) => {
                            return <TouchComponent key={index} style={{ width: '14%', alignContent: 'center', alignItems: 'center' }} onPress={() => _onDay(item)}>
                                <Text style={[styles.textThu, item.isNow ? { color: '#18787A' } : { color: '#7C86A2' }]}>{item.thu}</Text>
                                <View style={item.isSelect ? styles.viewNgayS : styles.viewNgay}>
                                    <Text style={[styles.textNgay, item.isSelect ? { color: '#4A4A4A' } : { color: '#7C86A2' }]}>{item.ngay?.toString()}</Text>
                                </View>
                            </TouchComponent>
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
        marginHorizontal: 12,
        marginTop: 12,
        marginBottom: 6
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
