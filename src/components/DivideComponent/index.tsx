import React, { memo } from 'react';
import {
  View,
  StyleProp, ViewStyle
} from 'react-native';
import styles from './style';

export interface Props {
  style?: StyleProp<ViewStyle>
}

const DivideComponent = (props: Props) => {
  
  return (
    <View style={[styles.divide,props.style]}/>
  );
};

DivideComponent.defaultProps = {
};

export default memo(DivideComponent);
