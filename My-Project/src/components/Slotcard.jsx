import { useSlots } from "../context/SlotContext";
import { useState } from "react";
import dayjs from "dayjs";

const SlotCard = ({ slot }) => {
  const { username, deleteSlot, updateSlot, bookSlot } = useSlots();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedSlot, setUpdatedSlot] = useState({
    name: slot.name,
    startTime: dayjs(slot.startTime).format("YYYY-MM-DDTHH:mm"), // Proper datetime-local format
  });

  const handleSave = () => {
    if (!updatedSlot.name.trim() || !updatedSlot.startTime) {
      alert("Please enter valid details!");
      return;
    }
    updateSlot(slot.id, { ...updatedSlot, startTime: new Date(updatedSlot.startTime).toISOString() });
    setIsEditing(false);
  };

  return (
    <div className="p-4 border rounded-md shadow-md bg-white">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={updatedSlot.name}
            onChange={(e) => setUpdatedSlot({ ...updatedSlot, name: e.target.value })}
            className="border p-2 rounded w-full"
            placeholder="Slot Name"
          />
          <input
            type="datetime-local"
            value={updatedSlot.startTime}
            onChange={(e) => setUpdatedSlot({ ...updatedSlot, startTime: e.target.value })}
            className="border p-2 rounded w-full mt-2"
          />
          <button
            onClick={handleSave}
            className="bg-green-500 text-white p-2 mt-2 rounded w-full hover:bg-green-600"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-400 text-white p-2 mt-2 rounded w-full hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <p className="text-lg font-semibold">{slot.name}</p>
          <p>{dayjs(slot.startTime).format("DD MMM, YYYY h:mm A")}</p>
          <p className="text-sm text-gray-500">Created by {slot.user}</p>

          {slot.user === username ? (
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => deleteSlot(slot.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ) : (
            <button
              onClick={() => bookSlot(slot.id)}
              className="bg-green-500 text-white px-3 py-1 mt-2 rounded hover:bg-green-600"
            >
              Book Slot
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default SlotCard;
