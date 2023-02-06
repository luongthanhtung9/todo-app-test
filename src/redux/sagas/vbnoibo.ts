import { takeLatest, put, all, select } from "redux-saga/effects";
import {
  LOGIN_ACTION,
  LAY_TAT_CA_CHUC_NANG_USER_ACTION
} from "../constants/authen";
import {
  loginComplete,
  layTatCaChucNangUserComplete
} from "../actions/authen";
import { fetchPOST, fetchPUT, fetchGET } from '../../connections/connections'
import { ApiResponse } from "@models/ApiResponse";
import { selectToken } from '../selectorConfig'

function* _login(action: any) {
  try {
    let res: ApiResponse<{
      token?: string
    }> = yield fetchPOST('api/Account/DangNhap', undefined, action.payload, true)
    yield put(loginComplete(res))
  } catch (e) {
    yield put(loginComplete({message: "Bạn vui lòng kiểm tra lại kết nối."}))
  }
}


export function* watchInitial() {
  yield all([
    takeLatest(LOGIN_ACTION, _login),
  ])
}


