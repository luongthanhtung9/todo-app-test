import React, { memo, useState } from 'react';
import {
    FlatList,
    StyleSheet, View,
    Text
} from 'react-native';
import { TimeWaitIcon, FileIcon, SettingIcon } from '@images/index'
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { TouchComponent, Divide, CardName, DSFilesModalComponent, MenuHDComponent } from '@components/index'
import { VanBan } from '@models/VanBan';
import { foramtDate, foramtDateTime } from '@utils/index';
import DocumentType from '@commons/DocumentType';
export interface Props {
    item?: VanBan;
    title?: string;
    isTrinh?: boolean;
    isDuyet?: boolean;
    isTra?: boolean;
    isChuyenBS?: boolean;
    onTraPress?: (id?: string) => void;
    onTrinhPress?: (id?: string) => void;
    onChuyenBSPress?: (id?: string) => void;
    onDuyetPress?: (id?: string) => void;
    onItemPress?: (id?: string) => void;
    onFilePress?: (id?: string) => void;
}

const DSGiaoViecItemComponent = (props: Props) => {
    const [isVisible, setIsVisible] = useState<boolean>(false)

    function _onFilePress() {
        if (props.onFilePress) {
            setTimeout(() => {
                setIsVisible(true)
            }, 350);
            props.onFilePress(props?.item?.id)
        }
    }

    function _onItemPress() {
        if (props.onItemPress) {
            props.onItemPress(props?.item?.id)
        }
    }

    return (
        <View style={styles.itemView} >
            <TouchComponent style={styles.infoView} onPress={_onItemPress}>
                <View style={styles.viewHeader}>
                    <View>
                        <Text style={styles.dateSend}>Tên công việc</Text>
                        <Text style={styles.code}>{props?.item?.name}</Text>
                    </View>
                    {/* <View style={styles.viewHeaderMenu}>
                        <MenuHDComponent
                            isTrinh={false}
                            isTra={false}
                            isDuyet={false}
                            isChuyenBS={false} />
                    </View> */}
                </View>

                <View style={styles.viewDate}>
                    <View style={styles.viewinDate}>
                        <Text style={styles.viewDateLabel}>Ngày chỉ đạo: </Text>
                        <Text style={styles.viewDateContent}>{foramtDate(props?.item?.commandDate)}</Text>
                    </View>
                    <View style={styles.documentDate}>
                        <Text style={styles.viewDateLabel}>Hạn xử lý:</Text>
                        <Text style={styles.viewDateContent}>{foramtDate(props?.item?.deadlineByDate)}</Text>
                    </View>
                </View>
                <Text style={styles.description}>{props?.item?.leaderUserName}</Text>


            </TouchComponent>
            {/* <Divide style={{ marginVertical: moderateVerticalScale(10) }} /> */}
            {/* <TouchComponent style={styles.fileView} onPress={_onFilePress}>
                <FileIcon />
                <Text style={styles.fileName}>File đính kèm</Text>
                <Text style={styles.fileDate}>{foramtDateTime(props?.item?.created)}</Text>
            </TouchComponent> */}
            {/* <DSFilesModalComponent isVisible={isVisible} id={props?.item?.id} type={DocumentType.TO_TRINH} closePopup={() => setIsVisible(false)} /> */}
        </View>
    );
};

DSGiaoViecItemComponent.defaultProps = {

};

export default memo(DSGiaoViecItemComponent);

const styles = StyleSheet.create({
    itemView: {
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        padding: 9,
        margin: moderateVerticalScale(6)
    },
    infoView: {
        margin: 3,
    },
    viewHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center'
    },
    viewHeaderMenu: {
        position: 'absolute',
        right: 0
    },
    dateSend: {
        fontFamily: 'arial',
        fontSize: 10,
        lineHeight: 11,
        color: '#7C86A2',
        margin: 3,
    },
    code: {
        fontFamily: 'arial',
        fontSize: 14,
        lineHeight: 16,
        color: '#187779',
        fontWeight: 'bold'
    },
    nameView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    name: {
        fontFamily: 'arial',
        fontSize: 11,
        lineHeight: 13,
        color: '#4A4A4A'
    },
    description: {
        fontFamily: 'arial',
        fontSize: 12,
        lineHeight: 18,
        color: '#7C86A2',
        marginTop: 6,
    },
    statusView: {
        backgroundColor: '#FF7A00',
        flexDirection: 'row',
        width: scale(86),
        height: verticalScale(20),
        borderRadius: 10,
        alignItems: 'center',
        marginTop: moderateVerticalScale(10)
    },
    statusIcon: {
        margin: 4
    },
    status: {
        fontFamily: 'arial',
        fontSize: 11,
        lineHeight: 13,
        color: '#FFFFFF'
    },
    fileView: {
        flexDirection: 'row',
        marginTop: moderateVerticalScale(6),
        alignItems: 'center'
    },
    fileName: {
        fontFamily: 'arial',
        fontSize: 11,
        lineHeight: 13,
        color: '#7C86A2',
        marginLeft: 5
    },
    fileDate: {
        fontFamily: 'arial',
        fontSize: 9,
        lineHeight: 10,
        color: '#B8B8B8',
        position: 'absolute',
        right: 0
    },
    viewDate: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        marginVertical: 4
    },
    viewinDate: {
        flexDirection: 'row',
        width: '40%'
    },
    documentDate: {
        flexDirection: 'row',
        width: '40%',
        position: 'absolute',
        right: 0
    },
    deadlineByDate: {
        flexDirection: 'row',
        width: '40%',
        position: 'absolute',
        right: 0
    },
    viewDateLabel: {
        fontFamily: 'arial',
        fontSize: moderateScale(12),
        lineHeight: moderateScale(14),
        color: '#187779',
    },
    viewDateContent: {
        fontFamily: 'arial',
        fontSize: moderateScale(12),
        lineHeight: moderateScale(14),
        color: '#4A4A4A',
        marginLeft: 8
    },
});
