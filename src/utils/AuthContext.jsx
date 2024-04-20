import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthContext = createContext();

const useAuthNavigate = () => {
	return useNavigate();
};

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
	const navigate = useAuthNavigate(); // Using the custom hook

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const login = () => {
		setIsLoggedIn(true);
	};

	const logout = async () => {
		try {
			await axios.post("https://mern-auth-server.viditgoel.com/api/logout");
			setIsLoggedIn(false);
			toast.success("Logged out successfully!");
			navigate("/login");
		} catch (error) {
      console.log(error)
			console.error("Logout failed:", error.response.data.message);
			toast.error("Logout failed. Please try again.");
		}
	};

	return (
		<AuthContext.Provider value={{ isLoggedIn, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthProvider, AuthContext };
