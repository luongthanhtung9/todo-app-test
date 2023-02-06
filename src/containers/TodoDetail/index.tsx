import React, { memo, useState } from 'react';
import { Text, View, Platform } from 'react-native';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, TodoDetailRoute } from '@navigations/NameRoute';
import { useNavigation, useRoute } from '@react-navigation/native';
import InputComponent from '@components/InputComponent';
import { FlatListComponent, HeaderComponent, TouchComponent } from '@components/index';
import { TodoObj } from '@models/TodoObj';
import { actionAddTodo, actionUpdateTodo } from '@redux/actions/todo';
import { getBackgroundTodo } from '@utils/';
import { ScrollView } from 'react-native-gesture-handler';


export interface RouteParams {
	data?: TodoObj;

}

const TodoDetailScreen = () => {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
	const routeParams: RouteParams = useRoute().params as RouteParams;
	const { data } = routeParams

	const { todoList } = useSelector((state: RootStateOrAny) => state.todo)
	const dispatch = useDispatch()

	const onCompleteTodo = (id?: string) => {
		const findIndex = todoList.findIndex((item: TodoObj) => {
			return item.id === id
		})
		todoList[findIndex].isComplete = true
		dispatch(actionUpdateTodo(todoList))
		navigation.pop()
	}

	return (
		<>
			<HeaderComponent isBack title={'TodoApp'}/>
			<View style={{ flex: 1, padding: 16, backgroundColor: '#FFF', justifyContent: 'space-between' }}>
				<ScrollView >
					<TouchComponent
						style={{ backgroundColor: getBackgroundTodo(data?.priorityLevel, data?.isComplete), marginVertical: 8, borderRadius: 8, paddingVertical: 10, paddingHorizontal: 16, justifyContent: 'flex-start' }}>
						<Text style={{ fontSize: 12, fontWeight: 'bold', paddingVertical: 10 }}>{data?.title}</Text>
						<Text style={{ fontSize: 14, color: '#FFF', paddingBottom: 10 }}>{data?.description}</Text>
					</TouchComponent>
				</ScrollView>
				<TouchComponent
					disabled={data?.isComplete}
					onPress={() => { onCompleteTodo(data?.id) }}
					style={{ backgroundColor: "#D6FFEE", paddingVertical: 10, justifyContent: 'flex-end', alignItems: 'center', marginHorizontal: 80, borderRadius: 8 }}>
					<Text>Complete</Text>
				</TouchComponent>
			</View>
		</>
	);
};

export default memo(TodoDetailScreen);
