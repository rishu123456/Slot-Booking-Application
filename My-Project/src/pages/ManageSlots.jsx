import { useState } from "react";
import { useSlots } from "../context/SlotContext";

const ManageSlots = () => {
  const { addSlot, slots, setSlots, username } = useSlots();
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");

  const handleAddSlot = () => {
    addSlot({ id: Date.now(), name, startTime });
    setName("");
    setStartTime("");
  };

  const [selectedDay, setSelectedDay] = useState("");  // Day to copy from
  const [targetDay, setTargetDay] = useState("");  // Day to copy to

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const handleCopyAvailability = () => {
    if (!selectedDay || !targetDay || selectedDay === targetDay) {
      alert("Please select valid days!");
      return;
    }

    // Find slots for the selected day
    const copiedSlots = slots.filter(slot => slot.user === username && slot.day === selectedDay);

    // Remove existing slots for target day
    const updatedSlots = slots.filter(slot => !(slot.user === username && slot.day === targetDay));

    // Add copied slots with updated day
    const newSlots = copiedSlots.map(slot => ({
      ...slot,
      id: Date.now() + Math.random(),  // Ensure unique ID
      day: targetDay
    }));

    // setSlots([...updatedSlots, ...newSlots]);
    setSlots(prevSlots => {
      const updatedSlots = prevSlots.filter(slot => !(slot.user === username && slot.day === targetDay));
      return [...updatedSlots, ...newSlots];
    });
    console.log(slots);
    alert(`Availability copied from ${selectedDay} to ${targetDay}!`);
  };


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Slots</h2>
        {/* Copy Availability Section */}
        <div className="border p-4 rounded mb-6">
        <h3 className="text-lg font-semibold mb-2">Copy Availability</h3>
        <label>Select a day to copy from:</label>
        <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)} className="border p-2 w-full rounded mt-2">
          <option value="">-- Select Day --</option>
          {days.map(day => <option key={day} value={day}>{day}</option>)}
        </select>

        <label className="mt-4 block">Select a day to copy to:</label>
        <select value={targetDay} onChange={(e) => setTargetDay(e.target.value)} className="border p-2 w-full rounded mt-2">
          <option value="">-- Select Day --</option>
          {days.map(day => <option key={day} value={day}>{day}</option>)}
        </select>

        <button onClick={handleCopyAvailability} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-full">
          Copy Availability
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Slot Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={handleAddSlot}
          className="bg-blue-600 text-white p-2 rounded"
        >
          Add Slot
        </button>
      </div>
    </div>
  );
};

export default ManageSlots;
