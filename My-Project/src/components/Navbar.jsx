import { useSlots } from "../context/SlotContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { username, setUsername } = useSlots();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername("");
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex flex-wrap justify-between items-center">
    
      <h1 className="text-xl font-bold whitespace-nowrap">Slot Booking</h1>

      <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-5 bg-gray-100 p-3 md:p-4 rounded-lg">
  <span className="whitespace-nowrap font-medium text-gray-700 flex items-center">
    👤 {username}
  </span>
  
  <Link to="/dashboard" className="whitespace-nowrap text-gray-700 hover:text-blue-500 transition duration-200">
    Dashboard
  </Link>
  
  <Link to="/manage-slots" className="whitespace-nowrap text-gray-700 hover:text-blue-500 transition duration-200">
    Manage Slots
  </Link>
  
  <Link to="/my-bookings" className="whitespace-nowrap text-gray-700 hover:text-blue-500 transition duration-200">
    My Bookings
  </Link>
  
  {username && (
    <Link to="/profile" className="whitespace-nowrap text-gray-700 hover:text-blue-500 transition duration-200">
      Profile
    </Link>
  )}
  
  <button 
    onClick={handleLogout} 
    className="bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-600 transition duration-200"
  >
    Logout
  </button>
</div>

    </nav>
  );
};

export default Navbar;
