import Sidebar from "./Sidebar";
import "../styles/layout.css";

function Layout({ children }) {
  return (
    <div className="layout-container">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="layout-content">
        {children}
      </main>
    </div>
  );
}

export default Layout;