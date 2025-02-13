import { useSlots } from "../context/SlotContext";
import SlotCard from "../components/SlotCard";

const Dashboard = () => {
  const { slots, username } = useSlots();

  const mySlots = slots.filter(slot => slot.user === username);
  const otherUsersSlots = slots.filter(slot => slot.user !== username);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Available Slots</h2>

      {/* Slots from Other Users */}
      {otherUsersSlots.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherUsersSlots.map(slot => (
            <SlotCard key={slot.id} slot={slot} />
          ))}
        </div>
      ) : (
        <p>No available slots from other users.</p>
      )}

      <h2 className="text-2xl font-bold mt-6 mb-4">My Slots</h2>

      {/* My Slots */}
      {mySlots.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mySlots.map(slot => (
            <SlotCard key={slot.id} slot={slot} />
          ))}
        </div>
      ) : (
        <p>You haven't created any slots yet.</p>
      )}
    </div>
  );
};

export default Dashboard;
