'use client';
import styles from './page.module.css';
import useSWR from 'swr';
import { getAllTodos } from '@/services/todoServices';
import { NewTodoForm, TodoCard, TodoCardProps } from '@/components';

export default function Home(): JSX.Element {
  const { data: todos, isLoading } = useSWR('todos', getAllTodos);

  const awaitsTodos = todos
    ?.filter((todo: TodoCardProps) => todo.state == 'awaits' || todo.state == undefined)
    .reverse();
  const inProcessTodos = todos?.filter((todo: TodoCardProps) => todo.state == 'in progress').reverse();
  const doneTodos = todos?.filter((todo: TodoCardProps) => todo.state == 'done').reverse();

  return isLoading ? (
    <h2>Loading....</h2>
  ) : (
    <>
      <main className={styles.main}>
        <div className={styles.titleContainer}>
          <h1 className={styles.mainTitle}>My ToDo App</h1>
        </div>
        <div className={styles.listContainer}>
          <ul className={styles.list}>
            {awaitsTodos &&
              awaitsTodos.map((todo: TodoCardProps) => (
                <li className={styles.listItem} key={todo._id}>
                  <TodoCard title={todo.title} description={todo.description} state={todo.state} _id={todo._id} />
                </li>
              ))}
          </ul>
        </div>
      </main>
    </>
  );
}
