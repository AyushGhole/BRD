import { Button } from "@mui/material";
import { FiLogOut, FiUsers } from "react-icons/fi";

const Navbar = ({ onLogout }) => {
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2 font-semibold text-lg">
        <FiUsers className="text-indigo-600" />
        User Dashboard
      </div>
      <Button
        onClick={() => {
          setTimeout(() => {
            onLogout();
          }, 1000);
        }}
        variant="outlined"
        color="error"
        startIcon={<FiLogOut />}>
        Logout
      </Button>
    </header>
  );
};

export default Navbar;
