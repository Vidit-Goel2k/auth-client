import { useEffect, useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";

const SignupForm = () => {
	const [formData, setFormData] = useState({
		userName: "",
		email: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [isValidPassword, setIsValidPassword] = useState(false);
	const [isValidEmail, setIsValidEmail] = useState(false);
	const [isValidUserName, setIsValidUserName] = useState(false);
	const [allowSubmit, setAllowSubmit] = useState(false);

	useEffect(() => {
		setAllowSubmit(isValidUserName && isValidEmail && isValidPassword);
	}, [isValidUserName, isValidEmail, isValidPassword]);

	const handleTogglePassword = () => {
		setShowPassword((prev) => !prev);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});

		if (name === "userName") {
			setIsValidUserName(/^[a-zA-Z0-9_-]{3,20}$/.test(value));
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

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle form submission here
		console.log(formData);
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
						htmlFor="userName"
					>
						User Name
					</label>
					<input
						className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
							formData.userName && !isValidUserName
								? "border-red-500"
								: isValidUserName
								? "border-green-500"
								: ""
						}`}
						// className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
						id="userName"
						type="text"
						placeholder="User Name"
						name="userName"
						value={formData.userName}
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
						onClick={handleTogglePassword}
					>
						{showPassword ? <BiHide /> : <BiShow />}
					</button>
				</div>
				<div className="flex items-center justify-between">
					<button
						className={` bg-${allowSubmit ? "blue" : "gray"}-500 hover:bg-${allowSubmit ? "blue" : "gray"}-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${!allowSubmit && "cursor-not-allowed"}`}
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
