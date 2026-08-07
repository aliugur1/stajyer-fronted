import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/ApiKey";

export function useLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const login = async (rememberMe) => {
    setLoading(true);
    setError("");
    try {
      const result = await api("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      if (result.success) {
        //burada başarılı ise token aktif ediyoruz
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem("accessToken", result.data.accessToken);
        storage.setItem("user", JSON.stringify(result.data.user));
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return { email, setEmail, password, setPassword, error, loading, login };
}

export default useLogin;
