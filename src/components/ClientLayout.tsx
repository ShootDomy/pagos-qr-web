"use client";
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { NavbarWrapper } from "./NavbarWrapper";
import { FooterWrapper } from "./FooterWrapper";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();

  // Si no está autenticado, no muestra navbar/footer
  return (
    <>
      {isAuthenticated && <NavbarWrapper />}
      {children}
      {isAuthenticated && <FooterWrapper />}
    </>
  );
}
