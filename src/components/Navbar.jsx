import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";

const Navbar = () => {
	const { isLoggedIn } = useContext(AuthContext);

	return (
		<div className="flex items-center justify-between py-2 shadow-lg bg-slate-400 px-14">
			<h1 className="text-2xl">eMounting Mern Auth</h1>
			<div>
				<ul className="flex items-center">
					<li className="px-4">
						<Link to="/">Home</Link>
					</li>
					{!isLoggedIn && (
						<li className="px-4">
							<Link to="/signup">Signup</Link>
						</li>
					)}
					{!isLoggedIn && (
						<li className="px-4">
							<Link to="/login">Login</Link>
						</li>
					)}
					{isLoggedIn && (
						<li className="px-4">
							<Link to="/logout">Logout</Link>
						</li>
					)}
				</ul>
			</div>
		</div>
	);
};

export default Navbar;
