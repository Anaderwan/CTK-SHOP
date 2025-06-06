import React from "react";
import Layout from "../Components/Layout"; // <== novo
import StoreList from "../Components/Store-folder/Stores-list";
import './StorePage.scss';

export const StorePage: React.FC = () => {
  return (
    <Layout>
      <div className="store-page">
        <div className="store-content">
          <h1 className="title has-text-centered">Sve trgovine</h1>
          <StoreList />
        </div>
      </div>
    </Layout>
  );
};
