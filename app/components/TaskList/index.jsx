import React from 'react';
import TaskItem from '../TaskItem';

const TaskList = ({ tasks, onToggle, onDelete, uncompletedCount, filter, setFilter, clearCompletedTasks }) => {
  return (
    <div className="bg-gray-800 rounded p-4">
      <ul>
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
        ))}
      </ul>
      <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
        <span>{uncompletedCount} items left</span>
        <div>
          <button onClick={() => setFilter('all')} className={`mr-2 ${filter === 'all' ? 'text-white' : ''}`}>All</button>
          <button onClick={() => setFilter('active')} className={`mr-2 ${filter === 'active' ? 'text-white' : ''}`}>Active</button>
          <button onClick={() => setFilter('completed')} className={`${filter === 'completed' ? 'text-white' : ''}`}>Completed</button>
        </div>
        <button
          onClick={clearCompletedTasks}
          className="text-gray-400 hover:text-white"
        >
          Clear Completed
        </button>
      </div>
    </div>
  );
};

export default TaskList;
