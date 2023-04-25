import React, { ReactNode } from "react";
import useClickOutside from "../../../hooks/useClickOutside";

const Modal: React.FC<{ onClose: () => void; children: ReactNode }> = ({
  onClose,
  children,
}) => {
  const modalRef = useClickOutside(onClose);

  return (
    <div className="absolute left-0 top-0 w-full h-full bg-cyan-500 bg-opacity-25 flex items-center justify-center z-50 backdrop-blur-sm duration-100 text-white">
      <div
        ref={modalRef}
        className="w-1/2 h-1/3 bg-slate-600 rounded flex items-center justify-center"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
