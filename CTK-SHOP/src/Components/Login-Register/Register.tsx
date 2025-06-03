import { useRef, useState, useEffect } from "react";
import "./Login.scss";

type RegisterProps = {
  makeAcc: (username: string, password: string, confirmPassword: string) => void;
  error?: string | null;
  clearError: () => void;
};

const FADE_DURATION = 300; // ms
const ALERT_DURATION = 3000; // ms

const Register: React.FC<RegisterProps> = ({ makeAcc, error, clearError }) => {
  const inpUser = useRef<HTMLInputElement>(null);
  const inpPass = useRef<HTMLInputElement>(null);
  const inpPassConf = useRef<HTMLInputElement>(null);

  const [alert, setAlert] = useState<{ type: "error" | "success"; message: string } | null>(null);
  const [fadingOut, setFadingOut] = useState(false);
  const fadeTimeout = useRef<number | null>(null);
  const alertTimeout = useRef<number | null>(null);

  // For error prop fade
  const [localError, setLocalError] = useState<string | null>(null);
  const [errorFadingOut, setErrorFadingOut] = useState(false);
  const errorFadeTimeout = useRef<number | null>(null);
  const errorAlertTimeout = useRef<number | null>(null);

  const handleSignUp = () => {
    const username = inpUser.current?.value.trim();
    const password = inpPass.current?.value.trim();
    const confirmPassword = inpPassConf.current?.value.trim();

    if (!username || !password || !confirmPassword) {
      setAlert({ type: "error", message: "Please fill in all fields." });
      return;
    }

    if (password !== confirmPassword) {
      setAlert({ type: "error", message: "Passwords do not match." });
      return;
    }

    setAlert({ type: "success", message: "Account was created successfully!" });
    makeAcc(username, password, confirmPassword);

    // Optionally clear the form
    if (inpUser.current) inpUser.current.value = "";
    if (inpPass.current) inpPass.current.value = "";
    if (inpPassConf.current) inpPassConf.current.value = "";
  };

  // Automatically clear alert after 2.5 seconds, with fade-out
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

  return (
    <div className="login-container box">
      <h3 className="title is-4 has-text-centered">Register</h3>

      {alert && (
        <div className={`notification custom-alert ${alert.type === "error" ? "is-danger" : "is-success"} fade-${fadingOut ? "out" : "in"}`}>
          {alert.message}
        </div>
      )}

      {/* Show error from props (e.g. register errors from App.tsx) with fade */}
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

      <div className="field">
        <label className="label">Confirm Password</label>
        <div className="control">
          <input ref={inpPassConf} className="input" type="password" placeholder="Confirm password" />
        </div>
      </div>

      <div className="buttons is-centered mt-4">
        <button className="button is-success" onClick={handleSignUp}>Sign Up</button>
      </div>
    </div>
  );
};

export default Register;
