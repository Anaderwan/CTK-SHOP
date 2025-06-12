/**
 * StorePage component
 *
 * - Main page for displaying stores.
 * - Uses the `StoreList` component that fetches and displays all stores from the database.
 * - This page is shown when the user navigates to `/app/stores`.
 * - Contains basic layout wrappers for styling (`store-page` and `store-content`).
 */
import React from "react";
import StoreList from "../Components/Store-folder/Stores-list"; // Prikazuje listu svih trgovina

export const StorePage: React.FC = () => {
  return (
    <div className="store-page">
      <div className="store-content">
        {/* Loads and displays the list of stores */}
        <StoreList />
      </div>
    </div>
  );
};
