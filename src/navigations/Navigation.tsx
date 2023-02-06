import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Text, View} from 'react-native';
import {
	LoginScreen,
	// HomeScreen,
	// DSThongBaoScreen,
	// DSVBDenScreen,
	// CTVBDenScreen,
	// DSVBDiScreen,
	// DSToTrinhScreen,
	// CTToTrinhScreen,
	// DSGiaoViecScreen,
	// CTGiaoViecScreen,
	// DSCongViecScreen,
	// CTCongViecScreen,
	// PdfViewScreen,
	// CTVBDiScreen,
	// DSVBTheoDoiScreen,
	// LichLDScreen,
	// DangKyXeScreen,
	// PhongHopScreen,
	// ChiTietDangKyXeScreen,
	// ChiTietPhongHopScreen,
	// LichPHScreen
} from '@containers/index';
import {
	RootStackParamList,
	LoginRoute,
	HomeRoute,
	DSThongBaoRoute,
	DSVBDenRoute,
	DSVBDiRoute,
	DSToTrinhRoute,
	CTToTrinhRoute,
	DSGiaoViecRoute,
	CTGiaoViecRoute,
	DSCongViecRoute,
	CTCongViecRoute,
	CTVBDenRoute,
	PdfViewRoute,
	CTVBDiRoute,
	DSVBTheoDoiRoute,
	LichLDRoute,
	DangKyXeRoute,
	PhongHopRoute,
	ChiTietDangKyXeRoute,
	ChiTietPhongHopRoute,
	LichPHRoute,
} from './NameRoute';

export default function Navigation() {
	return (
		<View style={{width: '100%', height: '100%', margin: 0}}>
			<NavigationContainer fallback={<Text>Loading...</Text>}>
				<RootNavigator />
			</NavigationContainer>
		</View>
	);
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
	return (
		<Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={LoginRoute}>
			{/* <Stack.Screen key={HomeRoute} name={HomeRoute} component={HomeScreen} /> */}

			<Stack.Screen key={LoginRoute} name={LoginRoute} component={LoginScreen} />
			{/* <Stack.Screen
				key={DSThongBaoRoute}
				name={DSThongBaoRoute}
				component={DSThongBaoScreen}
			/>
			<Stack.Screen key={DSVBDenRoute} name={DSVBDenRoute} component={DSVBDenScreen} />

			<Stack.Screen key={CTVBDenRoute} name={CTVBDenRoute} component={CTVBDenScreen} />

			{/* văn bản đi  */}
		</Stack.Navigator>
	);
}
