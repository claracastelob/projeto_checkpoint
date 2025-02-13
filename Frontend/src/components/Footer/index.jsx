import styles from "./styles.module.css"

export default function Footer(props) {
  return(
    <div className={styles.footer}>
      <p>&copy; 2025 Checkpoint</p>
      <a href="#top" className={styles.ancoraTopo} onClick={props.scrollToTop}>^</a>
    </div>
  )
}