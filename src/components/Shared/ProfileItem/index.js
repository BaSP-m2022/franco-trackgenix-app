import styles from './profileItem.module.css';

function ProfileItem({ label, text }) {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <div className={styles.textContainer}>
        <p className={styles.text}>{text}</p>
      </div>
    </div>
  );
}
export default ProfileItem;
