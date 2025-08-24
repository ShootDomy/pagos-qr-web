export interface IUsuarioInicioSesion {
  usuCorreo: string;
  usuContrasena: string;
}

export interface IUsuarioLoginResponse {
  token: string;
}

export type IUsuarioDecoded = {
  usuUuid: string;
  usuNombre: string;
  usuApellido: string;
  usuCorreo: string;
  comUuid: string | null;
  iat: number;
  exp: number;
};
