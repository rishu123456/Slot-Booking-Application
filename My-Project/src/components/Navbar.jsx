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
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">Slot Booking</h1>
      <div className="flex items-center">
        <span className="mr-4">👤 {username}</span>
        <Link to="/dashboard" className="mr-4">Dashboard</Link>
        <Link to="/manage-slots" className="mr-4">Manage Slots</Link>
        <Link to="/my-bookings" className="mr-4">My Bookings</Link>
        {username && (
        <Link to="/profile" className="mr-4">Profile</Link>
         )}
        <button onClick={handleLogout} className="ml-4 bg-red-500 px-2 py-1 rounded">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
