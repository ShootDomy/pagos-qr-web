"use client";
import React from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import { AlignJustify, CircleChevronUp } from "lucide-react";
import { menuData } from "@/ts/menu-data";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { usuario } = useAuth();

  const handleLogout = () => {
    Cookies.remove("tk_pagos_qr");
    router.push("/auth");
  };

  return (
    <Box
      bg="#897DEE"
      px={4}
      color="white"
      boxShadow="md"
      transition="box-shadow 0.2s"
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {/* Logo */}
        <Box fontWeight="bold">{usuario?.comNombre ?? ""}</Box>

        {/* Links Desktop */}
        <HStack
          spacing={8}
          alignItems="center"
          display={{ base: "none", md: "flex" }}
        >
          {menuData.map((menu, item) => (
            <Button
              key={item}
              as="a"
              href={menu.action === "logout" ? undefined : menu.link || "#"}
              variant="ghost"
              color="white"
              _hover={{ bg: "blue.600" }}
              onClick={menu.action === "logout" ? handleLogout : undefined}
            >
              {menu.icon && <menu.icon className="w-5 h-5 mr-2" />}
              {menu.nombre}
            </Button>
          ))}
        </HStack>

        {/* Botón Mobile */}
        <IconButton
          size="md"
          icon={isOpen ? <CircleChevronUp /> : <AlignJustify />}
          aria-label="Open Menu"
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
      </Flex>

      {/* Menú Mobile */}
      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" spacing={4}>
            {menuData.map((menu, item) => (
              <Button
                key={item}
                as="a"
                href={menu.action === "logout" ? undefined : menu.link || "#"}
                variant="ghost"
                color="white"
                _hover={{ bg: "blue.600" }}
                onClick={menu.action === "logout" ? handleLogout : undefined}
              >
                {menu.icon && <menu.icon className="w-5 h-5 mr-2" />}
                {menu.nombre}
              </Button>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};
