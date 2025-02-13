import { useState } from "react";
import { useSlots } from "../context/SlotContext";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { username, setUsername } = useSlots();
  const [newUsername, setNewUsername] = useState(username);
  const navigate = useNavigate();

  const handleUsernameChange = () => {
    if (!newUsername.trim()) return;
    localStorage.setItem("username", newUsername);
    setUsername(newUsername);
    alert("Username updated successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername("");
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>

      <label className="block text-gray-700">Username:</label>
      <input
        type="text"
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
        className="border p-2 w-full rounded mt-2"
      />

      <button
        onClick={handleUsernameChange}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        Update Username
      </button>

      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded w-full"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
