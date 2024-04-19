import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { AuthProvider } from "./utils/AuthContext";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
		<AuthProvider value={{ isLoggedIn, setIsLoggedIn }}>
			<div className="bg-slate-200">
				<Navbar />
				<Outlet />
				<ToastContainer position="bottom-right" />
			</div>
		</AuthProvider>
	);
}

export default App;
