import { menuData } from "@/ts/menu-data";
import Link from "next/link";
import React from "react";

export const Menu = () => {
  return (
    <div className="flex flex-row items-center gap-4">
      {menuData.map((item, index) => (
        <Link
          key={index}
          href={item.link}
          className="hover:text-violet-400 hover:underline underline-offset-4"
        >
          {item.nombre}
        </Link>
      ))}
    </div>
  );
};
