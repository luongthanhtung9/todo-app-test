import React, {memo, useState} from 'react';
import {Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@navigations/NameRoute';
import {useNavigation} from '@react-navigation/native';
import InputComponent from '@components/InputComponent';
import {HeaderComponent, TouchComponent} from '@components/index';
import {TodoObj} from '@models/TodoObj';
import {actionAddTodo} from '@redux/actions/todo';
import styles from './style';
import AppColors from '@commons/AppColors';
import {showMessageSuccess, showMessageWarning} from '@utils/index';

const AddTodoScreen = () => {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

	//priority 1 = low, 2 = medium, 3 = high
	const [prioritySelect, setPrioritySelect] = useState<number>(1);

	const [title, setTitle] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const dispatch = useDispatch();

	const addTodo = () => {
		if (title === '' && description === '') {
			showMessageWarning('Please input title and description');
			return;
		}
		const todoObj: TodoObj = {
			id: `${title}${Math.floor(Math.random() * 1000)}${prioritySelect}`,
			title,
			description,
			priorityLevel: prioritySelect,
			isComplete: false,
		};
		showMessageSuccess('Add todo success');
		dispatch(actionAddTodo(todoObj));
		navigation.pop();
	};

	return (
		<>
			<HeaderComponent title={'TodoApp'} isBack />
			<View style={styles.container}>
				<View style={styles.flex}>
					<View style={styles.row}>
						<InputComponent
							value={title}
							placeholder="Enter title here"
							onChange={text => setTitle(text)}
						/>
					</View>

					<View style={styles.priority}>
						<Text>Priority:</Text>
						<View style={[styles.flex, styles.row]}>
							<TouchComponent
								onPress={() => {
									setPrioritySelect(1);
								}}
								style={[
									{
										backgroundColor:
											prioritySelect === 1
												? AppColors.iconColor
												: AppColors.iconColorSelected,
									},
									styles.containerPriority,
								]}>
								<Text
									style={{
										color:
											prioritySelect === 1
												? AppColors.iconColorSelected
												: AppColors.iconColor,
									}}>
									Low
								</Text>
							</TouchComponent>
							<TouchComponent
								onPress={() => {
									setPrioritySelect(2);
								}}
								style={[
									styles.containerPriority,
									{
										backgroundColor:
											prioritySelect === 2
												? AppColors.iconColor
												: AppColors.iconColorSelected,
									},
								]}>
								<Text
									style={{
										color:
											prioritySelect === 2
												? AppColors.iconColorSelected
												: AppColors.iconColor,
									}}>
									Medium
								</Text>
							</TouchComponent>
							<TouchComponent
								onPress={() => {
									setPrioritySelect(3);
								}}
								style={[
									styles.containerPriority,
									{
										backgroundColor:
											prioritySelect === 3
												? AppColors.iconColor
												: AppColors.iconColorSelected,
									},
								]}>
								<Text
									style={{
										color:
											prioritySelect === 3
												? AppColors.iconColorSelected
												: AppColors.iconColor,
									}}>
									High
								</Text>
							</TouchComponent>
						</View>
					</View>
					<View style={styles.description}>
						<InputComponent
							value={description}
							placeholder="Enter description here"
							onChange={text => setDescription(text)}
							numberOfLines={2}
							multiline
						/>
					</View>
				</View>
				<View style={styles.containerAdd}>
					<TouchComponent onPress={addTodo} style={styles.buttonAdd}>
						<Text style={{color: AppColors.iconColor}}>Add</Text>
					</TouchComponent>
				</View>
			</View>
		</>
	);
};

export default memo(AddTodoScreen);
