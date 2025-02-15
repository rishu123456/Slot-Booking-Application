import { useState } from "react";
import { useSlots } from "../context/SlotContext";
import { useTimezone } from "../context/TimezoneContext";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const ManageSlots = () => {
  const { addSlot, slots, setSlots, username, startTime, setStartTime } = useSlots();
  const { selectedTimezone } = useTimezone();
  const [name, setName] = useState("");
  const [selectedDay, setSelectedDay] = useState(""); 
  const [targetDay, setTargetDay] = useState(""); 

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const handleAddSlot = () => {
    if (!name.trim() || !startTime) {
      alert("Please enter valid slot details!");
      return;
    }
    
    const slotDay = dayjs(startTime).format("dddd");
    const utcTime = dayjs(startTime).utc();

    addSlot({
      id: Date.now(),
      name,
      startTime: utcTime.format(),
      timezone: selectedTimezone,
      day: slotDay,
    });

    setName("");
    setStartTime("");
    alert(`New slot added`);
  };

  const handleCopyAvailability = () => {
    if (!selectedDay || !targetDay || selectedDay === targetDay) {
      alert("Please select valid days!");
      return;
    }

    const copiedSlots = slots.filter(slot => slot.user === username && slot.day === selectedDay);
    if (copiedSlots.length === 0) {
      alert(`No slots found for ${selectedDay}`);
      return;
    }

    const updatedSlots = slots.filter(slot => !(slot.user === username && slot.day === targetDay));

    const newSlots = copiedSlots.map(slot => {
      let originalTime = dayjs.utc(slot.startTime).tz(selectedTimezone);
      const targetDayIndex = days.indexOf(targetDay);
      let newStartTime = originalTime.startOf("day").day(targetDayIndex).add(1, "day");

      if (newStartTime.isBefore(originalTime, "day")) {
        newStartTime = newStartTime.add(7, "day");
      }

      return {
        ...slot,
        id: Date.now() + Math.random(),
        day: targetDay,
        startTime: newStartTime.utc().format(),
      };
    });

    setSlots([...updatedSlots, ...newSlots]);
    alert(`Availability copied from ${selectedDay} to ${targetDay}!`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Manage Slots</h2>

      {/* Copy Availability Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Copy Availability</h3>

        <label className="block text-gray-600 font-medium">Select a day to copy from:</label>
        <select
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
          className="border p-3 w-full rounded mt-2 bg-gray-50 focus:ring-2 focus:ring-blue-400"
        >
          <option value="">-- Select Day --</option>
          {days.map((day) => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>

        <label className="block text-gray-600 font-medium mt-4">Select a day to copy to:</label>
        <select
          value={targetDay}
          onChange={(e) => setTargetDay(e.target.value)}
          className="border p-3 w-full rounded mt-2 bg-gray-50 focus:ring-2 focus:ring-blue-400"
        >
          <option value="">-- Select Day --</option>
          {days.map((day) => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>

        <button
          onClick={handleCopyAvailability}
          className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg w-full transition hover:bg-blue-600 hover:scale-105"
        >
          Copy Availability
        </button>
      </div>

      {/* Add Slot Section */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Add Slot</h3>

        <input
          type="text"
          placeholder="Slot Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-3 w-full rounded mb-4 bg-gray-50 focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="border p-3 w-full rounded mb-4 bg-gray-50 focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleAddSlot}
          className="bg-green-500 text-white px-6 py-3 rounded-lg w-full transition hover:bg-green-600 hover:scale-105"
        >
          Add Slot
        </button>
      </div>
    </div>
  );
};

export default ManageSlots;
