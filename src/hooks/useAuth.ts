import { usuarioApi } from "@/api/usuario";
import {
  IUsuarioInicioSesion,
  IUsuarioLoginResponse,
} from "@/ts/models/usuario";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkToken = () =>
      setIsAuthenticated(!!localStorage.getItem("token"));
    checkToken();

    window.addEventListener("storage", checkToken);
    // Evento personalizado para cambios locales
    const handleTokenChange = () => checkToken();
    window.addEventListener("tokenChange", handleTokenChange);

    return () => {
      window.removeEventListener("storage", checkToken);
      window.removeEventListener("tokenChange", handleTokenChange);
    };
  }, []);

  const loginMutation = useMutation<
    IUsuarioLoginResponse,
    Error,
    IUsuarioInicioSesion
  >({
    mutationFn: usuarioApi.iniciarSesion,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      window.dispatchEvent(new Event("tokenChange"));
      console.log("Sesión iniciada ✅", data);
    },
    onError: (error) => {
      console.error("Error en login ❌", error.message);
    },
  });

  return { isAuthenticated, loginMutation };
};
