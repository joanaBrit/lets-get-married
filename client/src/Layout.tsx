import { Outlet } from "react-router";
import { Header } from "./sections";

export function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
