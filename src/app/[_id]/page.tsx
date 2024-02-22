'use client';
import { TodoCardProps, TodoForm } from '@/components';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { getById, updateTodo } from '@/services/todoServices';
import useSWR from 'swr';
import { useRef } from 'react';

export default function EditTask({ params }: { params: { _id: string } }): JSX.Element {
  const { data: todo, isLoading } = useSWR(`${params._id}`, getById);
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  console.log(params._id);
  console.log(todo);

  const handleSubmit = (evt: { preventDefault: () => void }) => {
    evt.preventDefault();
    const newTodo = {
      title: titleRef.current?.value,
      description: descriptionRef.current?.value,
      isDone: false,
    };

    updateTodo(newTodo, todo._id);
    router.push('/');
  };

  return (
    <>
      <header className={styles.header}>
        <button type='button' className={styles.headerButton} onClick={() => router.push('/')}>
          &lArr;
        </button>
        <h1 className={styles.title}>Edit Task</h1>
      </header>
      <main className={styles.main}>
        <form onSubmit={handleSubmit} className={styles.todoForm}>
          <input
            className={styles.input}
            type='text'
            ref={titleRef}
            placeholder='Title'
            defaultValue={todo?.title}
            required
          />
          <input className={styles.input} ref={descriptionRef} placeholder='Details' defaultValue={todo?.description} />
          <button type='submit' className={styles.submitButton}>
            add todo
          </button>
        </form>
      </main>
    </>
  );
}
