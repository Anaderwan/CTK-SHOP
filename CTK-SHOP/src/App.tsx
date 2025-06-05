import { useState, useRef, useEffect } from 'react';
import './App.css';
import LogIn from './components/authentication/Login';
import Register from './components/authentication/Register';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './components/authentication/Login.scss'; // Importing styles for the login component
import StoresList from './components/store/Stores-list';
import CreateStore from './components/store/CreateStore';
import ItemsList from './components/items/Items-list'; // Importing the ItemsList component
import CreateItem from './components/items/Item-form'; // Importing the CreateItem component

const App: React.FC = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [validUser, setValidUserName] = useState('');
  const [validPass, setValidPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [registerError, setRegisterError] = useState<string | null>(null);

  const loginErrorTimer = useRef<number | null>(null);
  const registerErrorTimer = useRef<number | null>(null);

  // Auto-dismiss login error
  const setTimedLoginError = (message: string) => {
  setLoginError(`${message}-${Date.now()}`);  // add a unique suffix
  if (loginErrorTimer.current !== null) {
    clearTimeout(loginErrorTimer.current);
  }
  loginErrorTimer.current = window.setTimeout(() => setLoginError(null), 10000);
};

  // Auto-dismiss register error
  const setTimedRegisterError = (message: string) => {
  setRegisterError(`${message}-${Date.now()}`);  // add a unique suffix
  if (registerErrorTimer.current !== null) {
    clearTimeout(registerErrorTimer.current);
  }
  registerErrorTimer.current = window.setTimeout(() => setRegisterError(null), 10000);
};

  const handleLogin = (username: string, password: string): void => {
    if (username.trim() === '' || password.trim() === '') {
      setTimedLoginError('Please fill in all fields.');
      return;
    }

    if (username === validUser && password === validPass) {
      setIsLoggedIn(true);
      setLoginError(null);
      navigate('/success');
    } else {
      setTimedLoginError('Invalid username or password.');
    }
  };

  const handleRegister = (username: string, password: string, confirmPassword: string): void => {
    if (!username || !password || !confirmPassword) {
      setTimedRegisterError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setTimedRegisterError("Passwords don't match.");
      return;
    }

    setValidUserName(username);
    setValidPassword(password);
    setRegisterError(null);
    navigate('/', { state: { registered: true } });
  };

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (loginErrorTimer.current !== null) clearTimeout(loginErrorTimer.current);
      if (registerErrorTimer.current !== null) clearTimeout(registerErrorTimer.current);
    };
  }, []);

  return (
    <div className="logInField">
      <Routes>
        <Route
          path="/"
          element={
            <LogIn
              callback={handleLogin}
              goToRegister={() => navigate('/register')}
              error={loginError}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Register
              makeAcc={handleRegister}
              error={registerError}
            />
          }
        />
        <Route
          path="/stores"
          element={isLoggedIn ? <StoresList /> : <p>Access Denied</p>}
        />
        <Route
          path="/create-store"
          element={isLoggedIn ? <CreateStore /> : <p>Access Denied</p>}
        />
        <Route
          path="/items"
          element={isLoggedIn ? <ItemsList /> : <p>Access Denied</p>}
        />
        <Route
          path="/create-item"
          element={isLoggedIn ? <CreateItem /> : <p>Access Denied</p>}
        />
        <Route path="*" element={<p>404 — Page Not Found</p>} />
      </Routes>
    </div>
  );
};

export default App;
