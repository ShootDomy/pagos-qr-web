import { transaccionApi } from "@/api/transaccion";
import { IObtenerTransaccionComercio } from "@/ts/models/transaccion";
import { useQuery } from "@tanstack/react-query";

export function useObtenerTransaccionComercio(
  filtros: IObtenerTransaccionComercio
) {
  return useQuery({
    queryKey: ["transaccionComercio", "listado", filtros],
    queryFn: async () => {
      return await transaccionApi.obtenerTransaccionesComercio(filtros);
    },
  });
}
