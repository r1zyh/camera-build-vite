import { Link } from 'react-router-dom';
import styles from './not-found.module.css';
import { AppRoute } from '../../const';

function NotFoundPage(): JSX.Element {
  return (
    <div className={`page ${styles.notFoundPage}`}>
      <title>{'6 cities - Not Found'}</title>
      <h1 className={styles.title}>404 Not Found</h1>
      <p className={styles.text}>
        Return to the{' '}
        <Link to={AppRoute.Main} className={styles.link}>
          main page
        </Link>
      </p>
    </div>
  );
}

export default NotFoundPage;
