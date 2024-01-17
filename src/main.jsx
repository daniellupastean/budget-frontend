import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Accounts } from "./pages/Accounts/Accounts";
import { AccountDetails } from "./pages/AccountDetails/AccountDetails";
import { Sidebar } from "./components/Sidebar/Sidebar";
import "./main.scss";
import { CreateAccount } from "./pages/CreateAccount/CreateAccount";

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
    path: "/accounts/create",
    element: <CreateAccount />,
  },
  {
    path: "/accounts/:id",
    element: <AccountDetails />,
  },
]);

root.render(
  <StrictMode>
    <Sidebar />
    <div className="content">
      <RouterProvider router={router} />
    </div>
  </StrictMode>
);
