import { useState } from "react";
import {
  useNavigate
} from "react-router-dom";
import {
  loginUser
} from "../services/authService";
import { useAuth } from "../context/AuthContext";

function AdminLogin() {

  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const data =
        await loginUser({
          email,
          password
        });

      if (data.user?.role !== "admin") {

        alert(
          "You are not an admin"
        );

        return;
      }

      login(data.user);

      navigate("/admin/dashboard");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Admin login failed"
      );

    }
  };

  return (
    <div className="auth-page">

      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >

        <h1>
          Admin Login
        </h1>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

        <button
          className="btn"
          type="submit"
        >
          Login as Admin
        </button>

      </form>

    </div>
  );
}

export default AdminLogin;