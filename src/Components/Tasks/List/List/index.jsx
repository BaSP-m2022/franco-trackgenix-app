import React from 'react';
import ListItem from '../ListItem/Index';
import styles from './List.module.css';

const List = ({ list, deleteItem }) => {
  // console.log("array list", list);
  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <th id="_id">Id</th>
            <th id="description">Description</th>
            <th id="projectName">Project Name</th>
            <th id="workedHours">Worked Hours</th>
            <th id="date">Date</th>
            <th id="delEdit">Delete/Edit</th>
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
