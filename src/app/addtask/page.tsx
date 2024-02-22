'use client';
import { TodoForm } from '@/components';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';

export default function AddTask(): JSX.Element {
  const router = useRouter();

  return (
    <>
      <header className={styles.header}>
        <button type='button' className={styles.headerButton} onClick={() => router.push('/')}>
          &lArr;
        </button>
        <h1 className={styles.title}>Add Task</h1>
      </header>
      <main className={styles.main}>
        <TodoForm _id={''} title={''} description={''} />
      </main>
    </>
  );
}
