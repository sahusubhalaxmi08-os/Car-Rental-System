import { useState } from "react";
import {
  Link,
  useNavigate
} from "react-router-dom";
import {
  registerUser
} from "../services/authService";
import { useAuth } from "../context/AuthContext";

function Register() {

  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      phone: "",
      password: ""
    });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const data =
        await registerUser(formData);

      login(data.user);

      navigate("/");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="auth-page">

      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >

        <h1>
          Create Account
        </h1>

        <input
          name="name"
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          type="text"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="btn"
          disabled={loading}
        >
          {loading
            ? "Creating..."
            : "Register"}
        </button>

        <p>
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Register;