// components/Timer.js
import React, { useEffect } from 'react';

function Timer({ start, seconds, setSeconds }) {

  useEffect(() => {
    let timer;
    if (start !== undefined) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [start]);

  return <div className="timer">Time: {seconds} seconds</div>;
}

export default Timer;
