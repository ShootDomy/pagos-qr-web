"use client";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Input,
  Heading,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import React, { Suspense, useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useAuth";

const esquema = z.object({
  nombre: z
    .string("El nombre es requerido")
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .nonempty("El nombre es requerido"),
  apellido: z
    .string("El apellido es requerido")
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .nonempty("El apellido es requerido"),
  correo: z
    .string("El correo es requerido")
    .email("Correo inválido")
    .nonempty("El correo es requerido"),
  contrasena: z
    .string("La contraseña es requerida")
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .nonempty("La contraseña es requerida"),
});

const Auth = () => {
  const toast = useToast();

  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [errorCorreo, setErrorCorreo] = useState<string | null>(null);
  const [errorContrasena, setErrorContrasena] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof esquema>>({
    resolver: zodResolver(esquema),
  });

  const {
    loginMutation: { mutate },
  } = useAuth();

  const handleIniciarSesion = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Correo:", correo);
    console.log("Contraseña:", contrasena);

    const esCorreoValido = (correo: string) => {
      return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(correo.trim());
    };

    if (!correo || !esCorreoValido(correo)) {
      console.log("Por favor ingresa un correo válido.");
      setErrorCorreo("Por favor ingresa un correo válido.");

      toast({
        title: "Credenciales incorrectas",
        description: "Por favor verifica tu correo y contraseña.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setErrorCorreo(null);

    if (!contrasena || (contrasena !== undefined && contrasena.trim() === "")) {
      console.log("Por favor ingresa una contraseña válida.");
      setErrorContrasena("Por favor ingresa una contraseña válida.");
      toast({
        title: "Credenciales incorrectas",
        description: "Por favor verifica tu correo y contraseña.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setErrorContrasena(null);

    mutate(
      { usuCorreo: correo, usuContrasena: contrasena },
      {
        onSuccess: (data) => {
          console.log("Inicio de sesión exitoso:", data);
          toast({
            title: "Inicio de sesión exitoso",
            description: "Bienvenido de nuevo!",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        },
        onError: (error) => {
          console.error("Error al iniciar sesión:", error);
        },
      }
    );

    console.log("Correo:", correo);
    console.log("Contraseña:", contrasena);
  };

  const onSuccess = (data: z.infer<typeof esquema>) => {
    console.log("Datos del formulario:", data);
  };

  const onError = (error: unknown) => {
    console.log("Errores de validación:", error);
  };

  return (
    <Suspense>
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#c4bef7]">
        <br />

        <Card>
          <CardHeader>
            <Heading size="md">Gestión de Pagos QR</Heading>
          </CardHeader>

          <CardBody className="min-w-xl">
            <Tabs
              isFitted
              // variant={"enclosed"}
              colorScheme="purple"
              className="border border-black"
            >
              <TabList>
                <Tab>Iniciar Sesión</Tab>
                <Tab>Registrarse</Tab>
              </TabList>
              <br />
              <TabPanels className="">
                <TabPanel>
                  <div className="space-y-3.5">
                    <FormControl isInvalid={!!errorCorreo}>
                      <FormLabel>Correo:</FormLabel>
                      <Input
                        type="email"
                        placeholder="alguien@example.com"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        className="bg-white text-black"
                      />
                      <FormErrorMessage>{errorCorreo}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errorContrasena}>
                      <FormLabel mt={4}>Contraseña:</FormLabel>
                      <Input
                        type="password"
                        placeholder="********"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        className="bg-white text-black"
                      />
                      <FormErrorMessage>{errorContrasena}</FormErrorMessage>
                    </FormControl>

                    <Button
                      onClick={handleIniciarSesion}
                      colorScheme="purple"
                      width="full"
                      mt={6}
                    >
                      Iniciar Sesión
                    </Button>
                  </div>
                </TabPanel>
                <TabPanel>
                  <FormControl isInvalid={!!errors.nombre}>
                    <FormLabel>Nombre:</FormLabel>
                    <Input
                      type="text"
                      placeholder="Joe"
                      {...register("nombre")}
                      className="bg-white text-black"
                    />
                    <FormErrorMessage>
                      {errors.nombre?.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.apellido}>
                    <FormLabel>Apellido:</FormLabel>
                    <Input
                      type="text"
                      placeholder="Dan"
                      {...register("apellido")}
                      className="bg-white text-black"
                    />
                    <FormErrorMessage>
                      {errors.apellido?.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.correo}>
                    <FormLabel>Correo:</FormLabel>
                    <Input
                      type="email"
                      placeholder="alguien@example.com"
                      {...register("correo")}
                      className="bg-white text-black"
                    />
                    <FormErrorMessage>
                      {errors.correo?.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.contrasena}>
                    <FormLabel mt={4}>Contraseña:</FormLabel>
                    <Input
                      type="password"
                      placeholder="********"
                      {...register("contrasena")}
                      className="bg-white text-black"
                    />
                    <FormErrorMessage>
                      {errors.contrasena?.message}
                    </FormErrorMessage>
                  </FormControl>
                  <Button
                    onClick={handleSubmit(onSuccess, onError)}
                    colorScheme="purple"
                    width="full"
                    mt={6}
                  >
                    Registrar
                  </Button>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </Suspense>
  );
};

export default Auth;
