import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const token =
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) navigate("/");
  }, [token,navigate]);

  return token ? children : null;
}

export function PublicRoute({ children }) {
  const navigate = useNavigate();
  const token =
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("accessToken");

  useEffect(() => {
    if (token) navigate("/dashboard");
  }, [token,navigate]);

  return token ? null : children;
}
