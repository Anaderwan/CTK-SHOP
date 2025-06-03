import { useRef } from "react";

type LogInProps = {
    callback: (username: string, password: string) => void;
    goToRegister: () => void;
};

const LogIn: React.FC<LogInProps> = ({ callback, goToRegister }) => {
    const inpUser = useRef<HTMLInputElement>(null);
    const inpPass = useRef<HTMLInputElement>(null);

    const handleSignIn = () => {
        if (inpUser.current && inpPass.current) {
            const username = inpUser.current.value;
            const password = inpPass.current.value;
            callback(username, password);
        } else {
            alert("All fields must be filled");
        }
    };

    return (
        <div className="logInField">
            <h3>Login Form</h3>
            <input ref={inpUser} className="inp" type="text" placeholder="Username" /><br />
            <input ref={inpPass} className="inp" type="password" placeholder="Password" /><br />
            <button onClick={handleSignIn}>Sign In</button>
            <button onClick={goToRegister}>Register</button>
        </div>
    );
};

export default LogIn;