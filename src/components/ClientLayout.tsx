"use client";
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { NavbarWrapper } from "./layout/NavbarWrapper";
import { FooterWrapper } from "./layout/FooterWrapper";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();

  // Si no está autenticado, no muestra navbar/footer
  return (
    <div className="w-screen h-screen">
      {isAuthenticated && <NavbarWrapper />}
      {children}
      {isAuthenticated && <FooterWrapper />}
    </div>
  );
}
