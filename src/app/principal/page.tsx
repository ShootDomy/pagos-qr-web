"use client";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/hooks/useAuth";
import { useObtenerEstadoPago } from "@/hooks/useObtenerEstadoPago";
import { useTransaccionGenerarQR } from "@/hooks/useTransaccionGenerarQR";
import { formatDigitos } from "@/utils/functions";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  FormControl,
  FormErrorMessage,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { isNil } from "lodash";
import { DollarSign } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const esquema = z.object({
  traAmount: z
    .number("El monto es requerido")
    .min(0, "El monto debe ser mayor o igual a 0")
    .nullish(),
  comUuid: z.string().uuid().optional(),
});

const Principal = () => {
  const toast = useToast();
  const { usuario } = useAuth();

  const [qrImg, setQrImg] = useState<string | null>(null);
  const [traUuid, setTraUuid] = useState<string | null>(null);
  const [estadoQR, setEstadoQR] = useState<boolean>(false);

  const { mutate: generarQr, isPending } = useTransaccionGenerarQR({
    onSuccess: async (response: { qr: string; traUuid: string }) => {
      setQrImg(response.qr);
      setTraUuid(response.traUuid);
      setEstadoQR(true);
      console.log(response);

      await toast({
        title: "QR generado exitosamente",
        description: "Escanea el código QR para continuar con el pago.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      handleEstadoPagoConToast();
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
    reset,
  } = useForm<z.infer<typeof esquema>>({
    resolver: zodResolver(esquema),
  });

  const onSuccess = (data: z.infer<typeof esquema>) => {
    const { traAmount } = data;

    if (!isNil(traAmount) && !isNil(usuario?.comUuid)) {
      generarQr({
        traAmount: parseFloat(formatDigitos(traAmount)),
        comUuid: usuario.comUuid,
      });
    }
    console.log(data);
  };

  const onError = (error: unknown) => {
    console.log("Errores de validación:", error);
  };

  const {
    data: estadoPagoQuery,
    refetch,
    dataUpdatedAt,
  } = useObtenerEstadoPago({ traUuid }, { refetchInterval: 5000 });

  const handleEstadoPago = () => {
    refetch();
  };

  const handleEstadoPagoConToast = () => {
    const pollEstado = () =>
      new Promise((resolve, reject) => {
        const interval = setInterval(async () => {
          const result = await refetch();
          const estado = result.data?.traEstado;
          if (estado && estado !== "PENDIENTE") {
            clearInterval(interval);
            if (estado === "APROBADO") {
              resolve(result.data);
            } else {
              reject(result.data);
            }
          }
        }, 2000);
      });

    toast.promise(pollEstado(), {
      success: {
        title: "Pago aprobado",
        description: "El pago fue exitoso",
        position: "top-right",
      },
      error: {
        title: "Pago rechazado",
        description: "El pago fue rechazado",
        position: "top-right",
      },
      loading: {
        title: "Procesando pago",
        description: "Esperando confirmación...",
        position: "top-right",
      },
    });
  };

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

  const handleResetearQr = () => {
    setQrImg(null);
    setTraUuid(null);
    setEstadoQR(false);
    reset({ traAmount: null });
  };

  return (
    <MainLayout>
      <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
        <div className="flex flex-col md:flex-row gap-4 bg-white rounded-lg shadow-md p-4">
          <FormControl isInvalid={!!errors.traAmount}>
            <InputGroup width="200px">
              <InputLeftElement>
                <DollarSign className="text-gray-200" />
              </InputLeftElement>
              <Input
                type="number"
                placeholder="Monto"
                isDisabled={estadoQR}
                {...register("traAmount", { valueAsNumber: true })}
              />
            </InputGroup>
            <FormErrorMessage>{errors.traAmount?.message}</FormErrorMessage>
          </FormControl>
          {!estadoQR ? (
            <Button
              colorScheme="purple"
              width="full"
              isDisabled={isPending}
              isLoading={isPending}
              mt={{ base: 4, md: 0 }}
              onClick={handleSubmit(onSuccess, onError)}
            >
              Generar código de pago
            </Button>
          ) : (
            <Button
              colorScheme="purple"
              width="full"
              isDisabled={isPending}
              isLoading={isPending}
              mt={{ base: 4, md: 0 }}
              onClick={handleResetearQr}
            >
              Generar nuevo código de pago
            </Button>
          )}
        </div>

        {!qrImg ? (
          <div className="flex flex-col items-center justify-center h-52 bg-white rounded-lg shadow-md p-4">
            <Text>No se ha generado ningún código QR</Text>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Card
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
            >
              <Image
                objectFit="contain"
                height="100%"
                src={qrImg}
                alt="QR generado"
                bg="white"
              />
              <Stack>
                <CardBody
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Badge
                    colorScheme={getColorByEstado(
                      estadoPagoQuery?.traEstado ?? "PENDIENTE"
                    )}
                    mb={4}
                    fontSize="lg"
                    px={4}
                    py={2}
                    borderRadius="md"
                  >
                    {estadoPagoQuery ? estadoPagoQuery.traEstado : "PENDIENTE"}
                  </Badge>
                  <Heading size="lg" mb={2}>
                    ${watch("traAmount") ?? ""}
                  </Heading>
                  <Text fontSize="xl" color="gray.600" mb={4}>
                    {qrImg ? estadoPagoQuery?.traCurrency ?? "" : "USD"}
                  </Text>
                  <Text fontSize="md" color="gray.500">
                    {traUuid ? (
                      <>
                        QR generado con el número de transacción{" "}
                        <span className="font-semibold">
                          {estadoPagoQuery?.traNumero}
                        </span>
                      </>
                    ) : (
                      "Esperando generación"
                    )}
                  </Text>
                </CardBody>
                <CardFooter>
                  <div className="w-full flex flex-col items-center justify-center pb-2">
                    <Button
                      colorScheme="purple"
                      width="full"
                      mt={6}
                      onClick={handleEstadoPago}
                    >
                      Actualizar estado de pago
                    </Button>
                    <Text fontSize="xs" color="gray.300">
                      {dataUpdatedAt
                        ? `Actualizado el ${new Date(
                            dataUpdatedAt
                          ).toLocaleString()}`
                        : "Sin datos actualizados"}
                    </Text>
                  </div>
                </CardFooter>
              </Stack>
            </Card>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Principal;
