import { Sidebar } from "./../Sidebar/Sidebar";

export function Layout({ children }) {
  return (
    <>
      <Sidebar />
      <div className="content">{children}</div>
    </>
  );
}
