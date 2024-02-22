'use client';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { getAllTodos } from '@/services/todoServices';
import { Footer, TodoCard, TodoCardProps } from '@/components';
import { AddButton } from '@/components/AddButton/AddButton';

export default function CompletedTask(): JSX.Element {
  const { data: todos, error, isLoading } = useSWR('todos', getAllTodos);
  const router = useRouter();

  const doneTodos = todos?.filter((todo: TodoCardProps) => todo.isDone == true).reverse();

  if (error) return <h2>Error</h2>;
  if (isLoading) return <h2>Loading...</h2>;

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <button type='button' className={styles.headerButton} onClick={() => router.push('/')}>
          &lArr;
        </button>
        <h1 className={styles.title}>Completed Task</h1>
      </header>
      <main className={styles.main}>
        <ul className={styles.list}>
          {doneTodos &&
            doneTodos.map((todo: TodoCardProps) => (
              <li className={styles.listItem} key={todo._id}>
                <TodoCard title={todo.title} description={todo.description} isDone={todo.isDone} _id={todo._id} />
              </li>
            ))}
        </ul>
        <AddButton />
      </main>
      <Footer />
    </div>
  );
}
