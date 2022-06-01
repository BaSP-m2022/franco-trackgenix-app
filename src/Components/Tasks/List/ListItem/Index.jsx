import React from 'react';
import styles from './listItem.module.css';

const ListItem = ({ listItem, deleteItem }) => {
  const handleDelete = () => {
    deleteItem(listItem._id);
  };
  let pencil = '✎';
  let del = '✘';
  return (
    <tr className={styles.rows}>
      <td>{listItem._id}</td>
      <td>{listItem.description}</td>
      <td>{listItem.projectId ? listItem.projectId.name : 'Project deleted'}</td>
      <td>{listItem.workedHours}</td>
      <td>{listItem.date}</td>
      <td>
        <button className={styles.button} onClick={() => handleDelete(listItem._id)}>
          {del}
        </button>
        <a className={styles.button} href={`/tasks/form?id=${listItem._id}`}>
          {pencil}
        </a>
      </td>
    </tr>
  );
};

export default ListItem;
