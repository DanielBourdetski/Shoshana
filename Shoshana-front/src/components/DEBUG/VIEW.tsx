import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const VIEW: React.FC<{ setView: Function }> = ({ setView }) => {
  const navigate = useNavigate();

  return (
    <div className="p-2 px-4 bg-white rounded border border-black flex flex-col z-50">
      View:
      <button
        className="rounded border border-black p-2 m-2"
        onClick={() => navigate("/calendar")}
      >
        Month
      </button>
      <button
        className="rounded border border-black p-2 m-2"
        onClick={(e) => navigate("/calendar/month-row")}
      >
        Month Row
      </button>
      <button
        className="rounded border border-black p-2 m-2"
        onClick={(e) => navigate("/calendar/week")}
      >
        Week
      </button>
    </div>
  );
};

export default VIEW;
