import React, { useRef} from "react";
import ErrorMessage from "../toaster/ErrorMessage";

type RegisterProps = {
  makeAcc: (username: string, password: string, confirmPassword: string) => void;
  error?: string | null;
};

const Register: React.FC<RegisterProps> = ({ makeAcc, error }) => {
  const inpUser = useRef<HTMLInputElement>(null);
  const inpPass = useRef<HTMLInputElement>(null);
  const inpPassConf = useRef<HTMLInputElement>(null);

  const handleSignUp = () => {
    const username = inpUser.current?.value.trim();
    const password = inpPass.current?.value.trim();
    const confirmPassword = inpPassConf.current?.value.trim();

    if (!username || !password || !confirmPassword) {
    return makeAcc('', '', ''); // Will trigger parent error state
    }

    if (password !== confirmPassword) {
    return makeAcc(username, password, ''); // Triggers mismatch error
    }

makeAcc(username, password, confirmPassword);
    makeAcc(username, password, confirmPassword);

    if (inpUser.current) inpUser.current.value = "";
    if (inpPass.current) inpPass.current.value = "";
    if (inpPassConf.current) inpPassConf.current.value = "";
  };

  return (
    <div className="login-container box">
      <h3 className="title is-4 has-text-centered">Register</h3>

      {error && <ErrorMessage type="error" message={error} />}

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