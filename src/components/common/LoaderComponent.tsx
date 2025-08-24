import { Loader } from "lucide-react";
import React from "react";

export const LoaderComponent = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <Loader className="animate-spin" />
    </div>
  );
};
