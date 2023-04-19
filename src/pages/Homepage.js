import { Link } from "react-router-dom";
import classes from './Homepage.module.css';
const HomePage=() =>{
    return <>
<section className={classes.details}>
    <Link to='login' className={classes.link}>Login</Link>
    <Link to='signup' className={classes.link}>Signup</Link>
    </section>
    </>
}

export default HomePage;