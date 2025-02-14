import styles from "./styles.module.css"

export default function Login() {
  return(
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2>Login</h2>
        <form action="">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" required />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" required />
          <button>Login</button>
        </form>
      </div>
    </div>
    
  )
}