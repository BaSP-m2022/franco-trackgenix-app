import React from 'react';
import './listItem.module.css';

function ListItem({ listItem, deleteSuperAdmin }) {
  const handleDelete = () => {
    let confirm = window.confirm('Are yo sure yo want to delete de Super Admin?');
    if (confirm) {
      deleteSuperAdmin(listItem._id);
    }
  };
  return (
    <tr>
      <td>{listItem.firstName}</td>
      <td>{listItem.lastName}</td>
      <td>{listItem.email}</td>
      <td>
        <button className="btn delete" onClick={() => handleDelete(listItem._id)}>
          &#10008;
        </button>
        <button className="btn edit">&#9998;</button>
      </td>
    </tr>
  );
}

export default ListItem;
