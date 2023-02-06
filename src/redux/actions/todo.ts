import {
	DEFAULT,
	ADD_TODO,
    DELETE_TODO,
	UPDATE_TODO,

} from '../constants/todo';

export const actionDefault = () => {
	return {
		type: DEFAULT,
	};
};
// action add todo
export const actionAddTodo = (payload: any) => {
    console.log('test');
    
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

// // lấy tất cả chức năng của user
// export const actionLayTatCaChucNangUser = () => {
// 	return {
// 		type: LAY_TAT_CA_CHUC_NANG_USER_ACTION,
// 	};
// };

// export const layTatCaChucNangUserComplete = (payload: any) => {
// 	return {
// 		type: LAY_TAT_CA_CHUC_NANG_USER_COMPLETE,
// 		payload,
// 	};
// };
