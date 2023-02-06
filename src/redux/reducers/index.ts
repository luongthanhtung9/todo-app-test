import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {encryptTransform} from 'redux-persist-transform-encrypt';
import {getUniqueId, getBundleId} from 'react-native-device-info';

// import configs from './configs';
import todo from './todo';

const sec = `${getBundleId()}.${getUniqueId()}`;

// const keyConfig = {
// 	transforms: [
// 		encryptTransform({
// 			secretKey: sec,
// 			onError: function (error) {
// 				console.log('onErrorencryptTransform', error);
// 			},
// 		}),
// 	],
// 	key: sec,
// 	storage: AsyncStorage,
// };

const persistConfig = {
	key: "root",
	storage: AsyncStorage
}

export default combineReducers({
	todo: persistReducer(persistConfig, todo),
});
