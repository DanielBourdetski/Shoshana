import { DateTime } from "luxon";
import React from "react";
import Modal from "../common/Modal";

const DayDetails: React.FC<{ date: DateTime; onClose: () => void }> = ({
  date,
  onClose,
}) => {
  return (
    <Modal onClose={onClose}>
      <div>{date.day}</div>
    </Modal>
  );
};

export default DayDetails;
