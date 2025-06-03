import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import LogIn from './Components/Login-Register/Login'
import Register from './Components/Login-Register/Register'

type AppProps = {
  callback: (username: string, password: string) => void;
};

const App: React.FC<AppProps> = () => {
    const [registration, setAcc] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const User = "John";
    const Pass = "Doe";

    const [inpUser, setInpUser] = useState('');
    const [inpPass, setInpPass] = useState('');
    const [inpPassConf, setInpPassConf] = useState('');

    const handleSave = () => {
        if (User === inpUser && Pass === inpPass) {
            setIsLoggedIn(true);
        } else {
            alert("Incorrect username or password!");
        }
    };

    const makeAcc = () => {
        setAcc(true);
    };

    if (isLoggedIn) {
        return (
            <>
                {/* OVDE IDE NAVBAR */}
            </>
        );
    } else if (registration) {
        return (
            <div className="logInField">
                <Register 
                    // inpUser={inpUser}
                    // setInpUser={setInpUser}
                    // inpPass={inpPass}
                    // setInpPass={setInpPass}
                    // etInpPass={setInpPassConf}
                    // handleSave={handleSave}
                    makeAcc={makeAcc}
                />
            </div>
        );
    } else {
        return (
            <div className="logInField">
                <LogIn
                    inpUser={inpUser}
                    setInpUser={setInpUser}
                    inpPass={inpPass}
                    setInpPass={setInpPass}
                    handleSave={handleSave}
                    makeAcc={makeAcc}
                />
            </div>
        );
    }
}

export default App




