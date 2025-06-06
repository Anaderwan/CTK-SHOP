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
  const navigate = useNavigate();
  const [justRegistered, setJustRegistered] = useState(false);

  useEffect(() => {
    if (location.state?.registered) {
      setJustRegistered(true);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    const username = inpUser.current?.value.trim() || "";
    const password = inpPass.current?.value.trim() || "";
    callback(username, password);
  };

  return (
    <div className="card" id="card">
      <form className="form-container front" onSubmit={handleSignIn}>
        <h1>CTK Shop</h1>

        {justRegistered && (
          <ErrorMessage type="success" message="Your account was created successfully!" />
        )}
        {error && <ErrorMessage key={error} type="error" message={error} />}

        <input ref={inpUser} type="text" placeholder="Username" name="username" required />
        <input ref={inpPass} type="password" placeholder="Password" name="password" required />

        <div className="button-group">
          <button type="submit" className="sign-in-btn"><span>Sign In</span></button>
          <button type="button" className="register-btn" onClick={goToRegister}><span>Register</span></button>
        </div>
      </form>
    </div>
  );
};

export default LogIn;