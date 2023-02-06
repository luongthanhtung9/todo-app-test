import { TouchComponent } from '@components/index';
import { ArrowBackWhiteIcon, HeaderBGImage, SearchIcon } from '@images/index';
import { useNavigation } from '@react-navigation/native';
import React, { memo } from 'react';
import {
    ImageBackground, Text, View
} from 'react-native';
import styles from './style';
import Icon from '../Icon/index';
import Modal from "react-native-modal";

export interface Props {
    isShow: boolean;
    title?: string;
    content?: string;
    closeModal?: () => void;
}

const ComfirmModalComponent = (props: Props) => {

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
            <View style={styles.modalContainer}>
                <Text style={styles.titleText}>{props.title}</Text>
                <Text style={styles.contentText}>{props.content}</Text>
                <TouchComponent onPress={props.closeModal} style={[styles.buttonBottom, styles.dong]}>
                    <Text style={styles.textDongButton}>Đóng</Text>
                </TouchComponent>
            </View>
        </Modal>
    );
};

ComfirmModalComponent.defaultProps = {
};

export default memo(ComfirmModalComponent);
