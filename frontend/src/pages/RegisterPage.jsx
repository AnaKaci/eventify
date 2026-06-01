import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserPlus } from "lucide-react";
import { setCredentials } from "../features/auth/authSlice";
import { useRegisterMutation } from "../services/apiSlice";
import { getErrorMessage } from "../utils/errors";

function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student"
  });
  const [register, { isLoading }] = useRegisterMutation();
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    try {
      const user = await register(form).unwrap();
      dispatch(setCredentials(user));
      navigate(user.role === "admin" ? "/admin" : "/events");
    } catch (error) {
      setErrorMessage(getErrorMessage(error, "Registration failed"));
    }
  };

  return (
    <section className="auth-page container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <p className="eyebrow">Join Eventify</p>
        <h1>Create your account</h1>

        {errorMessage && <p className="alert error">{errorMessage}</p>}

        <label>
          Name
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Email
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            minLength="6"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Role
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        </label>

        <button type="submit" className="primary-button full-button" disabled={isLoading}>
          <UserPlus size={18} />
          {isLoading ? "Creating..." : "Create account"}
        </button>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </section>
  );
}

export default RegisterPage;
