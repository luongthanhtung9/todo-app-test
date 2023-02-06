import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {encryptTransform} from 'redux-persist-transform-encrypt';
import {getUniqueId, getBundleId} from 'react-native-device-info';

import configs from './configs';
import authen from './authen';
import vbden from './vbden';
import vbdi from './vbdi';
import totrinh from './totrinh';
import giaoviec from './giaoviec';
import vbnoibo from './vbnoibo';
import quanly from './quanly';
import setting from './setting';
import lich from './lich';
import congviec from './congviec';
import dkxe from './dkxe';
import kynhay from './kynhay';
import thongbao from './thongbao';
import phonghop from './phonghop';

const sec = `${getBundleId()}.${getUniqueId()}`;

const keyConfig = {
	transforms: [
		encryptTransform({
			secretKey: sec,
			onError: function (error) {
				console.log('onErrorencryptTransform', error);
			},
		}),
	],
	key: sec,
	storage: AsyncStorage,
};

export default combineReducers({
	configs: persistReducer(keyConfig, configs),
	authen,
	vbden,
	vbdi,
	totrinh,
	giaoviec,
	vbnoibo,
	quanly,
	setting,
	thongbao,
	lich,
	congviec,
	dkxe,
	kynhay,
    phonghop,
});
