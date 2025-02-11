import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SlotProvider } from "./context/SlotContext";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import ManageSlots from "./pages/ManageSlots";

function App() {
  return (
    <SlotProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/manage-slots" element={<ManageSlots />} />
        </Routes>
      </Router>
    </SlotProvider>
  );
}

export default App;
