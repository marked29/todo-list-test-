import { useState, useMemo, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TaskProps } from '../components/taskList/TaskList';

/**
 * Custom hook to manage functionality to add and remove tasks.
 * It has several fields to expose to the component that uses it.
 * It returns the following fields:
 *
 * @tasks - array of the tasks to be displayed.
 * @addTask - function to add a task.
 * @removeTask - function to remove a task.
 * @taskValue - field that is used to set the value of the task.
 * @setTaskValue - function to set the value of the task.
 * @error - field that is used to display error messages.
 */

const INITIAL_TASKS: TaskProps[] = [];

// Function to check if the input value is valid. (in our case, it checks if the input value is not null, undefined or NaN)
const isValid = (inputValue: any): boolean => inputValue !== null && inputValue !== undefined && !isNaN(inputValue);

// Constant for handling error messages. Extend it if you want to add more error messages.
const ERROR_MESSAGES = {
  INVALID_INPUT: 'Please enter a valid number',
  TASK_NOT_FOUND: 'Task not found',
};

export const useTasks = () => {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [taskValue, setTaskValue] = useState<Number | any>(null);
  const [error, setError] = useState<string | null>(null);

  // Effect to manage error state.
  useEffect(() => {
    if (!isValid(taskValue)) {
      setError(ERROR_MESSAGES.INVALID_INPUT);
    } else {
      setError(null);
    }
  }, [tasks, taskValue]);

  const addTask = () => {
    const inputValue = taskValue;

    // Check validitiy of the input.
    if (!isValid(inputValue)) {
      setError(ERROR_MESSAGES.INVALID_INPUT);
      return;
    }

    setTasks((prevTasks) => [...prevTasks, { id: uuidv4(), name: inputValue }]);
  };

  const removeTask = () => {
    const inputValue = taskValue;

    // Check validitiy of the input.
    if (!isValid(inputValue)) {
      setError(error);
      return;
    }

    const prevNumber = tasks.find((task) => task.name === inputValue);

    if (!prevNumber) {
      setError(ERROR_MESSAGES.TASK_NOT_FOUND);
      return;
    }

    setTasks((prevTasks) => {
      return prevTasks.filter((task) => task.id !== prevNumber?.id);
    });
  };

  // Memoize the tasks to avoid unnecessary re-renders.
  const memoizedTasks = useMemo(() => tasks, [tasks]);

  return { tasks: memoizedTasks, addTask, removeTask, taskValue, setTaskValue, error };
};

export default useTasks;
