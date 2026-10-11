import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Logout from "./pages/Logout";

import ServiceManagement from "./pages/ServiceManagement";

import RequestService from "./pages/RequestService";
import RequestManagement from "./pages/RequestManagement";

import DocumentManagement from "./pages/DocumentManagement";

import ClientsManagement from "./pages/ClientsManagement";
import ProjectsManagement from "./pages/ProjectsManagement";
import ProjectDashboard from "./pages/ProjectDashboard";

import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Home */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* Authentication */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/logout"
          element={<Logout />}
        />

        {/* Dashboard */}

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

       

        <Route
          path="/service-management"
          element={
            <PrivateRoute>
              <ServiceManagement />
            </PrivateRoute>
          }
        />


        <Route
          path="/request-service"
          element={
            <PrivateRoute>
              <RequestService />
            </PrivateRoute>
          }
        />

        <Route
          path="/request-management"
          element={
            <PrivateRoute>
              <RequestManagement />
            </PrivateRoute>
          }
        />

        {/* Task 10 */}

        <Route
          path="/documents"
          element={
            <PrivateRoute>
              <DocumentManagement />
            </PrivateRoute>
          }
        />

        {/* Task 11 */}

        <Route
  path="/clients"
  element={
    <AdminRoute>
      <ClientsManagement />
    </AdminRoute>
  }
/>

<Route
  path="/projects"
  element={
    <AdminRoute>
      <ProjectsManagement />
    </AdminRoute>
  }
/>

        <Route
          path="/project-dashboard"
          element={
            <PrivateRoute>
              <ProjectDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;