import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import LogIn from './Components/Login-Register/Login'
import Register from './Components/Login-Register/Register'
import { Route, Routes, useNavigate } from 'react-router-dom';

const App: React.FC = () => {
    const navigate = useNavigate();
    const [registration, setAcc] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const[validUser, setValidUserName] = useState('')
    const[validPass, setValidPassword] = useState('')
    
    const handleLogin = (username: string, password: string) => {
      if(validUser !== '' && validPass !== ''){
        if (username === validUser && password === validPass) {
          setIsLoggedIn(true);
        } else {
          alert("Incorrect username or password!");
        }
      }else{
        alert("Input fields can't be left empty");
      }
    };
 
    const handleRegister = (username: string, password: string, confirmPassword: string) => {
      if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        // Simulate successful registration
        setValidUserName(username)
        setValidPassword(password)
        setAcc(false); // Go back to login
    };

    const makeAcc = () => setAcc(true);

    if (isLoggedIn) {
        return (
            <div>
                <p>USPEH</p>{/* You could render your <Navbar /> or main app routes here */}
            </div>
        );
    }

    if (registration) {
        return (
            <div className="logInField">
              <Routes>
                <Route path='/register' element={<Register makeAcc={handleRegister} />} />
              </Routes> 
            </div>
        );
    }

    return (
        <div className="logInField">
          <Routes>
            <Route path="/" element={<LogIn callback={handleLogin} goToRegister={() => navigate('/register')} />} />
          </Routes>
        </div>
    );
};

export default App;




