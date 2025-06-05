import { useRef, useEffect, useState } from "react";
import ErrorMessage from "../toaster/ErrorMessage";
import { useLocation, useNavigate } from "react-router-dom";
import "./Login.scss";

type LogInProps = {
  callback: (username: string, password: string) => void;
  goToRegister: () => void;
  error?: string | null;
};

const LogIn: React.FC<LogInProps> = ({ callback, goToRegister, error }) => {
  const inpUser = useRef<HTMLInputElement>(null);
  const inpPass = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const navigate = useNavigate(); // new line
  const [justRegistered, setJustRegistered] = useState(false);

  useEffect(() => {
  if (location.state?.registered) {
    setJustRegistered(true); // keep it locally
    navigate(location.pathname, { replace: true, state: {} }); // then clear location.state
  }
}, [location, navigate]);

  const handleSignIn = () => {
    const username = inpUser.current?.value.trim() || "";
    const password = inpPass.current?.value.trim() || "";

    callback(username, password);
  };

  return (
    <div className="login-container box">
      <h3 className="title is-4 has-text-centered">Login</h3>

      <div style={{width: "100%", height: "75px", display: "flex", justifyContent: "center", alignItems: "center"}}>
        {justRegistered && (
          <ErrorMessage type="success" message="Account was created successfully!" />
        )}
        {error && <ErrorMessage key={error} type="error" message={error} />}
      </div>

      <div className="field">
        <label className="label">Username</label>
        <div className="control">
          <input ref={inpUser} className="input" type="text" placeholder="Enter username" />
        </div>
      </div>

      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input ref={inpPass} className="input" type="password" placeholder="Enter password" />
        </div>
      </div>

      <div className="buttons is-centered mt-4">
        <button className="button is-link" onClick={handleSignIn}>Sign In</button>
        <button className="button is-light" onClick={goToRegister}>Register</button>
      </div>
    </div>
  );
};

export default LogIn;