import React, { memo } from 'react';
import {
  View,
  StyleProp, ViewStyle, Text
} from 'react-native';
import styles from './style';

export interface Props {
  style?: StyleProp<ViewStyle>
}

const LichSuDeXuatComponent = (props: Props) => {
  
  return (
    <View>
      <Text>LichSuDeXuatComponent</Text>
    </View>
  );
};

LichSuDeXuatComponent.defaultProps = {
};

export default memo(LichSuDeXuatComponent);
