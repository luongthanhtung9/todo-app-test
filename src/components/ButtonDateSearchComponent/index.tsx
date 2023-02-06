import React, { memo } from 'react';
import {
  View,
  StyleProp, ViewStyle, Text
} from 'react-native';
import { TouchComponent } from '@components/index';
import styles from './style';

export interface Props {
  onYear: () => void
  onMonth: () => void
  onWeek: () => void
  onDay: () => void
}

const ButtonDateSearchComponent = (props: Props) => {

  return (
    <View style={styles.viewButton}>
      <TouchComponent style={styles.buttonYear} onPress={props.onYear}>
        <Text style={styles.titleButton}>Năm nay</Text>
      </TouchComponent>
      <TouchComponent style={styles.buttonMonth} onPress={props.onMonth}>
        <Text style={styles.titleButton}>Tháng này</Text>
      </TouchComponent>
      <TouchComponent style={styles.buttonWeek} onPress={props.onWeek}>
        <Text style={styles.titleButton}>Tuần này</Text>
      </TouchComponent>
      <TouchComponent style={styles.buttonDay} onPress={props.onDay}>
        <Text style={styles.titleButton}>Hôm nay</Text>
      </TouchComponent>
    </View>
  );
};

ButtonDateSearchComponent.defaultProps = {
};

export default memo(ButtonDateSearchComponent);
