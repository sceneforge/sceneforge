import styles from './IconOpenFile.module.css';

export const IconOpenFile = () => {
  return (
    <span aria-hidden="true" className={styles.wrapper}>
      <span aria-hidden="true" className={styles.back}></span>
      <span aria-hidden="true" className={styles.front}></span>
    </span>
  )
}