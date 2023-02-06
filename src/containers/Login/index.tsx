import React, {memo} from 'react';
import {Text, View, Platform} from 'react-native';
import {useDispatch} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@navigations/NameRoute';
import {useNavigation} from '@react-navigation/native';

export interface Props {
	userName?: string;
}

const LoginScreen = (props: Props) => {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
	const dispatch = useDispatch();

	const platform = Platform.OS;

	return (
		<View>
			<Text>TodoApp</Text>
		</View>
	);
};

export default memo(LoginScreen);
