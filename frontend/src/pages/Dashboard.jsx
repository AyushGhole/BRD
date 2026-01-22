import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiBriefcase } from "react-icons/fi";
import api from "../api/axios";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Dashboard = ({ stopLoading, showSnackbar }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("https://jsonplaceholder.typicode.com/users");
      setUsers(res.data);
    } catch {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    stopLoading?.();
    showSnackbar?.("Welcome to your dashboard", "success");
    fetchUsers();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorState message={error} retry={fetchUsers} />;

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Users</h1>
        <p className="text-sm text-gray-500">Overview of registered users</p>
      </div>

      {/* Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 cursor-pointer sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <motion.div
            key={user.id}
            variants={cardVariants}
            whileHover={{ y: -6 }}
            className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 overflow-hidden">
            {/* Gradient Accent */}
            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-indigo-500 to-purple-500" />

            {/* Avatar */}
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg">
                {user.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  {user.name}
                </h3>
                <p className="text-xs text-gray-400">@{user.username}</p>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <FiMail className="text-indigo-500" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiBriefcase className="text-purple-500" />
                <span>{user.company.name}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
};

export default Dashboard;
