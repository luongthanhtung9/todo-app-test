import {dismissLoading} from '@utils/index';
import {Platform} from 'react-native';
import {getDeviceId, getModel, getSystemVersion} from 'react-native-device-info';
import {Config} from '../configs/index';
export const TIMEOUT_SECOND = 60000;

const deviceName: string | null = getModel() || getDeviceId();
const versionName: string | null = null;

function getAppVersion(): string {
	return window.connection.versionApp();
}

function getFCMToken(): string {
	return window.connection.fcmToken();
}

function getOs(): string {
	return `${Platform.OS} ${getSystemVersion()}`;
}

export function fetchGET(url: string, token?: string, param?: any, isAuthor?: boolean) {
	const paramquery = param
		? '?' +
		  Object.keys(param)
				.map(key => encodeURIComponent(key) + '=' + encodeURIComponent(param[key]))
				.join('&')
		: '';
	console.log(
		'Config.API_URL_SERVICE',
		Config.API_URL_SERVICE + url + decodeURIComponent(paramquery),
	);

	return new Promise((resolve, reject) => {
		Promise.race([
			new Promise((resl, rej) => {
				setTimeout(resl, TIMEOUT_SECOND, {
					_isTimeOut: true,
				});
			}),
			fetch(
				(isAuthor ? Config.API_URL_AUTHORIZATION : Config.API_URL_SERVICE) +
					url +
					paramquery,
				{
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + token,
					},
					method: 'GET',
				},
			).then(res => res.json()),
		])
			.then((json: any) => {
				// dismissLoading();
				console.log(
					'url =====>>>>',
					(isAuthor ? Config.API_URL_AUTHORIZATION : Config.API_URL_SERVICE) +
						url +
						decodeURIComponent(paramquery),
				);
				if (json.code == 401) {
					window.connection.expiredToken();
					resolve({});
					return;
				}
				resolve(json);
			})
			.catch(error => {
				// dismissLoading();
				reject(error);
			});
	});
}

export async function fetchPOST(url: string, token?: string, param?: object, isAuthor?: boolean) {
	return new Promise((resolve, reject) => {
		console.log('Config.API_URL_SERVICE+url', Config.API_URL_SERVICE + url);
		Promise.race([
			new Promise((resl, rej) => {
				setTimeout(resl, TIMEOUT_SECOND, {
					_isTimeOut: true,
				});
			}),
			fetch((isAuthor ? Config.API_URL_AUTHORIZATION : Config.API_URL_SERVICE) + url, {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
				method: 'POST',
				body: JSON.stringify(param),
			}).then(res =>
				// console.log("======>", JSON.stringify(res))
				// console.log("======>", res.text)
				// console.log("======>", res.json())
				res.json(),
			),
		])
			.then((json: any) => {
				dismissLoading();
				// console.log('json', json, url)
				if (json.code == 401) {
					window.connection.expiredToken();
					resolve({});
					return;
				}
				console.log('======> ', json);

				resolve(json);
			})
			.catch(error => {
				dismissLoading();
				console.log('======> ', error);
				reject(error);
			});
	});
}

export function fetchPUT(url: string, token?: string, param?: any, isAuthor?: boolean) {
	return new Promise((resolve, reject) => {
		Promise.race([
			new Promise((resl, rej) => {
				setTimeout(resl, TIMEOUT_SECOND, {
					_isTimeOut: true,
				});
			}),
			fetch((isAuthor ? Config.API_URL_AUTHORIZATION : Config.API_URL_SERVICE) + url, {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
				method: 'PUT',
				body: JSON.stringify(param),
			}).then(res => res.json()),
		])
			.then((json: any) => {
				dismissLoading();
				if (json.code == 401) {
					// console.log('json', json, url)
					window.connection.expiredToken();
					resolve({});
					return;
				}
				resolve(json);
			})
			.catch(error => {
				dismissLoading();
				reject(error);
			});
	});
}

export function fetchPATCH(url: string, token?: string, param?: any, isAuthor?: boolean) {
	return new Promise((resolve, reject) => {
		Promise.race([
			new Promise((resl, rej) => {
				setTimeout(resl, TIMEOUT_SECOND, {
					_isTimeOut: true,
				});
			}),
			fetch((isAuthor ? Config.API_URL_AUTHORIZATION : Config.API_URL_SERVICE) + url, {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
				method: 'PATCH',
				body: JSON.stringify(param),
			}).then(res => res.json()),
		])
			.then((json: any) => {
				dismissLoading();
				if (json.code == 401) {
					// console.log('json', json, url)
					window.connection.expiredToken();
					resolve({});
					return;
				}
				resolve(json);
			})
			.catch(error => {
				dismissLoading();
				reject(error);
			});
	});
}

export function fetchDELETE(url: string, token?: string, param?: any, isAuthor?: boolean) {
	return new Promise((resolve, reject) => {
		Promise.race([
			new Promise((resl, rej) => {
				setTimeout(resl, TIMEOUT_SECOND, {
					_isTimeOut: true,
				});
			}),
			fetch((isAuthor ? Config.API_URL_AUTHORIZATION : Config.API_URL_SERVICE) + url, {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
				method: 'DELETE',
				body: JSON.stringify(param),
			}).then(res => res.json()),
		])
			.then((json: any) => {
				dismissLoading();
				if (json.code == 401) {
					// console.log('json', json, url)
					window.connection.expiredToken();
					resolve({});
					return;
				}
				resolve(json);
			})
			.catch(error => {
				dismissLoading();
				reject(error);
			});
	});
}

export async function fetchPOSTSign(
	url: string,
	token?: string,
	param?: object,
	isAuthor?: boolean,
) {
	return new Promise((resolve, reject) => {
		//   console.log('Config.API_URL_SERVICE+url', Config.API_URL_SERVICE+url)
		//   console.log('Config.API_URL_SERVICE+url token', token)
		Promise.race([
			new Promise((resl, rej) => {
				setTimeout(resl, TIMEOUT_SECOND, {
					_isTimeOut: true,
				});
			}),
			fetch((isAuthor ? Config.API_URL_AUTHORIZATION : Config.API_URL_SERVICE) + url, {
				headers: {
					Accept: 'application/json-patch+json',
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
				method: 'POST',
				body: JSON.stringify(param),
			}).then(res => {
				return res.json();
			}),
		])
			.then((json: any) => {
				dismissLoading();
				//   console.log('json', json,)
				//   if (json.code == 401) {
				//     window.connection.expiredToken()
				//     resolve({});
				//     return;
				//   }
				//   console.log('======> ', json);
				resolve(json);
			})
			.catch(error => {
				dismissLoading();
				console.log('======> ', error);
				reject(error);
			});
	});
}
