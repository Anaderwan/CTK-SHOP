import { useState } from 'react';
import './App.css';
import LogIn from './Components/Login-Register/Login';
import Register from './Components/Login-Register/Register';
import { Route, Routes, useNavigate } from 'react-router-dom';

const App: React.FC = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [validUser, setValidUserName] = useState('');
  const [validPass, setValidPassword] = useState('');

  const handleLogin = (username: string, password: string) => {
    if (username === '' || password === '') {
      alert("Input fields can't be left empty");
      return;
    }

    if (username === validUser && password === validPass) {
      setIsLoggedIn(true);
      navigate('/success');
    } else {
      alert('Incorrect username or password!');
    }
  };

  const handleRegister = (username: string, password: string, confirmPassword: string) => {
    if (!username || !password || !confirmPassword) {
      alert("Fields can't be empty");
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    setValidUserName(username);
    setValidPassword(password);
    alert('Registration successful! You can now log in.');
    navigate('/'); // Go back to login
  };

  return (
    <div className="logInField">
      <Routes>
        <Route
          path="/"
          element={<LogIn callback={handleLogin} goToRegister={() => navigate('/register')} />}
        />
        <Route
          path="/register"
          element={<Register makeAcc={handleRegister} />}
        />
        {/* <Route
          path="/stores"
          element={isLoggedIn ? element={<Stores-list />} : <p>Access Denied</p>}
        /> */}
        {/* <Route
          path="/items"
          element={isLoggedIn ? element={<Items-list/>} : <p>Access Denied</p>}
        /> */}
        {/* <Route
          path="/create-store"
          element={isLoggedIn ? element={<Create-store/>} : <p>Access Denied</p>}
        /> */}
        {/* <Route
          path="/create-item"
          element={isLoggedIn ? element={<Create-item/>} : <p>Access Denied</p>}
        /> */}

        <Route path="*" element={<p>404 — Page Not Found</p>} />
      </Routes>
    </div>
  );
};

export default App;


