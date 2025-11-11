import { useState, useEffect } from "react";

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  const handleRunClick = () => {
    setRunning((prev) => !prev);
  };

  const handleResetClick = () => {
    setRunning(false);
    setSeconds(0);
  };

  useEffect(() => {
    let interval = null;
    if (running) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [running]);

  const formatTime = (s) => {
    const MINUTE = 60;
    const HOUR = MINUTE * 60;
    const DAY = HOUR * 24;

    const days = Math.floor(s / DAY);
    const hours = Math.floor((s % DAY) / HOUR);
    const minutes = Math.floor((s % HOUR) / MINUTE);
    const secs = s % MINUTE;

    if (days > 0) return `${days}d ${hours}h ${minutes}m ${secs}s`;
    if (hours > 0) return `${hours}h ${minutes}m ${secs}s`;
    if (minutes > 0) return `${minutes}m ${secs}s`;
    return `${secs}s`;
  };

  return (
    <div
      className="bg-secondary bg-opacity-25 border border-2 border-black mx-auto p-3 mt-3 rounded-3 text-center"
      style={{width: 'auto', height:'230px'}}
    >
      <h1 className="text-navy fw-medium">Timer</h1>

      <input
        className="timer-display form-control rounded-3 fs-2 text-center fw-bold border-2 border border-black mb-3"
        value={formatTime(seconds)}
        readOnly
      />

      <div className="d-flex justify-content-center gap-2">
        <button className="btn btn-danger" onClick={handleResetClick}>
          <i className="bi bi-arrow-clockwise"></i>&nbsp;Reset
        </button>
        <button
          className={`btn ${running ? "btn-warning" : "btn-success"}`}
          onClick={handleRunClick}
        >
          {running ? (
            <>
              <i className="bi bi-pause"></i> Pause
            </>
          ) : (
            <>
              <i className="bi bi-play"></i> Run
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Timer;
