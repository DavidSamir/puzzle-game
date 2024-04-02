


import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';


const Scoreboard = ({ seconds }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {

    axios.get('http://localhost:3000/api/v1/sudoku')
    .then(response => {
      if (response.status ==200 ) {
        setTableData(response.data)
      }
      // Handle success if needed
    })
    .catch(error => {
      console.log(error)
      const localStorageData = JSON.parse(localStorage.getItem('sudokuScore'));
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
            <th className="table-header">Incorrect Cells</th>
            <th className="table-header">Empty Cells</th>
            <th className="table-header">Date</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index} className="table-row">
              <td className="table-data">{item.time} <small>Seconds</small></td>
              <td className="table-data">{item.incorrectCells?item.incorrectCells:item.incorrect_cells}</td>
              <td className="table-data">{item.emptyCells?item.emptyCells:item.empty_cells}</td>
              <td className="table-data">{moment(item.date).fromNow()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};

export default Scoreboard;
