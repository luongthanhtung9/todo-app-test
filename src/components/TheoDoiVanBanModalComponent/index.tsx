import { TouchComponent } from '@components/index';
import { ArrowBackWhiteIcon, ChoXuLyIconMinium, HeaderBGImage, NgayVanBanIcon, SearchIcon, VanBanDiIcon } from '@images/index';
import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback, useState } from 'react';
import {
    FlatList,
    ImageBackground, Text, TextInput, View
} from 'react-native';
import Icon from '../Icon/index';
import Modal from "react-native-modal";
import dayjs from 'dayjs';
import styles from './style';
import FastImage from 'react-native-fast-image';

export interface Props {
    isShow: boolean;
    title: string;
    data: any;
    textComfirmButton: string;
    closeModal?: () => void;
}

const TheoDoiVanBanModalComponent = (props: Props) => {
    const [value, setValue] = useState<string>(props.data?.processTypeActionName);
    const dataTempt = [
        {
            name: 'Phạm thị huệ',
            username: 'huept',
            time: '15:50:53 05-10-2021',
            noidungxuly: "Hệ thống hiển thị danh sách văn bản đến được gửi đến và chưa được xử lý.",
            tag1: "Tổng Cục Dự Trữ Nhà Nước",
            tag2: "Văn bản đến",
            tag3: "Thêm mới",
            isView: false
        },
        {
            name: 'Phạm thị huệ',
            username: 'huept',
            time: '15:50:53 05-10-2021',
            noidungxuly: "Hệ thống hiển thị danh sách văn bản đến được gửi đến và chưa được xử lý.",
            tag1: "Tổng Cục Dự Trữ Nhà Nước",
            tag2: "Văn bản đến",
            tag3: "Thêm mới",
            isView: true
        },
    ]

    const renderContentFlow = useCallback(({ item }: any) => {
        return (
            <View style={styles.rowFlowContent}>
                <View style={styles.fisrtContent}>
                    <View style={styles.imageProfile}>
                        <View style={styles.avatarBorder}>
                            <FastImage
                                style={styles.avatarImg}
                                source={{ uri: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/ED32/production/_122722706_oliverderbidgepicnca.png' }}
                                resizeMode={FastImage.resizeMode.cover} />
                        </View>
                    </View>
                    <View style={styles.contentFlow}>
                        <View style={styles.firstContentFlow}>
                            <Text style={styles.textFullName}>{item.name} - </Text>
                            <Text style={styles.textUserName}>{item.username}</Text>
                            <Text style={styles.textTime}>{item.time}</Text>
                        </View>
                        <Text style={styles.noiDungXuLy}>{item.noidungxuly}</Text>
                    </View>
                </View>
                <View style={styles.tagContent}>
                    <Text style={styles.textTag}>{item.tag1}</Text>
                    <Text style={styles.textTag}>{item.tag2}</Text>
                    <Text style={[styles.textTag, item.isView ? styles.tagXem : styles.tagThemMoi]}>{item.tag3}</Text>
                </View>
            </View>
        )
    }, []);

    return (
        <Modal
            isVisible={props.isShow}
            onBackdropPress={props.closeModal}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            useNativeDriver
            hideModalContentWhileAnimating
            backdropOpacity={0.3}
            backdropColor="#187779"
        >
            <View style={styles.traVanBanComponent}>
                <Text style={styles.traVanBanTitle}>{props.title}</Text>
                <View style={styles.detailTraVB}>
                    <Text style={styles.detailMaVB}>{props.data?.documentCode}</Text>
                    <View style={styles.contentTimeTraVB}>
                        <VanBanDiIcon />
                        <Text style={styles.textTimeVB}>{dayjs(props.data?.inDate).format('DD/MM/YYYY')}</Text>
                        <NgayVanBanIcon />
                        <Text style={styles.textTimeVB}>{dayjs(props.data?.documentDate).format('DD/MM/YYYY')}</Text>
                        <ChoXuLyIconMinium />
                        <Text style={styles.textTimeVB}>{dayjs(props.data?.deadlineByDate).format('DD/MM/YYYY')}</Text>
                    </View>
                    <Text style={styles.textLocation}>{props.data?.sendDeptName}</Text>
                </View>
                <FlatList
                    data={dataTempt}
                    renderItem={renderContentFlow}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item: any, index: number) => index.toString()}
                />
                <View style={[styles.buttonBottomModal]}>
                    <View style={styles.itemBox1}>
                        <TouchComponent onPress={props.closeModal} style={[styles.buttonBottomVB, styles.timKiem]}>
                            <Text style={styles.textTraButton}>{props.textComfirmButton}</Text>
                        </TouchComponent>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

TheoDoiVanBanModalComponent.defaultProps = {
};

export default memo(TheoDoiVanBanModalComponent);
