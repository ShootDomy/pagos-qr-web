import { usuarioApi } from "@/api/usuario";
import {
  IUsuarioDecoded,
  IUsuarioInicioSesion,
  IUsuarioLoginResponse,
} from "@/ts/models/usuario";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { TOKEN_COOKIE } from "@/utils/constants";
import { isNil } from "lodash";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [usuario, setUsuario] = useState<IUsuarioDecoded | null>(null);

  useEffect(() => {
    try {
      setIsLoading(true);
      const token = Cookies.get(TOKEN_COOKIE);

      if (isNil(token)) {
        setIsAuthenticated(false);
        setUsuario(null);
        push("/auth");
        return;
      }

      const decoded = jwtDecode<IUsuarioDecoded>(token);
      setUsuario(decoded);
      setIsAuthenticated(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Error al verificar token ❌", error);
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loginMutation = useMutation<
    IUsuarioLoginResponse,
    Error,
    IUsuarioInicioSesion
  >({
    mutationFn: usuarioApi.iniciarSesion,
    onSuccess: (data) => {
      Cookies.set(TOKEN_COOKIE, data.token);
      console.log("Sesión iniciada ✅", data);
      push("/principal");
    },
    onError: (error) => {
      console.error("Error en login ❌", error.message);
    },
  });

  return { isAuthenticated, loginMutation, usuario, isLoading };
};
