import {all, fork} from 'redux-saga/effects';
import * as Authen from './authen';
import * as VBDen from './vbden';
import * as VBDi from './vbdi';
import * as ToTrinh from './totrinh';
import * as GiaoViec from './giaoviec';
import * as VBNoiBo from './vbnoibo';
import * as QuanLy from './quanly';
import * as Setting from './setting';
import * as Lich from './lich';
import * as CongViec from './congviec';
import * as DangKyXe from './dkxe';
import * as KyNhay from './kynhay';
import * as ThongBao from './thongbao';
import * as PhongHop from './phonghop';
export default function* rootSaga() {
	yield all(
		[
			...Object.values(Authen),
			...Object.values(VBDen),
			...Object.values(VBDi),
			...Object.values(ToTrinh),
			...Object.values(GiaoViec),
			...Object.values(VBNoiBo),
			...Object.values(QuanLy),
			...Object.values(Setting),
			...Object.values(Lich),
			...Object.values(CongViec),
			...Object.values(DangKyXe),
			...Object.values(KyNhay),
			...Object.values(ThongBao),
			...Object.values(PhongHop),
		].map(fork),
	);
}
