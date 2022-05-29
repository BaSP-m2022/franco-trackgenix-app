import React from 'react';
import './adminsItem.module.css';

function AdminsItem({ listItem, deleteAdmin }) {
  console.log('props', listItem);

  const handleDelete = () => {
    let confirm = window.confirm('Are yo sure yo want to delete Admin?');
    if (confirm) {
      deleteAdmin(listItem._id);
    }
  };

  return (
    <tr>
      <td>{listItem._id}</td>
      <td>{listItem.password}</td>
      <td>{listItem.email}</td>
      <td>{listItem.firstName}</td>
      <td>{listItem.lastName}</td>
      <td>
        <button id="delete" onClick={() => handleDelete(listItem._id)}>
          &#10008;
        </button>
        <button id="edit">&#9998;</button>
      </td>
    </tr>
  );
}

export default AdminsItem;
