'use client';
import styles from './page.module.css';
import useSWR from 'swr';
import { getAllTodos } from '@/services/todoServices';
import { TodoCard, TodoCardProps } from '@/components';
import { useRouter } from 'next/navigation';

export default function Home(): JSX.Element {
  const { data: todos, error, isLoading } = useSWR('todos', getAllTodos);
  const router = useRouter();

  const inProgressTodos = todos
    ?.filter((todo: TodoCardProps) => todo.isDone == false || todo.isDone == undefined)
    .reverse();

  if (error) return <h2>Error</h2>;
  if (isLoading) return <h2>Loading...</h2>;

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.title}>My ToDo App</h1>
      </header>
      <main className={styles.main}>
        <ul className={styles.list}>
          {inProgressTodos &&
            inProgressTodos.map((todo: TodoCardProps) => (
              <li className={styles.listItem} key={todo._id}>
                <TodoCard title={todo.title} description={todo.description} isDone={todo.isDone} _id={todo._id} />
              </li>
            ))}
        </ul>
        <button type='button' className={styles.addButton} onClick={() => router.push('/addtask')}>
          +
        </button>
      </main>
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
    </div>
  );
}
