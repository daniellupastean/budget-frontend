import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Accounts } from "./pages/Accounts/Accounts";
import { AccountDetails } from "./pages/AccountDetails/AccountDetails";
import { Sidebar } from "./components/Sidebar/Sidebar";
import "./main.scss";
import { CreateAccount } from "./pages/CreateAccount/CreateAccount";
import { Home } from "./pages/Home/Home";
import { Layout } from "./components/Layout/Layout";
import Login from "./pages/Login/Login";

const root = createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <div>Register Page</div>,
  },
  {
    path: "/accounts",
    element: (
      <Layout>
        <Accounts />
      </Layout>
    ),
  },
  {
    path: "/accounts/create",
    element: (
      <Layout>
        <CreateAccount />
      </Layout>
    ),
  },
  {
    path: "/accounts/:id",
    element: (
      <Layout>
        <AccountDetails />
      </Layout>
    ),
  },
  {
    path: "/transactions",
    element: <Layout>Transactions</Layout>,
  },
]);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
