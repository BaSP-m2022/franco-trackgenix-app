import React from 'react';
import styles from './employees-item.module.css';

let pencil = '✎';

const ListItem = ({ listItem, deleteItem }) => {
  const handleDelete = (_id) => {
    deleteItem(_id);
  };
  return (
    <tr key={listItem.id}>
      <td>{listItem.firstName}</td>
      <td>{listItem.lastName}</td>
      <td>{listItem.dni}</td>
      <td>{listItem.email}</td>
      <td>{listItem.dateOfBirth}</td>
      <td>
        <button
          className={styles.button}
          onClick={() => {
            const result = confirm('Are you sure you want to delete the selected item?');
            if (result) {
              handleDelete(listItem._id);
            }
          }}
        >
          X
        </button>
        <a className={styles.button} href={`/employees/form?id=${listItem._id}`}>
          {pencil}
        </a>
      </td>
    </tr>
  );
};

export default ListItem;
