import { Outlet } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import AppNavbar from "../components/AppNavbar";
import AppFooter from "../components/AppFooter";

const AppLayout = ({ menu, setMenu, products, carts, setToken, role }) => {
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <AppHeader />
        <AppNavbar products={products} carts={carts} menu={menu} setMenu={setMenu} setToken={setToken} role={role}/>
        <div className="flex-grow-1">
          <Outlet />
        </div>
        <AppFooter />
      </div>
    </>
  );
};

export default AppLayout;
