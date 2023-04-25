import { useEffect, useRef } from "react";

const useClickOutside = (
  callback: () => void,
  disableEscape: boolean = false
): React.RefObject<HTMLDivElement> => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback();
    }
  };

  const handlePressEscape = (e: KeyboardEvent) => {
    if (e.code === "Escape") callback();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    if (!disableEscape) document.addEventListener("keydown", handlePressEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (!disableEscape)
        document.removeEventListener("keydown", handlePressEscape);
    };
  }, []);

  return ref;
};

export default useClickOutside;
