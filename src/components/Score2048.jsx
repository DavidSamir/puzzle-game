


import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';

const Scoreboard = ({ seconds }) => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {

    axios.get('http://localhost:3000/api/v1/twenty48')
      .then(response => {
        if (response.status == 200) {
          setTableData(response.data)
        }
        // Handle success if needed
      })
      .catch(error => {
        console.log(error)
        const localStorageData = JSON.parse(localStorage.getItem('2048'));
        if (localStorageData) {
          const sortedData = localStorageData.sort((a, b) => b.time - a.time);
          setTableData(sortedData);
        }
      });

  }, []);

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
