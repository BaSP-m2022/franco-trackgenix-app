import React from 'react';
import AdminsItem from './ListItem/AdminsItem';
import './list.module.css';

const List = ({ adminsList, deleteAdmin }) => {
  console.log('Admins list', adminsList);

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th id="id">ID</th>
            <th id="password">Password</th>
            <th id="email">Email</th>
            <th id="fname">First Name</th>
            <th id="lname">Last Name</th>
          </tr>
        </thead>
        <tbody>
          {adminsList.map((item) => (
            <AdminsItem key={item.id} adminsItem={item} deleteAdmin={deleteAdmin} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
