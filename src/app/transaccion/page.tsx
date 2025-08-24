"use client";
import { Spinner, Text } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useObtenerTransaccionComercio } from "@/hooks/useObtenerTransaccionComercio";
import { Search } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { CardTransaccion } from "@/components/transacciones/CardTransaccion";

const Transaccion = () => {
  const [cliente, setCliente] = useState("");
  const [debouncedCliente, setDebouncedCliente] = useState("");
  const [estado, setEstado] = useState("");
  const [debouncedEstado, setDebouncedEstado] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCliente(cliente);
      setDebouncedEstado(estado);
    }, 400);
    return () => clearTimeout(handler);
  }, [cliente, estado]);

  const { data, isPending, isError } = useObtenerTransaccionComercio({
    comUuid: "7f0cf323-a1bf-45eb-8f7a-714e354d4c2b",
    cliente: debouncedCliente,
    estado:
      debouncedEstado === ""
        ? undefined
        : (debouncedEstado as "PENDIENTE" | "APROBADO" | "DECLINADO" | "TODOS"),
  });

  if (!data && !isPending) return <div>No existen registros para mostrar</div>;

  const saldo = Array.isArray(data)
    ? data
        .filter((t) => t.traEstado === "APROBADO")
        .reduce((acc, t) => acc + Number(t.traAmount), 0)
    : 0;

  return (
    <MainLayout>
      <div className="w-full h-full flex-1 flex flex-col items-center justify-center bg-[#f7f7fa] p-4">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:max-w-4xl mb-6">
          <span className="text-lg font-semibold text-blue-700 whitespace-nowrap">
            Saldo: ${" "}
            {saldo.toLocaleString("es-EC", { minimumFractionDigits: 2 })}
          </span>
          <div className="w-full flex-1 flex items-center bg-white border border-gray-200 rounded-xl shadow-md px-3 py-2 relative min-w-[200px]">
            <input
              type="text"
              placeholder="Escribe un cliente..."
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 pr-10"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <Search className="w-5 h-5" />
            </span>
          </div>
          <select
            className="px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 min-w-[120px]"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="APROBADO">Aprobado</option>
            <option value="DECLINADO">Declinado</option>
            <option value="PENDIENTE">Pendiente</option>
          </select>
        </div>
        <div className="w-full flex-1 max-w-[1400px]">
          {isPending ? (
            <Spinner size="xl" className="animate-spin" />
          ) : isError ? (
            <Text color="red.500">Error al cargar transacción</Text>
          ) : (
            <>
              {Array.isArray(data) && data.length > 0 ? (
                <div
                  className="grid gap-4"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
                  }}
                >
                  {data.map((transaccion) => (
                    <CardTransaccion
                      key={transaccion.traUuid}
                      item={transaccion}
                    />
                  ))}
                </div>
              ) : (
                <Text color="gray.500" textAlign="center">
                  No existen registros para mostrar
                </Text>
              )}
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Transaccion;
