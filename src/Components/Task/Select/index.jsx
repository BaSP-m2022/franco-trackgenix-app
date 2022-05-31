import styles from './select.module.css';

function Select(props) {
  return (
    <select
      name={props.props}
      value={props.value}
      disabled={props.disabled}
      onChange={props.onChange}
      required={props.required}
      patter={props.pattern}
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

export default Select;
