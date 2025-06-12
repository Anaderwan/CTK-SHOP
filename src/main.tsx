/*
 * Entry point of the React application
 * 
 * - Initializes the React app using the `createRoot` method from React 18.
 * - Wraps the `App` component inside `StrictMode` and `BrowserRouter`.
 */
import { StrictMode } from 'react'; 
import { createRoot } from 'react-dom/client'; 
import { BrowserRouter } from 'react-router-dom'; 
import 'styles/main.scss'; 
import App from './App'; 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Wrapping the application inside React Router for navigation */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
