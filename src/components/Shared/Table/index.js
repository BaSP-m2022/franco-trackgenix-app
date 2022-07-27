import styles from './table.module.css';
import Button from '../Button';

const TableHeadItem = ({ item }) => <th className={styles.headTable}>{item.heading}</th>;

const TableRow = ({
  item,
  column,
  deleteItem,
  editItem,
  buttons,
  modal,
  arrayName,
  handleRowClick
}) => (
  <tr className={styles.containerTable}>
    {column.map((columnItem, index) => {
      if (columnItem.value.includes('.')) {
        const itemSplit = columnItem.value.split('.');
        if (item[itemSplit[0]]) {
          return (
            <td onClick={handleRowClick} data-id={item._id} key={index}>
              {item[itemSplit[0]][itemSplit[1]]}
            </td>
          );
        }
        return (
          <td key={index} onClick={handleRowClick} data-id={item._id}>
            No {columnItem.heading}
          </td>
        );
      }
      if (item[`${columnItem.value}`] instanceof Array) {
        return (
          <td className={styles.buttonTd} key={index}>
            {item[`${columnItem.value}`].length > 0 ? (
              <Button handler={() => modal(item[`${columnItem.value}`])} text="Show All" />
            ) : (
              <p>No {arrayName}</p>
            )}
          </td>
        );
      }
      if (columnItem.value.toLowerCase().includes('date')) {
        return (
          <td key={index} onClick={handleRowClick} data-id={item._id}>
            {item[`${columnItem.value}`]?.slice(0, 10)}
          </td>
        );
      }
      return (
        <td key={index} onClick={handleRowClick} data-id={item._id}>
          {item[`${columnItem.value}`]}
        </td>
      );
    })}
    {buttons && (
      <td className={styles.buttonsTableTd}>
        <div className={styles.buttonsTableContainer}>
          <button className={styles.buttonTable} onClick={() => editItem(item._id)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z" />
            </svg>
          </button>
          <button className={styles.buttonTable} onClick={() => deleteItem(item._id)}>
            <svg
              className={styles.deleteSvg}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58173 12.4183 0 8 0C3.58173 0 0 3.58173 0 8C0 12.4183 3.58173 16 8 16ZM6.0303 4.96967C5.73743 4.67679 5.26257 4.67679 4.96967 4.96967C4.67676 5.26257 4.67676 5.73743 4.96967 6.0303L6.9393 8L4.96967 9.9697C4.67676 10.2626 4.67676 10.7374 4.96967 11.0303C5.26257 11.3232 5.73743 11.3232 6.0303 11.0303L8 9.0607L9.9697 11.0303C10.2626 11.3232 10.7374 11.3232 11.0303 11.0303C11.3232 10.7374 11.3232 10.2626 11.0303 9.9697L9.0607 8L11.0303 6.0303C11.3232 5.73743 11.3232 5.26257 11.0303 4.96967C10.7374 4.67679 10.2626 4.67679 9.9697 4.96967L8 6.9393L6.0303 4.96967Z"
              />
            </svg>
          </button>
        </div>
      </td>
    )}
  </tr>
);

const Table = ({
  data,
  column,
  deleteItem,
  editItem,
  buttons,
  modal,
  arrayName,
  handleRowClick
}) => {
  return (
    <table className={styles.tableMain}>
      <thead>
        <tr>
          {column.map((item, index) => (
            <TableHeadItem key={index} item={item} />
          ))}
          {buttons && <th></th>}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <TableRow
            key={index}
            item={item}
            deleteItem={deleteItem}
            column={column}
            editItem={editItem}
            buttons={buttons}
            modal={modal}
            arrayName={arrayName}
            handleRowClick={handleRowClick}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
