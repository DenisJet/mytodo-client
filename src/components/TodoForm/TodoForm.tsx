import { DetailedHTMLProps, HTMLAttributes, useRef } from 'react';
import styles from './TodoForm.module.css';
import { addNewTodo, updateTodo } from '@/services/todoServices';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';

export const TodoForm = ({ _id, title, description }: TodoFormProps): JSX.Element => {
  const router = useRouter();

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const edit = _id?.length > 0;

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

  const handleSubmitEdit = (evt: { preventDefault: () => void }) => {
    evt.preventDefault();
    const newTodo = {
      title: titleRef.current?.value,
      description: descriptionRef.current?.value,
      isDone: false,
    };

    updateTodo(newTodo, _id);
    router.push('/');
  };

  return edit ? (
    <form onSubmit={handleSubmitEdit} className={styles.todoForm}>
      <input className={styles.input} type='text' ref={titleRef} placeholder='Title' defaultValue={title} required />
      <input className={styles.input} ref={descriptionRef} placeholder='Details' defaultValue={description} />
      <div className={styles.buttonContainer}>
        <button type='submit' className={styles.button}>
          Update
        </button>
        <button type='button' className={styles.button} onClick={() => router.push('/')}>
          Cancel
        </button>
      </div>
    </form>
  ) : (
    <form onSubmit={handleSubmit} className={styles.todoForm}>
      <input className={styles.input} type='text' ref={titleRef} placeholder='Title' required />
      <input className={styles.input} ref={descriptionRef} placeholder='Details' />
      <button type='submit' className={styles.submitButton}>
        add todo
      </button>
    </form>
  );
};

export interface TodoFormProps extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  _id: string;
  title: string;
  description?: string;
}
