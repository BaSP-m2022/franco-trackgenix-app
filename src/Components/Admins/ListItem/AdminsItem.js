import React from 'react';
import styles from './adminsItem.module.css';

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
        <a id="delete" className={styles.button} onClick={() => handleDelete(listItem._id)}>
          &#10008;
        </a>
        <a id="edit" className={styles.button} href={`/admins/form?id=${listItem._id}`}>
          &#9998;
        </a>
      </td>
    </tr>
  );
}

export default AdminsItem;
