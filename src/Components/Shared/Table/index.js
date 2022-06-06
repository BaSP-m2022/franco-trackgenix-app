import './table.module.css';
import React from 'react';

const TableHeadItem = ({ item }) => <th>{item.heading}</th>;
const TableRow = ({ item, column, deleteItem }) => (
  <tr>
    {column.map((columnItem, index) => {
      if (columnItem.value.includes('.')) {
        const itemSplit = columnItem.value.split('.');
        return <td>{item[itemSplit[0]][itemSplit[1]]}</td>;
      }
      return <td key={index}>{item[`${columnItem.value}`]}</td>;
    })}
    <button onClick={() => deleteItem(item._id)}>X</button>
    <a href={`/time-sheets/form?id=${item._id}`}>edit</a>
  </tr>
);

const Table = ({ data, column }) => {
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
        {data.map((item, index) => (
          <TableRow key={index} item={item} column={column} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
