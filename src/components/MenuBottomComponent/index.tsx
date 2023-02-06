import { Menu } from '@models/Menu';
import React, { memo } from 'react';
import {
  View,
  StyleProp, ViewStyle, Text, ScrollView 
} from 'react-native';
import { TouchComponent } from '@components/index';
import styles from './style';

export interface Props {
  style?: StyleProp<ViewStyle>
  menu?: Array<Menu>
  getDS: (status?: number) => void
}

const MenuBottomComponent = (props: Props) => {
  const { menu } = props

  return (
    <View style={styles.menu}>
      <ScrollView style={{flexDirection: 'row'}} horizontal={true} showsHorizontalScrollIndicator={false}>
        {
          menu?.map((menu: Menu,index: number) => {
            return <TouchComponent key={index} style={styles.menuItem} onPress={()=>props.getDS(menu.status)}>
              {menu.iconBottom}
              {
                menu.isActive && <Text style={styles.menuTitle}>{menu.title}</Text>
              }
            </TouchComponent>
          })
        }
      </ScrollView >
    </View>
  );
};

MenuBottomComponent.defaultProps = {
};

export default memo(MenuBottomComponent);
