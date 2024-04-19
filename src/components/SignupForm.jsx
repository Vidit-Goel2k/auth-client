import axios from "axios";
import { useEffect, useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupForm = () => {
	const navigate = useNavigate()
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [isValidPassword, setIsValidPassword] = useState(false);
	const [isValidEmail, setIsValidEmail] = useState(false);
	const [isValidUsername, setIsValidUsername] = useState(false);
	const [allowSubmit, setAllowSubmit] = useState(false);

	useEffect(() => {
		setAllowSubmit(isValidUsername && isValidEmail && isValidPassword);
	}, [isValidUsername, isValidEmail, isValidPassword]);

	const handleTogglePassword = () => {
		setShowPassword((prev) => !prev);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});

		if (name === "username") {
			setIsValidUsername(/^[a-zA-Z0-9_-]{3,20}$/.test(value));
		}
		if (name === "email") {
			setIsValidEmail(
				/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
			);
		}
		if (name === "password") {
			setIsValidPassword(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
					value
				)
			);
		}
	};

	const sendRequest = async () => {
		const { username, email, password } = formData;
		try {
			const res = await axios.post("http://localhost:5000/api/signup", {
				username,
				email,
				password
			});
			console.log(res.data); 
			return res.data;
		} catch (error) {
			console.error("There was an error in Signing Up. Please Try Again", error.response.data);
			throw error; // Rethrow the error to be caught by the caller
		}
	};
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const data = await sendRequest();
			if (data.success) {
				toast.success('User created successfully');
				navigate('/login');
			} else {
				toast.error(data.message);
				console.error("Signup was unsuccessful:", data.message);
			}
		} catch (error) {
			console.error("An unexpected error occurred:", error);
			toast.error('An unexpected error occurred. Please try again later.');
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
						htmlFor="username"
					>
						User Name
					</label>
					<input
						className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
							formData.username && !isValidUsername
								? "border-red-500"
								: isValidUsername
								? "border-green-500"
								: ""
						}`}
						// className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
						id="username"
						type="text"
						placeholder="User Name"
						name="username"
						value={formData.username}
						onChange={handleChange}
					/>
				</div>
				<div className="mb-4">
					<label
						className="block mb-2 text-sm font-bold text-gray-700"
						htmlFor="email"
					>
						Email Address
					</label>
					<input
						className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
							formData.email && !isValidEmail
								? "border-red-500"
								: isValidEmail
								? "border-green-500"
								: ""
						}`}
						// className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
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
						className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline pr-10 ${
							formData.password && !isValidPassword
								? "border-red-500"
								: isValidPassword
								? "border-green-500"
								: ""
						}`}
						// className="w-full px-3 py-2 pr-10 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
						id="password"
						type={showPassword ? "text" : "password"}
						placeholder="******************"
						name="password"
						value={formData.password}
						onChange={handleChange}
					/>
					<button
						className="absolute right-0 mt-2 mr-4 transform -translate-y-1/2 top-1/2 focus:outline-none"
						type="button"
						onClick={handleTogglePassword}
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
						Sign Up
					</button>
				</div>
			</form>
		</div>
	);
};

export default SignupForm;
