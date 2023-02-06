import CryptoJS from 'react-native-crypto-js';

const encryptAES = (payload, key) => {
	return CryptoJS.AES.encrypt(JSON.stringify(payload), key).toString();
};

const decryptAES = (payload, key) => {
	const bytes = CryptoJS.AES.decrypt(payload, key);
	return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

export {encryptAES, decryptAES};
