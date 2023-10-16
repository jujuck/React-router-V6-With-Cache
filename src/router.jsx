import { createBrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import UserConnected from "./layouts/UserConnected";


const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  UserConnected
]);

export default router;