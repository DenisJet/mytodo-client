import { useRef } from 'react';
import styles from './TodoForm.module.css';
import { addNewTodo } from '@/services/todoServices';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { TodoCardProps } from '../TodoCard/TodoCard';

export const TodoForm = (todo: TodoCardProps): JSX.Element => {
  const router = useRouter();

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (evt: { preventDefault: () => void }) => {
    evt.preventDefault();
    const newTodo = {
      title: titleRef.current?.value,
      description: descriptionRef.current?.value,
      isDone: false,
    };

    addNewTodo(newTodo);
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.todoForm}>
      <input className={styles.input} type='text' ref={titleRef} placeholder='Title' required />
      <input className={styles.input} ref={descriptionRef} placeholder='Details' />
      <button type='submit' className={styles.submitButton}>
        add todo
      </button>
    </form>
  );
};
