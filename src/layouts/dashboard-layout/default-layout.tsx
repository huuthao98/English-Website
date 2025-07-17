import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { Outlet } from "react-router-dom";

export const DefaultLayout = () => {
  // const { isLoggedIn } = useAuthStore();
  // if (!isLoggedIn) {
  //   return <Navigate to={ROUTES.AUTH.LOGIN} />;
  // }

  return (
    <>
      <div
        id="content"
        className={cn(
          "ml-auto w-full max-w-full",
          "peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]",
          "peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]",
          "sm:transition-[width] sm:duration-200 sm:ease-linear",
          "flex h-svh flex-col",
          "group-data-[scroll-locked=1]/body:h-full",
          "has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh"
        )}
      >
        <Outlet />
      </div>
      <Toaster richColors closeButton expand={true} />
    </>
  );
};
