import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./pages/Navbar";
import ProtectedRoute from "./auth/ProtectedRoute";
import FullscreenLoader from "./components/FullscreenLoader";
import AppSnackbar from "./components/AppSnackbar";
import "./App.css";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [loaderText, setLoaderText] = useState("");

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleLogout = () => {
    setLoading(true);
    setLoaderText("Logging out...");

    showSnackbar("Logged out successfully", "success");

    setTimeout(() => {
      localStorage.clear();
      setLoading(false);
      window.location.href = "/";
    }, 1200);
  };

  return (
    <BrowserRouter>
      {loading && <FullscreenLoader text={loaderText} />}

      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />

      <Routes>
          <Route path="/" element={ <Login
              onLoginStart={setLoading}
              setText={setLoaderText}
              showSnackbar={showSnackbar}
            />} />
        <Route
          path="/login"
          element={
            <Login
              onLoginStart={setLoading}
              setText={setLoaderText}
              showSnackbar={showSnackbar}
            />
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Navbar onLogout={handleLogout} />
              <Dashboard
                stopLoading={() => setLoading(false)}
                showSnackbar={showSnackbar}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
