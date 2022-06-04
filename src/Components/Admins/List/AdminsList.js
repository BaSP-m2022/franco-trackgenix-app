import React from 'react';
import AdminsItem from '../ListItem/AdminsItem';
import './list.module.css';

const List = ({ list, deleteAdmin }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
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
