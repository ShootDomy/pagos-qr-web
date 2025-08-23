import { IGenerarQr, IGenerarQrResponse } from "@/ts/models/transaccion";
import { post } from "./config";

export const transaccionApi = {
  generarQr: async (data: IGenerarQr) => {
    const res = await post<IGenerarQrResponse>("/transaccion/qr", data);
    return res.data;
  },
};
