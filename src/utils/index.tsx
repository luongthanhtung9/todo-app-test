import React from 'react';
import { showMessage } from 'react-native-flash-message';
import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';
import { Buffer } from 'buffer';
import { AppAlertProps } from 'App';
import Icon from '@commons/Icon';
import AppColors from '@commons/AppColors';

export function getUserLogin(token: string) {
	const decoded: any = jwt_decode(token);
	if (decoded && decoded.userinfo) {
		return JSON.parse(Buffer.from(decoded.userinfo, 'base64').toString('utf8'));
	}

	return {};
}

export function getBackgroundTodo(level?: number, isComplete?: boolean) {
	if (isComplete) return '#0CB98D'
	if (level === 1) return '#0A7AFF'
	if (level === 2) return '#FFD105'
	if (level === 3) return '#CD0A07'

}

export function foramtDate(date?: string) {
	return date ? dayjs(date).format('DD-MM-YYYY') : '';
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
