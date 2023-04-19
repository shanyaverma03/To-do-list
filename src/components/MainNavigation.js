import classes from './MainNavigation.module.css';
import { useContext } from 'react';
import UserContext from "../store/user-context";
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
const MainNavigation= () =>{
    const {isLoggedIn, setIsLoggedIn}= useContext(UserContext);
const navigate= useNavigate();
    
  const signOutHandler = async () => {
    const response = signOut(auth);
    console.log("signed out");
    //setTaskList([])
    setIsLoggedIn(false);
    navigate("/");
  };
    console.log(isLoggedIn)
    return (
        <header className={classes.header}>
            <h1>TO-DO LIST</h1>
            {isLoggedIn && <button className={classes.button} onClick={signOutHandler}>Sign Out</button>}
        </header>
    )
}
export default MainNavigation;