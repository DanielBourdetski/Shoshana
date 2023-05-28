import { Appointment } from "../types";

const appointments: Appointment[] = [
  {
    date: {
      year: 2023,
      month: 5,
      day: 1,
      hour: 9,
      minute: 0,
    },
    title: "Team Meeting",
    description: "Discuss project updates",
    notes: "",
    client: "John Doe",
    businessId: "64649a5e86dfbb1739b4093a",
    contactNumber: "0545454545",
  },
  {
    date: {
      year: 2023,
      month: 5,
      day: 5,
      hour: 14,
      minute: 30,
    },
    title: "Presentation",
    description: "Presenting new product features",
    notes: "Bring sample prototypes",
    client: "Jane Smith",
    businessId: "64649a5e86dfbb1739b4093a",
    contactNumber: "0565656565",
  },
  {
    date: {
      year: 2023,
      month: 5,
      day: 10,
      hour: 11,
      minute: 0,
    },
    title: "Client Meeting",
    description: "Discuss project requirements",
    notes: "",
    client: "Alex Johnson",
    businessId: "64649a5e86dfbb1739b4093a",
    contactNumber: "0585858585",
  },
  {
    date: {
      year: 2023,
      month: 5,
      day: 15,
      hour: 16,
      minute: 0,
    },
    title: "Training Session",
    description: "Providing training on software usage",
    notes: "Prepare training materials",
    client: "Emily Brown",
    businessId: "64649a5e86dfbb1739b4093a",
    contactNumber: "0575757575",
  },
  {
    date: {
      year: 2023,
      month: 5,
      day: 20,
      hour: 13,
      minute: 30,
    },
    title: "Business Luncheon",
    description: "Networking event with industry professionals",
    notes: "Bring business cards",
    client: "Michael Kim",
    businessId: "64649a5e86dfbb1739b4093a",
    contactNumber: "0595959595",
  },
  {
    date: {
      year: 2023,
      month: 5,
      day: 25,
      hour: 10,
      minute: 0,
    },
    title: "Project Review",
    description: "Evaluating project progress",
    notes: "Gather project documentation",
    client: "Sarah Davis",
    businessId: "64649a5e86dfbb1739b4093a",
    contactNumber: "0535353535",
  },
];

const CalendarService = {};

const getAppointments = () => appointments;

export default {
  getAppointments,
};
