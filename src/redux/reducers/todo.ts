import {TodoObj} from '@models/TodoObj';
import {ADD_TODO, DEFAULT, DELETE_TODO, UPDATE_TODO} from '@redux/constants/todo';

const initialState = {
	todoList: [], // list todo
};

export default function todo(state = initialState, action: any) {
	switch (action.type) {
		case DEFAULT:
			return {
				...initialState,
			};
		// add version
		case ADD_TODO:
			return {
				...state,
				todoList: [action.payload].concat(state.todoList),
			};
		case UPDATE_TODO:
			return {
				...state,
				todoList: action.payload,
			};
	}
	return state;
}
