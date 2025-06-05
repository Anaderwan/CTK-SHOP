import { Outlet } from "react-router";
import Navbar from "./Navbar-Footer/Navbar";
import Footer from "./Navbar-Footer/Footer";

const Layout:React.FC = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    )
}

export default Layout