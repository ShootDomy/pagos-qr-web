import { usuarioApi } from "@/api/usuario";
import {
  IUsuarioInicioSesion,
  IUsuarioLoginResponse,
} from "@/ts/models/usuario";
import { useMutation } from "@tanstack/react-query";

export const useAuth = () => {
  return useMutation<IUsuarioLoginResponse, Error, IUsuarioInicioSesion>({
    mutationFn: usuarioApi.iniciarSesion,
    onSuccess: (data) => {
      console.log("Sesión iniciada ✅", data);
    },
    onError: (error) => {
      console.error("Error en login ❌", error.message);
    },
  });
};
