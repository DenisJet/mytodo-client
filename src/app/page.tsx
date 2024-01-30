'use client';
import styles from './page.module.css';
import useSWR from 'swr';
import { getAllTodos } from '@/services/todoServices';

export default function Home(): JSX.Element {
  const { data: todos, isLoading } = useSWR('todos', getAllTodos);

  const awaitsTodos = todos?.filter((todo: ITodo) => todo.state == 'awaits');
  const inProcessTodos = todos?.filter((todo: ITodo) => todo.state == 'in procces');
  const doneTodos = todos?.filter((todo: ITodo) => todo.state == 'done');

  return isLoading ? (
    <h2>Loading...</h2>
  ) : (
    <main className={styles.main}>
      <h1 className={styles.mainTitle}>My ToDo List</h1>
      <button className={styles.addButton}>Add ToDo</button>
      <div className={styles.table}>
        <div className={styles.listContainer}>
          <h2 className={styles.listTitle}>awaits</h2>
          <ul className={styles.list}>
            {awaitsTodos &&
              awaitsTodos.map((todo: ITodo) => (
                <li className={styles.listItem} key={todo._id}>
                  <h3>{todo.title}</h3>
                  <p>{todo.description}</p>
                </li>
              ))}
          </ul>
        </div>
        <div className={styles.listContainer}>
          <h2 className={styles.listTitle}>in progress</h2>
          <ul className={styles.list}>
            {inProcessTodos &&
              inProcessTodos.map((todo: ITodo) => (
                <li className={styles.listItem} key={todo._id}>
                  <h3>{todo.title}</h3>
                  <p>{todo.description}</p>
                </li>
              ))}
          </ul>
        </div>
        <div className={styles.listContainer}>
          <h2 className={styles.listTitle}>done</h2>
          <ul className={styles.list}>
            {doneTodos &&
              doneTodos.map((todo: ITodo) => (
                <li className={styles.listItem} key={todo._id}>
                  <h3>{todo.title}</h3>
                  <p>{todo.description}</p>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

interface ITodo {
  _id: string;
  title: string;
  description: string;
  state: string;
}
