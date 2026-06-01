import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogIn } from "lucide-react";
import { setCredentials } from "../features/auth/authSlice";
import { useLoginMutation } from "../services/apiSlice";
import { getErrorMessage } from "../utils/errors";

function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [login, { isLoading }] = useLoginMutation();
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    try {
      const user = await login(form).unwrap();
      dispatch(setCredentials(user));
      const fallbackPath = user.role === "admin" ? "/admin" : "/events";
      navigate(location.state?.from?.pathname || fallbackPath);
    } catch (error) {
      setErrorMessage(getErrorMessage(error, "Login failed"));
    }
  };

  return (
    <section className="auth-page container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <p className="eyebrow">Welcome back</p>
        <h1>Log in to Eventify</h1>

        {errorMessage && <p className="alert error">{errorMessage}</p>}

        <label>
          Email
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="primary-button full-button" disabled={isLoading}>
          <LogIn size={18} />
          {isLoading ? "Logging in..." : "Log in"}
        </button>

        <p className="auth-switch">
          New to Eventify? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </section>
  );
}

export default LoginPage;
