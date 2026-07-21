import SideBar from "./SideBar";
import "../Styles/layout.css";

function Layout({ children }) {
  return (
    <div className="layout-container">
      {/* SideBar */}
      <SideBar />

      {/* Main Content */}
      <main className="layout-content">
        {children}
      </main>
    </div>
  );
}

export default Layout;