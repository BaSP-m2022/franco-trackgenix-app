import React from 'react';
import TimeSheetItem from '../ListItem/ItemTimeSheets.jsx';
import './list.module.css';

const List = ({ list, deleteTimeSheet }) => {
  console.log('array list', list);
  return (
    <table>
      <thead>
        <tr>
          <th id="_id">ID</th>
          <th id="task">Task</th>
          <th id="totalHours">Total Hours</th>
          <th id="status">Status</th>
          <th id="startDate">Start Date</th>
          <th id="endDate">End Date</th>
          <th id="employeeId">Employee ID</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item) => (
          <TimeSheetItem key={item._id} listItem={item} deleteTimeSheet={deleteTimeSheet} />
        ))}
      </tbody>
    </table>
  );
};

export default List;
