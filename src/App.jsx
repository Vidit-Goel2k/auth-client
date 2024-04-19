import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div className="bg-slate-200">
    <Navbar />
    <Outlet />
    <ToastContainer position="bottom-right" />
    </div>
  )
}

export default App
