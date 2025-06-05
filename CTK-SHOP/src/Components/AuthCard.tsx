import React, { useState, useEffect } from "react";
import styles from "./AuthCard.module.scss";
import { CustomAlert } from "./Costom_alert/CustomAlert";
import { useNavigate } from "react-router-dom";

type User = {
  username: string;
  password: string;
};

export const AuthCard: React.FC = () => {
  const navigate = useNavigate();
  const [flipped, setFlipped] = useState(false);

  // Login state
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Registration state
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Alert state
  const [alert, setAlert] = useState<{ message: string; type: "error" | "success" } | null>(null);

  // Users state (lokalno pohranjeni registrirani korisnici)
  const [users, setUsers] = useState<User[]>([]);

  // Automatsko brisanje alert poruke nakon 3 sekunde
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const flipCard = () => {
    setFlipped(!flipped);
    setAlert(null);
  };

  const showAlert = (message: string, type: "error" | "success") => {
    setAlert({ message, type });
  };

  // Provjera login podataka prema registriranim korisnicima
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const userExists = users.find(
      (user) => user.username === loginUsername && user.password === loginPassword
    );

    if (!userExists) {
      showAlert("Incorrect username or password.", "error");
      setLoginUsername("");
      setLoginPassword("");
      return;
    }

    showAlert(`Welcome, ${loginUsername}!`, "success");

    setTimeout(() => {
      navigate("/store");
    }, 1000);
  };

  // Registracija novog korisnika
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (regPassword !== confirmPassword) {
      showAlert("Passwords do not match!", "error");
      return;
    }

    if (users.find((user) => user.username === regUsername)) {
      showAlert("Username already taken!", "error");
      return;
    }

    // Dodaj novog korisnika u listu
    setUsers([...users, { username: regUsername, password: regPassword }]);
    showAlert(`User "${regUsername}" successfully registered.`, "success");

    // Reset registracijskih polja
    setRegUsername("");
    setRegPassword("");
    setConfirmPassword("");

    // Vrati na login formu
    setFlipped(false);
  };

  return (
    <>
      {/* Custom alert izvan forme */}
      {alert && (
        <CustomAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}

      <div className={`${styles.card} ${flipped ? styles.flipped : ""}`}>
        {/* Login Form */}
        <form className={`${styles.formContainer} ${styles.front}`} onSubmit={handleLoginSubmit}>
          <h1>CTK Shop</h1>
          <input
            type="text"
            placeholder="Username"
            name="username"
            required
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.signInBtn}>
              <span>Sign In</span>
            </button>
            <button type="button" className={styles.registerBtn} onClick={flipCard}>
              <span>Register</span>
            </button>
          </div>
        </form>

        {/* Register Form */}
        <form className={`${styles.formContainer} ${styles.back}`} onSubmit={handleRegisterSubmit}>
          <h1>New registration</h1>
          <input
            type="text"
            placeholder="Username"
            name="reg-username"
            required
            value={regUsername}
            onChange={(e) => setRegUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            name="reg-password"
            required
            value={regPassword}
            onChange={(e) => setRegPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirm-password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.signInBtn}>
              <span>Register</span>
            </button>
            <button type="button" className={styles.registerBtn} onClick={flipCard}>
              <span>Back</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
