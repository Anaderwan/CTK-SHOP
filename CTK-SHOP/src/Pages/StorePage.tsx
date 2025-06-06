import React from "react";
import StoreList from "../Components/Store-folder/Stores-list";
import './StorePage.scss';

export const StorePage: React.FC = () => {
  return (
    <div className="store-page">
      <div className="store-content">
        <h1 className="title has-text-centered">Sve trgovine</h1>
        <StoreList />
      </div>
    </div>
  );
};
