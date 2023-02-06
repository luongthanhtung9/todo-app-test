import { Menu } from '@models/Menu';

export const HomeRoute = 'HomeRoute';
export const LoginRoute = 'LoginRoute';

export const DSThongBaoRoute = 'DSThongBaoRoute';
export const DSVBDenRoute = 'DSVBDenRoute';
export const CTVBDenRoute = 'CTVBDenRoute';
export const DSVBDiRoute = 'DSVBDiRoute';
export const CTVBDiRoute = 'CTVBDiRoute';
export const DSToTrinhRoute = 'DSToTrinhRoute';
export const CTToTrinhRoute = 'CTToTrinhRoute';
export const DSGiaoViecRoute = 'DSGiaoViecRoute';
export const CTGiaoViecRoute = 'CTGiaoViecRoute';
export const DSCongViecRoute = 'DSCongViecRoute';
export const CTCongViecRoute = 'CTCongViecRoute';

export const DSVBTheoDoiRoute = 'DSVBTheoDoiRoute';
export const PdfViewRoute = 'PdfViewRoute';
export const LichLDRoute = 'LichLDRoute';
export const DangKyXeRoute = 'DangKyXeRoute';
export const ChiTietDangKyXeRoute = 'ChiTietDangKyXeRoute';
export const PhongHopRoute = 'PhongHopRoute';
export const ChiTietPhongHopRoute = 'ChiTietPhongHopRoute';
export const LichPHRoute = 'LichPHRoute';

export type RootStackParamList = {
  [HomeRoute]: undefined;
  [LoginRoute]: undefined;
  [DSThongBaoRoute]: undefined;
  [DSVBDenRoute]: { status?: number; menu?: Array<Menu> };
  [CTVBDenRoute]: { id?: string, status?: number, onRefresh?: any };
  [DSVBDiRoute]: { status?: number, menu?: Array<Menu> };
  [CTVBDiRoute]: { id?: string, status?: number, onRefresh?: any };
  [DSToTrinhRoute]: { status?: number; menu?: Array<Menu> };
  [CTToTrinhRoute]: { id?: string, status?: number, onRefresh?: any };
  [DSGiaoViecRoute]: { status?: number; menu?: Array<Menu> };
  [CTGiaoViecRoute]: { id?: string, status?: number, onRefresh?: any };
  [DSCongViecRoute]: { status?: number; menu?: Array<Menu> };
  [CTCongViecRoute]: { id?: string, status?: number, onRefresh?: any };
  [PdfViewRoute]: { fileId?: string; fileName?: string };
  [DSVBTheoDoiRoute]: undefined;
  [LichLDRoute]: undefined;
  [DangKyXeRoute]: undefined;
  [ChiTietDangKyXeRoute]: { id?: string, status?: number, onRefresh?: any };
  [PhongHopRoute]: undefined;
  [ChiTietPhongHopRoute]: { id?: string, status?: number, onRefresh?: any };
  [LichPHRoute]: undefined;
};
