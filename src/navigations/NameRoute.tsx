import { Menu } from '@models/Menu';
import { TodoObj } from '@models/TodoObj';

export const TodoRoute = 'TodoRoute';
export const TodoDetailRoute = 'TodoDetailRoute';

export type RootStackParamList = {
	[TodoRoute]: undefined;
	[TodoDetailRoute]: { data?: TodoObj };
};
