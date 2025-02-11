import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">Slot Booking</h1>
      <div>
        <Link to="/" className="mr-4">Dashboard</Link>
        <Link to="/manage-slots">Manage Slots</Link>
      </div>
    </nav>
  );
};

export default Navbar;
