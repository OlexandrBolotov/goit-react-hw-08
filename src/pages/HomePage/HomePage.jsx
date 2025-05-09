import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Welcome to ContactBook</h1>
      <p className={styles.text}>
        This is your personal space to manage contacts. Register or log in to begin.
      </p>
    </div>
  );
};

export default HomePage;
