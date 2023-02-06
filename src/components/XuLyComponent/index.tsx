import DocumentType from '@commons/DocumentType';
import {
	ButtonComponent,
	ModalDonViComponent,
	ModalInputComponent,
	ModalTraLoiComponent,
	ModalChoYKienComponent,
	ModalTraVBComponent,
	ModalTrinhComponent,
	TouchComponent,
	ModalTrinhKyThayComponent,
	ModalChuyenCapSoVBDiComponent,
	ModalPhatHanhVBDiComponent,
	ModalChuyenCapSoToTrinhComponent,
} from '@components/index';
import {AddInfoIcon} from '@images/index';
import {ApiResponse} from '@models/ApiResponse';
import {dismissLoading, showMessageSuccess, showMessageWarning} from '@utils/index';
import React, {memo, useEffect, useMemo, useState} from 'react';
import {Text, View, Platform, KeyboardAvoidingView} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {connect, RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import SelectItemComponent from './components/SelectItemComponent';
import styles from './style';
import ModalChuyenCapSoComponent from '@components/ModalChuyenCapSoComponent';
import ModalLienKetVanBanComponent from '@components/ModalLienKetVanBanComponent';
import {UserInfo} from '@models/UserInfo';
import ModalThuHoiVBComponent from '@components/ModalThuHoiVBComponent';
import {LSXL} from '@models/LSXL';
import {actionNguoiXLVBDenNew, laySoVanBan, timTheoDieuKienAction} from '@redux/actions/vbden';
import {actionLayTatCaSo, actionLSXLVBD} from '@redux/actions/quanly';
import ModalBoSungYKien from './components/ModalBoSungYKien';
import {verticalScale} from 'react-native-size-matters';
import {useHeaderHeight} from '@react-navigation/elements';
import ModalHoanThienVBComponent from '@components/ModalHoanThienVBComponent';
import ModalChuyenHoSoLuuTru from '@components/ModalChuyenHoSoLuuTru';
export interface Props {
	id?: string;
	type?: number;
	isDV?: boolean;
	isTrinh?: boolean;
	titleTrinh?: string;
	isKetThuc?: boolean;
	isDuyet?: boolean;
	isTra?: boolean;
	isTraNew?: boolean;
	isThuHoi?: boolean;
	isChuyenBS?: boolean;
	onTrinhXuLy?: (param?: any) => void;
	onDuyetVB?: (param?: any) => void;
	onTuChoiVB?: (param?: any) => void;
	onTraVB?: (noiDung?: string, userId?: string) => void;
	onThuHoiVB?: (noiDung: string) => void;
	onChuyenBoSung?: (param?: any) => void;
	onChuyenCapSo?: (noiDung?: string, userId?: string) => void;
	onKetThuc?: (param?: any) => void;
	onChuyenKyThay?: (noidung?: string, param?: any) => void;
	userInfo?: UserInfo;
	nguoiXLVBDenResponse?: ApiResponse<any>;
	timTheoMaResponse?: ApiResponse<any>;
	boSungLanhDaoXuLyRes?: ApiResponse<any>;
	nguoiXLVBDenResponseNew?: ApiResponse<any>;
	tatCaChuyenVienResponse?: ApiResponse<any>;
	listDonViDXResponse?: ApiResponse<any>;
	listTatCaSoResponse?: ApiResponse<any>;
	listLDDXResponse?: ApiResponse<any>;
	layDVGiaoViecResponse?: ApiResponse<any>;
	lsxlVBDResponse?: ApiResponse<Array<LSXL>>;
	thongTinXLResponse?: ApiResponse<any>;
	soVanBanDen?: ApiResponse<any>;
	danhSachLanhDaoTrinh?: ApiResponse<any>;
	toTrinhInitResponse?: ApiResponse<any>;
	danhSachNguoiXuLyResponse?: ApiResponse<any>;
	isVT?: boolean;
	isComment?: boolean;
	isShowBtnLDVPChuyenDonVi?: {status: boolean; typeVB: any; priorityId: any};
	isTiepNhan?: boolean;
	isCheckLDP?: boolean;
	isLDP?: boolean;
	isKyThay?: boolean;
	isCheckShowDVXL?: boolean;
	ischeckShowBtnAddPersionResolve?: boolean;
	titleFormTrinh?: string;
	checkIsSuggestDVXL?: boolean;
	checkShowInfoResolveVT?: boolean;
	isPhatHanh?: boolean;
	onPhatHanh?: (param?: any) => void;
	isShowBtnBoSungDonVi?: boolean;
	isShowBoSungYKien?: boolean;
	isChuyenXuLy?: boolean;
	isChuyenCapSo?: boolean;
	isChuyenTra?: boolean;
	chuyenCapSoVBDI?: () => void;
	isYCHoanThien?: boolean;
	hoanThienVb?: (noiDung: string) => void;
	isTrinhVP?: boolean;
	isChuyenTraVP?: boolean;
	onTrinhVP?: (param?: any) => void;
	isChuyenVanPhong?: boolean;
	onTrinhLDVP?: () => void;
	isTuChoi?: boolean;
	onDongHS?: () => void;
	isChuyenHoSoLuTru?: boolean;
	onThemLuuTruVanBan?: (param: any) => void;
	boSungYKienVBDen?: (param: any) => void;
	onLDVPChuyenDonVi?: (param: any) => void;
	onChuyenDonVi?: (param: any) => void;
	onChuyenChuyenVien?: (param: any) => void;
	onCapNhatThongTin?: (param: any) => void;
	onTiepNhanVanBan?: (param: any) => void;
}

const XuLyComponent = (props: Props) => {
	const height = useHeaderHeight();
	const dispatch = useDispatch();
	const {token} = useSelector((state: RootStateOrAny) => state.configs);
	const {
		id,
		type,
		isTrinh,
		titleTrinh,
		isDuyet,
		isKetThuc,
		isTra,
		isTraNew,
		isThuHoi,
		userInfo,
		timTheoMaResponse,
		boSungLanhDaoXuLyRes,
		nguoiXLVBDenResponseNew,
		tatCaChuyenVienResponse,
		listDonViDXResponse,
		listTatCaSoResponse,
		layDVGiaoViecResponse,
		lsxlVBDResponse,
		thongTinXLResponse,
		soVanBanDen,
		danhSachLanhDaoTrinh,
		toTrinhInitResponse,
		isVT,
		isComment,
		isShowBtnLDVPChuyenDonVi,
		danhSachNguoiXuLyResponse,
		isTiepNhan,
		isLDP,
		isKyThay,
		isCheckShowDVXL,
		ischeckShowBtnAddPersionResolve,
		titleFormTrinh,
		checkIsSuggestDVXL,
		checkShowInfoResolveVT,
		isPhatHanh,
		onPhatHanh,
		isShowBtnBoSungDonVi,
		isShowBoSungYKien,
		isChuyenXuLy,
		isChuyenCapSo,
		isChuyenTra,
		chuyenCapSoVBDI,
		isYCHoanThien,
		isTrinhVP,
		isChuyenTraVP,
		isChuyenVanPhong,
		isTuChoi,
		isChuyenHoSoLuTru,
	} = props;

	const [isVisibleChuyenCapSo, setIsVisibleChuyenCapSo] = useState<boolean>(false);
	const [isVisibleChuyenCapSoVBDi, setIsVisibleChuyenCapSoVBDi] = useState<boolean>(false);
	const [isVisibleChuyenCapSoToTrinh, setIsVisibleChuyenCapSoToTrinh] = useState<boolean>(false);
	const [isVisiblePhatHanhVBDi, setIsVisiblePhatHanhVBDi] = useState<boolean>(false);
	const [isVisibleTra, setIsVisibleTra] = useState<boolean>(false);
	const [isVisibleChuyenXuLy, setIsVisibleChuyenXuLy] = useState<boolean>(false);
	const [isVisibleThuHoi, setIsVisibleThuHoi] = useState<boolean>(false);
	const [isBoSungYKien, setIsBoSungYKien] = useState<boolean>(false);
	const [isVisibleTuChoi, setIsVisibleTuChoi] = useState<boolean>(false);
	const [isVisibleTrinh, setIsVisibleTrinh] = useState<boolean>(false);
	const [isVisibleDonVi, setIsVisibleDonVi] = useState<boolean>(false);
	const [isVisibleChuyenHoSoLuuTru, setIsVisibleChuyenHoSoLuuTru] = useState<boolean>(false);
	const [isVisibleDuyet, setIsVisibleDuyet] = useState<boolean>(false);
	const [isVisibleLienKet, setIsVisibleLienket] = useState<boolean>(false);
	const [isVisibleChoYKien, setIsVisibleChoYKien] = useState<boolean>(false);
	const [isVisibleTraLoi, setIsVisibleTraLoi] = useState<boolean>(false);
	const [isVisibleKyThay, setIsVisibleKyThay] = useState<boolean>(false);
	const [isYCHoanThienVB, setIsYCHoanThienVB] = useState<boolean>(false);

	const [lichSuXuLyData, setLichSuXuLyData] = useState<Array<LSXL>>();

	const [checkResolve, setCheckResolve] = useState(false);
	const [listAllLeader, setListAllLeader] = useState<Array<any>>([]);
	const [listSelectLeader, setListSelectLeader] = useState<Array<any>>([]);
	const [listDonVi, setListDonVi] = useState<any>();
	const [listDonViSelect, setListDonViSelect] = useState<Array<any>>([]);
	const [listBoXungDonVi, setListBoXungDonVi] = useState<Array<any>>([]);
	const [dataVtUpdateThongtin, setDataVtUpdateThongtin] = useState<any>();

	const [soVanBan, setSoVanBan] = useState();
	const [bookID, setBookID] = useState();

	useEffect(() => {
		dispatch(actionLayTatCaSo({loai: DocumentType.VAN_BAN_DEN}));
	}, []);

	// chi call khi role VT tiep nhan van ban
	useMemo(() => {
		if (isTiepNhan && listTatCaSoResponse && listTatCaSoResponse.success) {
			const payload = {
				idSo: listTatCaSoResponse.data[0].id,
				loaiSoCanLay: 0,
			};
			setBookID(listTatCaSoResponse.data[0].id);
			DocumentType.VAN_BAN_DEN && dispatch(laySoVanBan(payload));
		}
	}, [listTatCaSoResponse]);

	// chi call khi role VT tiep nhan van ban
	useMemo(() => {
		if (isTiepNhan && soVanBanDen && soVanBanDen.success) {
			setSoVanBan(soVanBanDen.data);
		}
	}, [soVanBanDen]);

	useMemo(() => {
		if (!lsxlVBDResponse) return;
		if (lsxlVBDResponse.success) {
			setLichSuXuLyData(lsxlVBDResponse.data);
		}
	}, [lsxlVBDResponse]);

	useMemo(() => {
		if (!thongTinXLResponse) return;
		if (thongTinXLResponse.success) {
			//resolve data
			const dataResolve: any = [];
			thongTinXLResponse.data.nguoiDuocDeXuat.forEach((element: any) => {
				const donViXuLyData = {
					id: element.id,
					hanXuLy: null,
					kieuXuLy: element.kieuXuLy,
					roleId: element.roleId,
					tenDonVi: element.tenDonVi,
					unitId: element.unitId,
					userName: element?.userName || '',
					vaiTro: element?.vaiTro || null,
					userId: element?.userId || '',
				};
				dataResolve.push(donViXuLyData);
			});
			setListDonViSelect(dataResolve);
		}
	}, [thongTinXLResponse]);

	useMemo(() => {
		if (!nguoiXLVBDenResponseNew) return;
		if (nguoiXLVBDenResponseNew.success) {
			// setListAllLeader(nguoiXLVBDenResponse.data);
			setListAllLeader(nguoiXLVBDenResponseNew.data);
		}
	}, [nguoiXLVBDenResponseNew]);

	useMemo(() => {
		if (!tatCaChuyenVienResponse) return;
		if (tatCaChuyenVienResponse.success) {
			// setListAllLeader(nguoiXLVBDenResponse.data);
			setListAllLeader(tatCaChuyenVienResponse.data);
		}
	}, [tatCaChuyenVienResponse]);

	// console.log('==>>> isTrinh && !checkResolve', isTrinh, !checkResolve);

	useMemo(() => {
		if (danhSachNguoiXuLyResponse && danhSachNguoiXuLyResponse) {
			setDataVtUpdateThongtin(danhSachNguoiXuLyResponse);
			//save
			if (danhSachNguoiXuLyResponse.danhSachNguoiXuLys) {
				const nguoiXuLyDefault = danhSachNguoiXuLyResponse?.danhSachNguoiXuLys;
				console.log('==>> nguoiXuLyDefault', nguoiXuLyDefault);

				const newArrNguoiXuLy = nguoiXuLyDefault.map((item: any) => {
					return {
						id: item.receiceUserId,
						name: item.receiceUserName,
						roleId: item.roleId,
						vaiTro: item.roleName,
						positionId: item.positionId,
						positionName: item.positionName,
						deptId: item.sendGroupId,
						deptName: item.deptName,
						userId: item.receiceUserId,
						userName: item.receiceUserName,
						isPerson: true,
						isLeader: false,
						processType: item.processType,
					};
				});
				// const newPersion: any = {
				// 	id: nguoiXuLyDefault.receiceUserId,
				// 	name: nguoiXuLyDefault.receiceUserName,
				// 	roleId: nguoiXuLyDefault.roleId,
				// 	vaiTro: nguoiXuLyDefault.roleName,
				// 	positionId: nguoiXuLyDefault.positionId,
				// 	positionName: nguoiXuLyDefault.positionName,
				// 	deptId: nguoiXuLyDefault.sendGroupId,
				// 	deptName: nguoiXuLyDefault.deptName,
				// 	userId: nguoiXuLyDefault.receiceUserId,
				// 	userName: nguoiXuLyDefault.receiceUserName,
				// 	isPerson: true,
				// 	isLeader: false,
				// };
				setListSelectLeader(newArrNguoiXuLy);
			}
		}
	}, [danhSachNguoiXuLyResponse]);

	// useMemo(() => {
	// 	if (!listLDDXResponse) return;
	// 	if (listLDDXResponse.success) {
	// 		setListAllLeader(listLDDXResponse.data);
	// 	}
	// }, [listLDDXResponse]);

	useMemo(() => {
		if (!layDVGiaoViecResponse) return;
		if (layDVGiaoViecResponse.success) {
			setListAllLeader(layDVGiaoViecResponse.data);
			if (layDVGiaoViecResponse.data.length > 0) {
				const newList = layDVGiaoViecResponse.data[0];
				setListSelectLeader([{...newList, processType: 0}]);
			}
		}
	}, [layDVGiaoViecResponse]);

	useMemo(() => {
		if (!danhSachLanhDaoTrinh) return;
		if (danhSachLanhDaoTrinh.success && danhSachLanhDaoTrinh.data) {
			// setListAllLeader(nguoiXLVBDenResponse.data);
			setListAllLeader(danhSachLanhDaoTrinh.data);
			if (danhSachLanhDaoTrinh.data.length > 0) {
				const newList = danhSachLanhDaoTrinh.data[0];
				setListSelectLeader([{...newList, processType: 0}]);
			}
		}
	}, [danhSachLanhDaoTrinh]);

	useMemo(() => {
		if (!listDonViDXResponse) return;
		if (listDonViDXResponse.success) {
			setListDonVi(listDonViDXResponse.data);
		}
	}, [listDonViDXResponse]);

	function _onSelectDV(item: any) {
		// const isExist = listDonViSelect?.find(donvi => donvi.id === item.id);
		const dataResolve = {
			hanXuLy: null,
			kieuXuLy: listDonViSelect.length === 0 ? 0 : 1,
			roleId: userInfo?.roleId,
			tenDonVi: item.name,
			unitId: item.id,
		};
		const isExist = listDonViSelect?.find(donvi => donvi.unitId === item.id);
		if (isExist) {
			const newList = listDonViSelect?.filter(donvi => donvi.unitId !== item.id);
			setListDonViSelect(newList);
		} else {
			const newList = listDonViSelect?.concat(dataResolve);
			setListDonViSelect(newList);
		}
	}

	function _onSelectHTDV(item: any, kieuXuLy?: any) {
		const newList: any = listDonViSelect?.map((element: any) => {
			return {
				...element,
				kieuXuLy: item.unitId === element.unitId ? kieuXuLy.value : element.kieuXuLy,
			};
		});
		setListDonViSelect(newList);
	}

	function _onSelectHXLDV(item: any, hanXuly: any) {
		const newList: any = listDonViSelect?.map((element: any) => {
			return {
				...element,
				hanXuLy: item.unitId === element.unitId ? hanXuly : element.hanXuLy,
			};
		});
		setListDonViSelect(newList);
	}

	function _onSelectNDDV(item: any, noiDung: string) {
		const findIndex = listDonViSelect.findIndex(itemDonvi => itemDonvi.unitId === item.unitId);
		const newItemUpdateNoiDung = [
			{
				...listDonViSelect[findIndex],
				noiDung: noiDung,
			},
		];
		const newList = listDonViSelect.map(
			obj => newItemUpdateNoiDung.find(o => o.unitId === obj.unitId) || obj,
		);
		setListDonViSelect(newList);
	}

	function _onSelectAcceptDV(data: any[]) {
		if (timTheoMaResponse && timTheoMaResponse?.success) {
			setIsVisibleDonVi(false);
			const newData = data.map((item, idx) => {
				return {
					...item,
					kieuXuLy: isShowBtnBoSungDonVi ? 1 : idx === 0 ? 0 : 1,
					roleId: timTheoMaResponse?.data.id,
				};
			});
			if (isShowBtnBoSungDonVi) {
				setListBoXungDonVi(newData);
			} else {
				setListDonViSelect(newData);
			}
		}
	}

	function _onSelect(item: any) {
		const isExist = listSelectLeader?.find(donvi => donvi.id === item.id);
		if (isExist) {
			const newList = listSelectLeader?.filter(donvi => donvi.id !== item.id);
			setListSelectLeader(newList);
		} else {
			const newList = listSelectLeader?.concat(item);
			setListSelectLeader(newList);
		}
	}

	function _onSelectHT(item: any, value?: any) {
		const filter = listSelectLeader.filter((item: any) => {
			return item.processType === 0;
		});
		if (filter.length > 0 && value.value === 0) {
			// console.log('123123', filter);
			return;
		}
		const newList: any = listSelectLeader?.map((element: any) => {
			return {
				...element,
				processType: item.id === element.id ? value.value : element.processType,
			};
		});
		// console.log('newList', newList);
		setListSelectLeader(newList);
	}

	function _onSelectHXL(item: any, hanXuly: any) {
		const newList: any = listSelectLeader?.map((element: any) => {
			return {
				...element,
				hanXuLy: item.id === element.id ? hanXuly : element.hanXuLy,
			};
		});
		setListSelectLeader(newList);
	}

	function _onSelectND(item: any, noiDung: string) {
		const newList: any = listSelectLeader?.map((element: any) => {
			return {
				...element,
				noiDung: item.id === element.id ? noiDung : element.noiDung,
			};
		});
		setListSelectLeader(newList);
	}

	function _onSelectAccept() {
		setIsVisibleTrinh(false);
	}

	function _onAddDonViModal() {
		setIsVisibleDonVi(true);
	}

	function _onTrinhModal() {
		setIsVisibleTrinh(true);
	}

	const _onDeleteItem = (index: number) => {
		// console.log('delete item ', index);
		const listSelectLeaderClone = [...listSelectLeader];
		if (listSelectLeader.length === 1) {
			listSelectLeaderClone.splice(index, 1);
		} else {
			// const listSelectLeaderClone = [...listSelectLeader];
			listSelectLeaderClone.splice(index, 1);
			listSelectLeaderClone[0].processType = 0;
		}
		setListSelectLeader(listSelectLeaderClone);
	};

	const _deleteItemDonVi = (index: number) => {
		const listDonViSelectClone = [...listDonViSelect];
		// console.log('==>> listDonViSelectClone', listDonViSelectClone);
		// return;
		listDonViSelectClone.splice(index, 1);
		if (listDonViSelectClone.length === 1) {
			listDonViSelectClone[0].kieuXuLy = 0;
		}
		setListDonViSelect(listDonViSelectClone);
	};

	const _onUpdateUser = (value: any, index: number) => {
		const listSelectLeaderClone = [...listSelectLeader];
		listSelectLeaderClone[index] = {...listSelectLeaderClone[index], ...value};
		// console.log('listSelectLeaderClone', value);
		// console.log('listSelectLeaderClone', listSelectLeaderClone);
		setListSelectLeader(listSelectLeaderClone);
	};

	function _addUserSlove() {
		if (listAllLeader.length === 0) return;
		if (listSelectLeader.length === 0) {
			const newList = listAllLeader[0];
			setListSelectLeader([{...newList, processType: 0}]);
		} else {
			if (listSelectLeader.length === listAllLeader.length) return;
			const listSelectLeaderClone = [...listSelectLeader];
			let newList = [...listAllLeader];
			for (let i = 0; i < listSelectLeaderClone.length; i++) {
				newList = newList.filter((donvi: any) => donvi.id !== listSelectLeaderClone[i].id);
			}
			const newData = listSelectLeader?.concat({...newList[0], processType: 1});
			setListSelectLeader(newData);
		}

		// const isExist = listSelectLeader?.find(donvi => donvi.id === item.id);
		// if (isExist) {
		// 	const newList = listSelectLeader?.filter(donvi => donvi.id !== item.id);
		// 	setListSelectLeader(newList);
		// 	console.log('_onSelect', newList, item);
		// } else {
		// 	const newList = listSelectLeader?.concat(item);
		// 	setListSelectLeader(newList);
		// 	console.log('_onSelect', newList, item);
		// }
	}
	// http://14.248.82.147:81/api/VanBanDi/LayDanhSachLanhDaoTrinh
	// idVanBanDi: "9066b434-4794-4c25-b850-08dad431c6f7"
	// isPhong: true
	function _onTraModal() {
		setIsVisibleTra(true);
	}

	function _onHoanThienModal() {
		setIsYCHoanThienVB(true);
	}

	function _onThuHoiModal() {
		setIsVisibleThuHoi(true);
	}

	function traVB(noiDung: string, userId: string) {
		setIsVisibleTra(false);
		if (props.onTraVB) props.onTraVB(noiDung, userId);
	}

	function _hoanThienVb(noiDung: string) {
		setIsYCHoanThienVB(false);
		if (props.hoanThienVb) props.hoanThienVb(noiDung);
	}

	function kyThay(noiDung?: string, user?: any) {
		setIsVisibleKyThay(false);
		if (props.onChuyenKyThay) props.onChuyenKyThay(noiDung, user);
	}

	function thuhoiVB(noiDung: string) {
		setIsVisibleThuHoi(false);
		if (props.onThuHoiVB) props.onThuHoiVB(noiDung);
	}

	useMemo(() => {
		if (boSungLanhDaoXuLyRes && boSungLanhDaoXuLyRes.success) {
			dismissLoading();
			showMessageSuccess('Bổ sung nội dung ý kiến thành công');
			//refesh lãnh đạo xử lý
			dispatch(
				actionNguoiXLVBDenNew({
					idVanBan: id,
				}),
			);
			const paramHistory = {
				pageInfo: {page: 1, pageSize: 20},
				idVanBan: id,
			};
			if (type === DocumentType.VAN_BAN_DEN) {
				// refesh lịch sử xử lý
				dispatch(actionLSXLVBD(paramHistory));
			}
		}
	}, [boSungLanhDaoXuLyRes]);

	function boSungYKien(data: any) {
		setIsBoSungYKien(false);
		const param = {
			...data,
			idVanBan: id,
		};
		if (props.boSungYKienVBDen) props.boSungYKienVBDen(param);
		// showLoading();
		// dispatch(boSungLanhDaoXyLy(param));
	}

	async function chuyenXuLy(noidung: string) {
		// showLoading();
		setIsVisibleThuHoi(false);
		const param = {
			actionType: 2,
			idVanBan: id,
			nguoiXuLy:
				listSelectLeader.length !== 0
					? listSelectLeader.map((item: any) => {
							return {
								...item,
								receiceUserId: item.id,
								receiceUserName: item.name,
								hanXuLy: item.hanXuLy,
								processType: item.processType,
								roleId: item.roleId,
								roleName: item.vaitro,
								deptId: item.deptId,
								deptName: item.deptName,
								positionId: item.positionId,
								positionName: item.positionName,
								idVanBan: id,
								noiDung: item.noiDung,
							};
					  })
					: [],
			nguoiDuocDeXuat: listDonViSelect,
			noiDung: noidung,
		};
		if (isShowBtnLDVPChuyenDonVi?.status) {
			const paramLDVPChuyenDonVi = {
				actionType: 2,
				idVanBan: id,
				nguoiXuLy: [],
				nguoiDuocDeXuat: listDonViSelect,
				butPheLanhDao: '',
				isSigned: true,
				type: isShowBtnLDVPChuyenDonVi.typeVB,
				priorityId: isShowBtnLDVPChuyenDonVi.priorityId,
			};
			if (props.onLDVPChuyenDonVi) props.onLDVPChuyenDonVi(paramLDVPChuyenDonVi);
			// showAlert({
			// 	message: 'Xác nhận chuyển văn bản?',
			// 	rightAction: async () => {
			// 		try {
			// 			const res: any = await fetchPOST(
			// 				`api/QuyTrinhXuLyVB/LDVPChuyenDonVi`,
			// 				token,
			// 				paramLDVPChuyenDonVi,
			// 			);
			// 			dispatch(chuyenDonViCompelete(res));
			// 		} catch (e) {
			// 			dispatch(
			// 				chuyenDonViCompelete({
			// 					success: false,
			// 					message: 'Bạn vui lòng kiểm tra lại kết nối.',
			// 				}),
			// 			);
			// 		}
			// 	},
			// });
			return;
		}
		if (isComment) {
			// dispatch(actionChuyenDonVi(param));
			if (props.onChuyenDonVi) props.onChuyenDonVi(param);
			// try {
			// 	const res: any = await fetchPOST(`api/QuyTrinhXuLyVB/ChuyenDonVi`, token, param);
			// 	dispatch(chuyenDonViCompelete(res));
			// } catch (e) {
			// 	dispatch(
			// 		chuyenDonViCompelete({
			// 			success: false,
			// 			message: 'Bạn vui lòng kiểm tra lại kết nối.',
			// 		}),
			// 	);
			// }
			return;
		}
		if (isLDP) {
			const newParamChuyenChuyenVien = {
				idVanBan: id,
				nguoiXuLy:
					listSelectLeader.length !== 0
						? listSelectLeader.map((item: any) => {
								return {
									deptId: item.deptId,
									deptName: item.deptName,
									hanXuLy: item.hanXuLy,
									positionId: item.positionId,
									positionName: item.positionName,
									processType: item.processType,
									receiceUserId: item.userId,
									receiceUserName: item.userName,
									roleId: item.roleId,
									roleName: item.vaiTro,
									status: 0,
								};
						  })
						: [],
				priorityId: '0',
			};
			if (props.onChuyenChuyenVien) props.onChuyenChuyenVien(newParamChuyenChuyenVien);
			// showAlert({
			// 	message: 'Xác nhận chuyển văn bản?',
			// 	rightAction: async () => {
			// 		try {
			// 			const res: any = await fetchPOST(
			// 				`api/QuyTrinhXuLyVB/ChuyenChuyenVien`,
			// 				token,
			// 				newParamChuyenChuyenVien,
			// 			);
			// 			dispatch(chuyenChuyenVienSuccess(res));
			// 		} catch (e) {
			// 			dispatch(
			// 				chuyenChuyenVienSuccess({
			// 					success: false,
			// 					message: 'Bạn vui lòng kiểm tra lại kết nối.',
			// 				}),
			// 			);
			// 		}
			// 		// dispatch(chuyenChuyenVien(newParamChuyenChuyenVien));
			// 	},
			// });
			return;
		}
		if (props.onTrinhXuLy) {
			if (
				(isCheckShowDVXL || isShowBtnBoSungDonVi) &&
				type === DocumentType.VAN_BAN_DEN &&
				listDonViSelect.length === 0
			) {
				showMessageWarning('Bạn phải thêm đơn vị xử lý');
				return;
			}
			if (
				(ischeckShowBtnAddPersionResolve ||
					(checkIsSuggestDVXL && listAllLeader.length === 0) ||
					checkShowInfoResolveVT) &&
				listSelectLeader.length === 0
			) {
				showMessageWarning('Bạn phải thêm thông tin xử lý');
				return;
			}
			props.onTrinhXuLy(param);
		}
	}

	function _trinhxulyShowModal() {
		if (listSelectLeader.length !== 0 || listDonViSelect.length !== 0) {
			setIsVisibleChuyenXuLy(true);
			return;
		}
		showMessageWarning('Bạn phải thêm thông tin xử lý');
	}

	function _capNhatThongTin() {
		if (listSelectLeader.length === 0) {
			showMessageWarning('Bạn phải thêm thông tin xử lý');
			return;
		}
		const param = {
			...dataVtUpdateThongtin,
			danhSachNguoiXuLys:
				listSelectLeader.length !== 0
					? listSelectLeader.map((item: any) => {
							return {
								deptId: item.deptId,
								deptName: item.deptName,
								hanXuLy: item.hanXuLy,
								positionId: item.positionId,
								positionName: item.positionName,
								processType: item.processType,
								receiceUserId: item.userId,
								receiceUserName: item.userName,
								roleId: item.roleId,
								roleName: item.vaiTro,
							};
					  })
					: [],
			addType: 2,
		};
		delete param.fileUpload;
		delete param.workflowId;
		delete param.status;
		if (props.onCapNhatThongTin) props.onCapNhatThongTin(param);
		// showAlert({
		// 	message: 'Xác nhận trình văn bản',
		// 	rightAction: async () => {
		// 		showLoading();
		// 		// dispatch(capNhatThongTin(param));
		// 		try {
		// 			const res: any = await fetchPOST(`api/VanBanDen/CapNhatThongTin`, token, param);
		// 			dispatch(capNhatThongTinSuccess(res));
		// 		} catch (e) {
		// 			dispatch(
		// 				capNhatThongTinSuccess({
		// 					success: false,
		// 					message: 'Bạn vui lòng kiểm tra lại kết nối.',
		// 				}),
		// 			);
		// 		}
		// 	},
		// });
	}

	function _trinhxulyVP() {
		if (type === DocumentType.TO_TRINH) {
			const param = {
				idVanBan: id,
				listProcess: listSelectLeader.map((item: any) => {
					if (item.data) {
						return {
							receiceUserId: item.data.userId,
							receiceUserName: item.userName,
							deptId: item.data.deptId,
							deptName: item.data.deptName,
							positionId: item.data.positionId,
							positionName: item.data.positionName,
							hanXuLy: item.hanXuLy,
							processType: item.processType,
							roleId: item.data.roleId,
							roleName: item.data.vaiTro,
							noiDung: item.noiDung,
							status: 0,
						};
					} else {
						return {
							receiceUserId: item.userId,
							receiceUserName: item.userName,
							deptId: item.deptId,
							deptName: item.deptName,
							positionId: item.positionId,
							positionName: item.positionName,
							hanXuLy: item.hanXuLy,
							processType: item.processType,
							roleId: item.roleId,
							roleName: item.vaiTro,
							noiDung: item.noiDung,
							status: 0,
						};
					}
				}),
			};
			if (props.onTrinhVP) props.onTrinhVP(param);
		}
	}

	function _trinhxuly() {
		// setIsVisibleChuyenXuLy(true);
		// return;
		// if (isCheckShowDVXL && listDonViSelect.length === 0) {
		// 	showMessageWarning('Bạn phải thêm đơn vị xử lý');
		// 	return;
		// }
		// if (
		// 	(ischeckShowBtnAddPersionResolve || checkIsSuggestDVXL) &&
		// 	listSelectLeader.length === 0
		// ) {
		// 	showMessageWarning('Bạn phải thêm thông tin xử lý');
		// 	return;
		// }
		if (type == DocumentType.VAN_BAN_DEN) {
			chuyenXuLy('');
		}
		if (type == DocumentType.TO_TRINH) {
			const param = {
				idVanBan: id,
				listTrinhKy: listSelectLeader.map((item: any) => {
					if (item.data) {
						return {
							receiceUserId: item.data.userId,
							receiceUserName: item.userName,
							deptId: item.data.deptId,
							deptName: item.data.deptName,
							positionId: item.data.positionId,
							positionName: item.data.positionName,
							hanXuLy: item.hanXuLy,
							processType: item.processType,
							roleId: item.data.roleId,
							roleName: item.data.vaiTro,
							noiDung: item.noiDung,
						};
					} else {
						return {
							receiceUserId: item.userId,
							receiceUserName: item.userName,
							deptId: item.deptId,
							deptName: item.deptName,
							positionId: item.positionId,
							positionName: item.positionName,
							hanXuLy: item.hanXuLy,
							processType: item.processType,
							roleId: item.roleId,
							roleName: item.vaiTro,
							noiDung: item.noiDung,
						};
					}
				}),
			};
			if (props.onTrinhXuLy) props.onTrinhXuLy(param);
		}

		if (type == DocumentType.VAN_BAN_DI) {
			const param = {
				idVanBan: id,
				listTrinhKy: listSelectLeader.map((item: any) => {
					return {
						receiceUserId: item.userId,
						receiceUserName: item.userName,
						deptId: item.deptId,
						deptName: item.deptName,
						positionId: item.positionId,
						positionName: item.positionName,
						hanXuLy: item.hanXuLy,
						processType: item.processType,
						roleId: item.roleId,
						roleName: item.vaiTro,
						noiDung: item.noiDung,
					};
				}),
			};
			if (props.onTrinhXuLy) props.onTrinhXuLy(param);
		}

		if (type === DocumentType.GIAO_VIEC) {
			// [
			//     {
			//         "id": "ffc99653-4752-4dc0-ac0c-1ae1c600b84a",
			//         "idVanBan": "a730f20c-da38-4cb0-a1e8-08daeecbbb5f",
			//         "receiceUserId": "27c86221-48d0-4c1e-bee0-2d4f92772cd2",
			//         "receiceUserName": "Nguyễn Thị Hà",
			//         "sendUserId": "aa8b2809-e439-48bf-a7a5-fa20a6ae5867",
			//         "sendUserName": "Dương Đức Minh",
			//         "sendGroupId": "ade7e1df-ef79-447d-bbb9-514d5cc1af95",
			//         "sendGroupName": "Cục Dự trữ Nhà nước khu vực Hà Nội",
			//         "processType": 0,
			//         "roleId": "4c0f5979-c4a0-4df2-9ac4-c03f9dc76aff",
			//         "roleName": "Lãnh đạo đơn vị",
			//         "deptId": "ade7e1df-ef79-447d-bbb9-514d5cc1af95",
			//         "deptName": "Cục Dự trữ Nhà nước khu vực Hà Nội",
			//         "positionId": "d79ef4a0-9a05-4c7f-03d2-08d9aef90b99",
			//         "positionName": "Phó Cục trưởng",
			//         "status": -1
			//     }
			// ]
			// {

			//     "parentId": "ade7e1df-ef79-447d-bbb9-514d5cc1af95",
			//     "name": "Nguyễn Thị Hà",
			//     "roleId": "4c0f5979-c4a0-4df2-9ac4-c03f9dc76aff",
			//     "vaiTro": "LDDV",
			//     "positionId": "d79ef4a0-9a05-4c7f-03d2-08d9aef90b99",
			//     "positionName": "Phó Cục trưởng",
			//     "deptId": "ade7e1df-ef79-447d-bbb9-514d5cc1af95",
			//     "deptName": "Cục Dự trữ Nhà nước khu vực Hà Nội",
			//     "userId": "27c86221-48d0-4c1e-bee0-2d4f92772cd2",
			//     "userName": "Nguyễn Thị Hà",
			//     "isPerson": true,
			//     "isLeader": false,
			//     "level": 1,
			//     "thuocDonVi": 0,
			//     "processType": 0
			// }
			const param = {
				idCongViec: id,
				nguoiXuLy: listSelectLeader.map((item: any) => {
					return {
						idVanBan: id,
						receiceUserId: item.userId,
						receiceUserName: item.userName,
						deptId: item.deptId,
						deptName: item.deptName,
						positionId: item.positionId,
						positionName: item.positionName,
						hanXuLy: item.hanXuLy || null,
						processType: item.processType,
						roleId: item.roleId,
						roleName: item.vaiTro,
						// status: '0',
						noiDung: item.noiDung || '',
					};
				}),
			};
			if (props.onTrinhXuLy) props.onTrinhXuLy(param);
		}
	}

	function _onLienKet() {
		setIsVisibleLienket(true);
	}

	function _duyetxulyModal() {
		setIsVisibleDuyet(true);
	}

	function _chuyenHoSoLuuTru() {
		const param = {
			pageInfo: {
				page: 1,
				pageSize: 50,
			},
			sorts: [],
			status: 1,
		};
		dispatch(timTheoDieuKienAction(param));
		setIsVisibleChuyenHoSoLuuTru(true);
	}

	function _tiepNhanVanBan() {
		const param = {
			...dataVtUpdateThongtin,
			bookId: bookID,
			bookNumber: soVanBan,
		};
		delete param.fileUpload;
		if (props.onTiepNhanVanBan) props.onTiepNhanVanBan(param);
		// dispatch(tiepNhanVanBan(param));
	}

	function _tuchoiModal() {
		setIsVisibleTuChoi(true);
	}

	function _duyetxuly(noiDung: string) {
		setIsVisibleDuyet(false);
		const param = {
			idVanBan: id,
			noiDung,
		};
		if (props.onDuyetVB) props.onDuyetVB(param);
	}

	function _tuchoiVB(noiDung: string) {
		setIsVisibleTuChoi(false);
		const param = {
			idVanBan: id,
			noiDung,
		};
		if (props.onTuChoiVB) props.onTuChoiVB(param);
	}

	function _chuyenbosung() {
		const listChuyenBoSung = [...listDonViSelect, ...listBoXungDonVi];
		const newListDV: any = listChuyenBoSung?.filter(
			(item: any) => item.kieuXuLy === 0 || item.kieuXuLy === 1 || item.kieuXuLy === 2,
		);
		if (listBoXungDonVi.length === 0) {
			showMessageWarning('Bạn phải thêm đơn vị xử lý.');
			return;
		}
		const param = {
			idVanBan: id,
			nguoiDuocDeXuat: newListDV,
		};
		if (props.onChuyenBoSung) props.onChuyenBoSung(param);
	}

	function _chuyenCapSoModal() {
		setIsVisibleChuyenCapSo(true);
	}
	function _chuyenCapSoModalVBDi() {
		setIsVisibleChuyenCapSoVBDi(true);
	}
	function _phatHanhModalVBDi() {
		setIsVisiblePhatHanhVBDi(true);
	}
	function chuyencapso(noiDung: string, userId: string) {
		setIsVisibleChuyenCapSo(false);
		if (props.onChuyenCapSo) props.onChuyenCapSo(noiDung, userId);
	}
	function chuyencapsoVBDi(noiDung?: string, userId?: string) {
		setIsVisibleChuyenCapSoVBDi(false);
		if (props.onChuyenCapSo) props.onChuyenCapSo(noiDung, userId);
	}

	function chuyencapsoToTrinh(noiDung?: string) {
		setIsVisibleChuyenCapSoToTrinh(false);
		if (props.onChuyenCapSo) props.onChuyenCapSo(noiDung);
	}

	function phatHanhVBDi(noiDung?: string, userId?: string) {
		setIsVisiblePhatHanhVBDi(false);
		const param = {
			noiDung,
			userId,
		};
		if (onPhatHanh) onPhatHanh(param);
	}

	function dongHS() {
		if (props.onDongHS) props.onDongHS();
	}

	function _traloixuly(noiDung: string) {
		null;
	}

	function _choykienxuly(noiDung: string) {
		null;
	}

	function _onSearch(type?: string, param?: any) {
		null;
	}

	const _onSaveDocument = (data: string[]) => {
		const param = {
			idHoSoLuuTru: data,
			idVanBan: id,
			type: '1',
		};
		if (props.onThemLuuTruVanBan) props.onThemLuuTruVanBan(param);
		// dispatch(themLuuTruVanBanAction(param));
	};

	useEffect(() => {
		if (toTrinhInitResponse) {
			setListAllLeader(toTrinhInitResponse.data.dsLanhDaoTrinh);
			if (toTrinhInitResponse.data.dsLanhDaoTrinh.length > 0) {
				const newList = toTrinhInitResponse.data.dsLanhDaoTrinh[0];
				setListSelectLeader([{...newList, processType: 0}]);
			}
		}
	}, [toTrinhInitResponse]);

	return (
		<View style={styles.xuly}>
			{isVT && type === DocumentType.VAN_BAN_DI ? (
				<View
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						flex: 1,
					}}>
					<ButtonComponent title={'Cấp số'} onPress={_chuyenCapSoModalVBDi} />
					{isPhatHanh && (
						<ButtonComponent title={'Phát hành'} onPress={_phatHanhModalVBDi} />
					)}
				</View>
			) : (
				<View style={{flex: 1}}>
					{/* <View>
						{(isTrinh || isChuyenBS) && (
							<Text style={styles.viewAddTitle}>Thông tin</Text>
						)}
					</View> */}
					<KeyboardAvoidingView
						behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
						// behavior="position"
						keyboardVerticalOffset={
							Platform.OS === 'ios' ? height + verticalScale(135) : -50
						}
						style={{flex: 1}}>
						<ScrollView
							contentContainerStyle={{
								paddingBottom: 20,
							}}
							showsVerticalScrollIndicator={false}>
							{(isCheckShowDVXL || isShowBtnBoSungDonVi) &&
							type === DocumentType.VAN_BAN_DEN ? (
								// (isDV || isChuyenBS || checkResolve) &&
								// !isVT &&
								<View>
									<TouchComponent
										style={styles.viewAdd}
										onPress={() => _onAddDonViModal()}>
										<Text style={styles.viewAddTitle}>
											{isShowBtnBoSungDonVi
												? 'Bổ sung đơn vị'
												: 'Thêm đơn vị xử lý'}
										</Text>
										<AddInfoIcon style={{position: 'absolute', right: 0}} />
									</TouchComponent>
									<View>
										{(isShowBtnBoSungDonVi
											? listBoXungDonVi
											: listDonViSelect
										).map((donvi: any, index: number) => {
											return (
												<SelectItemComponent
													key={index}
													item={donvi}
													// onItemPress={() => _onAddDonViModal()}
													onSelectHT={_onSelectHTDV}
													onSelectHXL={_onSelectHXLDV}
													onSelectND={_onSelectNDDV}
													indexItem={index}
													isDonVi
													onDeleteItem={_deleteItemDonVi}
													listDataSelect={
														isShowBtnBoSungDonVi
															? listBoXungDonVi
															: listDonViSelect
													}
												/>
											);
										})}
									</View>
								</View>
							) : listDonViSelect.length !== 0 ? (
								<>
									<Text
										style={{
											fontWeight: 'bold',
											margin: 10,
										}}>
										Thông tin đề xuất đơn vị xử lý
									</Text>
									<View
										style={{
											flexDirection: 'row',
											justifyContent: 'space-between',
											marginHorizontal: 20,
											borderBottomWidth: 1,
											borderColor: '#ccc',
											marginBottom: 10,
										}}>
										<Text style={{marginBottom: 5}}>Đơn vị</Text>
										<Text>Hình thức</Text>
									</View>
									<View style={{width: '100%'}}>
										{listDonViSelect.map((_item, idx) => (
											<View
												key={idx}
												style={{
													flexDirection: 'row',
													justifyContent: 'space-between',
													marginHorizontal: 20,
												}}>
												<Text
													style={{
														marginBottom: 5,
														width: '80%',
													}}>
													{_item.tenDonVi}
												</Text>
												<Text
													style={{
														width: '20%',
														marginLeft: 10,
													}}>
													{_item.kieuXuLy === 0 ? 'Chủ trì' : 'Phối hợp'}
												</Text>
											</View>
										))}
									</View>
								</>
							) : null}
							{/* {isTrinh && listAllLeader.length !== 0 && ( */}
							{(ischeckShowBtnAddPersionResolve ||
								(checkIsSuggestDVXL && listAllLeader.length !== 0) ||
								checkShowInfoResolveVT) && (
								<View>
									<TouchComponent
										style={styles.viewAdd}
										onPress={() => {
											// _onTrinhModal();
											_addUserSlove();
										}}>
										<Text style={styles.viewAddTitle}>
											{checkShowInfoResolveVT
												? 'Thông tin xử lý'
												: titleFormTrinh}
										</Text>
										<AddInfoIcon style={{position: 'absolute', right: 0}} />
									</TouchComponent>
									<View>
										{listSelectLeader.map((leader: any, index: number) => {
											return (
												<SelectItemComponent
													key={index}
													item={leader}
													onSelectHT={_onSelectHT}
													onSelectHXL={_onSelectHXL}
													onSelectND={_onSelectND}
													// onItemPress={() => _onTrinhModal()}
													indexItem={index}
													onDeleteItem={_onDeleteItem}
													listData={listAllLeader}
													onUpdateUser={_onUpdateUser}
													listDataSelect={listSelectLeader}
												/>
											);
										})}
									</View>
								</View>
							)}
						</ScrollView>
					</KeyboardAvoidingView>
					<View style={[styles.viewButton]}>
						{isTiepNhan && (
							<ButtonComponent title="Tiếp nhận" onPress={_tiepNhanVanBan} />
						)}

						{isShowBoSungYKien && (
							<ButtonComponent
								title="Bổ sung ý kiến"
								onPress={() => setIsBoSungYKien(true)}
							/>
						)}
						{isTrinh &&
							(type == DocumentType.VAN_BAN_DEN ||
								type == DocumentType.TO_TRINH ||
								type == DocumentType.VAN_BAN_DI) && (
								<ButtonComponent
									title={titleTrinh && !isVT ? titleTrinh : 'Trình'}
									onPress={() => {
										console.log(
											'==>> isComment',
											isComment,
											isVT,
											'isChuyenXuLy',
											isChuyenXuLy,
										);
										isVT
											? _capNhatThongTin()
											: isComment
											? _trinhxulyShowModal()
											: _trinhxuly();
									}}
								/>
							)}
						{/* isChuyenHoSoLuTru */}
						{isChuyenHoSoLuTru && type == DocumentType.VAN_BAN_DEN && (
							<ButtonComponent
								title="Chuyển hồ sơ lưu trữ"
								onPress={_chuyenHoSoLuuTru}
							/>
						)}
						{!(isTrinh && isComment) &&
							isShowBtnLDVPChuyenDonVi &&
							isShowBtnLDVPChuyenDonVi.status &&
							type == DocumentType.VAN_BAN_DEN && (
								<ButtonComponent title="Chuyển" onPress={_trinhxuly} />
							)}
						{!(isTrinh && !isVT && !isComment) &&
							isChuyenXuLy &&
							type == DocumentType.VAN_BAN_DEN && (
								<ButtonComponent title="Chuyển xử lý" onPress={_trinhxuly} />
							)}
						{isDuyet &&
							(type == DocumentType.TO_TRINH || type == DocumentType.VAN_BAN_DI) && (
								<ButtonComponent title="Duyệt" onPress={_duyetxulyModal} />
							)}
						{isKyThay && type === DocumentType.TO_TRINH && (
							<ButtonComponent
								title="Chọn LĐ ký duyệt"
								onPress={() => setIsVisibleKyThay(true)}
							/>
						)}
						{isChuyenCapSo && type === DocumentType.TO_TRINH && (
							<ButtonComponent
								title="Chuyển cấp số"
								onPress={() => setIsVisibleChuyenCapSoToTrinh(true)}
							/>
						)}
						{isTrinhVP && type === DocumentType.TO_TRINH && (
							<ButtonComponent title="Trình lãnh đạo VP" onPress={_trinhxulyVP} />
						)}
						{isChuyenTraVP && type === DocumentType.TO_TRINH && (
							<ButtonComponent title="Chuyển trả" onPress={_onTraModal} />
						)}
						{isChuyenVanPhong && type === DocumentType.TO_TRINH && (
							<ButtonComponent
								title="Chuyển văn phòng"
								onPress={() => {
									if (props.onTrinhLDVP) props.onTrinhLDVP();
								}}
							/>
						)}
						{isChuyenCapSo && type === DocumentType.VAN_BAN_DI && (
							<ButtonComponent title="Chuyển cấp số" onPress={chuyenCapSoVBDI} />
						)}
						{isChuyenTra && type === DocumentType.TO_TRINH && (
							<ButtonComponent title="Chuyển trả" onPress={_onTraModal} />
						)}
						{isYCHoanThien && type === DocumentType.TO_TRINH && (
							<ButtonComponent
								title="Yêu cầu hoàn thiện"
								onPress={_onHoanThienModal}
							/>
						)}

						{isTra && <ButtonComponent title="Chuyển trả" onPress={_onTraModal} />}
						{isTraNew && <ButtonComponent title="Gửi trả" onPress={_onTraModal} />}
						{/* {type == DocumentType.VAN_BAN_DEN && isChuyenBS && (
							<ButtonComponent title="Chuyển bổ sung" onPress={_chuyenbosung} />
							)} */}
						{type == DocumentType.VAN_BAN_DEN && isShowBtnBoSungDonVi && (
							<ButtonComponent title="Chuyển bổ sung" onPress={_chuyenbosung} />
						)}
						{isTrinh && type == DocumentType.GIAO_VIEC && (
							<ButtonComponent title="Chuyển xử lý" onPress={_trinhxuly} />
						)}
						{isTuChoi && type == DocumentType.GIAO_VIEC && (
							<ButtonComponent title="Từ chối" onPress={_tuchoiModal} />
						)}
						{isThuHoi && <ButtonComponent title="Thu hồi" onPress={_onThuHoiModal} />}
						{/* <ButtonComponent title="Từ chối" onPress={_tuchoiModal} /> */}
						{isKetThuc &&
							(type == DocumentType.GIAO_VIEC ||
								type == DocumentType.VAN_BAN_DEN) && (
								<ButtonComponent title="Kết thúc" onPress={props.onKetThuc} />
							)}
						{isDuyet && type == DocumentType.GIAO_VIEC && (
							<ButtonComponent title="Hoàn thành" onPress={props.onKetThuc} />
						)}

						{type == DocumentType.CONG_VIEC && (
							<ButtonComponent title="Đóng hồ sơ" onPress={dongHS} />
						)}
					</View>
				</View>
			)}
			<ModalDonViComponent
				isVisible={isVisibleDonVi}
				data={listDonVi}
				listSelect={listDonViSelect}
				isBoXungDonVi={isShowBtnBoSungDonVi || false}
				// onSelect={_onSelectDV}
				// onSelectHT={_onSelectHTDV}
				// onSelectHXL={_onSelectHXLDV}
				// onSelectND={_onSelectNDDV}
				onSelectAccept={_onSelectAcceptDV}
				closePopup={() => setIsVisibleDonVi(false)}
				// defaultSelcted={thongTinXL}
			/>

			<ModalChuyenHoSoLuuTru
				isVisible={isVisibleChuyenHoSoLuuTru}
				onAcceptData={_onSaveDocument}
				closePopup={() => setIsVisibleChuyenHoSoLuuTru(false)}
			/>

			<ModalTrinhKyThayComponent
				id={id}
				type={props.type}
				isVisible={isVisibleKyThay}
				closePopup={() => setIsVisibleKyThay(false)}
				onAccept={kyThay}
			/>

			<ModalTrinhComponent
				isVisible={isVisibleTrinh}
				data={listAllLeader}
				listSelect={listSelectLeader}
				onSelect={_onSelect}
				// onSelectHT={_onSelectHT}
				// onSelectHXL={_onSelectHXL}
				// onSelectND={_onSelectND}
				onSelectAccept={_onSelectAccept}
				closePopup={() => setIsVisibleTrinh(false)}
			/>

			<ModalTraVBComponent
				id={id}
				type={props.type}
				isVisible={isVisibleTra}
				closePopup={() => setIsVisibleTra(false)}
				onAccept={traVB}
			/>

			<ModalHoanThienVBComponent
				id={id}
				type={props.type}
				isVisible={isYCHoanThienVB}
				closePopup={() => setIsYCHoanThienVB(false)}
				onAccept={_hoanThienVb}
			/>

			<ModalTraVBComponent
				id={id}
				type={props.type}
				isVisible={isVisibleChuyenXuLy}
				closePopup={() => setIsVisibleChuyenXuLy(false)}
				onAccept={chuyenXuLy}
				chuyenxuly
			/>

			<ModalBoSungYKien
				id={id}
				type={props.type}
				listAllLeader={listAllLeader}
				isVisible={isBoSungYKien}
				closePopup={() => setIsBoSungYKien(false)}
				onAccept={boSungYKien}
			/>

			<ModalThuHoiVBComponent
				id={id}
				type={props.type}
				userInfo={userInfo}
				isVisible={isVisibleThuHoi}
				closePopup={() => setIsVisibleThuHoi(false)}
				onAccept={thuhoiVB}
			/>

			<ModalChuyenCapSoComponent
				id={id}
				type={props.type}
				isVisible={isVisibleChuyenCapSo}
				closePopup={() => setIsVisibleChuyenCapSo(false)}
				onAccept={chuyencapso}
			/>

			<ModalChuyenCapSoVBDiComponent
				id={id}
				type={props.type}
				isVisible={isVisibleChuyenCapSoVBDi}
				closePopup={() => setIsVisibleChuyenCapSoVBDi(false)}
				onAccept={chuyencapsoVBDi}
			/>

			<ModalChuyenCapSoToTrinhComponent
				id={id}
				type={props.type}
				isVisible={isVisibleChuyenCapSoToTrinh}
				closePopup={() => setIsVisibleChuyenCapSoToTrinh(false)}
				onAccept={chuyencapsoToTrinh}
			/>

			<ModalPhatHanhVBDiComponent
				id={id}
				type={props.type}
				isVisible={isVisiblePhatHanhVBDi}
				closePopup={() => setIsVisiblePhatHanhVBDi(false)}
				onAccept={phatHanhVBDi}
			/>

			<ModalInputComponent
				title="Duyệt văn bản"
				titleContent="Nội dung"
				isVisible={isVisibleDuyet}
				closePopup={() => setIsVisibleDuyet(false)}
				onAccept={_duyetxuly}
			/>

			<ModalInputComponent
				title="Từ chối"
				titleContent="Lý do"
				isVisible={isVisibleTuChoi}
				closePopup={() => setIsVisibleTuChoi(false)}
				onAccept={_tuchoiVB}
			/>

			<ModalChoYKienComponent
				isVisible={isVisibleChoYKien}
				closePopup={() => setIsVisibleChoYKien(false)}
				onAccept={_choykienxuly}
			/>

			<ModalTraLoiComponent
				isVisible={isVisibleTraLoi}
				closePopup={() => setIsVisibleTraLoi(false)}
				onAccept={_traloixuly}
			/>

			<ModalLienKetVanBanComponent
				isVisible={isVisibleLienKet}
				type={DocumentType.CONG_VIEC}
				closePopup={() => setIsVisibleLienket(false)}
				onSearchForm={param => _onSearch('S', param)}
			/>
		</View>
	);
};

