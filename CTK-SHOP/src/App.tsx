// src/App.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthCard } from "./Components/AuthCard";
import { StorePage } from "./Pages/StorePage";
import ItemsList from "./Components/Items-folder/Items-list";
import CreateItem from "./Components/Items-folder/CreateItem";
import CreateStore from "./Components/Store-folder/CreateStore";
import Layout from "./Components/Layout";

const isLoggedIn = true;

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthCard />} />
      
      {/* Nakon logina preusmjeri na /app/stores */}
      <Route path="/store" element={<Navigate to="/app/stores" />} />

      <Route path="/app" element={<Layout />}>
        <Route path="stores" element={isLoggedIn ? <StorePage /> : <p>Access Denied</p>} />
        <Route path="items" element={isLoggedIn ? <ItemsList /> : <p>Access Denied</p>} />
        <Route path="create-store" element={isLoggedIn ? <CreateStore /> : <p>Access Denied</p>} />
        <Route path="create-item" element={isLoggedIn ? <CreateItem /> : <p>Access Denied</p>} />
        <Route path="*" element={<p>404 — Page Not Found</p>} />
      </Route>
    </Routes>
  );
};

export default App;
