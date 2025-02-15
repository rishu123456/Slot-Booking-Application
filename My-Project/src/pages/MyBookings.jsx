import { useSlots } from "../context/SlotContext";
import dayjs from "dayjs";

const MyBookings = () => {
  const { bookedSlots, username } = useSlots();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-3xl font-bold text-gray-800">My Bookings</h2>
      </div>

      {bookedSlots.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookedSlots
            .filter((slot) => slot.bookedBy === username)
            .map((slot) => (
              <div
                key={slot.id}
                className="p-4 bg-gradient-to-br from-green-100 to-blue-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <p className="text-lg font-semibold text-gray-900">{slot.name}</p>
                <p>{slot.day}</p>
                <p className="text-gray-700 mt-1">{dayjs(slot.startTime).format("DD MMM, YYYY h:mm A")}</p>
                <p className="text-sm text-gray-600 mt-2">Booked with {slot.user}</p>
              </div>
            ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg">No bookings found.</p>
      )}
    </div>
  );
};

export default MyBookings;
