import { BrowserRouter,Routes,Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Assignments from "./pages/Assignments";
import Payments from "./pages/Payments";
import Certificates from "./pages/Certificates";
import ProtectedRoute from "./components/ProtectedRoute";

function App(){
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
      <Route path="/courses" element={<ProtectedRoute><Courses/></ProtectedRoute>}/>
      <Route path="/assignments" element={<ProtectedRoute><Assignments/></ProtectedRoute>}/>
      <Route path="/payments" element={<ProtectedRoute><Payments/></ProtectedRoute>}/>
      <Route path="/certificates" element={<ProtectedRoute><Certificates/></ProtectedRoute>}/>
      </Routes>
      </BrowserRouter>
  );
}
export default App;