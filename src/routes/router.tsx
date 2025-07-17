import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../constants/route-paths";

import { DefaultLayout } from "../layouts/dashboard-layout/default-layout";

import HomePage from "@/pages/home-page";
import WishListPage from "@/pages/wish-list-page";
import WatchedPage from "@/pages/watched-page";

export const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.DASHBOARD.ROOT} element={<DefaultLayout />}>
        <Route index element={<HomePage />} />
        <Route path={"/wishlist"} element={<WishListPage />} />
        <Route path={"/history"} element={<WatchedPage />} />
      </Route>
    </Routes>
  );
};
