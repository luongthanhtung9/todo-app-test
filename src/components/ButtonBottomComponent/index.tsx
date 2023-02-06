import ButtonComponent from '@components/ButtonComponent';
import React, { memo } from 'react';
import {
  View,
  StyleProp, ViewStyle
} from 'react-native';
import styles from './style';

export interface Props {
  listButton?: Array<{
    label?: string,
    isActive?: boolean
  }>
  onPress?: () => void
}

const ButtonBottomComponent = (props: Props) => {

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', backgroundColor: 'white' }}>
      {
        props.listButton?.map((button, index) => {
          return <View key={index}><ButtonComponent title={button.label} isActive={button.isActive} onPress={props.onPress} /></View>
        })
      }
    </View>
  );
};

ButtonBottomComponent.defaultProps = {
};

export default memo(ButtonBottomComponent);
