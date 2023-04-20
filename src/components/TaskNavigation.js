import Modal from "./UI/Modal";
import { useContext, useState } from "react";
import classes from './MainNavigation.module.css';
import ModalContext from "../store/modal-context";
import { Link } from "react-router-dom";
const TaskNavigation = () => {

    const {showModal, setShowModal}= useContext(ModalContext);

    const addTaskHandler=() =>{
        setShowModal(true);
    }

    
  return (
    <>
    
      <Link to="add" className={classes.button} onClick={addTaskHandler}>Add Task</Link>
      {showModal && <Modal/>}
    </>
  );
};

export default TaskNavigation;
