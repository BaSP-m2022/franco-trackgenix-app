/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
// import style from './table.module.css';
import React from 'react';

const TableHeadItem = ({ item }) => <th>{item.heading}</th>;
const TableRow = ({ item, column }) => (
  <tr>
    {column.map((columnItem, index) => {
      if (columnItem.value.includes('.')) {
        const itemSplit = columnItem.value.split('.');
        return <td>{item[itemSplit[0]][itemSplit[1]]}</td>;
      }
      return <td>{item[`${columnItem.value}`]}</td>;
    })}
  </tr>
);

const Table = ({ data, column, deleteItem }) => {
  return (
    <table>
      <thead>
        <tr>
          {column.map((item, index) => (
            <TableHeadItem key={index} item={item} />
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {data.map((item, index) => (
            <div>
              <TableRow key={index} item={item} column={column} />
              <button onClick={() => deleteItem(item._id)}>X</button>
              <a href={`/time-theets/form?id=${item._id}`}>edit</a>
            </div>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
