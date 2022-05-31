import React from 'react';
import './employees.module.css';
import ListItem from './ListItem';

const List = ({ list, deleteItem }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Active</th>
          </tr>
        </thead>
        <ListItem listItem={list} deleteItem={deleteItem} />
      </table>
    </div>
  );
};

export default List;
