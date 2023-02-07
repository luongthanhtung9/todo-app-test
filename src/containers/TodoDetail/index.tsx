import React, {memo, useState} from 'react';
import {Text, View} from 'react-native';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@navigations/NameRoute';
import {useNavigation, useRoute} from '@react-navigation/native';
import {BottomModalComponent, HeaderComponent, TouchComponent} from '@components/index';
import {TodoObj} from '@models/TodoObj';
import {actionUpdateTodo} from '@redux/actions/todo';
import {getBackgroundTodo} from '@utils/';
import {ScrollView} from 'react-native-gesture-handler';
import styles from './style';
import {getPriority, showMessageSuccess} from '@utils/index';
import AppColors from '@commons/AppColors';
import {Select} from '@models/Select';
export interface RouteParams {
	data?: TodoObj;
}

const TodoDetailScreen = () => {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
	const routeParams: RouteParams = useRoute().params as RouteParams;
	const {data} = routeParams;

	const {todoList} = useSelector((state: RootStateOrAny) => state.todo);
	const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
	const dispatch = useDispatch();

	// Complete a task
	const onCompleteTodo = (id?: string) => {
		const cloneArr = [...todoList];
		const findIndex = cloneArr.findIndex((item: TodoObj) => {
			return item.id === id;
		});
		cloneArr[findIndex].isComplete = true;
		showMessageSuccess('Complete task success');
		dispatch(actionUpdateTodo(cloneArr));
		navigation.pop();
	};

	const priorityArr: Select[] = [
		{
			value: 1,
			label: 'Low',
		},
		{
			value: 2,
			label: 'Medium',
		},
		{
			value: 3,
			label: 'High',
		},
	];

	const updatePriority = (item: Select) => {
		setIsVisibleModal(false);
		const cloneArr = [...todoList];
		const findIndex = cloneArr.findIndex((item: TodoObj) => {
			return item.id === data?.id;
		});
		cloneArr[findIndex].priorityLevel = item.value;
		showMessageSuccess('Update priority todo success');
		dispatch(actionUpdateTodo(cloneArr));
	};

	return (
		<>
			<HeaderComponent isBack title={'TodoApp'} />
			<View style={styles.container}>
				<ScrollView>
					<TouchComponent
						disabled={data?.isComplete}
						onPress={() => {
							setIsVisibleModal(true);
						}}
						style={[
							{
								backgroundColor: getBackgroundTodo(
									data?.priorityLevel,
									data?.isComplete,
								),
							},
							styles.containerTask,
						]}>
						<Text style={styles.title}>{data?.title}</Text>
						<Text style={styles.description}>{data?.description}</Text>
						<Text style={styles.priority}>
							Priority: {getPriority(data?.priorityLevel)}
						</Text>
						<Text style={styles.priority}>
							Status: {data?.isComplete ? 'Complete' : 'Todo'}
						</Text>
					</TouchComponent>
				</ScrollView>
				<TouchComponent
					disabled={data?.isComplete}
					onPress={() => {
						onCompleteTodo(data?.id);
					}}
					style={styles.buttonComplete}>
					<Text style={{color: AppColors.iconColor}}>Complete</Text>
				</TouchComponent>
			</View>
			<BottomModalComponent
				onChange={item => {
					updatePriority(item);
				}}
				onClose={() => {
					setIsVisibleModal(false);
				}}
				isVisible={isVisibleModal}
				data={priorityArr}
			/>
		</>
	);
};

export default memo(TodoDetailScreen);
