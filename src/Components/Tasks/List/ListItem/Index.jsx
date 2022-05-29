import React from 'react';
import styles from './listItem.module.css';

const ListItem = ({ listItem, deleteItem }) => {
  console.log('props', listItem);

  const handleDelete = () => {
    deleteItem(listItem._id);
  };
  return (
    <tr className={styles.rows}>
      <td>{listItem._id}</td>
      <td>{listItem.description}</td>
      <td>{listItem.projectId.name}</td>
      <td>{listItem.workedHours}</td>
      <td>{listItem.date}</td>
      <td>
        <button onClick={() => handleDelete(listItem._id)}>X</button>
      </td>
    </tr>
  );
};

export default ListItem;
