import classes from "./Form.module.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginForm = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef= useRef();

  const cancelHandler = () => {
    navigate("/");
  };

  const loginSubmitHandler = async (event) => {
    event.preventDefault();
    const email= emailRef.current.value;
    const password= passwordRef.current.value;
    try{

        const response= await signInWithEmailAndPassword(auth,email, password);
        
    console.log(response);
    } catch(error){
        console.log(error);
    }

    return navigate('/dashboard');
  };
  return (
    <>
      <form onSubmit={loginSubmitHandler} className={classes.form}>
        {" "}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" name="email" ref={emailRef} required />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input id="password" type="text" name="password" ref={passwordRef} required />
        </p>
        <div className={classes.actions}>
          <button>Login</button>
          <button onClick={cancelHandler}>Cancel</button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
