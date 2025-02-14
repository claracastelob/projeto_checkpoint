import styles from "./styles.module.css"

export default function CreateAccount() {
  return(
    <div>
      <div className={styles.wrapper}>
            <div className={styles.container}>
              <h2>Create Account</h2>
              <form>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" required />
                <label htmlFor="email">Email</label>
                <input type="email" id="email" required />
                <label htmlFor="emailConfirm">Email Confirmation</label>
                <input type="email" id="emailConfirm" required />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" required />
                <button>Submit</button>
              </form>
            </div>
          </div>
    </div>
  )
}