/* eslint-disable semi */
import React from 'react';
// eslint-disable-next-line no-unused-vars
import ItemList from '../ListItem/ListItem';

function List({ list, deleteSuperAdmin }) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Last name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => (
            <ItemList key={index} listItem={item} deleteSuperAdmin={deleteSuperAdmin} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default List;
