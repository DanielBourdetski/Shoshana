import React, { useState } from "react";
import { getIntervals, toStringWeekDay } from "../../../services/dates";
import { DateTime } from "luxon";
import TimeSlot from "./TimeSlot";
import AppointmentDetails, {
  AppointmentDatasType,
} from "../AppointmentDetails";

const Day: React.FC<{ day: DateTime }> = ({ day }) => {
  const [timeslotDetails, setTimeslotDetails] =
    useState<AppointmentDatasType | null>(null);

  // TODO accept dynamic opening hours
  const apps = [{ date: "today", hour: 8, minute: 30 }]; // ? should be fetched data
  1;
  const appsHourFormats = apps.map(
    ({ hour, minute }) =>
      hour.toString().padStart(2, "0") + ":" + minute.toString()
  );

  // TODO handle fetching appointment data / displaying add appointment form (if no appointment)
  const handleTimeSlotClick = (time: string) => {
    const fullDate = day.toFormat("dd.MM.yyyy") + " - " + time;
    console.log(fullDate);

    setTimeslotDetails({
      title: "brazilian",
      description: "wax that arm (?)",
      client: "one of the coen brothers",
      date: {
        year: 2023,
        month: 5,
        day: 29,
        hour: 15,
        minute: 30,
        hourDiff: 0,
        minuteDiff: 0,
      },
      notes: "buff dude",
      contactNumber: "0545454545",
      businessId: "someid",
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
          appointmentData={timeslotDetails}
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
