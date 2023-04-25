const TimeSlot: React.FC<{
  className?: string;
  app?: boolean;
  time: string;
  onOpenAppointment: Function;
  onCloseAppointment: Function;
}> = ({ className, time, app, onOpenAppointment, onCloseAppointment }) => {
  return (
    <div
      className={`w-full flex-1 flex items-center justify-start px-2 cursor-pointer duration-100 italic text-xs text-blue-800 border-b border-slate-100 last:border-b-0 hover:bg-indigo-300 hover:text-blue-50 relative`}
      onClick={() => onOpenAppointment()}
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {time}
      </div>
      {app && (
        <div className="w-3 h-3 rounded-full bg-green-400 border-[2.5px] border-green-600 bg-opacity-90" />
      )}
    </div>
  );
};

export default TimeSlot;
