import React from 'react';
import {showMessage} from 'react-native-flash-message';
import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';
import {Buffer} from 'buffer';
import {AppAlertProps} from 'App';
import Icon from '@commons/Icon';
import AppColors from '@commons/AppColors';

export function getUserLogin(token: string) {
	const decoded: any = jwt_decode(token);
	if (decoded && decoded.userinfo) {
		return JSON.parse(Buffer.from(decoded.userinfo, 'base64').toString('utf8'));
	}

	return {};
}

export function foramtDate(date?: string) {
	return date ? dayjs(date).format('DD-MM-YYYY') : '';
}

export function formatDateTimeZ(date?: string | Date) {
	return date ? `${dayjs(date).format('YYYY-MM-DDT00:00:00')}.000Z` : '';
}

export function foramtDateTime(date?: string) {
	return date ? dayjs(date).format('DD-MM-YYYY HH:mm:ss') : '';
}

export function formatHoursRow(date?: string | Date) {
	return date ? dayjs(date).format('HH:mm DD/MM/YYYY') : '';
}

export function formatHours(date?: string | Date) {
	return date ? dayjs(date).format(`HH:mm\nDD/MM/YYYY`) : '';
}

export function formatHoursXe(date?: string | Date) {
	return date ? dayjs(date).add(7, 'hours').format(`HH:mm\nDD/MM/YYYY`) : '';
}

export function getTitleParent(id: string) {
	if (id === 'vb-den') return 'VB đến';
	if (id === 'vb-di') return 'VB đi';
	if (id === 'totrinh') return 'Tờ trình';
	if (id === 'phieugiaoviec') return 'Phiếu GV';
	if (id === 'hosocongviec') return 'Hồ sơ CV';
	return id;
}

export function getTitle(idParent: string, id: string) {
	if (idParent === 'vb-den') {
		if (id === 'tiep-nhan') return 'Tiếp nhận';
		if (id === 'cho-xuly') return 'Chờ xử lý';
		if (id === 'da-vaoso') return 'Đã vào sổ';
		if (id === 'da-xuly') return 'Đã xử lý';
		// if (id === 'dang-xuly')
		//   return 'Đang xử lý'
		if (id === 'tu-choi') return 'Từ chối';
		if (id === 'thu-hoi') return 'Thu hồi';
	}
	if (idParent === 'vb-di') {
		if (id === 'cho-xuly') return 'Chờ xử lý';
		if (id === 'dang-xuly') return 'Đã xử lý';
		if (id === 'da-kyduyet') return 'Chờ cấp số';
		if (id === 'tu-choi') return 'Từ chối';
		if (id === 'thu-hoi') return 'Thu hồi';
		if (id === 'phat-hanh') return 'Đã phát hành';
	}
	if (idParent === 'totrinh') {
		if (id === 'cho-xu-ly') return 'Chờ xử lý';
		if (id === 'dang-xu-ly') return 'Đang xử lý';
		if (id === 'da-ky-duyet') return 'Đã ký duyệt';
		if (id === 'tu-choi') return 'Từ chối';
		if (id === 'thu-hoi') return 'Thu hồi';
		if (id === 'trinh-bo') return 'Trình bộ';
	}
	if (idParent === 'phieugiaoviec') {
		if (id === 'cho-xuly') return 'Chờ xử lý';
		if (id === 'dang-xuly') return 'Đang xử lý';
		if (id === 'tu-choi') return 'Từ chối';
		if (id === 'thu-hoi') return 'Thu hồi';
		if (id === 'ket-thuc') return 'Kết thúc';
		if (id === 'hoan-thanh') return 'Hoàn thành';
	}
	if (idParent === 'hosocongviec') {
		if (id === 'danh-sach') return 'Danh sách';
	}

	return id;
}

export function getSTT(id: string) {
	if (id === 'vb-den') return 1;
	if (id === 'vb-di') return 2;
	if (id === 'totrinh') return 3;
	if (id === 'phieugiaoviec') return 4;
	if (id === 'hosocongviec') return 5;

	// if (id === 'soan-thao')
	//   return 0
	if (id === 'du-thao') return 0;
	if (id === 'tiep-nhan') return 1;
	if (id === 'da-vaoso') return 2;
	if (id === 'cho-xu-ly') return 3;
	if (id === 'cho-xuly') return 4;
	if (id === 'dang-xuly') return 5;
	if (id === 'dang-xu-ly') return 6;
	if (id === 'da-xuly') return 7;
	if (id === 'da-ky-duyet') return 8;
	if (id === 'da-kyduyet') return 9;
	if (id === 'da-cap-so') return 10;
	if (id === 'tu-choi') return 11;
	if (id === 'thu-hoi') return 12;
	if (id === 'cho-phat-hanh') return 13;
	if (id === 'phat-hanh') return 9;
	if (id === 'hoan-thanh') return 16;
	if (id === 'xu-ly-van-ban') return 17;
	if (id === 'lichsu-phathanh') return 18;
	if (id === 'bao-cao') return 19;
	if (id === 'ket-thuc') return 20;
}

export function getStatus(id: string) {
	// if (id === 'soan-thao')
	//   return 0
	if (id === 'du-thao') return 0;
	if (id === 'tiep-nhan') return 11;
	if (id === 'da-vaoso') return 1;
	if (id === 'cho-xu-ly') return 1;
	if (id === 'cho-xuly') return 1;
	if (id === 'dang-xuly') return 2;
	if (id === 'dang-xu-ly') return 2;
	if (id === 'da-xuly') return 3;
	if (id === 'ket-thuc') return 3;
	if (id === 'da-ky-duyet') return 13;
	if (id === 'da-kyduyet') return 1;
	if (id === 'da-cap-so') return 14;
	if (id === 'tu-choi') return 12;
	if (id === 'thu-hoi') return 5;
	if (id === 'cho-phat-hanh') return 14;
	if (id === 'phat-hanh') return 15;
	if (id === 'da-kyduyet') return 2;
	if (id === 'hoan-thanh') return 10;
	if (id === 'xu-ly-van-ban') return 10;
	if (id === 'lichsu-phathanh') return 16;
	if (id === 'bao-cao') return 10;
	if (id === 'trinh-bo') return 16;
}

