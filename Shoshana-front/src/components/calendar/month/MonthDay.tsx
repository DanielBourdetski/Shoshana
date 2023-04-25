import { DateTime } from "luxon";
import React from "react";
import { Appointment } from "../../../services/calendarService";
import { toStringWeekDay } from "../../../services/dates";

const MonthDay: React.FC<{
  day: DateTime;
  openDay: Function;
  dateType?: string;
  appointment: boolean;
}> = ({ day, openDay, dateType = "en-GB", appointment }) => {
  const dayInMonth = day.day;

  return (
    <div
      key={dayInMonth}
      onClick={() => openDay(day)}
      className="p-2 border bg-gray-200 hover:bg-gray-300 hover:translate-x-1 hover:-translate-y-1 duration-150 cursor-pointer h-20 flex flex-col relative"
    >
      {appointment ? (
        <div className="w-2 h-2 rounded-full bg-red-500 ms-auto" />
      ) : null}

      <div className="flex mt-2 items-center w-3/4">
        {dayInMonth}{" "}
        <div className="text-xs ms-auto">{toStringWeekDay(day, "he-IL")}</div>
      </div>
    </div>
  );
};

export default MonthDay;
