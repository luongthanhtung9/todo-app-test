import {DEFAULT, ADD_TODO, DELETE_TODO, UPDATE_TODO} from '../constants/todo';

export const actionDefault = () => {
	return {
		type: DEFAULT,
	};
};
// action add todo
export const actionAddTodo = (payload: any) => {
	return {
		type: ADD_TODO,
		payload,
	};
};

// action update todo
export const actionUpdateTodo = (payload: any) => {
	return {
		type: UPDATE_TODO,
		payload,
	};
};
