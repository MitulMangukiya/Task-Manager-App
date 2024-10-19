import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskId, setTaskId] = useState(1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [filter, setFilter] = useState('All');
  const [editTaskId, setEditTaskId] = useState(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addOrUpdateTask = () => {
    if (title.trim() && description.trim()) {
      if (editTaskId) {
        const updatedTasks = tasks.map(task =>
          task.id === editTaskId ? { ...task, title, description } : task
        );
        setTasks(updatedTasks);
        setEditTaskId(null);
      } 
      else {
        const newTask = { 
          id: taskId, 
          title, 
          description, 
          completed: false 
        };
        setTasks([...tasks, newTask]);
        setTaskId(taskId + 1);
      }
      setTitle('');
      setDescription(''); 
    }
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  const toggleComplete = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const editTask = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setEditTaskId(task.id);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'Completed') return task.completed;
    if (filter === 'Pending') return !task.completed;
    return true;
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Task Manager App</h1>

      <div className="pb-4">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)} 
          className="border-[1px] border-gray-500 p-2 mr-2 rounded-md w-80 focus:outline-none" required/>
        <input
          type="text"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border-[1px] border-gray-500 rounded-md p-2 mr-2 w-80 focus:outline-none"
          required
        />
        <button onClick={addOrUpdateTask} className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-md">
          {editTaskId ? 'Update Task' : 'Add Task'}
        </button>
      </div>

      <div className="pb-4">
        <button onClick={() => setFilter('All')} className="mr-2 bg-gray-600 hover:bg-gray-500 text-white p-1 px-2 rounded-md">All</button>
        <button onClick={() => setFilter('Completed')} className="mr-2 bg-green-600 hover:bg-green-500 text-white p-1 rounded-md">Completed</button>
        <button onClick={() => setFilter('Pending')} className='bg-yellow-500 hover:bg-yellow-400 text-white p-1 rounded-md'>Pending</button>
      </div>

      <ul className='leading-7'>
        {filteredTasks.map(task => (
          <li key={task.id} className="border p-2 mb-2">
            <h3 className={`${task.completed ? 'line-through' : ''}`}><span className='font-semibold'>Task : </span>{task.title}</h3>

            <p><span className='font-semibold'>Description : </span>{task.description}</p>

            <button onClick={() => toggleComplete(task.id)} className={`mr-2 ${task.completed ? 'text-yellow-500' : 'text-green-500'}`}>
              {task.completed ? 'Unmark' : 'Mark Complete'}
            </button>

            <button onClick={() => editTask(task)} className='text-violet-600 mr-2'>Edit</button>

            <button onClick={() => deleteTask(task.id)} className="text-red-500">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
