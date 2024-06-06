'use client'
import { useEffect, useState } from 'react';
import TaskList from './components/TaskList';

/* eslint-disable react/no-unescaped-entities */

export default function Home() {
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem('tasks')) || [];
  });

  const [filter, setFilter] = useState('all');
  const [newTaskText, setNewTaskText] = useState('');



  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log(localStorage.getItem('tasks'));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTaskText.trim()) {
      const newTask = { id: Date.now(), text: newTaskText, completed: false };
      setTasks([...tasks, newTask]);
      setNewTaskText('');
    }
  };

  const handleToggleTask = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
  });

  const uncompletedCount = tasks.filter(task => !task.completed).length;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">TODO</h1>
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          className="bg-gray-800 text-white border-none rounded p-4 flex-grow"
          placeholder="What to do?"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white p-4 rounded ml-4"
        >
          Add Task
        </button>
      </div>
      <TaskList
        tasks={filteredTasks}
        onToggle={handleToggleTask}
        onDelete={handleDeleteTask}
        uncompletedCount={uncompletedCount}
        filter={filter}
        setFilter={setFilter}
        clearCompletedTasks={() => setTasks(tasks.filter(task => !task.completed))}
      />
    </div>
  );
}
