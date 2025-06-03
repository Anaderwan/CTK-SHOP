import { useRef } from "react";

type RegisterProps = {
  callback: (username: string, password: string, confirmPassword: string) => void;
};

const Register: React.FC<RegisterProps> = ({callback}) => {
    const inpUser = useRef<HTMLInputElement>(null);
    const inpPass = useRef<HTMLInputElement>(null);
    const inpPassConf = useRef<HTMLInputElement>(null);
  
    const handleSignUp = () => {
      if (inpUser.current && inpPass.current  && inpPassConf.current){
        if(inpPass.current.value === inpPassConf.current.value){
            const username = inpUser.current.value;
            const password = inpPass.current.value;
            const confirmPassword = inpPassConf.current.value;
            callback(username, password, confirmPassword);
        }else{
            alert("passwords don't match")
        }
      }
      else{
        alert('Sva polja moraju biti popunjenja')
      }
    }
  
    return (
      <div className="logInField">
        <h3>Registration form</h3>
        <input ref={inpUser} className="inp" type="text" placeholder="Username" /><br />
        <input ref={inpPass} className="inp" type="password" placeholder="Password" /><br />
        <input ref={inpPassConf} className="inp" type="password" placeholder="Confirm Password" /><br />
        <button onClick={handleSignUp}>Sign Up</button>
      </div>
    );

}

export default Register;