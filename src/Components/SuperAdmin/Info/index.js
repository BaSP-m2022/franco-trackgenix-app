import styles from './info.module.css';

function info({ name, type, value, onChange }) {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>
        {name}:
        <input
          name={name}
          type={type}
          className={styles.input}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
      </label>
    </div>
  );
}
export default info;
