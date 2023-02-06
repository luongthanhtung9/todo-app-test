import React, { memo } from 'react';
import {
  View,
  StyleProp, ViewStyle, Text
} from 'react-native';
import styles from './style';

export interface Props {
  label?: string
  processNote?: Array<string>
}

const InfoNDXLComponent = (props: Props) => {

  return (
    <View style={styles.info}>
      <Text style={styles.label}>{props.label}: </Text>
      <View style={styles.note}>
        {
          props.processNote?.map((note?: string, index?: number) => {
            return <Text key={index} style={styles.content}>{note}</Text>
          })
        }
      </View>
    </View>
  );
};

InfoNDXLComponent.defaultProps = {
};

export default memo(InfoNDXLComponent);
