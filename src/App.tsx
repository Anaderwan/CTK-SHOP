/**
 * Main entry component of the application.
 * 
 * - Sets up React Router routes that define the app’s behavior.
 * - Uses the `isLoggedIn` flag to check access to protected pages.
 * - Includes the login page, redirection, and routes for displaying stores and items.
 */
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthCard } from "./Components/AuthCard"; 
import { StorePage } from "./Pages/StorePage"; 
import ItemsList from "./Components/Items-folder/Items-list"; 
import Layout from "./Components/Layout"; 

// Simulated user login (in a real application, this comes from the auth context or global state)
const isLoggedIn = true;

const App: React.FC = () => {
  return (
    <Routes>
      {/* Home route – displays the login page */}
      <Route path="/" element={<AuthCard />} />
      
      {/* If the user navigates to /store, automatically redirect them to /app/stores */}
      <Route path="/store" element={<Navigate to="/app/stores" />} />
      {/* Main application route with a shared layout */}
      <Route path="/app" element={<Layout />}>
        {/* Display the stores page if the user is logged in */} 
        <Route path="stores" element={isLoggedIn ? <StorePage /> : <p>Access Denied</p>} />
        {/* Display the items list if the user is logged in */}
        <Route path="items" element={isLoggedIn ? <ItemsList /> : <p>Access Denied</p>} />
        {/* Fallback route for non-existent subpages within /app */}
        <Route path="*" element={<p>404 — Page Not Found</p>} />
      </Route>
    </Routes>
  );
};

export default App;
