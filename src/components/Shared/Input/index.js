import styles from './input.module.css';

function Input({
  label = '',
  fixedWidth = 1,
  name,
  type,
  value,
  placeholder,
  error,
  onChange,
  min,
  max
}) {
  return (
    <div className={`${styles.container} ${!fixedWidth && styles.containerWidth}`}>
      <label className={`${styles.label} ${error && styles.labelError}`} htmlFor={name}>
        {label ? label : name}
      </label>
      <input
        name={name}
        type={type}
        value={value}
        min={min}
        max={max}
        placeholder={placeholder}
        className={`${styles.input} ${error && styles.inputError}`}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
      <p className={styles.errorMessage}>{error}</p>
    </div>
  );
}
export default Input;
