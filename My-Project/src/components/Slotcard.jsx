import { useState } from "react";
import { useSlots } from "../context/SlotContext";
import { useTimezone } from "../context/TimezoneContext";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

const SlotCard = ({ slot }) => {
  const { username, deleteSlot, updateSlot, bookSlot } = useSlots();
  const { timezone } = useTimezone();

  const [isEditing, setIsEditing] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  const formattedTime = dayjs.utc(slot.startTime).tz(timezone).format("DD MMM, YYYY h:mm A");

  const [updatedSlot, setUpdatedSlot] = useState({
    name: slot.name,
    startTime: dayjs.utc(slot.startTime).tz(timezone).format("YYYY-MM-DDTHH:mm"), 
  });

  const handleSave = () => {
    if (!updatedSlot.name.trim() || !updatedSlot.startTime) {
      alert("Please enter valid details!");
      return;
    }

    
    const updatedTimeUTC = dayjs.tz(updatedSlot.startTime, timezone).utc().format();

    updateSlot(slot.id, {
      ...updatedSlot,
      startTime: updatedTimeUTC, 
    });

    setIsEditing(false);
  };

  const handleBookSlot = async () => {
    setIsBooking(true);
    await bookSlot(slot.id);
    setIsBooking(false);
  };

  return (
    <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-105 w-72">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={updatedSlot.name}
            onChange={(e) => setUpdatedSlot({ ...updatedSlot, name: e.target.value })}
            className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-400"
            placeholder="Slot Name"
          />
          <input
            type="datetime-local"
            value={updatedSlot.startTime}
            onChange={(e) => setUpdatedSlot({ ...updatedSlot, startTime: e.target.value })}
            className="border p-2 rounded w-full mt-2 focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600 transition-all"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded w-full hover:bg-gray-500 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
         
          <h3 className="text-lg font-semibold text-gray-800">{slot.name}</h3>

          
          <p>{slot.day}</p>
          <p className="text-gray-600 mt-1 text-sm">📅 {formattedTime}</p>

          
          <p className="text-xs text-gray-500 mt-1">👤 Created by {slot.user}</p>

          {slot.user === username ? (
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-3 py-1 text-sm rounded hover:bg-blue-600 transition-all"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => deleteSlot(slot.id)}
                className="bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600 transition-all"
              >
                🗑️ Delete
              </button>
            </div>
          ) : (
            <button
              onClick={handleBookSlot}
              className={`mt-4 w-full bg-green-500 text-white px-3 py-2 text-sm rounded hover:bg-green-600 transition-all ${
                isBooking ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isBooking}
            >
              {isBooking ? "Booking..." : "🔥 Book Slot"}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default SlotCard;
