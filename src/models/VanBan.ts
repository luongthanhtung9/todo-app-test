export class VanBan {
	abstract?: string;
	bookId?: string;
	bookName?: string;
	bookNumber?: number;
	bookNumberSub?: string;
	name?: string;
	content?: string;
	created?: string;
	createdBy?: string;
	description?: string;
	documentCode?: string;
	documentTypeName?: string;
	commandDate?: string;
	deadlineByDate?: string;
	inDate?: string;
	documentDate?: string;
	signPosition?: string;
	signName?: string;
	fileUpload?: string;
	fileUploadSub?: string;
	fileUploadSubs?: Array<string>;
	fileUploads?: Array<string>;
	id?: string;
	isChecked?: boolean;
	isInDept?: boolean;
	isSigned?: boolean;
	languageName?: string;
	priorityId?: number;
	priorityName?: string;
	publishDeptId?: string;
	securityName?: string;
	sendGroupId?: string;
	sendGroupName?: string;
	sendDeptName?: string;
	sendUserId?: string;
	sendUserName?: string;
	status?: number;
	statusName?: string;
	type?: number;
	numberOfPage?: number;
	typeName?: string;
	isElectron?: boolean;
	process?: Process;
	processNote?: Array<string>;
	leaderUserName?: string;
	jobTypeName?: string;
	meetingTypeName?: string;
	parentBookNumber?: number;
	parentName?: string;
	numberOfDocument?: any;
	isConfirmed?: any;
	publishDate?: any;
	publishDeptName?: any;
	historyProcess?: any;
	userProcess?: UserProcess;
	noiPhatHanh?: string;
	butPheLanhDao?: Array<string>;
	vanBanDiRef?: any;
	isPublish?: boolean;
	isSignPublish?: boolean;
	donViSoanThaoId?: string;
	danhSachButPheLanhDao?: Array<string>;
	toTrinhTCRef?: any;
	toTrinhBoRef?: any;
	symbol?: any;
	signFlashes?: boolean;
	isUserMainProcess?: boolean;
    listProcess?: any[];
}

export class Process {
	actionNext?: Array<ActionNext>;
	processType?: number;
	status?: number;
	actionName?: string;
}

export class ActionNext {
	key?: string;
	name?: string;
}

export class UserProcess {
	status?: number;
}
