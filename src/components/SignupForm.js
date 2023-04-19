import classes from "./Form.module.css";
import { useNavigate, json } from "react-router-dom";
import { useRef } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const SignupForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const cancelHandler = () => {
    navigate("/");
  };

  const signupHandler = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      
    console.log(response);
    } catch (error) {
      console.log(error);
    }


    return navigate("/dashboard");

  };

  return (
    <>
      <form onSubmit={signupHandler} method="POST" className={classes.form}>
        {" "}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" name="email" ref={emailRef} required />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="text"
            name="password"
            ref={passwordRef}
            required
          />
        </p>
        <div className={classes.actions}>
          <button>Signup</button>
          <button onClick={cancelHandler}>Cancel</button>
        </div>
      </form>
    </>
  );
};

export default SignupForm;
