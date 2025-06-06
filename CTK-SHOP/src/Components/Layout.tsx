// src/Components/Layout.tsx
import React from "react";
import Navbar from "./Navbar-Footer/Navbar";
import Footer from "./Navbar-Footer/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar username="demoUser" />
      <main className="page-content">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
