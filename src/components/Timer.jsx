// components/Timer.js
import React, { useState, useEffect } from 'react';

function Timer({ start }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let timer;
    if (start) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [start]);

  return <div className="timer">Time: {seconds} seconds</div>;
}

export default Timer;
