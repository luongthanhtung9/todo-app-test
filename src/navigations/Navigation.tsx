import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import {
	TodoScreen,
	TodoDetailScreen,
} from '@containers/index';
import {
	RootStackParamList,
	TodoRoute,
	TodoDetailRoute,
} from './NameRoute';

export default function Navigation() {
	return (
		<View style={{ width: '100%', height: '100%', margin: 0 }}>
			<NavigationContainer fallback={<Text>Loading...</Text>}>
				<RootNavigator />
			</NavigationContainer>
		</View>
	);
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={TodoRoute}>
			<Stack.Screen key={TodoRoute} name={TodoRoute} component={TodoScreen} />

			<Stack.Screen key={TodoDetailRoute} name={TodoDetailRoute} component={TodoDetailScreen} />
		</Stack.Navigator>
	);
}
