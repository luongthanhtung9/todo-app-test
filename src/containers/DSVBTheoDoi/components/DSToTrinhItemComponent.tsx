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
    item?: VanBan
    title?: String;
    onItemPress?: (id?: string) => void;
    onFilePress?: (id?: string) => void;
}

const DSToTrinhItemComponent = (props: Props) => {
    const [isVisible, setIsVisible] = useState<boolean>(false)

    function _onFilePress() {
        if (props.onFilePress) {
            setIsVisible(true)
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
                        <Text style={styles.dateSend}>{foramtDateTime(props?.item?.created)}</Text>
                        <Text style={styles.code}>{props?.item?.bookName}</Text>
                    </View>
                    {/* <View style={styles.viewHeaderMenu}>
                        <MenuHDComponent isTrinh={true} isDuyet={false}/>
                    </View> */}
                </View>

                {/* <View style={styles.nameView}>
                    <CardName>
                        <Text style={styles.name}>{props?.item?.sendUserName}</Text>
                    </CardName>
                    <CardName>
                        <Text style={styles.name}>{props?.item?.sendUserName}</Text>
                    </CardName>
                    <CardName>
                        <Text style={styles.name}>{props?.item?.sendGroupName}</Text>
                    </CardName>
                </View> */}
                <Text style={styles.description}>{props?.item?.abstract}</Text>
                <View style={styles.statusView}>
                    <TimeWaitIcon style={styles.statusIcon} />
                    <Text style={styles.status}>{props?.item?.statusName}</Text>
                </View>

            </TouchComponent>
            <Divide style={{ marginVertical: moderateVerticalScale(10) }} />
            <TouchComponent style={styles.fileView} onPress={_onFilePress}>
                <FileIcon />
                <Text style={styles.fileName}>File đính kèm</Text>
                <Text style={styles.fileDate}>{foramtDateTime(props?.item?.created)}</Text>
            </TouchComponent>
            <DSFilesModalComponent isVisible={isVisible} id={props?.item?.id} type={DocumentType.TO_TRINH} closePopup={() => setIsVisible(false)} />
        </View>
    );
};

DSToTrinhItemComponent.defaultProps = {

};

export default memo(DSToTrinhItemComponent);

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
    }
});
