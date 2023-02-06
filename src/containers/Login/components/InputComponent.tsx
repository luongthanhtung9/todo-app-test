import { TouchComponent } from '@components/index';
import React, { memo } from 'react';
import {
    NativeSyntheticEvent, StyleSheet, Text,
    TextInput, TextInputChangeEventData, View
} from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { SvgProps } from 'react-native-svg';

export interface Props {
    title?: string
    value?: string
    secureTextEntry?: boolean
    onChange?: (text: string) => void;
    leftIcon?: React.FC<SvgProps> | any;
    onPressIcon?: () => void;
}

const InputComponent = (props: Props) => {

    function _onChanged(event: NativeSyntheticEvent<TextInputChangeEventData>) {
        var text = event.nativeEvent.text;
        if (props.onChange) props.onChange(text);
    }

    return (
        <View style={styles.formView}>
            <View style={styles.form}>
                <Text style={styles.title}>{props.title}</Text>
                <View style={[{ flexDirection: 'row', }, styles.input]}>
                    {props.leftIcon && (
                        <TouchComponent onPress={props.onPressIcon} style={styles.viewIcon}>{props.leftIcon}</TouchComponent>
                    )}
                    <TextInput
                        style={{ flex: 1, paddingRight: 16 }}
                        value={props.value}
                        underlineColorAndroid="transparent"
                        secureTextEntry={props.secureTextEntry}
                        onChange={_onChanged} >

                    </TextInput>
                </View>
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
        paddingHorizontal: moderateScale(54)
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
        backgroundColor: '#F5F5F5',
        // opacity: 0.7,
        height: verticalScale(38),
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        // alignContent: 'center',
        alignItems: 'center',
        // justifyContent: 'center'
    },
    viewIcon: {
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
