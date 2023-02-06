import { takeLatest, put, all, select } from "redux-saga/effects";
import {
  LICH_LD_ACTION,
  LICH_HOP_ACTION,
  LICH_XE_ACTION
} from "../constants/lich";
import {
  lichLDComplete,
  lichHopComplete,
  lichXeComplete
} from "../actions/lich";
import { fetchPOST, fetchPUT, fetchGET } from '../../connections/connections'
import { ApiResponse } from "@models/ApiResponse";
import { selectToken } from '../selectorConfig'
import { Lich } from "@models/Lich";

function* _lichlanhdao(action: any) {
  try {
    const token: string = yield select(selectToken());
    let res: ApiResponse<Array<Lich>> = yield fetchPOST('api/CalendarUser/TimTatCaLichLanhDaoTongCuc', token, action.payload)
    yield put(lichLDComplete(res))
  } catch (e) {
    yield put(lichLDComplete({ success: false }))
  }
}

// function* _lichhop(action: any) {
//   try {
//     const token: string = yield select(selectToken());
//     let res: ApiResponse<Array<Lich>> = yield fetchPOST('api/LichPhongHop/TimTheoDieuKien', token, action.payload)
//     yield put(lichHopComplete(res))
//   } catch (e) {
//     yield put(lichHopComplete({ success: false }))
//   }
// }

// function* _lichxe(action: any) {
//   try {
//     const token: string = yield select(selectToken());
//     let res: ApiResponse<Array<Lich>> = yield fetchPOST('api/LichXe/TimTheoDieuKien', token, action.payload)
//     yield put(lichXeComplete(res))
//   } catch (e) {
//     yield put(lichXeComplete({ success: false }))
//   }
// }

export function* watchInitial() {
  yield all([
    takeLatest(LICH_LD_ACTION, _lichlanhdao),
    // takeLatest(LICH_HOP_ACTION, _lichhop),
    // takeLatest(LICH_XE_ACTION, _lichxe),
  ])
}


