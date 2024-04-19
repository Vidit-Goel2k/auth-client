import { useContext, useEffect } from "react";
import { AuthContext } from "../utils/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Logout = () => {
  const { logout } = useContext(AuthContext);
  
  useEffect(() => {
    const handleLogout = async () => {
      // Perform logout logic
      await logout();
      // Show toast notification after logout
      toast.success("Logged out successfully!");
    };

    handleLogout();
  }, [logout]);

  return (
    <div className="flex items-center justify-center h-screen">Logging Out...</div>
  );
};

export default Logout;
