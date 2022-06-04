import React from 'react';
import styles from './listItem.module.css';

const ListItem = ({ listItem, deleteItem }) => {
  const handleDelete = () => {
    deleteItem(listItem._id);
  };
  let pencil = '✎';
  let del = '✘';
  return (
    <tr className={styles.rws}>
      <td className={styles.rws}>{listItem._id}</td>
      <td className={styles.rws}>{listItem.description}</td>
      <td className={styles.rws}>
        {listItem.projectId ? listItem.projectId.name : 'Project Deleted'}
      </td>
      <td className={styles.rws}>{listItem.workedHours}</td>
      <td className={styles.rws}>{listItem.date}</td>
      <td className={styles.rws}>
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
