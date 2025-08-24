"use client";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";

const NotAuthorized = () => {
  const { push } = useRouter();

  return (
    <div className="w-screen h-screen flex flex-col gap-2 items-center justify-center">
      <div>No estas autenticado...</div>

      <Button colorScheme="purple" onClick={() => push("/auth")}>
        Iniciar sesión
      </Button>
    </div>
  );
};

export default NotAuthorized;
