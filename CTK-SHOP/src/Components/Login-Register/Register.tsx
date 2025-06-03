import { useRef } from "react";
import { Route, Routes, useNavigate } from 'react-router-dom';

type RegisterProps = {
    makeAcc: (username: string, password: string, confirmPassword: string) => void;
};

const Register: React.FC<RegisterProps> = ({ makeAcc }) => {
    const inpUser = useRef<HTMLInputElement>(null);
    const inpPass = useRef<HTMLInputElement>(null);
    const inpPassConf = useRef<HTMLInputElement>(null);

    const handleSignUp = () => {
        if (inpUser.current && inpPass.current && inpPassConf.current) {
            const username = inpUser.current.value;
            const password = inpPass.current.value;
            const confirmPassword = inpPassConf.current.value;
            makeAcc(username, password, confirmPassword);
        } else {
            alert("All fields must be filled");
        }
    };

    return (
        <div className="logInField">
            <h3>Registration Form</h3>
            <input ref={inpUser} className="inp" type="text" placeholder="Username" /><br />
            <input ref={inpPass} className="inp" type="password" placeholder="Password" /><br />
            <input ref={inpPassConf} className="inp" type="password" placeholder="Confirm Password" /><br />
            <button onClick={handleSignUp}>Sign Up</button>
        </div>
    );
};

export default Register;