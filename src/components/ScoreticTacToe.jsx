


import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';

const ScoreTicTacToe = ({ seconds }) => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {

    axios.get('http://165.232.75.204:3000/api/v1/ticTacToe')
    .then(response => {
      if (response.status ==200 ) {
        setTableData(response.data)
      }
    })
    .catch(error => {
      console.log(error)
      const localStorageData = JSON.parse(localStorage.getItem('ticTacToe'));
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
            <th className="table-header">Winner</th>
            <th className="table-header">Date</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index} className="table-row">
              <td className="table-data">{item.time} <small>Seconds</small></td>
              <td className="table-data">{item.winner}</td>
              <td className="table-data">{moment(item.date).fromNow()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};

export default ScoreTicTacToe;
