import { createBrowserRouter, redirect } from "react-router-dom";
import BaseLayout from "../views/BaseLayout";
import HomePage from "../views/HomePage";


const router = createBrowserRouter([
    {
        path: "*",
        loader: async () => {
            return redirect('/')
        },
    },
    {
        element: <BaseLayout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            }
        ]
    }
]);

export default router;