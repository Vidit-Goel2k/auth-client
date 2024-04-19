import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'


import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Body from './components/Body.jsx'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import User from './components/User.jsx'
import Logout from './components/Logout.jsx'

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <Body />,
			},
			{
				path: "/signup",
				element: <Signup />,
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/user",
				element: <User />
			},
			{
				path: "/logout",
				element: <Logout />
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