XuLyComponent.defaultProps = {
	isTrinh: true,
	isDuyet: true,
};

const mapStateToProps = (state: any) => {
	return {
		nguoiXLVBDenResponse: state.vbden.nguoiXLVBDenResponse,
		nguoiXLVBDenResponseNew: state.vbden.nguoiXLVBDenResponseNew,
		tatCaChuyenVienResponse: state.vbden.tatCaChuyenVienResponse,
		listDonViDXResponse: state.quanly.listDonViDXResponse,
		listTatCaSoResponse: state.quanly.listTatCaSoResponse,
		danhSachNguoiXuLyResponse: state.quanly.danhSachNguoiXuLyResponse,
		timTheoMaResponse: state.quanly.timTheoMaResponse,
		boSungLanhDaoXuLyRes: state.quanly.boSungLanhDaoXuLyRes,
		listLDDXResponse: state.quanly.listLDDXResponse,
		layDVGiaoViecResponse: state.giaoviec.layDVGiaoViecResponse,
		userInfo: state.setting.userInfo,
		lsxlVBDResponse: state.quanly.lsxlVBDResponse,
		thongTinXLResponse: state.vbden.thongTinXLResponse,
		soVanBanDen: state.vbden.soVanBanDen,
		danhSachLanhDaoTrinh: state.vbdi.danhSachLanhDaoTrinh,
		toTrinhInitResponse: state.totrinh.toTrinhInitResponse,
	};
};

export default connect(mapStateToProps)(memo(XuLyComponent));
