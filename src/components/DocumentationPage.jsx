/* eslint-disable no-useless-escape */
/* eslint-disable react/no-unescaped-entities */
const DocumentationPage = () => {
	return (
		<>
			<div className="flex items-center justify-center p-4 bg-slate-200">
				<div className="max-w-6xl p-6 rounded-lg shadow-lg bg-slate-300">
					<h1
						className="mb-4 text-3xl font-bold text-center"
						id="mern-stack-authentication-system-documentation"
					>
						MERN Stack Authentication System Documentation
					</h1>
					<div className="p-4">
						<h2 className="mb-2 text-xl font-bold" id="overview">
							Overview
						</h2>
						<p className="mb-4">
							This documentation outlines the implementation and usage of a MERN
							(MongoDB, Express.js, React.js, Node.js) stack authentication
							system using JSON Web Tokens (JWT) and HTTPOnly cookies. The
							system provides functionality for user signup, login, user details
							retrieval, token refresh, logout, and real-time frontend input
							validation with an interactive UI featuring toast messages.
						</p>
					</div>
					<div className="p-4">
						<h2 className="mb-2 text-xl font-bold" id="technologies-used">
							Technologies Used
						</h2>
						<ul className="mb-2 list-disc list-inside">
							<li>MongoDB: A NoSQL database used for storing user data.</li>
							<li>
								Express.js: A web application framework for Node.js used for
								building the backend API.
							</li>
							<li>
								React.js: A JavaScript library used for building the frontend
								user interface.
							</li>
							<li>
								Node.js: A JavaScript runtime environment used for server-side
								scripting.
							</li>
							<li>
								JSON Web Tokens (JWT): A standard for securely transmitting
								information between parties.
							</li>
							<li>
								bcrypt: A password-hashing function used for encrypting user
								passwords.
							</li>
							<li>
								Axios: A promise-based HTTP client used for sending HTTP
								requests from the frontend.
							</li>
							<li>
								HTTPOnly Cookies: Cookies that are inaccessible to JavaScript,
								providing improved security.
							</li>
							<li>
								Tailwind CSS: A utility-first CSS framework used for styling the
								frontend.
							</li>
						</ul>
					</div>
					{/* //****************************************************************************************************************** */}
					<div className="p-4">
						<h2 className="mb-4 text-2xl font-bold" id="functionality">
							Functionality
						</h2>
						<h3 className="mb-2 text-xl font-bold" id="1-signup">
							1. Signup
						</h3>
						<p className="mb-2">
							Endpoint:{" "}
							<code className="p-1 rounded-md bg-slate-200">
								POST /api/signup
							</code>
						</p>
						<ul className="pl-6 mb-4 list-disc">
							<li>Allows users to create a new account.</li>
							<li>
								Requires the following fields in the request body:
								<ul className="pl-6 list-disc">
									<li>
										<code>username</code>: User's chosen username.
									</li>
									<li>
										<code>email</code>: User's email address.
									</li>
									<li>
										<code>password</code>: User's password.
									</li>
								</ul>
							</li>
							<li>
								Upon successful registration, the user's information is securely
								hashed and stored in the MongoDB database using bcrypt
								encryption.
							</li>
						</ul>
						<pre className="p-4 overflow-auto rounded-lg bg-slate-200">
							<code className="lang-javascript">
								{`const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Input validation
        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        // Password format validation 
        // Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ success: false, message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character, and be at least 8 characters long' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ success: true, message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = signup;
`}
							</code>
						</pre>
						<h3 className="my-2 text-xl font-bold" id="2-login">
							2. Login
						</h3>
						<p className="mb-2">
							Endpoint:{" "}
							<code className="p-1 rounded-md bg-slate-200">
								POST /api/login
							</code>
						</p>
						<ul className="pl-6 mb-4 list-disc">
							<li>Allows registered users to log in to their accounts.</li>
							<li>
								Requires the following fields in the request body:
								<ul className="pl-6 list-disc">
									<li>
										<code>email</code>: User's email address.
									</li>
									<li>
										<code>password</code>: User's password.
									</li>
								</ul>
							</li>
							<li>
								Upon successful login, a JWT token is generated and stored in an
								HTTPOnly cookie for authentication purposes.
							</li>
						</ul>
						<pre className="p-4 overflow-auto rounded-lg bg-slate-200">
							<code className="lang-javascript">
								{`const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Input validation
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        // Find user by email
        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30s' });

        // Set HTTP-only cookie with the token
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'lax', 
            maxAge: 35 * 1000, // 35 sec
            secure: true, // Uncomment in production if using HTTPS
        });

        // Respond with success message
        res.status(200).json({ success: true, message: 'Login successful' });
    } catch (error) {
        // Handle internal server error
        console.error('Error logging in user:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = login;
`}
							</code>
						</pre>
						<h3 className="mb-2 text-xl font-bold" id="3-user-details">
							3. User Details
						</h3>
						<p className="mb-2">
							Endpoint:{" "}
							<code className="p-1 rounded-md bg-slate-200">GET /api/user</code>
						</p>
						<ul className="pl-6 mb-4 list-disc">
							<li>
								Retrieves the details of the currently authenticated user.
							</li>
							<li>
								Requires the client to send the JWT token stored in the HTTPOnly
								cookie as an HTTP header for authentication.
							</li>
							<li>
								Returns user information such as email, username, or any other
								relevant details.
							</li>
						</ul>

						<h3 className="mb-2 text-xl font-bold" id="4-token-refresh">
							4. Token Refresh
						</h3>
						<p className="mb-2">
							Endpoint:{" "}
							<code className="p-1 rounded-md bg-slate-200">
								GET /api/refresh-token
							</code>
						</p>
						<ul className="pl-6 mb-4 list-disc">
							<li>Allows users to refresh their JWT token if it's expired.</li>
							<li>
								Requires the client to send the refresh token stored in the
								HTTPOnly cookie as an HTTP header.
							</li>
							<li>
								Generates a new JWT token and updates the HTTPOnly cookie with
								the new token.
							</li>
						</ul>
						<pre className="p-4 overflow-auto rounded-lg bg-slate-200">
							<code className="lang-javascript">
								{`const jwt = require("jsonwebtoken");

const extractTokenFromCookie = (cookieString) => {
	if (!cookieString) {
		return null;
	}

	// Split the cookie string by semicolons to get individual cookies
	const cookies = cookieString.split(";");

	// Find the cookie containing the token
	const tokenCookie = cookies.find((cookie) =>
		cookie.trim().startsWith("token=")
	);

	if (!tokenCookie) {
		return null;
	}

	// Extract the token from the cookie value
	const token = tokenCookie.split("=")[1];

	return token;
};

const refreshToken = (req, res, next) => {
	const prevCookie = req.headers.cookie;

	// Extract the previous token from cookies
	const prevToken = extractTokenFromCookie(prevCookie);

	// If no previous token found, return a 400 error
	if (!prevToken) {
		return res.status(400).json({ message: "Couldn't find token" });
	}

	// Verify the previous token
	jwt.verify(prevToken, process.env.JWT_SECRET, (err, decodedToken) => {
		if (err) {
			console.error("JWT verification error:", err);
			return res.status(403).json({ message: "Authentication failed" });
		}

		// Generate a new token with a shorter expiration
		const newToken = jwt.sign(
			{ userId: decodedToken.userId },
			process.env.JWT_SECRET,
			{
				expiresIn: "30s",
			}
		);

		// Set the new token as a cookie
		res.cookie("token", newToken, {
			path: "/",
			expires: new Date(Date.now() + 1000 * 35), // 35 seconds
			httpOnly: true,
			sameSite: "lax",
			secure: true,
		});

		next();
	});
};

module.exports = refreshToken;
`}
							</code>
						</pre>
						<h3 className="my-2 text-xl font-bold" id="5-logout">
							5. Logout
						</h3>
						<p className="mb-2">
							Endpoint:{" "}
							<code className="p-1 rounded-md bg-slate-200">
								POST /api/logout
							</code>
						</p>
						<ul className="pl-6 list-disc">
							<li>Logs out the currently authenticated user.</li>
							<li>
								Invalidates the JWT token stored in the HTTPOnly cookie, making
								it unusable for further authentication.
							</li>
							<li>
								Upon successful logout, the user is redirected to the login
								page.
							</li>
						</ul>
					</div>
					{/* //****************************************************************************************************************** */}
					<div className="p-4">
						<h2 className="mb-4 text-2xl font-bold" id="installation-and-setup">
							Installation and Setup
						</h2>
						<ol className="pl-6 list-decimal">
							<li className="mb-4">
								<p className="font-bold">Clone the Repository:</p>
								<pre className="p-4 overflow-auto rounded-lg bg-slate-200">
									<code className="lang-bash">
										git clone https://github.com/Vidit-Goel2k/auth-server.git
										<br />
										git clone https://github.com/Vidit-Goel2k/auth-client.git
									</code>
								</pre>
							</li>
							<li className="mb-4">
								<p className="font-bold">Backend Setup:</p>
								<ul className="pl-6 mb-4 list-disc">
									<li>
										Navigate to the backend directory:
										<pre>
											<code className="lang-bash">cd auth-server</code>
										</pre>
									</li>
									<li>
										Install dependencies:
										<pre>
											<code className="lang-bash">npm install</code>
										</pre>
									</li>
									<li>
										Set up MongoDB and configure the connection string in the{" "}
										<code>.env</code> file.
									</li>
									<li>
										Start the backend server:
										<pre>
											<code className="lang-bash">npm start</code>
										</pre>
									</li>
								</ul>
							</li>
							<li className="mb-4">
								<p className="font-bold">Frontend Setup:</p>
								<ul className="pl-6 list-disc">
									<li>
										Navigate to the frontend directory:
										<pre>
											<code className="lang-bash">cd auth-client</code>
										</pre>
									</li>
									<li>
										Install dependencies:
										<pre>
											<code className="lang-bash">npm install</code>
										</pre>
									</li>
									<li>
										Start the React app:
										<pre>
											<code className="lang-bash">npm run dev</code>
										</pre>
									</li>
								</ul>
							</li>
						</ol>
					</div>
					{/* //****************************************************************************************************************** */}
					<div className="p-4">
						<h2 className="mb-4 text-2xl font-bold" id="usage">
							Usage
						</h2>
						<ol className="pl-6 mb-4 list-decimal">
							<li>Sign up for a new account using the provided endpoint.</li>
							<li>
								Log in with your credentials to access the protected routes.
							</li>
							<li>
								Use the provided API endpoints to interact with user data and
								authentication features.
							</li>
							<li>Log out when finished using the application.</li>
							<li>
								Use the token refresh endpoint if necessary to obtain a new JWT
								token.
							</li>
						</ol>
					</div>
					<div className="p-4">
						<h2
							className="mb-4 text-2xl font-bold"
							id="security-considerations"
						>
							Security Considerations
						</h2>
						<ul className="pl-6 mb-4 list-disc">
							<li>
								Passwords are securely hashed using bcrypt before being stored
								in the database.
							</li>
							<li>
								JWT tokens are securely generated and stored in HTTPOnly cookies
								to prevent XSS attacks.
							</li>
							<li>
								User input is validated and sanitized to prevent injection
								attacks.
							</li>
							<li>
								HTTPS should be used to encrypt data transmission between the
								client and server.
							</li>
						</ul>
					</div>
					<div className="p-4">
						<h2
							className="mb-4 text-2xl font-bold"
							id="ui-and-frontend-validation"
						>
							UI and Frontend Validation
						</h2>
						<ul className="pl-6 list-disc">
							<li>
								Real-time frontend input validation is implemented to provide
								immediate feedback to users.
							</li>
							<li>
								Interactive and visually appealing UI elements enhance the user
								experience.
							</li>
							<li>
								Toast messages are displayed to communicate important actions
								and notifications.
							</li>
						</ul>
					</div>

					{/* //****************************************************************************************************************** */}
					<div className="p-4">
						<h2 className="mb-4 text-2xl font-bold" id="challenges-faced">
							Challenges Faced
						</h2>
						<ol className="pl-6 mb-4 list-decimal">
							<li>
								<strong>Tailwind Dynamic Classes</strong>: Initially faced
								issues with dynamic classes in Tailwind CSS, but resolved them
								by breaking up classes and then completing them where necessary.
							</li>
							<li>
								<strong>Real-time Client-side Input Validation</strong>:
								Utilized online resources to set up correct regex for real-time
								input validation.
							</li>
							<li>
								<strong>Testing API with Postman and Thunder Client</strong>:
								Encountered differing headers when testing APIs, but resolved by
								making a login request from the client before making a
								verifyToken request.
							</li>
							<li>
								<strong>Stale Update of State</strong>: Faced issues with stale
								updates of state to set allowSubmit, debugged using React
								DevTools, and utilized useEffect dependency array to resolve.
							</li>
							<li>
								<strong>Issue Sending verifyToken Request from Client</strong>:
								Solved by setting{" "}
								<code>axios.defaults.withCredentials = true</code> to ensure
								cookies are sent with requests.
							</li>
						</ol>
					</div>
					<div className="p-4">
						<h2 className="mb-4 text-2xl font-bold" id="future-scope">
							Future Scope
						</h2>
						<ul className="pl-6 mb-4 list-disc">
							<li>
								<strong>Forgot Password Functionality</strong>: Implement
								functionality for users to reset their passwords via email.
							</li>
							<li>
								<strong>Additional Authentication Methods</strong>: Integrate
								other authentication methods such as Google Auth for enhanced
								user convenience.
							</li>
						</ul>
					</div>
					<div className="p-4">
						<h2 className="mb-4 text-2xl font-bold" id="github-links">
							GitHub Links
						</h2>
						<ul className="pl-6 mb-4 list-disc">
							<li>
								<a
									href="https://github.com/Vidit-Goel2k/auth-client"
									className="text-blue-600 hover:underline"
								>
									Frontend Repository
								</a>
							</li>
							<li>
								<a
									href="https://github.com/Vidit-Goel2k/auth-server"
									className="text-blue-600 hover:underline"
								>
									Backend Repository
								</a>
							</li>
						</ul>
					</div>
					<div className="p-4">
						<h2 className="mb-4 text-2xl font-bold" id="conclusion">
							Conclusion
						</h2>
						<p>
							This MERN stack authentication system provides a secure,
							efficient, and user-friendly solution for managing user
							authentication and authorization in web applications. By
							leveraging JWT tokens, bcrypt encryption, and HTTPOnly cookies, it
							ensures robust security while offering a seamless user experience
							with real-time input validation and an interactive UI. Challenges
							encountered during development were effectively addressed, and
							future enhancements such as forgot password functionality and
							additional authentication methods are planned for further
							improvement.
						</p>
					</div>
				</div>
			</div>
		</>

		//****************************************************************************************************************** */

		//************************************************************************************************** */
	);
};

export default DocumentationPage;
