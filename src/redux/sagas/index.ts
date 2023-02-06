import {all, fork} from 'redux-saga/effects';
import * as Authen from './todo';

export default function* rootSaga() {
	yield all([...Object.values(Authen)].map(fork));
}
