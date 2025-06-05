import React from "react";
import StoreList from "../Components/Store-folder/Stores-list";
import Navbar from "../Components/Navbar-Footer/Navbar";
import Footer from "../Components/Navbar-Footer/Footer";

export const StorePage: React.FC = () => {
  return (
    <>
      <Navbar username="demoUser" /> {/* Možeš kasnije proslijediti pravi username */}
      <div className="store-page">
        <div className="container">
          <h1 className="title has-text-centered">Sve trgovine</h1>
          <StoreList />
          <Footer />
        </div>
      </div>
    </>
  );
};
