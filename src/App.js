import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import ErrorPage from "./pages/ErrorPage";
import { useState } from "react";
import UserContext from "./store/user-context";
import ModalContext from "./store/modal-context";
import AddtaskPage from "./pages/AddtaskPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
        children:[
          {
            path:"add",
            element: <AddtaskPage />
          }
        ]
      },  
    ],
  },
]);
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [showModal, setShowModal]= useState(false);
  
  return (
    <ModalContext.Provider value={{showModal, setShowModal}}>
      <UserContext.Provider
        value={{
          isLoggedIn,
          setIsLoggedIn,
          authUser,
          setAuthUser,
        }}
      >
        <RouterProvider router={router} />
      </UserContext.Provider>
    </ModalContext.Provider>
  );
}

export default App;
