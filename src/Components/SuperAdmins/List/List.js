import React from 'react';
import ItemList from '../ListItem/ListItem';
import './list.module.css';

function List({ list, deleteSuperAdmin }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Last name</th>
          <th>Email</th>
          <th>Delete/Edit</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item, index) => (
          <ItemList key={index} listItem={item} deleteSuperAdmin={deleteSuperAdmin} />
        ))}
      </tbody>
    </table>
  );
}

export default List;
