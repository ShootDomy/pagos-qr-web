import { Banknote, LogOut, QrCode } from "lucide-react";
import React from "react";

export const menuData: IMenuData[] = [
  { nombre: "Principal", link: "/principal", icon: QrCode },
  { nombre: "Transacciones", link: "/transaccion", icon: Banknote },
  {
    nombre: "Cerrar Sesión",
    link: "/auth",
    icon: LogOut,
    action: "logout",
  },
];

export type IMenuData = {
  nombre: string;
  link: string;
  icon: React.ElementType;
  className?: string;
  action?: string;
};

// export const menuAciones: IMenuData[]=[
//   {
//     nombre: ""
//   }
// ]
