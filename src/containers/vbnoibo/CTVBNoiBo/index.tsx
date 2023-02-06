import React, { memo, useState } from 'react';
import { Text, View, ImageBackground, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { LogoIcon, LoginBG, LoginBGImage } from '@images/index';
import styles from './style';
import InputComponent from './components/InputComponent'
import CheckBox from '@react-native-community/checkbox';
import { TouchComponent } from '@components/index'

export interface Props {
}

const CTVBNoiBoScreen = (props: Props) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false)

  function _goLogin(){

  }

  return (
    <View>
      <Text>Chi tiết văn bản</Text>

    </View>
  );
};

const mapStateToProps = (state: any) => {
  return {
  };
};

export default connect(mapStateToProps)(memo(CTVBNoiBoScreen));
