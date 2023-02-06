import React, { memo, useState } from 'react';
import { Text, View, Platform } from 'react-native';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, TodoDetailRoute } from '@navigations/NameRoute';
import { useNavigation } from '@react-navigation/native';
import InputComponent from '@components/InputComponent';
import { FlatListComponent, HeaderComponent, TouchComponent } from '@components/index';
import { TodoObj } from '@models/TodoObj';
import { actionAddTodo, actionUpdateTodo } from '@redux/actions/todo';
import { getBackgroundTodo } from '@utils/';

export interface Props {
	userName?: string;
}

const TodoScreen = (props: Props) => {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

	//priority 1 = low, 2 = medium, 3 = high
	const [prioritySelect, setPrioritySelect] = useState<number>(1);

	const [title, setTitle] = useState<string>('');
	const [description, setDescription] = useState<string>('');

	const { todoList } = useSelector((state: RootStateOrAny) => state.todo)
	const dispatch = useDispatch()

	const onDetailTodo = (item: TodoObj) => {
		navigation.push(TodoDetailRoute, { data: item })
	}

	const deleteTodo = (id?: string) => {
		const findIndex = todoList.findIndex((item: TodoObj) => {
			return item.id === id
		})
		todoList.splice(findIndex, 1)
		dispatch(actionUpdateTodo(todoList))
	}

	const renderItem = (item: TodoObj) => {
		return (
			<TouchComponent
				key={item.id}
				onPress={() => { onDetailTodo(item) }}
				style={{ backgroundColor: getBackgroundTodo(item.priorityLevel, item.isComplete), flex: 1, marginVertical: 8, borderRadius: 8, paddingVertical: 10, paddingHorizontal: 16 }}>
				<View style={{ flexDirection: 'row', }}>
					<Text style={{ fontSize: 12, fontWeight: 'bold', flex: 1, paddingVertical: 10 }}>{item.title}</Text>
					<TouchComponent
						onPress={() => { deleteTodo(item.id) }}
						style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: '#FF2D55', alignItems: 'center', justifyContent: 'center' }}>
						<Text style={{ color: '#FFF' }}>X</Text>
					</TouchComponent>
				</View>
				<Text style={{ fontSize: 14, color: '#FFF', paddingBottom: 10 }}>{item.description}</Text>
			</TouchComponent>
		)

	}
	const resetState = () => {
		setPrioritySelect(1);
		setDescription('');
		setTitle('');
	};

	const addTodo = () => {
		if (title === '' && description === '') {
			return;
		}
		const todoObj: TodoObj = {
			id: `${title}${Math.floor(Math.random() * 1000)}${prioritySelect}`,
			title,
			description,
			priorityLevel: prioritySelect,
			isComplete: false
		}
		dispatch(actionAddTodo(todoObj))
		resetState();
	};

	return (
		<>
		<HeaderComponent title={'TodoApp'}/>
		<View style={{ flex: 1, paddingHorizontal: 16, backgroundColor: '#FFF' }}>
			{/* <Text>TodoApp</Text> */}

			<View style={{ flexDirection: 'row' }}>
				<InputComponent
					value={title}
					placeholder="Enter title here"
					onChange={text => setTitle(text)}
				/>

			</View>

			<View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
				<Text>Piority:</Text>
				<View style={{ flex: 1, flexDirection: 'row' }}>
					<TouchComponent
						onPress={() => {
							setPrioritySelect(1);
						}}
						style={{
							marginHorizontal: 10,
							justifyContent: 'center',
							alignItems: 'center',
							padding: 10,
							borderRadius: 10,
							backgroundColor: prioritySelect === 1 ? '#187779' : '#DCFFFB',
						}}>
						<Text style={{ color: prioritySelect === 1 ? '#DCFFFB' : '#187779' }}>
							Low
						</Text>
					</TouchComponent>
					<TouchComponent
						onPress={() => {
							setPrioritySelect(2);
						}}
						style={{
							marginHorizontal: 10,
							justifyContent: 'center',
							alignItems: 'center',
							padding: 10,
							borderRadius: 10,
							backgroundColor: prioritySelect === 2 ? '#187779' : '#DCFFFB',
						}}>
						<Text style={{ color: prioritySelect === 2 ? '#DCFFFB' : '#187779' }}>
							Medium
						</Text>
					</TouchComponent>
					<TouchComponent
						onPress={() => {
							setPrioritySelect(3);
						}}
						style={{
							marginHorizontal: 10,
							justifyContent: 'center',
							alignItems: 'center',
							padding: 10,
							borderRadius: 10,
							backgroundColor: prioritySelect === 3 ? '#187779' : '#DCFFFB',
						}}>
						<Text style={{ color: prioritySelect === 3 ? '#DCFFFB' : '#187779' }}>
							High
						</Text>
					</TouchComponent>
				</View>
			</View>
			<View
				style={{
					width: "100%",
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<InputComponent
					value={description}
					placeholder="Enter description here"
					onChange={text => setDescription(text)}
					numberOfLines={2}
					multiline
				/>
				<TouchComponent
					onPress={addTodo}
					style={{
						marginHorizontal: 10,
						justifyContent: 'center',
						alignItems: 'center',
						width: 30,
						height: 30,
						borderRadius: 15,
						backgroundColor: '#DCFFFB',
					}}>
					<Text style={{ color: '#187779' }}>+</Text>
				</TouchComponent>
			</View>
			<FlatListComponent
				listData={todoList}

				buildItem={renderItem}

			/>
			{/* <FlatListComponent data={[]}> */}
		</View>
		</>
	);
};

export default memo(TodoScreen);
