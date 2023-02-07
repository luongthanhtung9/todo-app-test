import {Menu} from '@models/Menu';
import {TodoObj} from '@models/TodoObj';

export const TodoRoute = 'TodoRoute';
export const TodoDetailRoute = 'TodoDetailRoute';
export const AddTodoRoute = 'AddTodoRoute';

export type RootStackParamList = {
	[TodoRoute]: undefined;
	[TodoDetailRoute]: {data?: TodoObj};
	[AddTodoRoute]: undefined;
};