export function getIcon(id: string, size: number) {
	if (id === 'vb-den') return <Icon name="cho-xu-ly" color={AppColors.iconColor} size={size} />;
	if (id === 'vb-di') return <Icon name="cho-xu-ly" color={AppColors.iconColor} size={size} />;
	if (id === 'totrinh') return <Icon name="cho-xu-ly" color={AppColors.iconColor} size={size} />;
	if (id === 'vb-noibo') return <Icon name="cho-xu-ly" color={AppColors.iconColor} size={size} />;
	// if (id === 'soan-thao')
	//   return <Icon name="soanthao" color={AppColors.iconColor} size={size} />
	if (id === 'du-thao') return <Icon name="duthao" color={AppColors.iconColor} size={size} />;
	if (id === 'tiep-nhan')
		return <Icon name="tiepnhan3" color={AppColors.iconColor} size={size} />;
	if (id === 'cho-xuly' || id === 'da-vaoso' || id === 'danh-sach')
		return <Icon name="cho-xu-ly" color={AppColors.iconColor} size={size} />;
	if (id === 'cho-xu-ly')
		return <Icon name="cho-xu-ly" color={AppColors.iconColor} size={size} />;
	if (id === 'dang-xuly')
		return <Icon name="dang-xu-ly" color={AppColors.iconColor} size={size} />;
	if (id === 'dang-xu-ly')
		return <Icon name="dang-xu-ly" color={AppColors.iconColor} size={size} />;
	if (id === 'da-xuly') return <Icon name="da-xu-ly" color={AppColors.iconColor} size={size} />;
	if (id === 'tu-choi') return <Icon name="tu-choi" color={AppColors.iconColor} size={size} />;
	if (id === 'thu-hoi') return <Icon name="thuhoi" color={AppColors.iconColor} size={size} />;
	if (id === 'da-ky-duyet' || id === 'trinh-bo')
		return <Icon name="dakyduyet" color={AppColors.iconColor} size={size} />;
	if (id === 'cho-phat-hanh')
		return <Icon name="chophathanh" color={AppColors.iconColor} size={size} />;
	if (id === 'phat-hanh')
		return <Icon name="phathanh2" color={AppColors.iconColor} size={size} />;
	// if (id === 'da-kyduyet')
	//   return <Icon name="dakyduyet" color={AppColors.iconColor} size={size} />
	if (id === 'da-cap-so') return <Icon name="dacapso" color={AppColors.iconColor} size={size} />;
	if (id === 'hoan-thanh')
		return <Icon name="da-xu-ly" color={AppColors.iconColor} size={size} />;
	if (id === 'xu-ly-van-ban')
		return <Icon name="cho-xu-ly" color={AppColors.iconColor} size={size} />;
	if (id === 'lichsu-phathanh')
		return <Icon name="lichsuphathanh" color={AppColors.iconColor} size={size} />;
	if (id === 'bao-cao') return <Icon name="baocao" color={AppColors.iconColor} size={size} />;
	if (id === 'ket-thuc') return <Icon name="ketthuc" color={AppColors.iconColor} size={size} />;
	if (id === 'xin-so-bo' || id === 'giu-so-van-ban' || id === 'da-kyduyet')
		return <Icon name="dakychocapso" color={AppColors.iconColor} size={size} />;
	// return <Icon name="cho-xu-ly" color={AppColors.iconColor} size={size} />
}

export function getCount(id: string, data: any) {
	// if (id === 'soan-thao')
	//   return 0
	if (id === 'du-thao') return 0;
	if (id === 'tiep-nhan') return data.tongTiepNhan;
	if (id === 'cho-xuly' || id === 'cho-xu-ly') return data.choXuLy;
	// if (id === 'dang-xuly')
	//   return data.dangXuLy
	if (id === 'dang-xu-ly') return data.dangXuLy;
	if (id === 'da-xuly')
		// return data.daXuLy
		return 0;
	if (id === 'tu-choi') return 0;
	if (id === 'da-vaoso') return data.choXuLy;
	if (id === 'thu-hoi') return 0;
	if (id === 'da-ky-duyet') return 0;
	if (id === 'cho-phat-hanh') return 0;
	if (id === 'phat-hanh') return 0;
	if (id === 'da-kyduyet') return 0;
	if (id === 'da-cap-so') return 0;
	if (id === 'hoan-thanh') return 0;
	if (id === 'xu-ly-van-ban') return 0;
	if (id === 'lichsu-phathanh') return 0;
	if (id === 'bao-cao') return 0;
	return 0;
}

export function getCurrentNumberWeek() {
	var currentdate: any = new Date();
	var oneJan: any = new Date(currentdate.getFullYear(), 0, 1);
	var numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
	var result = Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7);
	return result;
}

export function showMessageSuccess(message: string | undefined) {
	if (!!message) {
		showMessage({
			message: message,
			type: 'success',
		});
	}
}

export function showMessageWarning(message: string | undefined) {
	if (!!message) {
		showMessage({
			message: message,
			type: 'warning',
		});
	}
}

export function showLoading() {
	global.showLoading();
}

export function dismissLoading() {
	global.dismissLoading();
}

export function showAlert(data: AppAlertProps) {
	global.showAlert(data);
}

export function dismissAlert() {
	global.dismissAlert();
}
