import Modal from "./UI/Modal";
import { useContext, useState } from "react";
import classes from './MainNavigation.module.css';
import ModalContext from "../store/modal-context";
const TaskNavigation = () => {

    const {showModal, setShowModal}= useContext(ModalContext);

    const addTaskHandler=() =>{
        setShowModal(true);
    }

    
  return (
    <>
    
      <button className={classes.button} onClick={addTaskHandler}>Add Task</button>
      {showModal && <Modal/>}
    </>
  );
};

export default TaskNavigation;
