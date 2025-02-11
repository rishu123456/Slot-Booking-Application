import { useSlots } from "../context/SlotContext";
import SlotCard from "../components/Slotcard";

const Dashboard = () => {
  const { slots } = useSlots();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Available Slots</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {slots.length > 0 ? (
          slots.map((slot) => <SlotCard key={slot.id} slot={slot} />)
        ) : (
          <p>No slots available.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
