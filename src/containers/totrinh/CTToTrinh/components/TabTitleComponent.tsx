import React, { memo } from 'react';
import {
    FlatList,
    StyleSheet, View,
    Text,
    TextInput,
    Dimensions
} from 'react-native';
import { GhiLaiIcon, } from '@images/index'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
const width = Dimensions.get('window').width

export interface Props {
    title?: string
    isActive?: boolean
}

const TabTitleComponent = (props: Props) => {
    return (
        <View style={[styles.tabTitle,props.isActive ? {backgroundColor: '#187779'} : {backgroundColor: '#FAFAFA'}]}>
            <Text style={[styles.title,props.isActive ? {color: 'white'} : {color: '#4A4A4A'}]}>{props.title}</Text>
        </View>
    );
};

TabTitleComponent.defaultProps = {
    isActive: true
};

export default memo(TabTitleComponent);

const styles = StyleSheet.create({
    tabTitle: {
        maxHeight: verticalScale(55),
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 6,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title:{
        textAlign: 'center'
    }
});
