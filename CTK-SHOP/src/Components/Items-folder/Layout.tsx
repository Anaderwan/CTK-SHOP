import { Outlet } from "react-router";
import Navbar from "../navbar-and-footer/Navbar";
import Footer from "../navbar-and-footer/Footer";

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