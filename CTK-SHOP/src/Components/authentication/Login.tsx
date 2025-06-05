import { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Login.scss";

type LogInProps = {
  callback: (username: string, password: string) => void;
  goToRegister: () => void;
  error?: string | null;
};

const FADE_DURATION = 800; // ms
const ALERT_DURATION = 3000; // ms

const LogIn: React.FC<LogInProps> = ({ callback, goToRegister, error }) => {
  const inpUser = useRef<HTMLInputElement>(null);
  const inpPass = useRef<HTMLInputElement>(null);
  const location = useLocation();

  const [alert, setAlert] = useState<{ type: "is-success" | "is-danger"; message: string } | null>(null);
  const [fadingOut, setFadingOut] = useState(false);
  const fadeTimeout = useRef<number | null>(null);
  const alertTimeout = useRef<number | null>(null);

  // For error prop fade
  const [localError, setLocalError] = useState<string | null>(null);
  const [errorFadingOut, setErrorFadingOut] = useState(false);
  const errorFadeTimeout = useRef<number | null>(null);
  const errorAlertTimeout = useRef<number | null>(null);

  // Handle alert timer and fade-out robustly
  useEffect(() => {
    if (alert) {
      setFadingOut(false);
      if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
      if (alertTimeout.current) clearTimeout(alertTimeout.current);
      alertTimeout.current = setTimeout(() => {
        setFadingOut(true);
        fadeTimeout.current = setTimeout(() => setAlert(null), FADE_DURATION);
      }, ALERT_DURATION);
    }
    return () => {
      if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
      if (alertTimeout.current) clearTimeout(alertTimeout.current);
    };
  }, [alert]);

  // Handle error prop fade-in/out
  useEffect(() => {
    if (error) {
      setLocalError(error);
      setErrorFadingOut(false);
      if (errorFadeTimeout.current) clearTimeout(errorFadeTimeout.current);
      if (errorAlertTimeout.current) clearTimeout(errorAlertTimeout.current);
      errorAlertTimeout.current = setTimeout(() => {
        setErrorFadingOut(true);
        errorFadeTimeout.current = setTimeout(() => setLocalError(null), FADE_DURATION);
      }, ALERT_DURATION);
    } else {
      // If error prop is cleared externally, fade out immediately
      if (localError) {
        setErrorFadingOut(true);
        errorFadeTimeout.current = setTimeout(() => setLocalError(null), FADE_DURATION);
      }
    }
    return () => {
      if (errorFadeTimeout.current) clearTimeout(errorFadeTimeout.current);
      if (errorAlertTimeout.current) clearTimeout(errorAlertTimeout.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect(() => {
    if (location.state?.registered) {
      setAlert({ type: "is-success", message: "Account was created successfully!" });
      // Clear the state so the message only shows once
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleSignIn = () => {
    const username = inpUser.current?.value.trim() || "";
    const password = inpPass.current?.value.trim() || "";

    if (!username || !password) {
      setAlert({ type: "is-danger", message: "All fields must be filled." });
      return;
    }

    callback(username, password);
  };

  return (
    <div className="login-container box">
      <h3 className="title is-4 has-text-centered">Login</h3>

      {/* Show alert from internal state (e.g. registration success or local errors) */}
      {alert && (
        <div className={`notification ${alert.type} fade-${fadingOut ? "out" : "in"}`}>
          {alert.message}
        </div>
      )}

      {/* Show error from props (e.g. login errors from App.tsx) with fade */}
      {localError && (
        <div className={`notification is-danger fade-${errorFadingOut ? "out" : "in"}`}>
          {localError}
        </div>
      )}

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
