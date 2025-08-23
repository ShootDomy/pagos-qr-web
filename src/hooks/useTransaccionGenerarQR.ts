import { transaccionApi } from "@/api/transaccion";
import { IGenerarQr, IGenerarQrResponse } from "@/ts/models/transaccion";
import { useMutation } from "@tanstack/react-query";

import { UseMutationOptions } from "@tanstack/react-query";

export const useTransaccionGenerarQR = (
  options?: UseMutationOptions<IGenerarQrResponse, Error, IGenerarQr>
) => {
  return useMutation<IGenerarQrResponse, Error, IGenerarQr>({
    mutationFn: async (data: IGenerarQr) => {
      const response = await transaccionApi.generarQr(data);
      console.log("Respuesta del servidor:", response);
      return response;
    },
    ...options,
  });
};
