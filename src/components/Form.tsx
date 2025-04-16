import { ChangeEvent, FormEvent, useState } from 'react';

interface FormProps {
  addTask: (name: string) => void;
}

export default function Form(props: FormProps) {
  const [name, setName] = useState('');

  function handleSubmit(evt: FormEvent) {
    evt.preventDefault();
    props.addTask(name);
    setName('');
  }

  function handleChange(evt: ChangeEvent<HTMLInputElement>) {
    setName(evt.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className='label-wrapper'>
        <label
          htmlFor='new-todo-input'
          className='label__lg'
        >
          What needs to done?
        </label>
      </h2>
      <input
        type='text'
        id='new-todo-input'
        name='text'
        autoComplete='off'
        className='input input__lg'
        value={name}
        onChange={handleChange}
      />
      <button
        className='btn btn__ptimary btn__lg'
        type='submit'
      >
        Add
      </button>
    </form>
  );
}
