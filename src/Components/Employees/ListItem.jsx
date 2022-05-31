import React from 'react';

const ListItem = ({ listItem, deleteItem }) => {
  const handleDelete = (_id) => {
    deleteItem(_id);
  };

  const test = listItem.map((item) => {
    console.log('item', item);
    return (
      <tr key={item.id}>
        <td>{item.firstName}</td>
        <td>{item.lastName}</td>
        <td>{item.phone}</td>
        <td>{item.email}</td>
        <td>{item.active.toString()}</td>
        <td>
          <button
            onClick={() => {
              const result = confirm('Are you sure you want to delete the selected item?');
              if (result) {
                handleDelete(item._id);
              }
            }}
          >
            X
          </button>
        </td>
      </tr>
    );
  });
  return <>{test}</>;
};

export default ListItem;
