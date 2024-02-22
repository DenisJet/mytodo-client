'use client';
import { TodoCardProps, TodoForm } from '@/components';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { getById, updateTodo } from '@/services/todoServices';
import useSWR from 'swr';
import { useRef } from 'react';

export default function EditTask({ params }: { params: { _id: string } }): JSX.Element {
  const { data: todo, error, isLoading } = useSWR(`${params._id}`, getById);
  const router = useRouter();

  if (error) return <h2>Error</h2>;
  if (isLoading) return <h2>Loading...</h2>;

  return (
    <>
      <header className={styles.header}>
        <button type='button' className={styles.headerButton} onClick={() => router.push('/')}>
          &lArr;
        </button>
        <h1 className={styles.title}>Edit Task</h1>
      </header>
      <main className={styles.main}>
        <TodoForm _id={todo._id} title={todo.title} description={todo.description} />
      </main>
    </>
  );
}
