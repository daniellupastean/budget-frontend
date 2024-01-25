import { ResizableBox } from "react-resizable";
import { Link } from "react-router-dom";
import "./Sidebar.scss";
import "react-resizable/css/styles.css";

export const Sidebar = () => {
  return (
    <ResizableBox className="sidebar" width={300} axis="x" minConstraints={[200, 500]} maxConstraints={[500, 500]}>
      <Link to={"/"} className="app-name">
        Budget Manager
      </Link>

      <div className="nav-items">
        <Link to={"/"}>Dashboard</Link>
        <Link to={"/accounts"}>Bank Accounts</Link>
        <Link to={"/transactions"}>Transactions</Link>
        <Link to={"/"}></Link>
      </div>
    </ResizableBox>
  );
};
