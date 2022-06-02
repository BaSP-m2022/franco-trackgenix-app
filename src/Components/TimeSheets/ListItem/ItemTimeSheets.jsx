import React from 'react';
import './item-time-sheets.module.css';

const TimeSheetItem = ({ listItem, deleteTimeSheet }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this time sheet?')) {
      deleteTimeSheet(listItem._id);
    }
  };

  let pencil = '✎';
  let del = '✘';

  return (
    <tr>
      <td>{listItem._id}</td>
      <td>{listItem.task}</td>
      <td>{listItem.totalHours}</td>
      <td>{listItem.status}</td>
      <td>{listItem.startDate}</td>
      <td>{listItem.endDate}</td>
      <td>
        {listItem.employeeId?.firstName} {listItem.employeeId?.lastName}
      </td>
      <td>
        <a href={`/time-theets/form?id=${listItem._id}`}>{pencil}</a>
      </td>
      <td>
        <button onClick={() => handleDelete()}>{del}</button>
      </td>
    </tr>
  );
};

export default TimeSheetItem;
