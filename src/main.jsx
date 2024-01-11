import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Accounts } from "./pages/Accounts/Accounts";
import { AccountDetails } from "./pages/AccountDetails/AccountDetails";
import "./main.scss";

const root = createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Home Page</div>,
  },
  {
    path: "/login",
    element: <div>Login Page</div>,
  },
  {
    path: "/register",
    element: <div>Register Page</div>,
  },
  {
    path: "/accounts",
    element: <Accounts />,
  },
  {
    path: "/accounts/:id",
    element: <AccountDetails />,
  },
]);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
