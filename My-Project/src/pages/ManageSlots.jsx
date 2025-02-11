import { useState } from "react";
import { useSlots } from "../context/SlotContext";

const ManageSlots = () => {
  const { addSlot } = useSlots();
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");

  const handleAddSlot = () => {
    addSlot({ id: Date.now(), name, startTime });
    setName("");
    setStartTime("");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Slots</h2>
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
