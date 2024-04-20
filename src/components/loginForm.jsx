import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../utils/AuthContext";

axios.defaults.withCredentials = true

const LoginForm = () => {
	const { isLoggedIn, login } = useContext(AuthContext);
	const navigate = useNavigate();
	isLoggedIn && navigate('/user')
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [showPassword, setShowPassword] = useState(false);
	const [allowSubmit, setAllowSubmit] = useState(false);

	useEffect(() => {
		if (formData.email.length >= 1 && formData.password.length >= 1) {
			setAllowSubmit(true);
		} else {
			setAllowSubmit(false);
		}
	}, [formData]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleTogglePassword = () => {
		setShowPassword(!showPassword);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { email, password } = formData;
		try {
			const response = await axios.post("https://mern-auth-server.viditgoel.com/api/login", {
				email,
				password,
			});
			if (response.data.success) {
				toast.success("Login successful");
				login()
				navigate("/user");
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			if (
				error.response &&
				error.response.data &&
				error.response.data.message
			) {
				// Handle server error with specific error message
				toast.error(error.response.data.message);
			} else {
				// Handle unexpected error
				console.error("An unexpected error occurred:", error);
				toast.error("An unexpected error occurred. Please try again later.");
			}
		}
	};

	return (
		<div className="flex items-center justify-center h-screen">
			<form
				onSubmit={handleSubmit}
				className="px-8 pt-6 pb-8 mb-4 rounded shadow-md bg-slate-300"
			>
				<div className="mb-4">
					<label
						className="block mb-2 text-sm font-bold text-gray-700"
						htmlFor="email"
					>
						Email Address
					</label>
					<input
						className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
						id="email"
						type="email"
						placeholder="Email Address"
						name="email"
						value={formData.email}
						onChange={handleChange}
					/>
				</div>
				<div className="relative mb-6">
					<label
						className="block mb-2 text-sm font-bold text-gray-700"
						htmlFor="password"
					>
						Password
					</label>
					<input
						className="w-full px-3 py-2 pr-10 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
						id="password"
						type={showPassword ? "text" : "password"}
						placeholder="******************"
						name="password"
						value={formData.password}
						onChange={handleChange}
					/>
					<button
						className="absolute right-0 mt-2 mr-4 transform -translate-y-1/2 top-1/2 focus:outline-none"
						onClick={handleTogglePassword}
						type="button"
					>
						{showPassword ? <BiHide /> : <BiShow />}
					</button>
				</div>
				<div className="flex items-center justify-between">
					<button
						className={`${allowSubmit ? "bg-blue-500" : "bg-gray-500"} ${allowSubmit ? "hover:bg-blue-700" : "hover:bg-gray-700"} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${!allowSubmit && "cursor-not-allowed"}`}
						type="submit"
						disabled={!allowSubmit}
					>
						Login
					</button>
				</div>
			</form>
		</div>
	);
};

export default LoginForm;
