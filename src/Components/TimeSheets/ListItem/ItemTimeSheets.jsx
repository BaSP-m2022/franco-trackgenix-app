import React from 'react';
// import styles from './item-time-sheets.module.css';

const TimeSheetItem = ({ listItem, deleteTimeSheet }) => {
  console.log('Time sheets list', listItem);

  const handleDelete = () => deleteTimeSheet(listItem._id);

  return (
    <tr>
      <td>{listItem._id}</td>
      <td>{listItem.task}</td>
      <td>{listItem.totalHours}</td>
      <td>{listItem.status}</td>
      <td>{listItem.startDate}</td>
      <td>{listItem.endDate}</td>
      {/* <td>{listItem.employeeId}</td> */}
      <td>
        <button onClick={() => handleDelete(listItem._id)}>X</button>
      </td>
    </tr>
  );
};

export default TimeSheetItem;
