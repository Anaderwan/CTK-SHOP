import React, { useState, useEffect } from "react";
import { CustomAlert } from "./Custom_alert/CustomAlert";
import { useNavigate } from "react-router-dom";
import Footer from "./Navbar-Footer/Footer";

type User = {
  username: string;
  password: string;
};

export const AuthCard: React.FC = () => {
  const navigate = useNavigate();
  const [flipped, setFlipped] = useState(false);

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [alert, setAlert] = useState<{ message: string; type: "error" | "success" } | null>(null);

  const [users, setUsers] = useState<User[]>([]);

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

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^[a-zA-Z0-9]+$/.test(regUsername)) {
      showAlert("Username can only contain letters and numbers.", "error");
      return;
    }

    if (regPassword.length < 6 || regPassword.length > 20) {
      showAlert("Password must be between 6 and 20 characters.", "error");
      return;
    }

    if (regPassword !== confirmPassword) {
      showAlert("Passwords do not match!", "error");
      return;
    }

    if (users.find((user) => user.username === regUsername)) {
      showAlert("Username already taken!", "error");
      return;
    }

    setUsers([...users, { username: regUsername, password: regPassword }]);
    showAlert(`User "${regUsername}" successfully registered.`, "success");

    setRegUsername("");
    setRegPassword("");
    setConfirmPassword("");
    setFlipped(false);
  };

  return (
    <div className="auth-page">
      {/* Display alert message if it exists */}
      {alert && (
        <CustomAlert
          message={alert.message}
          type={alert.type}
        />
      )}
      {/* Card with login and registration form (flips as needed) */}
      <div className={`card ${flipped ? "flipped" : ""}`}>
        {/* Login form */}
        <form className="form-container front" onSubmit={handleLoginSubmit}>
          <h1>CTK Shop</h1>
          <input
            type="text"
            placeholder="Username"
            required
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <div className="button-group">
            <button type="submit" className="button is-primary">
              <span>Sign In</span>
            </button>
            <button type="button" className="button is-secondary" onClick={flipCard}>
              <span>Register</span>
            </button>
          </div>
        </form>

        {/* Registration form */}
        <form className="form-container back" onSubmit={handleRegisterSubmit}>
          <h1>New registration</h1>
          <input
            type="text"
            placeholder="Username"
            required
            value={regUsername}
            onChange={(e) => setRegUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={regPassword}
            onChange={(e) => setRegPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className="button-group">
            <button type="submit" className="button is-primary">
              <span>Register</span>
            </button>
            <button type="button" className="button is-secondary" onClick={flipCard}>
              <span>Back</span>
            </button>
          </div>
        </form>
      </div>
      {/* Page footer */}
      <Footer />
    </div>
  );
};