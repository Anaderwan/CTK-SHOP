/**
 * Layout component
 *
 * - Wraps all routes within the application that come after login (under /app).
 * - Displays the `Navbar` at the top and the `Footer` at the bottom of the page.
 * - The content of the current subpage is rendered within the `<Outlet />` component.
 * - The `paddingTop` style ensures that the content is not covered by the navigation bar.
 */
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar-Footer/Navbar"; 
import Footer from "./Navbar-Footer/Footer"; 

const Layout = () => {
  return (
    <>
      {/* Navigation on the top of the page */}
      <Navbar username= "username" /> 
      {/* The main content that changes depending on the route */}
      <main style={{ paddingTop: "60px" }}>
        <Outlet />
      </main>
      {/* Fixed footer at the bottom */}
      <Footer />
    </>
  );
};

export default Layout;
