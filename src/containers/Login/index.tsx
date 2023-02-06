import React, {memo, useState} from 'react';
import {Text, View, Platform} from 'react-native';
import {useDispatch} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@navigations/NameRoute';
import {useNavigation} from '@react-navigation/native';
import InputComponent from '@components/InputComponent';
import {TouchComponent} from '@components/index';

export interface Props {
	userName?: string;
}

const LoginScreen = (props: Props) => {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
	const dispatch = useDispatch();

	//priority 1 = low, 2 = medium, 3 = high
	const [prioritySelect, setPrioritySelect] = useState<number>(1);

	const [title, setTitle] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const platform = Platform.OS;

	const resetState = () => {
		setPrioritySelect(1);
		setDescription('');
		setTitle('');
	};

	const addTodo = () => {
		if (title === '' && description === '') {
			return;
		}
		resetState();
	};

	return (
		<View style={{flex: 1, paddingHorizontal: 16, backgroundColor: '#FFF'}}>
			<Text>TodoApp</Text>
			{/* <View style={{flex:1}}> */}
			<InputComponent
				value={title}
				placeholder="Enter title here"
				onChange={text => setTitle(text)}
			/>

			{/* </View> */}

			<View style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 10}}>
				<Text>Piority:</Text>
				<View style={{flex: 1, flexDirection: 'row'}}>
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
						<Text style={{color: prioritySelect === 1 ? '#DCFFFB' : '#187779'}}>
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
						<Text style={{color: prioritySelect === 2 ? '#DCFFFB' : '#187779'}}>
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
						<Text style={{color: prioritySelect === 3 ? '#DCFFFB' : '#187779'}}>
							High
						</Text>
					</TouchComponent>
				</View>
			</View>
			<View
				style={{

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
					<Text style={{color: '#187779'}}>+</Text>
				</TouchComponent>
			</View>
		</View>
	);
};

export default memo(LoginScreen);
