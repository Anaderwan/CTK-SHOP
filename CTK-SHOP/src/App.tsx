import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthCard } from "./Components/AuthCard";
import { StorePage } from "./Pages/StorePage";


const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthCard />} />
      <Route path="/store" element={<StorePage />} />
    </Routes>
  );
};

export default App;
