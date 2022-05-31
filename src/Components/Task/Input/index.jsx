import styles from './input.module.css';

function Input(props) {
  return (
    <input
      name={props.props}
      value={props.value}
      onChange={props.onChange}
      required={props.required}
      patter={props.pattern}
      type={props.type}
      className={styles.input}
      disabled={props.disabled}
    />
  );
}

export default Input;
