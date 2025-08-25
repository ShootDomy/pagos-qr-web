"use client";
import { Input, Select, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useObtenerTransaccionComercio } from "@/hooks/useObtenerTransaccionComercio";
import { ChevronDown, Search } from "lucide-react";
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
      <div className="w-full h-full flex flex-col gap-3 items-center p-4">
        <div className="w-full md:max-w-4xl bg-white rounded-xl shadow-lg border border-gray-200 px-6 py-4 flex flex-col md:flex-row items-center gap-6 mb-6">
          {/* SALDO */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-blue-700 whitespace-nowrap">
              Saldo:
            </span>
            <span className="text-xl font-bold text-gray-800">
              ${saldo.toLocaleString("es-EC", { minimumFractionDigits: 2 })}
            </span>
          </div>

          {/* BUSCADOR */}
          <div className="flex flex-col w-full md:w-auto flex-1">
            <label
              htmlFor="buscador"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Buscar cliente o número de transacción
            </label>
            <div className="relative">
              <Input
                id="buscador"
                type="text"
                placeholder="Juan Pérez o 12345"
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 pr-10 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <Search className="w-5 h-5" />
              </span>
            </div>
          </div>

          {/* SELECT ESTADO */}
          <div className="flex flex-col w-full md:w-auto min-w-[120px]">
            <label
              htmlFor="estado-select"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Estado
            </label>
            <Select
              id="estado-select"
              icon={<ChevronDown />}
              value={estado || "TODOS"}
              onChange={(e) => setEstado(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="TODOS">Todos</option>
              <option value="APROBADO">Aprobado</option>
              <option value="DECLINADO">Declinado</option>
              <option value="PENDIENTE">Pendiente</option>
            </Select>
          </div>
        </div>

        <div className=" pb-5 w-full">
          {isPending && <Spinner size="xl" className="animate-spin" />}
          {!isPending && isError && (
            <Text color="red.500">Error al cargar transacción</Text>
          )}
          {!isPending && !isError && (
            <div className="w-full">
              {Array.isArray(data) && data.length > 0 ? (
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Transaccion;
