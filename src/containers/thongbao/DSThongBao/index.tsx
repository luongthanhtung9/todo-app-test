import React, {memo, useEffect, useMemo, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import {FlatListComponent, HeaderComponent} from '@components/index';
import styles from './style';
import {docThongBaoAction, layDanhSachThongBao, thongBaoDefault} from '@redux/actions/thongbao';
import {formatHours} from '@utils/index';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
	CTToTrinhRoute,
	CTVBDenRoute,
	CTVBDiRoute,
	RootStackParamList,
} from '@navigations/NameRoute';

// export interface Props {}

interface ThongBao {
	id: string;
	sendUserId: string;
	sendUserName: string;
	receiveUserId: string;
	receiveUserName: string;
	receiveRoleId: string;
	receiveDeptId: string;
	message: string;
	url: string;
	isRead: boolean;
	created: Date;
}

const DSThongBaoScreen = (props: Props) => {
	const dispatch = useDispatch();
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
	const [listNotify, setListNotify] = useState<any[]>([]);
	const [param, setParam] = useState({
		pageInfo: {
			page: 1,
			pageSize: 20,
		},
		sorts: [],
	});
	const [isLoadMore, setIsLoadMore] = useState(false);
	const [needLoadMore, setNeedLoadMore] = useState(true);
	const danhSachThongBao: ThongBao[] = useSelector(
		(state: any) => state.thongbao.danhSachThongBao,
	);

	useEffect(() => {
		dispatch(layDanhSachThongBao(param));
		return () => {
			dispatch(thongBaoDefault());
		};
	}, []);

	useMemo(() => {
		if (danhSachThongBao) {
			if (danhSachThongBao.length !== 0) {
				setParam({...param, pageInfo: {page: (param.pageInfo.page += 1), pageSize: 20}});
				setIsLoadMore(false);
				setNeedLoadMore(danhSachThongBao?.length === param.pageInfo.pageSize);
			} else {
				setIsLoadMore(false);
				setNeedLoadMore(false);
			}
			const oldData = [...listNotify];
			const newList = oldData.concat(danhSachThongBao);
			const dataResult = newList.filter(_item => _item.isRead === false);
			setListNotify(dataResult);
		}
	}, [danhSachThongBao]);

	function _onLoadMore() {
		setIsLoadMore(true);
		dispatch(layDanhSachThongBao(param));
	}

	const _refresh = () => {
		setListNotify([]);
		setIsLoadMore(false);
		setNeedLoadMore(true);
		dispatch(layDanhSachThongBao(param));
	};

	// const renderItem = ({item}: any) => <ItemNotiComponent {...item} />;

	const renderItem = (item: ThongBao) => (
		<TouchableOpacity
			onPress={() => {
				const resolveString = item.url.split('/');
				dispatch(docThongBaoAction(item.id));
				if (resolveString[2] === 'chi-tiet') {
					switch (resolveString[1]) {
						case 'vb-den':
							navigation.push(CTVBDenRoute, {
								id: resolveString[3],
								status: 1, // chờ xử lý
								// onRefresh: _onRefresh,
							});
							break;
						case 'vb-di':
							navigation.push(CTVBDiRoute, {
								id: resolveString[3],
								status: 1, // chờ xử lý
								// onRefresh: _onRefresh,
							});
							break;
						case 'totrinh':
							navigation.push(CTToTrinhRoute, {
								id: resolveString[3],
								status: 1, // chờ xử lý
								// onRefresh: _onRefresh,
							});
							break;
						default:
							break;
					}
				}
			}}
			style={{flex: 1}}
			key={item.id}>
			<View style={styles.infoUserView}>
				<Text style={styles.time}>{formatHours(item.created)}</Text>
				<View style={{flex: 1}}>
					<View style={styles.nameView}>
						<Text style={styles.userName}>{item.sendUserName}</Text>
					</View>
					<Text style={styles.description}>{item.message}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);

	return (
		<View>
			<HeaderComponent title="Thông báo" isSearch={false} />
			<View style={styles.notiContainer}>
				<View style={styles.notiCard}>
					<FlatListComponent
						contentContainerStyle={{paddingBottom: 170}}
						listData={listNotify}
						buildItem={renderItem}
						// ItemSeparatorComponent={() => {
						// 	return (
						// 		<View
						// 			style={{
						// 				height: 1,
						// 				width: '100%',
						// 				backgroundColor: '#FAFAFA',
						// 			}}
						// 		/>
						// 	);
						// }}
						onLoadMore={_onLoadMore}
						isLoadMore={isLoadMore}
						needMore={needLoadMore}
						onRefresh={_refresh}
					/>
				</View>
			</View>
		</View>
	);
};

const mapStateToProps = (state: any) => {
	return {};
};

export default connect(mapStateToProps)(memo(DSThongBaoScreen));
