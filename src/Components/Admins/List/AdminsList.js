import React from 'react';
import AdminsItem from '../ListItem/AdminsItem';
import styles from './list.module.css';

const List = ({ list, deleteAdmin }) => {
  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Password</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <AdminsItem key={item._id} listItem={item} deleteAdmin={deleteAdmin} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
