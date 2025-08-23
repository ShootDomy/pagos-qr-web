import { transaccionApi } from "@/api/transaccion";
import { IObtenerEstadoPago } from "@/ts/models/transaccion";
import { useQuery } from "@tanstack/react-query";

export function useObtenerEstadoPago(filtros: IObtenerEstadoPago) {
  const obtenerEstadoPago = async () => {
    return await transaccionApi.obtenerEstadoPago(filtros);
  };

  return useQuery({
    queryKey: ["estadoPago", filtros],
    queryFn: obtenerEstadoPago,
  });
}
