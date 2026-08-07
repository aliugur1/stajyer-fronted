import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Pumps from "./pages/Pumps";
import Customers from "./pages/Customers";
import Users from "./pages/Users";
import PumpDetails from "./components/Pumps/PumpDetails";
import CustomerDetails from "./components/Customers/CustomerDetails";
import CurrentCustomer from "./components/Customers/CurrentCustomer";
import NewCustomer from "./components/Customers/NewCustomer";
import CurrentUser from "./components/User/CurrentUser";
import ChangePassword from "./components/User/ChangePassword";
import { ProtectedRoute, PublicRoute } from "./hooks/useProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/pumps"
          element={
            <ProtectedRoute>
              <Pumps />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pumps/:id"
          element={
            <ProtectedRoute>
              <PumpDetails />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <Customers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customers/newCustomer"
          element={
            <ProtectedRoute>
              <NewCustomer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customers/:id"
          element={
            <ProtectedRoute>
              <CustomerDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customers/:id/current"
          element={
            <ProtectedRoute>
              <CurrentCustomer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/profile"
          element={
            <ProtectedRoute>
              <CurrentUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/change"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
