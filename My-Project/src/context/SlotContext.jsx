import { createContext, useState, useContext, useEffect } from "react";

const SlotContext = createContext();

export const SlotProvider = ({ children }) => {
  const [slots, setSlots] = useState(() => {
    const savedSlots = localStorage.getItem("slots");
    return savedSlots ? JSON.parse(savedSlots) : [];
  });
  
  useEffect(() => {
    localStorage.setItem("slots", JSON.stringify(slots));
  }, [slots]);
  const [bookedSlots, setBookedSlots] = useState(() => {
    const savedBookedSlots = localStorage.getItem("bookedSlots");
    return savedBookedSlots ? JSON.parse(savedBookedSlots) : [];
  });
  useEffect(() => {
    localStorage.setItem("bookedSlots", JSON.stringify(bookedSlots));
  }, [bookedSlots]);
    
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  

  const addSlot = (slot) => {
    setSlots([...slots, { ...slot, user: username }]);
  };

  const [startTime, setStartTime] = useState("");

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
      timezone, setTimezone, username, setUsername ,setSlots, startTime, setStartTime
    }}>
      {children}
    </SlotContext.Provider>
  );
};

export const useSlots = () => useContext(SlotContext);
