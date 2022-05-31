import React from 'react';
import ListItem from '../ListItem';
import './employees-list.module.css';

const List = ({ list, deleteItem }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Last Name</th>
            <th>DNI</th>
            <th>Email</th>
            <th>Date Of Birth</th>
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
