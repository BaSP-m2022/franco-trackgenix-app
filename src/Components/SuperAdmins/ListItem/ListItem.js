import React from 'react';
import styles from './listItem.module.css';

function ListItem({ listItem, deleteSuperAdmin }) {
  const handleDelete = () => {
    let confirm = window.confirm(
      `Are you sure you want to delete Super Admin ${listItem.firstName}?`
    );
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
        <button className={styles.btn} onClick={() => handleDelete(listItem._id)}>
          &#10008;
        </button>
        <a className={styles.btn} href={`/super-admins/edit?id=${listItem._id}`}>
          &#9998;
        </a>
      </td>
    </tr>
  );
}

export default ListItem;
