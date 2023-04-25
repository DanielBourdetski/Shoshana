import React from "react";
import Modal from "./common/Modal";

export type AppointmentDetailsType = {
  client: string;
  time: string;
  date: string;
  description: string;
};

const AppointmentDetails: React.FC<{
  className?: string;
  appointmentDetails: AppointmentDetailsType;
  onClose: () => void;
}> = ({ appointmentDetails, onClose }) => {
  const { client, time, date, description } = appointmentDetails;
  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col justify-center items-center">
        <span>{client}</span>
        <span>{time}</span>
        <span>{date}</span>
        <span>{description}</span>
      </div>
    </Modal>
  );
};

export default AppointmentDetails;
