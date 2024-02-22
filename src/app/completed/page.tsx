'use client';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { getAllTodos } from '@/services/todoServices';
import { TodoCard, TodoCardProps } from '@/components';

export default function CompletedTask(): JSX.Element {
  const { data: todos, isLoading } = useSWR('todos', getAllTodos);
  const router = useRouter();

  const doneTodos = todos?.filter((todo: TodoCardProps) => todo.isDone == true).reverse();

  return isLoading ? (
    <h2>Loading....</h2>
  ) : (
    <>
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
      </main>
    </>
  );
}
