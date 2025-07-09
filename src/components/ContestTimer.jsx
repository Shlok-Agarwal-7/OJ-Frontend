import { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

const ContestTimer = ({ start, end }) => {
  const [remaining, setRemaining] = useState(null);

  useEffect(() => {
    const updateTimer = () => {
      const now = dayjs();
      const diff = end.diff(now); // milliseconds until end
      if (diff <= 0) {
        setRemaining(dayjs.duration(0));
      } else {
        setRemaining(dayjs.duration(diff));
      }
    };

    updateTimer(); // Initial call
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [start, end]);

  const formatDuration = (duration) => {
    const hours = String(duration.hours()).padStart(2, "0");
    const minutes = String(duration.minutes()).padStart(2, "0");
    const seconds = String(duration.seconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="text-white text-xl font-mono">
      ⏱ Contest ends in: {remaining ? formatDuration(remaining) : "Loading..."}
    </div>
  );
};

export default ContestTimer;
