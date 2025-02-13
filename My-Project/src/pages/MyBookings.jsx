import { useSlots } from "../context/SlotContext";
import dayjs from "dayjs";

const MyBookings = () => {
  const { bookedSlots, username } = useSlots();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
      {bookedSlots.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookedSlots
            .filter(slot => slot.bookedBy === username) // Show only slots booked by the user
            .map(slot => (
              <div key={slot.id} className="p-4 border rounded-md shadow-md">
                <p className="text-lg font-semibold">{slot.name}</p>
                <p>{dayjs(slot.startTime).format("DD MMM, YYYY h:mm A")}</p>
                <p className="text-sm text-gray-500">Booked with {slot.user}</p>
              </div>
            ))}
        </div>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default MyBookings;
