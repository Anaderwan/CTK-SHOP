/**
 * Layout component
 * 
 * - Serves as a common wrapper for all subpages within the `/app` route.
 * - Displays the navigation bar (Navbar) at the top and the footer (Footer) at the bottom.
 * - Uses `<Outlet />` to render the content of the currently active nested route.
 * 
 * Note:
 * - `username` is currently hardcoded as "demoUser", but can be passed as a prop or fetched from context in the future.
 */
 
import { Outlet } from "react-router-dom";
import Navbar from "Components/Navbar-Footer/Navbar"; 
import Footer from "Components/Navbar-Footer/Footer"; 

interface LayoutProps {
  username: string;
}

const Layout = () => {
  return (
    <>
      {/* */}
      <Navbar username= "username" />
      {/*  */}
      <main style={{ paddingTop: "60px" }}>
        <Outlet /> {/* Place where nested route content will be displayed */}
      </main>
      {/* Page footer */}
      <Footer />
    </>
  );
};

export default Layout;
