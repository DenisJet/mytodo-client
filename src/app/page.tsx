'use client';
import styles from './page.module.css';
import useSWR from 'swr';
import { getAllTodos } from '@/services/todoServices';
import { Footer, TodoCard, TodoCardProps } from '@/components';
import { useRouter } from 'next/navigation';
import { AddButton } from '@/components/AddButton/AddButton';

export default function Home(): JSX.Element {
  const { data: todos, error, isLoading } = useSWR('todos', getAllTodos);
  const router = useRouter();

  const inProgressTodos = todos
    ?.filter((todo: TodoCardProps) => todo.isDone == false || todo.isDone == undefined)
    .reverse();

  const newDate = new Date();
  const date = `${newDate.toLocaleString('en', { month: 'short' })}, ${newDate.getDate()}`;
  console.log(date);

  if (error) return <h2>Error</h2>;
  if (isLoading) return <h2>Loading...</h2>;

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.title}>My ToDo App</h1>
        <p className={styles.date}>{date}</p>
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
        <AddButton />
      </main>
      <Footer />
    </div>
  );
}
