import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <p>Hi</p>,
        errorElement: <p>Error</p>,
        children: [],
    },
]);

export default router;
