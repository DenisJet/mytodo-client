import styles from './Footer.module.css';
import { useRouter } from 'next/navigation';

export const Footer = (): JSX.Element => {
  const router = useRouter();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        <div className={styles.buttonContainer} onClick={() => router.push('/')}>
          <button className={styles.footerButton}>
            <img src='/icons/Playlist.svg' alt='' width='30px' height='30px' />
          </button>
          <p className={styles.footerText}>All</p>
        </div>
        <div className={styles.buttonContainer} onClick={() => router.push('/completed')}>
          <button className={styles.footerButton}>
            <img src='/icons/Tick.svg' alt='' width='30px' height='30px' />
          </button>
          <p className={styles.footerText}>Completed</p>
        </div>
      </div>
    </footer>
  );
};
