import { DetailedHTMLProps, HTMLAttributes, useRef, useState } from 'react';
import styles from './TodoCard.module.css';
import { deleteTodo, updateTodo } from '@/services/todoServices';

export const TodoCard = (todo: TodoCardProps): JSX.Element => {
  const [activeTodo, setActiveTodo] = useState<boolean>(false);
  const [state, setState] = useState<string>(todo.state);

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value);
  };

  const handleSubmit = () => {
    const updatedTodo = {
      title: titleRef.current?.value,
      description: descriptionRef.current?.value,
      state: state,
    };

    updateTodo(updatedTodo, todo._id);
  };

  const changeHandler = () => {
    setActiveTodo(true);
  };

  const returnHandler = () => {
    setActiveTodo(false);
  };

  const deleteHandler = () => {
    deleteTodo(todo._id);
    window.location.reload();
  };

  return activeTodo ? (
    <form onSubmit={handleSubmit} className={styles.todoForm}>
      <fieldset className={styles.fieldset}>
        <legend>Change ToDo</legend>
        <div className={styles.inputContainer}>
          <input className={styles.inputText} type='text' ref={titleRef} defaultValue={todo.title} required />
        </div>
        <div className={styles.inputContainer}>
          <textarea
            className={styles.textarea}
            ref={descriptionRef}
            placeholder='описание задачи'
            defaultValue={todo.description}
            rows={4}
          />
        </div>
        <div className={styles.inputContainer}>
          <div>
            <input
              className={styles.radioInput}
              type='radio'
              id={'awaits' + todo._id}
              name='state'
              value='awaits'
              onChange={radioHandler}
              defaultChecked={todo.state === 'awaits'}
            />
            <label className={styles.label} htmlFor={'awaits' + todo._id}>
              awaits
            </label>
          </div>
          <div>
            <input
              className={styles.radioInput}
              type='radio'
              id={'in progress' + todo._id}
              name='state'
              value='in progress'
              onChange={radioHandler}
              defaultChecked={todo.state === 'in progress'}
            />
            <label className={styles.label} htmlFor={'in progress' + todo._id}>
              in progress
            </label>
          </div>
          <div>
            <input
              className={styles.radioInput}
              type='radio'
              id={'done' + todo._id}
              name='state'
              value='done'
              onChange={radioHandler}
              defaultChecked={todo.state === 'done'}
            />
            <label className={styles.label} htmlFor={'done' + todo._id}>
              done
            </label>
          </div>
        </div>
        <div className={styles.buttons}>
          <button type='submit' className={styles.submitButton} title='Save'>
            ✔️
          </button>
          <button type='submit' className={styles.returnButton} title='Return' onClick={returnHandler}>
            &#11119;
          </button>
        </div>
      </fieldset>
    </form>
  ) : (
    <div className={styles.card}>
      <div>
        <p className={styles.cardTitle}>{todo.title}</p>
        <p className={styles.cardText}>{todo.description}</p>
      </div>
      <div className={styles.cardButtons}>
        <button className={styles.cardButton} type='button'>
          <img className={styles.cardIcon} src='icons/Pencil.svg' width='25px' height='25px' alt='icon edit' />
        </button>
        <button className={styles.cardButton} type='button'>
          <img className={styles.cardIcon} src='icons/Trash.svg' width='25px' height='25px' alt='icon remove' />
        </button>
        <button className={styles.cardButton} type='button'>
          <img className={styles.cardIcon} src='icons/CheckCircle.svg' width='25px' height='25px' alt='icon done' />
        </button>
      </div>
    </div>
  );
};

export interface TodoCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  _id: string;
  title: string;
  description: string;
  state: string;
}
