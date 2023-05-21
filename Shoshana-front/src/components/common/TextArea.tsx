import React, { useState } from "react";

type TextAreaProps = {
  className?: string;
  onChange: Function;
  value: string;
  label: string;
  error?: string;
};

const TextArea: React.FC<TextAreaProps> = ({
  className,
  onChange,
  value,
  label,
  error,
}) => {
  const [inputIsFocused, setInputIsFocused] = useState(false);

  const activeLabelClassName = "transform -translate-y-10 text-xs italic";

  return (
    <div className="flex flex-col items-center justify-center relative mb-10 ">
      <div className="relative ">
        <label
          htmlFor={label}
          className={`absolute cursor-text duration-150 left-2 top-5 -translate-y-1/2 text-slate-500 pointer-events-none ${
            value || inputIsFocused ? activeLabelClassName : ""
          }`}
        >
          {label}
        </label>
        <textarea
          className={`min-h-[5em] w-60 rounded-t border-b border-b-blue-400 bg-blue-50 outline-none p-2 ps-4 focus:bg-blue-100 focus:border-b-2 duration-300 ease-in-out ${
            error && "border-b-red-500 bg-red-50 focus:bg-red-100"
          }`}
          id={label}
          onFocus={() => setInputIsFocused(true)}
          onBlur={() => (value ? null : setInputIsFocused(false))}
          onChange={(e) => onChange(e.target.value)}
          value={value}
        />
      </div>
      {error && <div className="text-red-600 w-full text-sm">{error}</div>}
    </div>
  );
};

export default TextArea;
