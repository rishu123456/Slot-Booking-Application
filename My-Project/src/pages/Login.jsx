import { useSlots } from "../context/SlotContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { setUsername } = useSlots();
  const [inputUsername, setInputUsername] = useState("");
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem("users")) || []);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!inputUsername.trim()) {
      setError("Username cannot be empty!");
      return;
    }

    if (!users.includes(inputUsername)) {
      setError("User not found! Please register first.");
      return;
    }

    localStorage.setItem("username", inputUsername);
    setUsername(inputUsername);
    navigate("/dashboard");
  };

  const handleRegister = () => {
    if (!inputUsername.trim()) {
      setError("Username cannot be empty!");
      return;
    }

    if (users.includes(inputUsername)) {
      setError("User already exists! Please log in.");
      return;
    }

    const updatedUsers = [...users, inputUsername];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    setError("");
    alert("User registered successfully! You can now log in.");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login or Register</h2>
        
        <input
          type="text"
          placeholder="Enter Username"
          value={inputUsername}
          onChange={(e) => setInputUsername(e.target.value)}
          className="border p-2 w-full rounded"
        />
        
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <div className="flex mt-4 gap-2">
          <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded w-1/2">
            Login
          </button>
          <button onClick={handleRegister} className="bg-green-500 text-white px-4 py-2 rounded w-1/2">
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
