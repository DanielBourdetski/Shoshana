import React, { useState } from "react";
import useLocale from "../../../hooks/useLocale";
import calendarService from "../../../services/calendarService";
import MonthDay from "./MonthDay";
import DayDetails from "../DayDetails";
import { DateTime } from "luxon";
import { getMonthDays } from "../../../services/dates";

const Month = () => {
  const [date, setDate] = useState<null | DateTime>(null);
  const appointments = calendarService.getAppointments();

  const closeDate = () => setDate(null);

  const dt = DateTime.utc();

  const currentDate = new Date();
  const { dateType } = useLocale("dateType");

  const days = getMonthDays(currentDate.getFullYear(), currentDate.getMonth());

  if (days === undefined) return <div>getDayOfMonth returns undefined</div>;

  // ? if first day of the month is not sunday, fill in the blanks to fit the sunday-through-saturday month grid
  const fillInDays = [];
  for (let i = 1; i < days[0].weekday; i++) {
    fillInDays.push(
      <div key={i} className="p-2 border bg-gray-200 opacity-50">
        FILL
      </div>
    );
  }

  return (
    <div className="mx-auto">
      {date && <DayDetails date={date} onClose={closeDate} />}

      <h2 className="text-center my-10 text-4xl font-bold">
        {currentDate.toLocaleDateString("en-us", {
          month: "long",
          year: "numeric",
        })}
      </h2>

      <div className="grid grid-r gap-4 grid-cols-7 w-full">
        {fillInDays}

        {days.map((day) => {
          const apps = appointments.filter((a) => a.dateUTC.day === day.day);

          return (
            <MonthDay
              key={day.toUnixInteger()}
              day={day}
              openDay={() => setDate(day)}
              dateType={dateType}
              appointment={!!apps.length}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Month;
