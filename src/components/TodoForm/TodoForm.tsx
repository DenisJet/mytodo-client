import { useRef } from 'react';
import styles from './TodoForm.module.css';
import { addNewTodo } from '@/services/todoServices';
import { redirect } from 'next/navigation';

export const TodoForm = (): JSX.Element => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    const newTodo = {
      title: titleRef.current?.value,
      description: descriptionRef.current?.value,
      isDone: false,
    };

    addNewTodo(newTodo);
    redirect('/');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.todoForm}>
      <div className={styles.inputContainer}>
        <input className={styles.input} type='text' ref={titleRef} placeholder='название задачи' required />
      </div>
      <div className={styles.inputContainer}>
        <textarea className={styles.input} ref={descriptionRef} placeholder='описание задачи' rows={2} cols={25} />
      </div>
      <button type='submit' className={styles.submitButton}>
        add todo
      </button>
    </form>
  );
};
