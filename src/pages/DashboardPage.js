import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import TaskItem from "../components/TaskItem";
import UserContext from "../store/user-context";
import TaskNavigation from "../components/TaskNavigation";

const DashboardPage = () => {
  //const [authUser, setAuthUser] = useState(null);
  const [taskList, setTaskList] = useState([]);
  const { setIsLoggedIn } = useContext(UserContext);
  const { authUser, setAuthUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const getTasks = async (id) => {
    //const data = await getDocs(tasksCollectionReference);

    const q = query(collection(db, "tasks"), where("userId", "==", id));
    const querySnapshot = await getDocs(q);
    const list = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots

      list.push({ ...doc.data(), id: doc.id });
      //console.log(list)
    });
    setTaskList(list);
    setIsLoading(false);
  };

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        // console.log(user.uid);
        setIsLoggedIn(true);

        getTasks(user.uid);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);

  let content = <p style={{ textAlign: "center" }}>Loading.. Please wait</p>;
  if (!isLoading) {
    if (taskList.length > 0) {
      content = (
        <>
          <TaskNavigation />
          {taskList.map((task) => (
            <TaskItem
              key={task.id}
              id={task.id}
              getTasks={getTasks}
              title={task.item}
              isCompleted={task.isCompleted}
              userId={task.userId}
              setIsLoading={setIsLoading}
            />
          ))}{" "}
        </>
      );
    } else {
      content = (
        <>
          <TaskNavigation />{" "}
          <h1 style={{ textAlign: "center" }}>No tasks found</h1>
        </>
      );
    }
  }
  return <>{authUser ? <>{content}</> : <h1>Please sign in first</h1>}</>;
};

export default DashboardPage;
