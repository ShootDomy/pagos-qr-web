"use client";
import { useTransaccionGenerarQR } from "@/hooks/useTransaccionGenerarQR";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  FormControl,
  FormErrorMessage,
  Heading,
  Image,
  InputGroup,
  InputLeftAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const esquema = z.object({
  traAmount: z
    .number("El monto es requerido")
    .min(0, "El monto debe ser mayor o igual a 0")
    .max(50, "El monto debe ser menor o igual a 50"),
  comUuid: z.string().uuid().optional(),
});

const Principal = () => {
  const [qrImg, setQrImg] = useState<string | null>(null);
  const [traUuid, setTraUuid] = useState<string | null>(null);

  const { mutate: generarQr } = useTransaccionGenerarQR({
    onSuccess: (response: { qr: string; traUuid: string }) => {
      setQrImg(response.qr);
      setTraUuid(response.traUuid);
      console.log(response);
    },
    onError: (error: unknown) => {
      console.log("Error al generar QR:", error);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<z.infer<typeof esquema>>({
    resolver: zodResolver(esquema),
  });

  const onSuccess = (data: z.infer<typeof esquema>) => {
    generarQr({
      ...data,
      comUuid: data.comUuid || "7f0cf323-a1bf-45eb-8f7a-714e354d4c2b",
    });
    console.log(data);
  };

  const onError = (error: unknown) => {
    console.log("Errores de validación:", error);
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center bg-[#f7f7fa] p-4">
      <div className="flex flex-col md:flex-row items-center gap-4 bg-white p-6 rounded-lg shadow-md mb-8 w-full max-w-md">
        <div className="w-full md:w-auto">
          <FormControl isInvalid={!!errors.traAmount}>
            <InputGroup width="200px">
              <InputLeftAddon>$</InputLeftAddon>
              <NumberInput
                max={50}
                min={0}
                precision={2}
                step={0.01}
                width="100%"
                focusBorderColor="purple.400"
              >
                <NumberInputField
                  placeholder="Monto"
                  {...register("traAmount", { valueAsNumber: true })}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </InputGroup>
            <FormErrorMessage>{errors.traAmount?.message}</FormErrorMessage>
          </FormControl>
        </div>
        <Button
          colorScheme="purple"
          width="full"
          mt={{ base: 4, md: 0 }}
          onClick={handleSubmit(onSuccess, onError)}
        >
          Generar código QR
        </Button>
      </div>
      <div>
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
        >
          {qrImg ? (
            <Image
              objectFit="cover"
              maxW={{ base: "100%", sm: "200px" }}
              src={qrImg}
              alt="QR generado"
              bg="white"
            />
          ) : (
            <div style={{ width: 200, height: 200, background: "white" }} />
          )}

          <Stack>
            <CardBody>
              <Heading size="md">Información del pago</Heading>
              <Text py="2" wordBreak="break-all">
                {traUuid}
              </Text>
            </CardBody>

            <CardFooter>
              <Button colorScheme="purple" width="full" mt={6}>
                Actualizar estado de pago
              </Button>
            </CardFooter>
          </Stack>
        </Card>
      </div>
    </div>
  );
};

export default Principal;
