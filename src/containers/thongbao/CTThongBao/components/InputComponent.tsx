import React, { memo } from 'react';
import {
    FlatList,
    StyleSheet, View,
    Text,
    TextInput
} from 'react-native';
import { GhiLaiIcon, } from '@images/index'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export interface Props {
    title?: String
}

const InputComponent = (props: Props) => {
    return (
        <View style={styles.formView}>
            <View style={styles.form}>
                <Text style={styles.title}>{props.title}</Text>
                <TextInput style={styles.input}/>
            </View>
        </View>
    );
};

InputComponent.defaultProps = {

};

export default memo(InputComponent);

const styles = StyleSheet.create({
    formView: {
        width: '100%',
        paddingHorizontal: moderateScale(58)
    },
    form: {
        width: '100%'
    },
    title: {
        marginTop: moderateScale(12),
        fontFamily: 'arial',
        color: '#FFFFFF',
        fontSize: moderateScale(12),
        lineHeight: moderateScale(14),
        fontWeight: 'bold'
    },
    input: {
        backgroundColor: '#FFFFFF',
        opacity: 0.7,
        height: verticalScale(32),
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        marginTop: moderateScale(4)
    }
});
