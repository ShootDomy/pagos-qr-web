export interface IGenerarQr {
  traAmount: number;
  comUuid: string;
}

export interface IGenerarQrResponse {
  traUuid: string;
  qr: string;
}

export interface IObtenerEstadoPago {
  traUuid?: string | null;
}

export interface IObtenerTransaccionComercio {
  comUuid?: string | null;
  cliente?: string | null;
  estado?: "PENDIENTE" | "APROBADO" | "DECLINADO" | "TODOS";
}

export interface IObtenerTransaccionComercioResponse {
  usuUuid: string;
  cliente: string;
  traUuid: string;
  traAmount: number;
  traCurrency: string;
  traMetodoPago: string;
  traEstado: "PENDIENTE" | "APROBADO" | "DECLINADO";
  fechaCreacion: string;
}
