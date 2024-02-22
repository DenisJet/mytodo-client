import styles from './AddButton.module.css';
import { useRouter } from 'next/navigation';

export const AddButton = (): JSX.Element => {
  const router = useRouter();

  return (
    <button type='button' className={styles.addButton} onClick={() => router.push('/addtask')}>
      +
    </button>
  );
};
