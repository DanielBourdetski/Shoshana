import { DateTime, Duration } from "luxon";
import Day from "./Day";
import React from "react";
import { getIntervals } from "../../../services/dates";

const Week: React.FC<{ weekNumber?: number; year?: number }> = ({
  weekNumber = 15,
  year = 2023,
}) => {
  // Get the start of the week based on the week number and year
  const startOfWeek = DateTime.fromObject({
    weekNumber,
    weekYear: year,
  }).startOf("week");

  const week: DateTime[] = [];

  // Loop through the days of the week and output their names
  // TODO chagne it so the first day of the week is dynamically selected according to locale (sunday for israel, monday for us, etc.)
  for (let i = 0; i < 7; i++) {
    const day = startOfWeek.plus({ days: i - 1 });
    week.push(day);
  }

  // TODO the direction should be set according to locale/system language
  return (
    <div dir="rtl" className="mx-auto grid grid-cols-7 mb-20 h-full">
      {week.map((day) => (
        <Day key={day.day} day={day} />
      ))}
    </div>
  );
};

export default Week;
