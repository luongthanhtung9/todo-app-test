import React, {memo, useEffect, useState} from 'react';
import {Alert, Text, View} from 'react-native';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {AddTodoRoute, RootStackParamList, TodoDetailRoute} from '@navigations/NameRoute';
import {useNavigation} from '@react-navigation/native';
import {
	FlatListComponent,
	HeaderComponent,
	SwipeoutComponent,
	TouchComponent,
} from '@components/index';
import {TodoObj} from '@models/TodoObj';
import {actionUpdateTodo} from '@redux/actions/todo';
import {getBackgroundTodo} from '@utils/';
import Icon from '@commons/Icon';
import {getPriority} from '@utils/index';
import styles from './style';

const TodoScreen = () => {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
	const [listTask, setListTask] = useState<TodoObj[]>([]);
	const [totalTaskComplete, setTotalTaskComplete] = useState<number>(0);
	const [isSortHighToLow, setIsSortHighToLow] = useState<boolean>(false);
	const {todoList} = useSelector((state: RootStateOrAny) => state.todo);
	const dispatch = useDispatch();

	const onDetailTodo = (item: TodoObj) => {
		navigation.push(TodoDetailRoute, {data: item});
	};

	useEffect(() => {
		setListTask(todoList);
		const taskComplete = todoList.filter((item: TodoObj) => {
			return item.isComplete;
		});
		setTotalTaskComplete(taskComplete.length);
	}, [todoList]);

	const deleteTodo = (id?: string) => {
		const cloneArr = [...listTask];
		const findIndex = cloneArr.findIndex((item: TodoObj) => {
			return item.id === id;
		});
		cloneArr.splice(findIndex, 1);
		dispatch(actionUpdateTodo(cloneArr));
	};

	const updatePriority = (id?: string) => {
		const cloneArr = [...todoList];
		const findIndex = cloneArr.findIndex((item: TodoObj) => {
			return item.id === id;
		});
		cloneArr[findIndex].isComplete = true;
		dispatch(actionUpdateTodo(cloneArr));
	};

	const renderItem = (item: TodoObj) => {
		return (
			<SwipeoutComponent
				onDelete={() => {
					deleteTodo(item.id);
				}}
				onComplete={() => {
					Alert.alert('Confirm', 'Have you completed the task yet?', [
						{
							text: 'Cancel',
							onPress: () => console.log('Cancel Pressed'),
						},
						{text: 'Yes', onPress: () => updatePriority(item.id)},
					]);
				}}>
				<View style={{marginVertical: 8}}>
					<TouchComponent
						key={item.id}
						onPress={() => {
							onDetailTodo(item);
						}}
						style={[
							{
								backgroundColor: getBackgroundTodo(
									item.priorityLevel,
									item.isComplete,
								),
							},
							styles.containerItem,
						]}>
						<View style={styles.row}>
							<Text style={styles.title}>{item.title}</Text>
						</View>
						<Text style={styles.description}>{item.description}</Text>
						<Text style={styles.priority}>
							Priority: {getPriority(item.priorityLevel)}
						</Text>
						<View
							style={[
								styles.row,
								{
									flex: 1,
									justifyContent: 'space-between',
									alignItems: 'center',
								},
							]}>
							<Text style={styles.priority}>
								Status: {item.isComplete ? 'Complete' : 'Todo'}
							</Text>
						</View>
					</TouchComponent>
				</View>
			</SwipeoutComponent>
		);
	};

	// sort priority and name
	const sortListTask = () => {
		setIsSortHighToLow(!isSortHighToLow);
		if (listTask.length === 0 || listTask.length === 1) return;
		if (isSortHighToLow) {
			listTask?.sort((task1: TodoObj, task2: TodoObj) => {
				if ((task1.priorityLevel || 0) < (task2.priorityLevel || 0)) return -1;
				if ((task1.priorityLevel || 0) > (task2.priorityLevel || 0)) return 1;
				else {
					if ((task1.title || '') < (task2.title || '')) return -1;
					if ((task1.title || '') > (task2.title || '')) return 1;
					return 0;
				}
			});
		} else {
			listTask?.sort((task1: TodoObj, task2: TodoObj) => {
				if ((task2.priorityLevel || 0) < (task1.priorityLevel || 0)) return -1;
				if ((task2.priorityLevel || 0) > (task1.priorityLevel || 0)) return 1;
				else {
					if ((task2.title || '') < (task1.title || '')) return -1;
					if ((task2.title || '') > (task1.title || '')) return 1;
					return 0;
				}
			});
		}
	};

	return (
		<>
			<HeaderComponent
				title={'TodoApp'}
				isRight
				onRightPress={() => {
					navigation.push(AddTodoRoute);
				}}
			/>
			<View style={styles.container}>
				<View style={styles.countTotal}>
					<Text>Total: {listTask.length}</Text>
					<Text>Complete: {totalTaskComplete}</Text>
				</View>
				<View style={styles.containerSort}>
					<Text>Sort by priority and name: </Text>
					<TouchComponent
						onPress={() => {
							sortListTask();
						}}>
						<Icon name={isSortHighToLow ? 'circle-up' : 'circle-down'} size={16} />
					</TouchComponent>
				</View>
				<FlatListComponent listData={listTask} buildItem={renderItem} />
			</View>
		</>
	);
};

export default memo(TodoScreen);
