import React, {memo} from 'react';
import {Text, View, Platform} from 'react-native';
import {useDispatch} from 'react-redux';
import {ApiResponse} from '@models/ApiResponse';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@navigations/NameRoute';
import {useNavigation} from '@react-navigation/native';

import {Version} from '@models/Version';
export interface Props {
	loginResponse: ApiResponse<{
		token?: string;
	}>;
	getVersionResponse: Version;
	token?: string;
	version?: string;
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
