import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { usePrevious } from './usePrevious';

interface TodoProps {
  name: string;
  id: string;
  completed?: boolean;
  toggleTaskCompleted: (id: string) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, newName: string) => void;
}

export default function Todo(props: TodoProps) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');

  const editFieldRef = useRef<HTMLInputElement>(null);
  const editButtonRef = useRef<HTMLButtonElement>(null);

  const wasEditing = usePrevious(isEditing);

  function handleChange(evt: ChangeEvent<HTMLInputElement>) {
    setNewName(evt.target.value);
  }

  function handleSubmit(evt: FormEvent) {
    evt.preventDefault();
    props.editTask(props.id, newName);
    setNewName('');
    setEditing(false);
  }

  useEffect(() => {
    if (!wasEditing && isEditing && editFieldRef.current) {
      editFieldRef.current.focus();
    } else if (wasEditing && !isEditing && editButtonRef.current) {
      editButtonRef.current.focus();
    }
  }, [isEditing, wasEditing]);

  const editingTemplate = (
    <form
      className='stack-small'
      onSubmit={handleSubmit}
    >
      <div className='form-group'>
        <label
          className='todo-label'
          htmlFor={props.id}
        >
          New name for {props.name}
        </label>
        <input
          id={props.id}
          className='todo-text'
          type='text'
          value={newName}
          onChange={handleChange}
          ref={editFieldRef}
        />
      </div>
      <div className='btn-group'>
        <button
          type='button'
          className='btn todo-cancel'
          onClick={() => setEditing(false)}
        >
          Cancel
          <span className='visually-hidden'>renaming {props.name}</span>
        </button>
        <button
          type='submit'
          className='btn btn__primary todo-edit'
        >
          Save
          <span className='visually-hidden'>new name for {props.name}</span>
        </button>
      </div>
    </form>
  );
  const viewTemplate = (
    <div className='stack-small'>
      <div className='c-cb'>
        <input
          id={props.id}
          type='checkbox'
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label
          className='todo-label'
          htmlFor={props.id}
        >
          {props.name}
        </label>
      </div>
      <div className='btn-group'>
        <button
          type='button'
          className='btn'
          onClick={() => setEditing(true)}
          ref={editButtonRef}
        >
          Edit <span className='visually-hidden'>{props.name}</span>
        </button>
        <button
          type='button'
          className='btn btn__danger'
          onClick={() => props.deleteTask(props.id)}
        >
          Delete <span className='visually-hidden'>{props.name}</span>
        </button>
      </div>
    </div>
  );
  return <li className='todo'>{isEditing ? editingTemplate : viewTemplate}</li>;
}
