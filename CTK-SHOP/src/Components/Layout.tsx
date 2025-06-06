// src/Components/Layout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar-Footer/Navbar";
import Footer from "./Navbar-Footer/Footer";

const Layout = () => {
  return (
    <>
      <Navbar username="demoUser" />
      <main style={{ paddingTop: "60px" }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
