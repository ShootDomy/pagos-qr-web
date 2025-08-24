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
} from "@chakra-ui/react";
import { IObtenerTransaccionComercioResponse } from "@/ts/models/transaccion";
import { isNil } from "lodash";

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
  const { traQr, cliente } = registro;

  if (isNil(traQr)) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxW="md" bg="white">
        <ModalHeader>
          <div className="flex flex-col gap-1">
            <Text fontWeight="bold">Cliente:</Text>
            <Text>{cliente}</Text>
          </div>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody className="flex items-center justify-center p-4">
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
