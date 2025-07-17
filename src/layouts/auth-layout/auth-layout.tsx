import { Toaster } from "sonner";
import { Navigate, Outlet } from "react-router-dom";

import { ModeToggle } from "@/components/common/mode-toggle";
import { ROUTES } from "@/constants/route-paths";
import { useAuthStore } from "@/stores/use-auth-store";

export const AuthLayout = () => {
  const { isLoggedIn } = useAuthStore();
  if (isLoggedIn) {
    return <Navigate to={ROUTES.DASHBOARD.ROOT} />;
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center dark:bg-[url(/bg-dark.jpg)] bg-cover bg-no-repeat bg-center">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <Outlet />
      <Toaster richColors />
    </div>
  );
};
