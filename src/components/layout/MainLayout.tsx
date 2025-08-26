import { useAuth } from "@/hooks/useAuth";
import React, { Suspense } from "react";
import { NavbarWrapper } from "./NavbarWrapper";
import { FooterWrapper } from "./FooterWrapper";
import { LoaderComponent } from "../common/LoaderComponent";

interface PropsMainLayout {
  children: React.ReactNode;
}

const MainLayout: React.FC<PropsMainLayout> = ({ children }) => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <LoaderComponent />;
  }

  return (
    <Suspense fallback={<LoaderComponent />}>
      <div className="w-screen h-screen flex flex-col overflow-x-hidden">
        <NavbarWrapper />
        <div className="flex-1 w-full h-full overflow-y-auto">{children}</div>
        <FooterWrapper />
      </div>
    </Suspense>
  );
};

export default MainLayout;
