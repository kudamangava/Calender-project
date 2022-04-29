import React, { useState } from "react";
import "./Calander.css";
import CalendarItem from "../CalendarItem/CalendarItem";

const MONTHS = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};
const DAYS_OF_MONTH = {
  0: "Monday",
  1: "Tuesday",
  2: "Wednesday",
  3: "Thursday",
  4: "Friday",
  5: "Saturday",
  6: "Sunday",
};
const Calander = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const firstDayMonth = new Date(currentYear, currentMonth, 1).getDay();
  let prevMonthDays = [];
  const getCalendarMonth = () => {
    if (firstDayMonth !== 1) {
      const daysInPrevMonth = daysInMonth(currentMonth - 1, currentYear);
      let mondayLastWeekOfPrevMonth =
        daysInPrevMonth -
        new Date(currentYear, currentMonth - 1, daysInPrevMonth).getDay() +
        1;

      for (let i = mondayLastWeekOfPrevMonth; i <= daysInPrevMonth; i++) {
        prevMonthDays.push([i, currentMonth - 1]);
      }
    }

    const monthDays = [
      ...new Array(daysInMonth(currentMonth, currentYear)),
    ].map((day, index) => [index + 1, currentMonth]);
    let calendarArray = prevMonthDays.concat(monthDays);
    const nextMonthDays = [...new Array(7 - (calendarArray.length % 7))].map(
      (day, index) => [index + 1, currentMonth + 1]
    );
    return calendarArray.concat(nextMonthDays);
  };

  const getPreviousMonth = () => {
    let month = currentMonth - 1;

    if (month < 0) {
      month = 11;
      let year = currentYear - 1;
      setCurrentYear(year);
    }

    setCurrentMonth(month);
  };

  const getNextMonth = () => {
    let month = currentMonth + 1;

    if (month > 11) {
      month = 0;
      let year = currentYear + 1;
      setCurrentYear(year);
    }

    setCurrentMonth(month);
  };

  const currentDate = () => {
    setCurrentMonth(new Date().getMonth());
    setCurrentYear(new Date().getFullYear());
  };

  return (
    <main className="calendar">
      <div className="date">
        <div className="background" onClick={getPreviousMonth}>
          <div className="prev" />
        </div>
        <p>{`${MONTHS[currentMonth]} ${currentYear}`}</p>
        <div className="background" onClick={getNextMonth}>
          <div className="next" />
        </div>
        <button className="today" onClick={currentDate}>
          Today
        </button>
      </div>
      <div className="grid">
        {getCalendarMonth().map((item, index) => (
          <CalendarItem
            day={item[0]}
            month={item[1]}
            year={currentYear}
            key={Math.random()}
            dayOfMonth={index < 7 ? DAYS_OF_MONTH[index] : ""}
          />
        ))}
      </div>
    </main>
  );
};
const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
export default Calander;
