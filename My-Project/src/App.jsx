import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { SlotProvider, useSlots } from "./context/SlotContext";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import ManageSlots from "./pages/ManageSlots";
import Login from "./pages/Login";
import MyBookings from "./pages/MyBookings";
import ProfilePage from "./components/Profile";

const ProtectedRoute = ({ children }) => {
  const { username } = useSlots();
  return username ? children : <Navigate to="/" />;
};

function App() {
  return (
    <SlotProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/manage-slots" element={<ProtectedRoute><ManageSlots /></ProtectedRoute>} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
    </SlotProvider>
  );
}

export default App;
