"use client";
import MainLayout from "@/components/layout/MainLayout";
import { useObtenerEstadoPago } from "@/hooks/useObtenerEstadoPago";
import { useTransaccionGenerarQR } from "@/hooks/useTransaccionGenerarQR";
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
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { DollarSign } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const esquema = z.object({
  traAmount: z
    .number("El monto es requerido")
    .min(0, "El monto debe ser mayor o igual a 0"),
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

  // Llamar el hook siempre, pero solo consultar si traUuid existe
  const { data: estadoPagoQuery, refetch } = useObtenerEstadoPago(
    { traUuid },
    { refetchInterval: 5000 }
  );

  const handleEstadoPago = () => {
    refetch();
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
                {...register("traAmount", { valueAsNumber: true })}
              />
            </InputGroup>
            <FormErrorMessage>{errors.traAmount?.message}</FormErrorMessage>
          </FormControl>
          <Button
            colorScheme="purple"
            width="full"
            mt={{ base: 4, md: 0 }}
            onClick={handleSubmit(onSuccess, onError)}
          >
            Generar código QR
          </Button>
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
                  <Button
                    colorScheme="purple"
                    width="full"
                    mt={6}
                    onClick={handleEstadoPago}
                  >
                    Actualizar estado de pago
                  </Button>
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
