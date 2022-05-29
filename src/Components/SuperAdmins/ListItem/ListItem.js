import React from 'react';

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
        <button onClick={() => handleDelete(listItem._id)}>X</button>
      </td>
    </tr>
  );
}

export default ListItem;
