


import React, { useState, useEffect } from 'react';
import moment from 'moment';

const Scoreboard = ({seconds}) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem('sudokuScore'));
    if (localStorageData) {
      setTableData(localStorageData);
    }
  }, [seconds]);

  return (
    <div className="table-container">
      <h2>Table Data</h2>
      <table className="table">
        <thead>
          <tr>
            <th className="table-header">Time</th>
            <th className="table-header">Incorrect Cells</th>
            <th className="table-header">Empty Cells</th>
            <th className="table-header">Date</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index} className="table-row">
              <td className="table-data">{item.time} <small>Seconds</small></td>
              <td className="table-data">{item.incorrectCells}</td>
              <td className="table-data">{item.emptyCells}</td>
              <td className="table-data">{moment(item.date).fromNow()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};

export default Scoreboard;
