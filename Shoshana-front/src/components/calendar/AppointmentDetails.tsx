import React from "react";
import Modal from "../common/Modal";

export type AppointmentDatasType = {
  title: string;
  description: string;
  client: string;
  date: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    hourDiff: number;
    minuteDiff: number;
  };
  notes: string;
  contactNumber: string;
  businessId: string;
};

const AppointmentDetails: React.FC<{
  className?: string;
  appointmentData: AppointmentDatasType;
  onClose: () => void;
}> = ({ appointmentData, onClose }) => {
  const { client, description, title, contactNumber, notes } = appointmentData;

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col justify-center items-center">
        <span>{title}</span>
        <span>{client}</span>
        <span>{contactNumber}</span>
        <span>{notes}</span>
        <span>{description}</span>
      </div>
    </Modal>
  );
};

export default AppointmentDetails;
