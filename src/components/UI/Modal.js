import { useContext } from "react";
import AddTaskForm from "../AddTaskForm";
import classes from "./Modal.module.css";
import ModalContext from "../../store/modal-context";
const Modal = (props) => {

  const {setShowModal}= useContext(ModalContext);
  return (
    <div className={classes.modalBackground}>
      <div className={classes.modalContainer}>
        <div className={classes.titleClose}>
          <button className={classes.titleCloseBtn} onClick={()=> setShowModal(false)}> X </button>
        </div>
        <div className={classes.title}>
          <h1>Add new task</h1>
        </div>
        <div className={classes.body}></div>
        <AddTaskForm/>

        <div className={classes.footer}>
          <button className={classes.footerBtn} onClick={()=> setShowModal(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};
export default Modal;
