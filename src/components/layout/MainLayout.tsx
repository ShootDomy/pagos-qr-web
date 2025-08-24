import { useAuth } from "@/hooks/useAuth";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { Suspense, useEffect } from "react";
import { NavbarWrapper } from "./NavbarWrapper";
import { FooterWrapper } from "./FooterWrapper";
import { LoaderComponent } from "../common/LoaderComponent";

interface PropsMainLayout {
  children: React.ReactNode;
}

const MainLayout: React.FC<PropsMainLayout> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const { push } = useRouter();

  useEffect(() => {
    if (!isAuthenticated && isLoading) push("/401");
  }, [isAuthenticated, isLoading, push]);

  if (isLoading) {
    return <LoaderComponent />;
  }

  return (
    <Suspense fallback={<LoaderComponent />}>
      <div className="w-screen h-screen flex flex-col">
        <NavbarWrapper />
        <div className="flex-1 h-full">{children}</div>
        <FooterWrapper />
      </div>
    </Suspense>
  );
};

export default MainLayout;
