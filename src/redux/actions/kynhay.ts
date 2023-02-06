import {DEFAULT_KYNHAY, KY_NHAY_ACTION, KY_NHAY_COMPLETE} from '@redux/constants/kynhay';

export const defaultKyNhay = () => {
	return {
		type: DEFAULT_KYNHAY,
	};
};

export const actionKyNhay = (payload: any) => {
	return {
		type: KY_NHAY_ACTION,
		payload,
	};
};

export const kyNhayComplete = (payload: any) => {
	return {
		type: KY_NHAY_COMPLETE,
		payload,
	};
};
