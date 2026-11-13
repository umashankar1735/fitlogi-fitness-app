import React from "react";
import "./Calendar.css"; // optional if you have custom styles

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const dates = [9, 10, 11, 12, 13, 14, 15];

const Calendar = () => {
  return (
    <div className="calendar">
      {dates.map((date, index) => (
        <div
          key={index}
          className={`day-box ${index === 1 ? "active" : ""}`}
        >
          {date}
          <br />
          {days[index]}
        </div>
      ))}
    </div>
  );
};

export default Calendar;
