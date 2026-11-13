import { useEffect, useState } from "react";
import axios from "axios";

const ReminderList = ({ userId }) => {
  const [reminders, setReminders] = useState([]);

  const fetchReminders = async () => {
    const res = await axios.get(`http://localhost:5001/api/reminders/${userId}`);
    setReminders(res.data);
  };

  const deleteReminder = async (id) => {
    await axios.delete(`http://localhost:5001/api/reminders/${id}`);
    setReminders(reminders.filter(r => r._id !== id));
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  return (
    <div>
      {reminders.map((r) => (
        <div key={r._id}>
          <h4>{r.medicineName} @ {r.time}</h4>
          <p>{r.date} - {r.note}</p>
          <button onClick={() => deleteReminder(r._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ReminderList;
