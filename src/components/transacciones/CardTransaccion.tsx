import { IObtenerTransaccionComercioResponse } from "@/ts/models/transaccion";
import { Badge, Divider, Image, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { ModalPrevisualizarQr } from "./ModalPrevisualizarQr";

interface PropsCardTransaccion {
  item: IObtenerTransaccionComercioResponse;
}

export const CardTransaccion: React.FC<PropsCardTransaccion> = ({ item }) => {
  const {
    cliente,
    fechaCreacion,
    traAmount,
    traCurrency,
    traEstado,
    traMetodoPago,
    traQr,
  } = item;

  const {
    isOpen: isOpenMdlQr,
    onOpen: onOpenMdlQr,
    onClose: onCloseMdlQr,
  } = useDisclosure();

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

  return (
    <>
      <div className="bg-white rounded-xl shadow-md p-4 flex flex-row items-center justify-between min-h-[140px]">
        <div className="flex flex-col gap-2 flex-1">
          <Text fontWeight="bold" fontSize="lg" color="gray.700" mb={1}>
            {cliente}
          </Text>
          <Divider orientation="horizontal" />
          <Text fontSize="md" color="gray.500">
            <b>Monto:</b> ${" "}
            {Number(traAmount).toLocaleString("es-EC", {
              minimumFractionDigits: 2,
            })}{" "}
            {traCurrency}
          </Text>
          <Text fontSize="md" color="gray.500">
            <b>Método:</b>{" "}
            {traMetodoPago ? traMetodoPago : "Sin método de pago"}
          </Text>
          <Badge
            colorScheme={getColorByEstado(traEstado)}
            fontSize="md"
            px={4}
            py={2}
            borderRadius="md"
            variant="solid"
            boxShadow="sm"
          >
            {traEstado ? traEstado : "PENDIENTE"}
          </Badge>
          <Text fontSize="sm" color="gray.400" mt={2}>
            <b>Fecha:</b> {fechaCreacion}
          </Text>
        </div>
        <div className="ml-4 flex items-center justify-center min-w-[90px]">
          {traQr ? (
            <Image
              objectFit="contain"
              width={90}
              height={90}
              src={traQr}
              alt="QR generado"
              bg="white"
              borderRadius={8}
              border="1px solid #eee"
              cursor="pointer"
              onClick={onOpenMdlQr}
            />
          ) : (
            <Text fontSize="xs" color="gray.300">
              Sin QR
            </Text>
          )}
        </div>
      </div>
      <ModalPrevisualizarQr
        isOpen={isOpenMdlQr}
        onClose={onCloseMdlQr}
        registro={item}
      />
    </>
  );
};
