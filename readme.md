# MERN Stack Authentication System Documentation

## Overview
This documentation outlines the implementation and usage of a MERN (MongoDB, Express.js, React.js, Node.js) stack authentication system using JSON Web Tokens (JWT) and HTTPOnly cookies. The system provides functionality for user signup, login, user details retrieval, token refresh, logout, and real-time frontend input validation with an interactive UI featuring toast messages.

## Technologies Used
- MongoDB: A NoSQL database used for storing user data.
- Express.js: A web application framework for Node.js used for building the backend API.
- React.js: A JavaScript library used for building the frontend user interface.
- Node.js: A JavaScript runtime environment used for server-side scripting.
- JSON Web Tokens (JWT): A standard for securely transmitting information between parties.
- bcrypt: A password-hashing function used for encrypting user passwords.
- Axios: A promise-based HTTP client used for sending HTTP requests from the frontend.
- HTTPOnly Cookies: Cookies that are inaccessible to JavaScript, providing improved security.
- Tailwind CSS: A utility-first CSS framework used for styling the frontend.

## Functionality

### 1. Signup
Endpoint: `POST /api/signup`
- Allows users to create a new account.
- Requires the following fields in the request body:
  - `username`: User's chosen username.
  - `email`: User's email address.
  - `password`: User's password.
- Upon successful registration, the user's information is securely hashed and stored in the MongoDB database using bcrypt encryption.

```javascript
// Route for user signup
app.post('/api/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user in MongoDB
    const newUser = await User.create({ username, email, password: hashedPassword });

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create user', error: error.message });
  }
});
```

### 2. Login
Endpoint: `POST /api/login`
- Allows registered users to log in to their accounts.
- Requires the following fields in the request body:
  - `email`: User's email address.
  - `password`: User's password.
- Upon successful login, a JWT token is generated and stored in an HTTPOnly cookie for authentication purposes.

```javascript
// Route for user login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // Validate password
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set JWT token in HTTPOnly cookie
    res.cookie('token', token, { httpOnly: true });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Failed to login', error: error.message });
  }
});
```

### 3. User Details
Endpoint: `GET /api/user`
- Retrieves the details of the currently authenticated user.
- Requires the client to send the JWT token stored in the HTTPOnly cookie as an HTTP header for authentication.
- Returns user information such as email, username, or any other relevant details.

### 4. Token Refresh
Endpoint: `POST /api/refresh-token`
- Allows users to refresh their JWT token if it's expired.
- Requires the client to send the refresh token stored in the HTTPOnly cookie as an HTTP header.
- Generates a new JWT token and updates the HTTPOnly cookie with the new token.

### 5. Logout
Endpoint: `POST /api/logout`
- Logs out the currently authenticated user.
- Invalidates the JWT token stored in the HTTPOnly cookie, making it unusable for further authentication.
- Upon successful logout, the user is redirected to the login page.


## Installation and Setup
1. **Clone the Repository**: 
   ```bash
   git clone https://github.com/Vidit-Goel2k/auth-server
   git clone https://github.com/Vidit-Goel2k/auth-client
   ```

2. **Backend Setup**:
   - Navigate to the backend directory:
     ```bash
     cd auth-server
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Set up MongoDB and configure the connection string in the `.env` file.
   - Start the backend server:
     ```bash
     npm start
     ```

3. **Frontend Setup**:
   - Navigate to the frontend directory:
     ```bash
     cd auth-client
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the React app:
     ```bash
     npm run dev
     ```

## Usage
1. Sign up for a new account using the provided endpoint.
2. Log in with your credentials to access the protected routes.
3. Use the provided API endpoints to interact with user data and authentication features.
4. Log out when finished using the application.
5. Use the token refresh endpoint if necessary to obtain a new JWT token.

## Security Considerations
- Passwords are securely hashed using bcrypt before being stored in the database.
- JWT tokens are securely generated and stored in HTTPOnly cookies to prevent XSS attacks.
- User input is validated and sanitized to prevent injection attacks.
- HTTPS should be used to encrypt data transmission between the client and server.

## UI and Frontend Validation
- Real-time frontend input validation is implemented to provide immediate feedback to users.
- Interactive and visually appealing UI elements enhance the user experience.
- Toast messages are displayed to communicate important actions and notifications.

## Challenges Faced
1. **Tailwind Dynamic Classes**: Initially faced issues with dynamic classes in Tailwind CSS, but resolved them by breaking up classes and then completing them where necessary.
2. **Realtime Client-side Input Validation**: Utilized online resources to set up correct regex for real-time input validation.
3. **Testing API with Postman and Thunder Client**: Encountered differing headers when testing APIs, but resolved by making a login request from the client before making a verifyToken request.
4. **Stale Update of State**: Faced issues with stale updates of state to set allowSubmit, debugged using React DevTools, and utilized useEffect dependency array to resolve.
5. **Issue Sending verifyToken Request from Client**: Solved by setting `axios.defaults.withCredentials = true` to ensure cookies are sent with requests.

## Future Scope
- **Forgot Password Functionality**: Implement functionality for users to reset their passwords via email.
- **Additional Authentication Methods**: Integrate other authentication methods such as Google Auth for enhanced user convenience.

## GitHub Links
- [Frontend Repository](https://github.com/Vidit-Goel2k/auth-client)
- [Backend Repository](https://github.com/Vidit-Goel2k/auth-server)
)

## Conclusion
This MERN stack authentication system provides a secure, efficient, and user-friendly solution for managing user authentication and authorization in web applications. By leveraging JWT tokens, bcrypt encryption, and HTTPOnly cookies, it ensures robust security while offering a seamless user experience with real-time input validation and an interactive UI. Challenges encountered during development were effectively addressed, and future enhancements such as forgot password functionality and additional authentication methods are planned for further improvement.

