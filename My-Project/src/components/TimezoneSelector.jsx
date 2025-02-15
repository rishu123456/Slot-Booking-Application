import { useTimezone } from "../context/TimezoneContext";

const TimezoneSelector = () => {
  const { timezone, setTimezone } = useTimezone();

  const timezones = Intl.supportedValuesOf("timeZone");

  return (
    <div className="p-4 border rounded shadow-md">
      <label className="font-semibold">Select Timezone:</label>
      <select 
        value={timezone} 
        onChange={(e) => setTimezone(e.target.value)} 
        className="border p-2 rounded w-full mt-2"
      >
        {timezones.map((tz) => (
          <option key={tz} value={tz}>
            {tz}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimezoneSelector;
