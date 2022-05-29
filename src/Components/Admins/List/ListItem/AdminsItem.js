import React from 'react';
import './adminsItem.module.css';

function AdminsItem({ adminsItem, deleteAdmin }) {
  console.log('props', adminsItem);

  const handleDelete = () => {
    let confirm = window.confirm('Are yo sure yo want to delete Admin?');
    if (confirm) {
      deleteAdmin(adminsItem._id);
    }
  };

  return (
    <tr>
      <td>{adminsItem._id}</td>
      <td>{adminsItem.password}</td>
      <td>{adminsItem.email}</td>
      <td>{adminsItem.firstName}</td>
      <td>{adminsItem.lastName}</td>
      <td>
        <button onClick={() => handleDelete(adminsItem._id)}>X</button>
      </td>
    </tr>
  );
}

export default AdminsItem;
