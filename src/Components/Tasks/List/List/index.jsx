import React from 'react';
import ListItem from '../ListItem/Index';
import styles from './List.module.css';

const List = ({ list, deleteItem }) => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.rws}>
            <th id="_id" className={styles.rws}>
              Id
            </th>
            <th id="description" className={styles.rws}>
              Description
            </th>
            <th id="projectName" className={styles.rws}>
              Project Name
            </th>
            <th id="workedHours" className={styles.rws}>
              Worked Hours
            </th>
            <th id="date" className={styles.rws}>
              Date
            </th>
            <th id="delEdit" className={styles.rws}>
              Delete/Edit
            </th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <ListItem key={item._id} listItem={item} deleteItem={deleteItem} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
