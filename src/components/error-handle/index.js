import styles from './error-handle.module.scss'
const ErrorMessage = () => {
    return (
        <div className={styles.container}>
            <h1>
                Something went wrong
            </h1>
        </div>
    )
}

export default ErrorMessage;