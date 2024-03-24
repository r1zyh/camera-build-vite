import styles from './no-match.module.css';

function NoMatch() {
  return (
    <div className={styles.cardsContainer}>
      <div className={styles.textContainer}>
        <p className={styles.text}>По вашему запросу ничего не найдено. :(</p>
      </div>
    </div>
  );
}

export default NoMatch;
