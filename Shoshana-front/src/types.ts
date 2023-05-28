export type Appointment = {
  title: string;
  description: string;
  client: string;
  date: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
  };
  notes: string;
  contactNumber: string;
  businessId: string;
};
