import {
    DEFAULT,
    DS_HSCV_ACTION,
    DS_HSCV_COMPLETE,
    CT_HSCV_ACTION,
    CT_HSCV_COMPLETE,
    THONGKE_VANBAN_ACTION,
    THONGKE_VANBAN_COMPLETE,
    DONG_HO_SO_ACTION,
    DONG_HO_SO_COMPLETE,
    XOA_LKVB_ACTION,
    XOA_LKVB_COMPLETE
  } from '../constants/congviec';
  
  export const actionDefaultHSCV = () => {
    return {
      type: DEFAULT,
    };
  };
  // danh sach 
  export const actionDSHSCV = (payload: any) => {
    return {
      type: DS_HSCV_ACTION,
      payload,
    };
  };
  
  export const dsHSCVComplete = (payload: any) => {
    return {
      type: DS_HSCV_COMPLETE,
      payload,
    };
  };
  
  // chi tiết 
  export const actionCTHSCV = (payload: any) => {
    return {
      type: CT_HSCV_ACTION,
      payload,
    };
  };
  
  export const ctHSCVComplete = (payload: any) => {
    return {
      type: CT_HSCV_COMPLETE,
      payload,
    };
  };


  export const actionThongKeVanBan = (payload: any) => {
    return {
      type: THONGKE_VANBAN_ACTION,
      payload,
    };
  };
  
  export const thongKeVanBanComplete = (payload: any) => {
    return {
      type: THONGKE_VANBAN_COMPLETE,
      payload,
    };
  };
  
  export const actionDongHS = (payload: any) => {
    return {
      type: DONG_HO_SO_ACTION,
      payload,
    };
  };
  
  export const dongHSComplete = (payload: any) => {
    return {
      type: DONG_HO_SO_COMPLETE,
      payload,
    };
  };

  export const actionXoaLKVB = (payload: any) => {
    return {
      type: XOA_LKVB_ACTION,
      payload,
    };
  };
  
  export const xoaLKVBComplete = (payload: any) => {
    return {
      type: XOA_LKVB_COMPLETE,
      payload,
    };
  };
  
  
  
  
  
  