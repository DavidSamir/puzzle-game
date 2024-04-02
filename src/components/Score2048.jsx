


import React, { useState, useEffect } from 'react';
import moment from 'moment';

const Scoreboard = ({ seconds }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem('2048'));
    if (localStorageData) {
      // Sort tableData in reverse order based on the 'time' property
      const sortedData = localStorageData.sort((a, b) => b.time - a.time);
      setTableData(sortedData);
    }

  }, [seconds]);

  return (
    <div className="table-container">
      <h2>Score</h2>
      <table className="table">
        <thead>
          <tr>
            <th className="table-header">Time</th>
            <th className="table-header">Score</th>
            <th className="table-header">Date</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index} className="table-row">
              <td className="table-data">{item.time} <small>Seconds</small></td>
              <td className="table-data">{item.score}</td>
              <td className="table-data">{moment(item.date).fromNow()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};

export default Scoreboard;
