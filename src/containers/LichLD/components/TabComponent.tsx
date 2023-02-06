import { FlatListComponent, TouchComponent } from '@components/index';
import { Lich } from '@models/Lich';
import { foramtDate, foramtDateTime, showAlert } from '@utils/index';
import React, { memo, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import FastImage from 'react-native-fast-image';
import { moderateScale } from 'react-native-size-matters';
import HeaderTabComponent from './HeaderTabComponent';
import { VaiTroIcon } from '@images/index'

export interface Props {
    title?: string
    listData?: Array<Lich>
    listDayofWeek?: Array<any>
    currentNumberWeek?: number
    currentMonth?: number
    param?: any
    isUserTc?: boolean
    leadUserName?: string
    onLDTC?: () => void;
    onLDDV?: () => void;
    onChangeLD?: () => void
    onWeekNow?: () => void
    onDaySelect: (item?: any) => void
    onRefresh?: () => void;
    onLoadMore?: () => void;
    onChangeDate?: (fromDate: string, toDate: string, newList: Array<any>, newWeek: number, newMonth: string) => void;
}

const TabComponent = (props: Props) => {
    const {
        listData,
        listDayofWeek,
        currentNumberWeek,
        currentMonth,
        param,
        leadUserName,
        isUserTc,
        onLDTC,
        onLDDV,
        onChangeLD,
        onWeekNow,
        onLoadMore,
        onRefresh,
        onChangeDate,
        onDaySelect
    } = props

    const [posLead, setPosLead] = useState<number>(0)

    useEffect(() => {
        setPosLead(isUserTc ? 0 : 1)
    }, [isUserTc])

    function onLead(pos: number) {
        setPosLead(pos)
        if (pos == 0 && onLDTC) {
            onLDTC()
        }
        if (pos == 1 && onLDDV) {
            onLDDV()
        }
    }

    function _onItem(item: Lich) {
        if (item.content) {
            showAlert({
                isInfo: true,
                title: item.title || 'Thông tin',
                message: item.content,
            })
        }

    }

    const renderItem = (item: Lich, index: number) => (
        <TouchComponent key={index} style={styles.viewItemList} onPress={() => _onItem(item)}>
            {/* <View style={styles.viewThu}>
                <Text style={styles.textThu}>{item.leadUserName}</Text>
                <Text style={styles.textDate}>{foramtDate(item.fromDate)}</Text>
            </View> */}
            <View style={styles.viewInfo}>
                <View style={{ width: 46, height: 46, borderRadius: 23, backgroundColor: '#F6F6F6', alignItems: 'center', alignContent: 'center', alignSelf: 'center', flexDirection: 'row' }} >
                    <Text style={{ textAlign: 'center', width: '100%' }}>{item.type === 's' ? 'Sáng' : 'Chiều'}</Text>
                </View>
                <View style={styles.viewTitle}>
                    <Text style={styles.textThu}>{item.thu}</Text>
                    <View style={styles.viewDetail}>
                        <View style={styles.viewUser}>
                            <VaiTroIcon />
                            <Text style={styles.textName}>{item.leadUserName}</Text>
                        </View>
                        <View>
                            <Text style={styles.textTitle}>{item.title}</Text>
                        </View>
                        <View style={styles.viewName}>
                            <Text style={styles.textPhong}>{item.content}</Text>
                        </View>
                    </View>
                </View>
            </View>

        </TouchComponent>
    );

    return (
        <View style={styles.viewTabItem}>
            <View style={{ flexDirection: 'row', marginTop: 10, paddingHorizontal: 12 }}>
                <TouchComponent style={posLead == 0 ? styles.viewLeadSelect : styles.viewLeadNomal} onPress={() => onLead(0)}>
                    <Text style={posLead == 0 ? styles.textLeadSelect : styles.textLeadNomal}>Lãnh đạo tổng cục</Text>
                </TouchComponent>
                {
                    !isUserTc &&
                    <TouchComponent style={posLead == 1 ? styles.viewLeadSelect : styles.viewLeadNomal} onPress={() => onLead(1)}>
                        <Text style={posLead == 1 ? styles.textLeadSelect : styles.textLeadNomal}>Lãnh đạo đơn vị</Text>
                    </TouchComponent>
                }

            </View>
            <HeaderTabComponent
                title={props.title}
                onChangeDate={onChangeDate}
                onChangeLD={onChangeLD}
                onWeekNow={onWeekNow}
                onDaySelect={onDaySelect}
                leadUserName={leadUserName}
                listDayofWeek={listDayofWeek}
                currentNumberWeek={currentNumberWeek}
                currentMonth={currentMonth} />
            <View style={{ marginBottom: Platform.OS == 'ios' ? 340 : 330, paddingHorizontal: 12 }}>
                <FlatListComponent
                    listData={listData}
                    isLoadMore={param.isLoadMore}
                    needMore={param.needMore}
                    buildItem={renderItem}
                    onLoadMore={onLoadMore}
                    onRefresh={onRefresh} />
            </View>
        </View>
    );
};

export default memo(TabComponent);

const styles = StyleSheet.create({
    viewTabItem: {
        width: '100%',
        height: '100%'
    },
    viewItemList: {
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        marginVertical: 6,
        paddingHorizontal: 14,
        paddingVertical: 7
    },
    viewThu: {
        flexDirection: 'row'
    },
    textThu: {
        fontFamily: 'arial',
        fontSize: moderateScale(12),
        lineHeight: moderateScale(14),
        color: '#187779',
        fontWeight: '700',
    },
    textDate: {
        fontFamily: 'arial',
        fontSize: moderateScale(10),
        lineHeight: moderateScale(11),
        color: '#B8B8B8',
        fontWeight: '400',
        position: 'absolute',
        right: 0
    },
    viewInfo: {
        flexDirection: 'row',
        marginTop: 4,
        backgroundColor: '#FFFFFF'
    },
    viewTitle: {
        marginLeft: 15
    },
    textTitle: {
        fontFamily: 'arial',
        fontSize: moderateScale(14),
        lineHeight: moderateScale(12),
        color: '#4A4A4A',
        fontWeight: '700',
        // marginVertical: 8
        paddingTop: 12
    },
    textTimeStart: {
        fontFamily: 'arial',
        fontSize: moderateScale(10),
        lineHeight: moderateScale(11),
        color: '#4A4A4A',
        fontWeight: '700',
        marginVertical: 3
    },
    textTimeEnd: {
        fontFamily: 'arial',
        fontSize: moderateScale(10),
        lineHeight: moderateScale(11),
        color: '#B8B8B8',
        fontWeight: '700',
        marginVertical: 3
    },
    textName: {
        fontFamily: 'arial',
        fontSize: moderateScale(12),
        lineHeight: moderateScale(14),
        color: '#4A4A4A',
        fontWeight: '400',
        marginHorizontal: 6
    },
    textPhong: {
        fontFamily: 'arial',
        fontSize: moderateScale(11),
        lineHeight: moderateScale(13),
        color: '#4A4A4A',
        fontWeight: '400',
        marginTop: 8
    },
    avatarImg: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    viewDetail: {
        flexDirection: 'column',
        marginTop: 4
    },
    viewUser: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8
    },
    viewTime: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8
    },
    viewName: {
        // alignContent: 'center',
        // alignItems: 'center',
        // justifyContent: 'center',
        // marginLeft: 8
    },
    viewLeadSelect: {
        width: '50%', paddingVertical: 15, alignItems: 'center', alignContent: 'center', backgroundColor: '#187779', borderRadius: 6
    },
    textLeadSelect: {
        fontSize: 13, lineHeight: 15, fontWeight: '700', color: '#FFFFFF'
    },
    viewLeadNomal: {
        width: '50%', paddingVertical: 15, alignItems: 'center', alignContent: 'center', backgroundColor: '#FFFFFF', borderRadius: 6
    },
    textLeadNomal: {
        fontSize: 13, lineHeight: 15, fontWeight: '700', color: '#000000'
    },
});
