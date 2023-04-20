import classes from "./TaskItem.module.css";
import { db } from "../firebase";
import {
  updateDoc,
  doc,
  deleteDoc
} from "firebase/firestore";
import { useContext } from "react";
import UserContext from "../store/user-context";

const TaskItem = (props) => {
  const { authUser } = useContext(UserContext);
  const deleteTaskHandler = async () => {
    
    props.setIsLoading(true);
    const id = props.id;
    await deleteDoc(doc(db, "tasks", id));
    props.getTasks(authUser.uid);

  };

  const changeStatusHandler = async () => {
    props.setIsLoading(true);
    
    const id = props.id;
    try {
      const response = await updateDoc(doc(db, "tasks", id), {
        isCompleted: true,
      });
      console.log(response);
    } catch (error) {
      console.log("not changed");
      console.log(error);
    }
    props.getTasks(authUser.uid);
  };
  return (
    <article className={classes.task}>
      <h1>{props.title}</h1>
      <article className={classes.container}>
        <p>Status= {props.isCompleted.toString()}</p>
      </article>
      <menu className={classes.actions}>
        <button onClick={changeStatusHandler}>Mark Complete</button>
        <button onClick={deleteTaskHandler}>Delete</button>
      </menu>
    </article>
  );
};

export default TaskItem;
