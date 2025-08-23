import React from "react";

export const menuData: IMenuData[] = [
  { nombre: "Principal", link: "/principal", icon: "" },
  { nombre: "Transacciones", link: "/transaccion", icon: "" },
];

export type IMenuData = {
  nombre: string;
  link: string;
  // icon: IconType;
  icon: "";
  className?: string;
};

// export const menuAciones: IMenuData[]=[
//   {
//     nombre: ""
//   }
// ]
