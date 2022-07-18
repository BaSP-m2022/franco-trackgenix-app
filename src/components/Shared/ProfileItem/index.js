import styles from './profileItem.module.css';

function ProfileItem({ label, text }) {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <p className={styles.text}>{text}</p>
    </div>
  );
}
export default ProfileItem;
