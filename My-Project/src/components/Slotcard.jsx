import dayjs from "dayjs";

const SlotCard = ({ slot }) => {
  return (
    <div className="p-4 border rounded-md shadow-md">
      <p className="text-lg font-semibold">{slot.name}</p>
      <p>{dayjs(slot.startTime).format("DD MMM, YYYY h:mm A")}</p>
    </div>
  );
};

export default SlotCard;
