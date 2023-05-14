import React, { MouseEventHandler } from "react";

const Button: React.FC<{
  title: string;
  submit?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}> = ({ title, onClick = () => {}, submit = false }) => {
  return (
    <button
      onClick={onClick}
      type={submit ? "submit" : "button"}
      className={`p-1 px-4 my-2 border border-slate-600 rounded hover:bg-slate-200 duration-150`}
    >
      {title}
    </button>
  );
};

export default Button;
