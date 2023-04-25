import { DateTime } from "luxon";

// ! everything here is untested

type Locale = "en-US" | "en-GB" | "he-IL";

export function getMonthDays(year: number, month: number): DateTime[] | void {
  const today = DateTime.local();

  const daysInMonth = DateTime.local(year, month, 1).daysInMonth;

  if (daysInMonth === undefined)
    return console.error("error: daysInMonth is undefined");

  const daysArray = [];

  for (let i = 1; i < daysInMonth; i++) {
    const day = DateTime.local(today.year, today.month, i);
    daysArray.push(day);
  }

  return daysArray;
}

export function toStringWeekDay(
  dayDT: DateTime,
  format: Locale = "en-GB"
): string {
  // ? there might be issues caused by standart differences between dayDT and the Date API default standart
  const dayDate = new Date(dayDT.toString());

  const dayString = dayDate.toLocaleDateString(format, { weekday: "long" });

  if (format === "he-IL") {
    const indexOfSpaceBeforeWeekday = dayString.indexOf(" ");
    const dayStringShort = dayString.slice(indexOfSpaceBeforeWeekday);
    return dayStringShort;
  }

  return dayString;
}

export function toUTCDate(localDate: DateTime): DateTime {
  return localDate.toUTC();
}

export function toLocaleDate(utcDate: DateTime): DateTime {
  return utcDate.toLocal();
}

export function getIntervals(
  from: { hour: number; minute: number },
  to: { hour: number; minute: number },
  interval: number
): string[] {
  const start = DateTime.fromObject({ hour: from.hour, minute: from.minute });
  const end = DateTime.fromObject({ hour: to.hour, minute: to.minute });

  let current = start;
  const intervals = [];

  while (current < end) {
    intervals.push(current.toFormat("HH:mm"));
    current = current.plus({ minutes: interval });
  }

  return intervals;
}
