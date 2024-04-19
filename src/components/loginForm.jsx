import { useEffect, useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";

const LoginForm = () => {
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
					>
						{showPassword ? <BiHide /> : <BiShow />}
					</button>
				</div>
				<div className="flex items-center justify-between">
					<button
						className={`bg-${allowSubmit ? "blue" : "gray"}-500 hover:bg-${
							allowSubmit ? "blue" : "gray"
						}-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
							!allowSubmit && "cursor-not-allowed"
						}`}
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
