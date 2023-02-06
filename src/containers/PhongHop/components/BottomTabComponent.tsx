import Icon from '@commons/Icon';
import React, { memo } from 'react';
import {
    NativeSyntheticEvent, StyleSheet, Text,
    TextInput, TextInputChangeEventData, View
} from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

export interface Props {
    tabData?: Array<string>
}

const BottomTabComponent = (props: Props) => {
    const { tabData } = props
    

    return (
        <View style={styles.viewBottomTab}>
            {
                tabData?.map((item: string,index: number)=>{
                    return <View key={index} style={styles.viewItemBottomTab}>
                        <Icon name='hom-nay' size={30}/>
                        <Text>
                            {item}
                        </Text>
                    </View>
                })
            }
            
        </View>
    );
};

BottomTabComponent.defaultProps = {

};

export default memo(BottomTabComponent);

const styles = StyleSheet.create({
    viewBottomTab: {
        width: '100%',
        flexDirection: 'row',
        position: 'absolute',
        backgroundColor: '#F6FFFE',
        bottom: 0,
        height: 70,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewItemBottomTab: {
        alignContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10
    }
});
