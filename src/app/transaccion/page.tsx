"use client";
import { Spinner, Text, Badge, Image, Divider } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import React, { Suspense } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useObtenerTransaccionComercio } from "@/hooks/useObtenerTransaccionComercio";
import { Loader, Search } from "lucide-react";

const Transaccion = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [qrModalImg, setQrModalImg] = useState<string | null>(null);
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

  const { data, isLoading, isError } = useObtenerTransaccionComercio({
    comUuid: "7f0cf323-a1bf-45eb-8f7a-714e354d4c2b",
    cliente: debouncedCliente,
    estado:
      debouncedEstado === ""
        ? undefined
        : (debouncedEstado as "PENDIENTE" | "APROBADO" | "DECLINADO" | "TODOS"),
  });

  console.log(data);

  if (isLoading) {
    return <Loader className="animate-spin" />;
  }

  if (!data) return <div>No existen registros para mostrar</div>;

  const getColorByEstado = (estado: string | null) => {
    switch (estado) {
      case "APROBADO":
        return "green";
      case "DECLINADO":
        return "red";
      case "PENDIENTE":
      default:
        return "yellow";
    }
  };

  const saldo = Array.isArray(data)
    ? data
        .filter((t) => t.traEstado === "APROBADO")
        .reduce((acc, t) => acc + Number(t.traAmount), 0)
    : 0;

  return (
    <Suspense>
      <div className="w-full flex-1 flex flex-col items-center justify-center bg-[#f7f7fa] p-4">
        <div className="flex items-center gap-4 w-full max-w-4xl mb-6">
          <span className="text-lg font-semibold text-blue-700 whitespace-nowrap">
            Saldo: ${" "}
            {saldo.toLocaleString("es-EC", { minimumFractionDigits: 2 })}
          </span>
          <div className="flex-1 flex items-center bg-white border border-gray-200 rounded-xl shadow-md px-3 py-2 relative min-w-[200px]">
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
        <div className="w-full max-w-[1400px]">
          {isLoading ? (
            <Spinner size="xl" />
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
                    <div
                      key={transaccion.traUuid}
                      className="bg-white rounded-xl shadow-md p-4 flex flex-row items-center justify-between min-h-[140px]"
                    >
                      <div className="flex flex-col gap-2 flex-1">
                        <Text
                          fontWeight="bold"
                          fontSize="lg"
                          color="gray.700"
                          mb={1}
                        >
                          {transaccion.cliente}
                        </Text>
                        <Divider orientation="horizontal" />
                        <Text fontSize="md" color="gray.500">
                          <b>Monto:</b> ${" "}
                          {Number(transaccion.traAmount).toLocaleString(
                            "es-EC",
                            {
                              minimumFractionDigits: 2,
                            }
                          )}{" "}
                          {transaccion.traCurrency}
                        </Text>
                        <Text fontSize="md" color="gray.500">
                          <b>Método:</b>{" "}
                          {transaccion.traMetodoPago
                            ? transaccion.traMetodoPago
                            : "Sin método de pago"}
                        </Text>
                        <Badge
                          colorScheme={getColorByEstado(transaccion.traEstado)}
                          fontSize="md"
                          px={4}
                          py={2}
                          borderRadius="md"
                          variant="solid"
                          boxShadow="sm"
                        >
                          {transaccion.traEstado
                            ? transaccion.traEstado
                            : "PENDIENTE"}
                        </Badge>
                        <Text fontSize="sm" color="gray.400" mt={2}>
                          <b>Fecha:</b> {transaccion.fechaCreacion}
                        </Text>
                      </div>
                      <div className="ml-4 flex items-center justify-center min-w-[90px]">
                        {transaccion.traQr ? (
                          <Image
                            objectFit="contain"
                            width={90}
                            height={90}
                            src={transaccion.traQr}
                            alt="QR generado"
                            bg="white"
                            borderRadius={8}
                            border="1px solid #eee"
                            cursor="pointer"
                            onClick={() => {
                              setQrModalImg(transaccion.traQr);
                              onOpen();
                            }}
                          />
                        ) : (
                          <Text fontSize="xs" color="gray.300">
                            Sin QR
                          </Text>
                        )}
                      </div>
                      {/* Modal para mostrar QR grande */}
                      <Modal isOpen={isOpen} onClose={onClose} isCentered>
                        <ModalOverlay />
                        <ModalContent maxW="md" bg="white">
                          <ModalBody className="flex items-center justify-center p-4">
                            {qrModalImg && (
                              <Image
                                src={qrModalImg}
                                alt="QR"
                                width={256}
                                height={256}
                                objectFit="contain"
                              />
                            )}
                          </ModalBody>
                        </ModalContent>
                      </Modal>
                    </div>
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
    </Suspense>
  );
};

export default Transaccion;
