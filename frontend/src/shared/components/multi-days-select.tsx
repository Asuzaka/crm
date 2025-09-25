const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

interface MultiDaySelectorProps {
  value: string[];
  onChange: (days: string[]) => void;
}

export function MultiDaySelector({ value, onChange }: MultiDaySelectorProps) {
  const toggleDay = (day: string) => {
    if (value.includes(day)) {
      // remove
      onChange(value.filter((d) => d !== day));
    } else {
      // add
      onChange([...value, day]);
    }
  };

  return (
    <div className="flex flex-wrap gap-3 px-2 py-2">
      {days.map((day) => {
        const active = value.includes(day);
        return (
          <button
            key={day}
            type="button"
            onClick={() => toggleDay(day)}
            className={`px-3 py-1 rounded-full border transition 
              ${
                active
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
              }`}
          >
            {day}
          </button>
        );
      })}
    </div>
  );
}
