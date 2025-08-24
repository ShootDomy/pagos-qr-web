import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Image,
  Divider,
} from "@chakra-ui/react";
import { IObtenerTransaccionComercioResponse } from "@/ts/models/transaccion";
import { isNil } from "lodash";
import { Badge } from "@chakra-ui/react";

interface PropsModalPrevisualizarQr {
  isOpen: boolean;
  onClose: () => void;
  registro: IObtenerTransaccionComercioResponse;
}

export const ModalPrevisualizarQr: React.FC<PropsModalPrevisualizarQr> = ({
  isOpen,
  onClose,
  registro,
}) => {
  const { traQr, cliente, traNumero, traAmount, traEstado, traCurrency } =
    registro;

  if (isNil(traQr)) return null;

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
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxW="md" bg="white">
        <ModalCloseButton />
        <ModalHeader>
          <div className="flex flex-col gap-1">
            <Text>
              {cliente} - {traNumero}
            </Text>
            <Divider />
            <Text>
              <b>Monto:</b> ${" "}
              {Number(traAmount).toLocaleString("es-EC", {
                minimumFractionDigits: 2,
              })}{" "}
              {traCurrency}
            </Text>
            <Text>
              <b>Estado:</b>{" "}
              <Badge colorScheme={getColorByEstado(traEstado)}>
                {traEstado}
              </Badge>
            </Text>
          </div>
        </ModalHeader>

        <ModalBody className="flex items-center justify-center">
          <Image
            src={traQr}
            alt="QR"
            width={512}
            height={512}
            objectFit="contain"
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
