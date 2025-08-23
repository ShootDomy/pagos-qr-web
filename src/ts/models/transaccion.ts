export interface IGenerarQr {
  traAmount: number;
  comUuid: string;
}

export interface IGenerarQrResponse {
  traUuid: string;
  qr: string;
}
