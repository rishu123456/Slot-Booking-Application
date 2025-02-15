import { createContext, useContext, useState, useEffect } from "react";

const TimezoneContext = createContext();

export const TimezoneProvider = ({ children }) => {
  const defaultTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [timezone, setTimezone] = useState(localStorage.getItem("timezone") || defaultTimezone);

  useEffect(() => {
    localStorage.setItem("timezone", timezone);
  }, [timezone]);

  return (
    <TimezoneContext.Provider value={{ timezone, setTimezone }}>
      {children}
    </TimezoneContext.Provider>
  );
};

export const useTimezone = () => useContext(TimezoneContext);
