import { ResizableBox } from "react-resizable";
import "./Sidebar.scss";
import "react-resizable/css/styles.css";

export const Sidebar = () => {
  return (
    <ResizableBox
      className="sidebar"
      width={300}
      axis="x"
      minConstraints={[200, 500]}
      maxConstraints={[500, 500]}
    ></ResizableBox>
  );
};
