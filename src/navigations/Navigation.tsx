import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import {
	LoginScreen,
	HomeScreen,
	DSThongBaoScreen,
	DSVBDenScreen,
	CTVBDenScreen,
	DSVBDiScreen,
	DSToTrinhScreen,
	CTToTrinhScreen,
	DSGiaoViecScreen,
	CTGiaoViecScreen,
	DSCongViecScreen,
	CTCongViecScreen,
	PdfViewScreen,
	CTVBDiScreen,
	DSVBTheoDoiScreen,
	LichLDScreen,
	DangKyXeScreen,
	PhongHopScreen,
	ChiTietDangKyXeScreen,
	ChiTietPhongHopScreen,
	LichPHScreen
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
	LichPHRoute
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
		<Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={LoginRoute}>
			<Stack.Screen key={HomeRoute} name={HomeRoute} component={HomeScreen} />

			<Stack.Screen key={LoginRoute} name={LoginRoute} component={LoginScreen} />
			<Stack.Screen
				key={DSThongBaoRoute}
				name={DSThongBaoRoute}
				component={DSThongBaoScreen}
			/>
			<Stack.Screen key={DSVBDenRoute} name={DSVBDenRoute} component={DSVBDenScreen} />

			<Stack.Screen key={CTVBDenRoute} name={CTVBDenRoute} component={CTVBDenScreen} />

			{/* văn bản đi  */}

			<Stack.Screen key={DSVBDiRoute} name={DSVBDiRoute} component={DSVBDiScreen} />

			<Stack.Screen key={CTVBDiRoute} name={CTVBDiRoute} component={CTVBDiScreen} />

			{/* văn bản đi  */}

			<Stack.Screen key={CTToTrinhRoute} name={CTToTrinhRoute} component={CTToTrinhScreen} />

			<Stack.Screen
				key={DSGiaoViecRoute}
				name={DSGiaoViecRoute}
				component={DSGiaoViecScreen}
			/>

			<Stack.Screen
				key={CTGiaoViecRoute}
				name={CTGiaoViecRoute}
				component={CTGiaoViecScreen}
			/>

			<Stack.Screen
				key={DSCongViecRoute}
				name={DSCongViecRoute}
				component={DSCongViecScreen}
			/>

			<Stack.Screen
				key={CTCongViecRoute}
				name={CTCongViecRoute}
				component={CTCongViecScreen}
			/>

			<Stack.Screen key={DSToTrinhRoute} name={DSToTrinhRoute} component={DSToTrinhScreen} />

			<Stack.Screen
				key={DSVBTheoDoiRoute}
				name={DSVBTheoDoiRoute}
				component={DSVBTheoDoiScreen}
			/>

			<Stack.Screen key={PdfViewRoute} name={PdfViewRoute} component={PdfViewScreen} />

			<Stack.Screen key={LichLDRoute} name={LichLDRoute} component={LichLDScreen} />
			<Stack.Screen key={DangKyXeRoute} name={DangKyXeRoute} component={DangKyXeScreen} />
			<Stack.Screen key={ChiTietDangKyXeRoute} name={ChiTietDangKyXeRoute} component={ChiTietDangKyXeScreen} />
			<Stack.Screen key={PhongHopRoute} name={PhongHopRoute} component={PhongHopScreen} />
			<Stack.Screen key={ChiTietPhongHopRoute} name={ChiTietPhongHopRoute} component={ChiTietPhongHopScreen} />

			<Stack.Screen key={LichPHRoute} name={LichPHRoute} component={LichPHScreen} />

		</Stack.Navigator>
	);
}