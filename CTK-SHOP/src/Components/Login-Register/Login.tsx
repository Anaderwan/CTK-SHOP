import { useRef, useState, useEffect } from "react";

type LogInProps = {
  callback: (username: string, password: string) => void;
};

const LogIn: React.FC<LogInProps> = ({callback}) => {
    const inpUser = useRef<HTMLInputElement>(null);
    const inpPass = useRef<HTMLInputElement>(null);

    const handleSignIn = () => {
      if (inpUser.current && inpPass.current){
            const username = inpUser.current.value;
            const password = inpPass.current.value;
            callback(username, password);
      }
      else{
        alert('Sva polja moraju biti popunjenja')
      }
    }

    return (
        <>
            <div className="logInField">
                <h3>Registration form</h3>
                <input ref={inpUser} className="inp" type="text" placeholder="Username" /><br />
                <input ref={inpPass} className="inp" type="password" placeholder="Password" /><br />
                <button onClick={handleSignIn}>Sign In</button>
            </div>
        </>
    );
}

export default LogIn;