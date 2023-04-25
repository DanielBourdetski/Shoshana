export type Appointment = {
  dateUTC: {
    year: number;
    month: number;
    day: number;
  };
  hour: string;
  title: string;
  details: string;
  client: string;
};

const appointments: Appointment[] = [
  {
    dateUTC: {
      year: 2023,
      month: 4,
      day: 15,
    },
    hour: "14:30:00",
    title: "Virtual conference",
    details: "Attending talks on AI and machine learning",
    client: "Michael Kim",
  },
  {
    dateUTC: {
      year: 2023,
      month: 4,
      day: 13,
    },
    hour: "10:00:00",
    title: "Dinner with family",
    details: "Celebrating a birthday",
    client: "Rachel Lee",
  },
  {
    dateUTC: {
      year: 2023,
      month: 4,
      day: 23,
    },
    hour: "16:00:00",
    title: "Gym session",
    details: "Strength training and cardio",
    client: "Jonathan Smith",
  },
  {
    dateUTC: {
      year: 2023,
      month: 4,
      day: 3,
    },
    hour: "11:30:00",
    title: "Book club meeting",
    details: "Discussing a contemporary novel",
    client: "Emily Davis",
  },
  {
    dateUTC: {
      year: 2023,
      month: 4,
      day: 30,
    },
    hour: "13:00:00",
    title: "Movie night",
    details: "Watching a sci-fi thriller",
    client: "Robert Johnson",
  },
];

const CalendarService = {};

const getAppointments = () => appointments;

export default {
  getAppointments,
};
