import React, { useState } from "react";
import { getIntervals, toStringWeekDay } from "../../../services/dates";
import { DateTime } from "luxon";
import TimeSlot from "./TimeSlot";
import AppointmentDetails, {
  AppointmentDetailsType,
} from "../AppointmentDetails";

const Day: React.FC<{ day: DateTime }> = ({ day }) => {
  const [timeslotDetails, setTimeslotDetails] =
    useState<AppointmentDetailsType | null>(null);
  // TODO accept dynamic opening hours
  const apps = [{ date: "today", hour: 8, minute: 30 }]; // ? should be fetched data
  const appsHourFormats = apps.map(
    ({ hour, minute }) =>
      hour.toString().padStart(2, "0") + ":" + minute.toString()
  );

  // TODO handle fetching appointment data / displaying add appointment form (if no appointment)
  const handleTimeSlotClick = (time: string) => {
    const fullDate = day.toFormat("dd.MM.yyyy") + " - " + time;
    console.log(fullDate);

    setTimeslotDetails({
      client: "Michael",
      date: day.toFormat("dd.MM.yyyy"),
      description: "Brazilian Wax",
      time,
    });
  };

  const handleCloseAppointment = () => setTimeslotDetails(null);

  const timeslots = getIntervals(
    { hour: 8, minute: 0 },
    { hour: 18, minute: 0 },
    30
  );

  const timeDivs = timeslots.map((t) => (
    <TimeSlot
      key={t}
      onOpenAppointment={() => handleTimeSlotClick(t)}
      onCloseAppointment={handleCloseAppointment}
      time={t}
      app={appsHourFormats.includes(t)}
    />
  ));

  return (
    <div className="h-full bg-gray-300 flex-1 flex flex-col justify-start items-center p-15 border-e border-slate-500 last:border-e-0">
      {timeslotDetails !== null && (
        <AppointmentDetails
          appointmentDetails={timeslotDetails}
          onClose={() => setTimeslotDetails(null)}
        />
      )}
      <div className="h-[10%] pb-1">{toStringWeekDay(day, "he-IL")}</div>
      <div className="h-full w-full relative">
        <div className="w-full h-full absolute top-0 right-0 flex flex-col">
          {timeDivs}
        </div>
      </div>
    </div>
  );
};

export default Day;
