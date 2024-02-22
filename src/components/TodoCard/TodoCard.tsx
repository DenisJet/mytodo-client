import { DetailedHTMLProps, HTMLAttributes, useState } from 'react';
import styles from './TodoCard.module.css';
import { deleteTodo, updateTodo } from '@/services/todoServices';
import { useRouter } from 'next/navigation';

export const TodoCard = (todo: TodoCardProps): JSX.Element => {
  const [activeTodo, setActiveTodo] = useState<boolean>(false);
  const router = useRouter();

  const handleUpdate = () => {
    const updatedTodo = {
      title: todo.title,
      description: todo.description,
      isDone: true,
    };

    updateTodo(updatedTodo, todo._id);
  };

  const handleDelete = () => {
    deleteTodo(todo._id);
    window.location.reload();
  };

  const handleEdit = () => {
    router.push(`/${todo._id}`);
  };

  return (
    <div className={styles.card}>
      <div>
        <p className={styles.cardTitle}>{todo.title}</p>
        <p className={styles.cardText}>{todo.description}</p>
      </div>
      <div className={styles.cardButtons}>
        {!todo.isDone && (
          <button className={styles.cardButton} type='button' title='edit' onClick={() => handleEdit()}>
            <img className={styles.cardIcon} src='icons/Pencil.svg' width='25px' height='25px' alt='icon edit' />
          </button>
        )}
        <button className={styles.cardButton} type='button' onClick={() => handleDelete()} title='remove'>
          <img className={styles.cardIcon} src='icons/Trash.svg' width='25px' height='25px' alt='icon remove' />
        </button>
        {!todo.isDone && (
          <button className={styles.cardButton} type='button' onClick={() => handleUpdate()} title='complete'>
            <img className={styles.cardIcon} src='icons/CheckCircle.svg' width='25px' height='25px' alt='icon done' />
          </button>
        )}
      </div>
    </div>
  );
};

export interface TodoCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  _id: string;
  title: string;
  description: string;
  isDone: boolean;
}
