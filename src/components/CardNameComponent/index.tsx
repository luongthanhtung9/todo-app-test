import React, { memo } from 'react';
import {
  View,
  StyleProp, ViewStyle
} from 'react-native';
import styles from './style';

export interface Props {
  children: React.ReactNode;
}

const CardNameComponent = (props: Props) => {
  
  return (
    <View style={styles.card}>
      {props.children}
    </View>
  );
};

CardNameComponent.defaultProps = {
};

export default memo(CardNameComponent);
