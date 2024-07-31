import { useRouteError } from "react-router-dom";
import styles from '../Styles/Error.module.css'
import { Header } from '../Componnents/Header';
import { Footer } from '../Componnents/Footer';

export const Error = () => {
    const error = useRouteError();
    return (
        <div>
            <Header></Header>
            <div className={styles.error}>
                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p>
                    <i>{error.statusText || error.message}</i>
                </p>
            </div>
            <Footer />
        </div>
    )
}
