import { Link } from 'react-router-dom';
import styles from './error.module.css';
import { AppRoute } from '../../const';

function ErrorComponent() {
  return (
    <div className={`page ${styles.errorPage}`} data-testid="error">
      <title>{'Camera-shop - Error'}</title>
      <h1 className={styles.title}>Error</h1>
      <p className={styles.text}>
        Return to the{' '}
        <Link to={AppRoute.Main} className={styles.link}>
          main page
        </Link>
      </p>
    </div>
  );
}

export default ErrorComponent;
