import {
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

  obtenerEstadoPago: async (data: IObtenerEstadoPago) => {
    const res = await get("/transaccion/estado", {
      params: { traUuid: data.traUuid },
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
