import { createContext, useState, useContext } from "react";

const SlotContext = createContext();

export const SlotProvider = ({ children }) => {
  const [slots, setSlots] = useState([]);
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);

  const addSlot = (slot) => setSlots([...slots, slot]);

  const deleteSlot = (id) => setSlots(slots.filter(slot => slot.id !== id));

  return (
    <SlotContext.Provider value={{ slots, addSlot, deleteSlot, timezone, setTimezone }}>
      {children}
    </SlotContext.Provider>
  );
};

export const useSlots = () => useContext(SlotContext);
