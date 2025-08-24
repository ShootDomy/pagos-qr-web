import { transaccionApi } from "@/api/transaccion";
import {
  IEstadoPagoResponse,
  IObtenerEstadoPago,
} from "@/ts/models/transaccion";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useObtenerEstadoPago(
  filtros: IObtenerEstadoPago,
  queryOptions?: Omit<
    UseQueryOptions<
      IEstadoPagoResponse,
      AxiosError,
      IEstadoPagoResponse,
      unknown[]
    >,
    "queryKey"
  >
) {
  const obtenerEstadoPago = async () => {
    return await transaccionApi.obtenerEstadoPago(filtros);
  };

  return useQuery({
    queryKey: ["estadoPago", filtros],
    queryFn: obtenerEstadoPago,
    ...queryOptions,
  });
}
