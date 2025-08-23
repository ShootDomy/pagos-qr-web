import {
  IUsuarioInicioSesion,
  IUsuarioLoginResponse,
} from "@/ts/models/usuario";
import { post } from "./config";

export const usuarioApi = {
  iniciarSesion: async (data: IUsuarioInicioSesion) => {
    const res = await post<IUsuarioLoginResponse>("/usuario/auth/inicio", data);
    return res.data;
  },
};
