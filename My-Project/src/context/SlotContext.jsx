import { createContext, useState, useContext, useEffect } from "react";

const SlotContext = createContext();

export const SlotProvider = ({ children }) => {
  const [slots, setSlots] = useState([]); // Available slots
  const [bookedSlots, setBookedSlots] = useState([]); // Booked slots
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  

  const addSlot = (slot) => {
    setSlots([...slots, { ...slot, user: username }]);
  };

  const deleteSlot = (id) => {
    setSlots(slots.filter(slot => slot.id !== id));
  };

  const updateSlot = (id, updatedSlot) => {
    setSlots(slots.map(slot => (slot.id === id ? { ...slot, ...updatedSlot } : slot)));
  };

  const bookSlot = (id) => {
    const slotToBook = slots.find(slot => slot.id === id);
    if (slotToBook) {
      setBookedSlots([...bookedSlots, { ...slotToBook, bookedBy: username }]); // Store in booked slots
      setSlots(slots.filter(slot => slot.id !== id)); // Remove from available slots
    }
  };

  return (
    <SlotContext.Provider value={{ 
      slots, addSlot, deleteSlot, updateSlot, bookSlot, bookedSlots, 
      timezone, setTimezone, username, setUsername ,setSlots
    }}>
      {children}
    </SlotContext.Provider>
  );
};


export const useSlots = () => useContext(SlotContext);
