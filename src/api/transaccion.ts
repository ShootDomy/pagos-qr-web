import {
  IEstadoPagoResponse,
  IGenerarQr,
  IGenerarQrResponse,
  IObtenerEstadoPago,
  IObtenerTransaccionComercio,
  IObtenerTransaccionComercioResponse,
} from "@/ts/models/transaccion";
import { get, post } from "./config";

export const transaccionApi = {
  generarQr: async (data: IGenerarQr) => {
    const res = await post<IGenerarQrResponse>("/transaccion/qr", data);
    return res.data;
  },

  obtenerEstadoPago: async (params: IObtenerEstadoPago) => {
    const res = await get<IEstadoPagoResponse>("/transaccion/estado", {
      params,
    });
    return res.data;
  },

  obtenerTransaccionesComercio: async (data: IObtenerTransaccionComercio) => {
    const res = await get<IObtenerTransaccionComercioResponse>(
      "/transaccion/comercio",
      {
        params: data,
      }
    );
    return res.data;
  },
};
