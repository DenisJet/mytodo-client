import { useRef, useState } from 'react';
import styles from './NewTodoForm.module.css';
import { addNewTodo } from '@/services/todoServices';

export const NewTodoForm = (): JSX.Element => {
  const [state, setState] = useState<string>('awaits');
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value);
  };

  const handleSubmit = () => {
    const newTodo = {
      title: titleRef.current?.value,
      description: descriptionRef.current?.value,
      state: state,
    };

    addNewTodo(newTodo);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.todoForm}>
      <fieldset className={styles.fieldset}>
        <legend>Add New ToDo</legend>
        <div className={styles.inputContainer}>
          <input className={styles.inputText} type='text' ref={titleRef} placeholder='название задачи' required />
        </div>
        <div className={styles.inputContainer}>
          <textarea
            className={styles.inputText}
            ref={descriptionRef}
            placeholder='описание задачи'
            rows={4}
            cols={25}
          />
        </div>
        <div className={styles.inputContainer}>
          <input type='radio' id='awaits' name='state' value='awaits' onChange={radioHandler} defaultChecked />
          <label htmlFor='awaits'>awaits</label>
          <input type='radio' id='in progress' name='state' value='in progress' onChange={radioHandler} />
          <label htmlFor='in progress'>in progress</label>
          <input type='radio' id='done' name='state' value='done' onChange={radioHandler} />
          <label htmlFor='done'>done</label>
        </div>
        <button type='submit' className={styles.submitButton}>
          add todo
        </button>
      </fieldset>
    </form>
  );
};
