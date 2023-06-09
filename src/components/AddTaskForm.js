import classes from "./AddTaskForm.module.css";
import Dropdown from "./UI/Dropdown";
import { useContext, useRef, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import UserContext from "../store/user-context";
import ModalContext from "../store/modal-context";
import { useNavigate } from "react-router-dom";

const AddTaskForm = (props) => {
  const titleRef = useRef();
  const { authUser } = useContext(UserContext);
  const { setShowModal } = useContext(ModalContext);
  const [status, setStatus] = useState("incomplete");

  const navigate = useNavigate();
  const addTaskHandler = async () => {
    const title = titleRef.current.value;
    console.log(title);
    const id = authUser.uid;
    console.log(id);
    const docRef = await addDoc(collection(db, "tasks"), {
      userId: id,
      item: title,
      isCompleted: status === "completed" ? true : false,
    });
    console.log(docRef.id);
    
    //get real time snapshot
    // const dbRef = collection(db, "tasks");

    // onSnapshot(dbRef, (docsSnap) => {
    //   docsSnap.forEach((doc) => {
    //     console.log(doc.data());
    //   });
    // });



  };

  const submitHandler = (event) => {
    event.preventDefault();
    setShowModal(false);
    navigate("/dashboard");
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      {" "}
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required ref={titleRef} />
      </p>
      <Dropdown status={status} setStatus={setStatus} />
      <div className={classes.actions}>
        <button onClick={addTaskHandler}>Add Task</button>
      </div>
    </form>
  );
};

export default AddTaskForm;
