import styles from './sd.module.css';

function SelectDropdown(props) {
  return (
    <select
      name={props.props}
      value={props.value}
      disabled={props.disabled}
      onChange={props.onChange}
      required={props.required}
      pattern={props.pattern}
      className={styles.select}
    >
      <option value="" disabled>
        Select one
      </option>
      {props.options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default SelectDropdown;
