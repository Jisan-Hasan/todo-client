import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Login/Signup";
import AddTask from "../Pages/AddTask/AddTask";
import MyTask from "../Pages/MyTask/MyTask";
import CompletedTask from "../Pages/CompletedTask/CompletedTask";
import PrivateRoute from "./PrivateRoute";
import Home from "../Pages/Home/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <p>Error</p>,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
            {
                path: "/addTask",
                element: (
                    <PrivateRoute>
                        <AddTask />
                    </PrivateRoute>
                ),
            },
            {
                path: "/myTask",
                element: (
                    <PrivateRoute>
                        <MyTask />
                    </PrivateRoute>
                ),
            },
            {
                path: "/completedTask",
                element: (
                    <PrivateRoute>
                        <CompletedTask />
                    </PrivateRoute>
                ),
            },
        ],
    },
]);

export default router;
