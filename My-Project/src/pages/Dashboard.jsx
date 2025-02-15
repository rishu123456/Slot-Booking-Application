import { useSlots } from "../context/SlotContext";
import SlotCard from "../components/Slotcard";
import TimezoneSelector from "../components/TimezoneSelector";

const Dashboard = () => {
  const { slots, username } = useSlots();

  const mySlots = slots.filter(slot => slot.user === username);
  const otherUsersSlots = slots.filter(slot => slot.user !== username);

  return (
    <div className="p-6 ">

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 bg-gray-100 p-4">
        <h3 className="text-2xl font-bold">Dashboard</h3>
        <TimezoneSelector />
      </div>

      <h3 className="text-2xl font-bold  mb-4">
        Slots from other users
      </h3>
      {otherUsersSlots.length > 0 ? (
        <div className="flex flex-wrap gap-3 justify-start">


          {otherUsersSlots.map(slot => (
            <SlotCard key={slot.id} slot={slot} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No available slots from other users.</p>
      )}


      <h2 className="text-2xl font-bold mt-8 mb-4">My Slots</h2>
      {mySlots.length > 0 ? (
        <div className="flex flex-wrap gap-3 justify-start">

          {mySlots.map(slot => (
            <SlotCard key={slot.id} slot={slot} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">You haven't created any slots yet.</p>
      )}
    </div>
  );
};

export default Dashboard;
