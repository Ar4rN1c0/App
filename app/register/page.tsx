import registerUser from "@/Actions/registerUser"
import styles from "@/app/register/register.module.css"


export default function RegisterPage() {
    return (
        <main className={styles.main}>
            <form className={styles.form} action={registerUser} >
                <input  className={styles.input} placeholder="Introduce your name" name="name" type="text" />
                <input  className={styles.input} placeholder="Introduce your surname" name="surname" type="text" />
                <input  className={styles.input} placeholder="Introduce your email" name="email" type="text" />
                <input  className={styles.input} placeholder="Introduce password" name="password" type="password" />
                <button className={styles.submit} type="submit">Submit</button>
            </form>
        </main>
    )
}