import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const loginClickHandler = () => {
		setIsLoggedIn((prev) => !prev);
	};

	return (
		<div className="flex items-center justify-between py-2 bg-slate-400 shadow-lg px-14">
            <h1 className="text-2xl">eMounting Mern Auth</h1>
			<div>
				<ul className="flex items-center">
					<li className="px-4">
						<Link to="/">Home</Link>
					</li>
					{/* <li className="px-4">
						<Link to="/about">About Us</Link>
					</li>
					<li className="px-4">
						<Link to="/contact">Contact Us</Link>
					</li> */}
                    {!isLoggedIn && 
                        <li className="px-4">
                            <Link to="/signup">Signup</Link>
                        </li>
                    }
                    {!isLoggedIn && 
                        <button onClick={loginClickHandler}>
                            <li className="px-4">
                                <Link to="/login">Login</Link>
                            </li>
                        </button>
                    }
                    {isLoggedIn && 
                        <button onClick={loginClickHandler}>
                            <li className="px-4">
                                <Link to="/logout">Logout</Link>
                            </li>
                        </button>
                    }
					{isLoggedIn && <li className="px-4 font-bold">userName</li>}
				</ul>
			</div>
		</div>
	);
};

export default Navbar;
