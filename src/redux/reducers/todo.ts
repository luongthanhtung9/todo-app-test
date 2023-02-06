import { TodoObj } from "@models/TodoObj";
import { ADD_TODO, DEFAULT, DELETE_TODO, UPDATE_TODO } from "@redux/constants/todo";


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
				todoList: state.todoList.concat(action.payload),
			};
		case UPDATE_TODO:
			// console.log('tettt', action.payload);
			// console.log('tettt', state.todoList);
			// const findIndex = state.todoList.findIndex((item: TodoObj) =>{
			// 	console.log('item item', item)
			// 	console.log('item item', action.payload)
			// 	return item.id === action.payload
			// })
			// console.log('tettt', action.findIndex);
			return {
				...state,
				todoList: action.payload,
			};
	}
	return state;
}
