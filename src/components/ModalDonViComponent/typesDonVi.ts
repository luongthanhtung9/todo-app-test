export interface Data {
	id: string;
	parentId: string;
	name: string;
	code: string;
	deptId: string;
	deptName: string;
	level: number;
}

export interface Child {
	key: string;
	title: string;
	code: string;
	id: string;
	name: string;
	isLeaf: boolean;
	data: Data;
	parentId: string;
	children: Child[];
	isChecked?: boolean;
	isPerson?: boolean;
	isDisable?: boolean;
}

export interface DonViType {
	key: string;
	title: string;
	code: string;
	id: string;
	name: string;
	isLeaf: boolean;
	data: Data;
	parentId: string;
	children: Child[];
	isChecked?: boolean;
	unitId?: any;
	isPerson?: boolean;
	vaitro?: string;
	userId?: string;
	isDisable?: boolean;
}
