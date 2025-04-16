import { useState } from 'react';
import FilterButton from './components/FilterButton';
import Form from './components/Form';
import Todo from './components/Todo';
import { nanoid } from 'nanoid';

interface task {
  name: string;
  id: string;
  completed?: boolean;
}

interface interfaceFilterMap {
  [key: string]: (task?: task) => boolean | undefined;
}

const FILTER_MAP: interfaceFilterMap = {
  All: () => true,
  Active: (task?: task) => !task?.completed,
  Completed: (task?: task) => task?.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

interface AppProps {
  tasks: task[];
}

export default function App(props: AppProps) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');

  const taskList = tasks.filter(FILTER_MAP[filter]).map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  function toggleTaskCompleted(id: string) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function addTask(name: string) {
    const newTask = { id: `todo-${nanoid()}`, name, complite: false };
    setTasks([...tasks, newTask]);
  }

  function deleteTask(id: string) {
    const remainingTask = tasks.filter((task) => id !== task.id);
    setTasks(remainingTask);
  }

  function editTask(id: string, newName: string) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      console.log(task);
      return task;
    });
    setTasks(editedTaskList);
  }

  const taskNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${taskNoun} remaining`;

  return (
    <div className='todoapp stack-large'>
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className='filters btn-group stack-exception'>{filterList}</div>
      <h2 id='list-heading'>{headingText}</h2>
      <ul
        role='list'
        aria-labelledby='list-heading'
        className='todo-list stack-large stack-exception'
      >
        {taskList}
      </ul>
    </div>
  );
}
