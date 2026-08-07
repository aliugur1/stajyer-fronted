export const API_URL = "http://localhost:3000";

export async function api(path, options = {}) {
  const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const body = await response.json();
  if (!response.ok) {
    if (response.status === 401) {
      //burada korumalı sayfayı kontrol ediyor
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("user");
      window.location.href = "/";
    }

    throw body;
  }
  return body;
}
