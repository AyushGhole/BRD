import { useState } from "react";
import { TextField, Button, Alert } from "@mui/material";
import { motion } from "framer-motion";
import { FiLogIn, FiUserPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Login = ({ onLoginStart, setText, showSnackbar }) => {
  const [mode, setMode] = useState("login"); // 🔥 login | signup
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = mode === "login" ? "/auth/login" : "/auth/register";

      const res = await api.post(endpoint, form);

      // After signup → auto login
      localStorage.setItem("token", res.data.token);

      onLoginStart(true);
      setText(mode === "login" ? "Logging in..." : "Creating account...");

      setTimeout(() => {
        navigate("/dashboard");

        showSnackbar(
          mode === "login"
            ? "Logged in successfully"
            : "Account created successfully",
          "success",
        );
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      showSnackbar(
        err.response?.data?.message || "Authentication failed",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-3 h-12 w-12 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
            {mode === "login" ? (
              <FiLogIn size={22} />
            ) : (
              <FiUserPlus size={22} />
            )}
          </div>

          <h1 className="text-2xl font-bold text-gray-800">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            {mode === "login"
              ? "Sign in to continue to your dashboard"
              : "Sign up to get started"}
          </p>
        </div>

        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            sx={{
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
            required
          />

          <Button
            fullWidth
            type="submit"
            size="large"
            disabled={loading}
            sx={{
              mt: 1,
              py: 1.4,
              fontWeight: "bold",
              background: "linear-gradient(90deg, #c0c1e9, #8b5cf6)",
            }}>
            {loading
              ? mode === "login"
                ? "Signing in..."
                : "Creating account..."
              : mode === "login"
                ? "Login"
                : "Sign Up"}
          </Button>
        </form>

        {/* Toggle */}
        <p className="text-center text-sm text-gray-500 mt-6">
          {mode === "login" ? (
            <>
              Don’t have an account?{" "}
              <button
                onClick={() => {
                  setMode("signup");
                  setError("");
                }}
                className="text-indigo-600 cursor-pointer font-medium hover:underline">
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => {
                  setMode("login");
                  setError("");
                }}
                className="text-indigo-600 cursor-pointer font-medium hover:underline">
                Login
              </button>
            </>
          )}
        </p>

        {/* Demo */}
        {mode === "login" && (
          <p className="text-center text-xs text-gray-400 mt-2">
            Or Use Demo:
            <b>
              {" "}
              <span className="font-medium">Admin / Admin@123</span>
            </b>
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default Login;
