import {all, fork} from 'redux-saga/effects';
import * as Todo from './todo';

export default function* rootSaga() {
	yield all([...Object.values(Todo)].map(fork));
}
