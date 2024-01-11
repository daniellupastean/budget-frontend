import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AccountsPage } from "./pages/AccountsPage";

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
    element: <AccountsPage />,
  },
]);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
