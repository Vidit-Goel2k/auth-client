import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true

const Welcome = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState();

  const refreshToken = async () => {
    try {
      const response = await axios.get("https://mern-auth-server.viditgoel.com/api/refresh", {
        withCredentials: true,
      });
      return response.data.user;
    } catch (error) {
      console.error("Error refreshing token:", error);
      throw error;
    }
  };

  const sendRequest = async () => {
    try {
      const response = await axios.get("https://mern-auth-server.viditgoel.com/api/user", {
        withCredentials: true,
      });
      return response.data.user;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Unauthorized error (no token provided)
        toast.error('You need to log in to access this page.');
        // Redirect to the login page or display a login prompt
        navigate('/login');
      } else {
        console.error("Error fetching user data:", error);
        toast.error('Failed to fetch user data. Please try again.');
        navigate('/login');
      }
      throw error; // Rethrow the error to be caught by the caller if needed
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await sendRequest();
        setUser(userData);
        toast.success('User data fetched successfully');
      } catch (error) {
        console.error("Error fetching initial user data:", error);
        toast.error('Failed to fetch user data. Please try again.');
      }
    };

    fetchData();

    let intervalId;
    const refreshUser = async () => {
      try {
        const userData = await refreshToken();
        setUser(userData);
        toast.success('User data refreshed successfully');
      } catch (error) {
        console.error("Error refreshing user data:", error);
        toast.error('Failed to refresh user data. Please try again.');
      }
    };

    const startRefresh = () => {
      intervalId = setInterval(refreshUser, 1000 * 29);
    };

    startRefresh();

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      {user && <h1 className="text-3xl">{user.username}</h1>}
    </div>
  )
};

export default Welcome;
