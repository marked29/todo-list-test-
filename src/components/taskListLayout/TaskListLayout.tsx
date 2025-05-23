import TaskList from '../taskList/TaskList';
import { useTasks } from '../../hooks/useTasks';
import { useEffect, useState } from 'react';

const TaskListLayout = () => {
  const { tasks, addTask, removeTask, taskValue, setTaskValue, error } = useTasks();

  // State variables to store the average, max, and min values.
  // I decieded to keep them outside of the useTasks hook because I didn't want useTasks to have multiple responsibilities.
  const [avgerage, setAverage] = useState<number | null>(null);
  const [maxValue, setMaxValue] = useState<number | null>(null);
  const [minValue, setMinValue] = useState<number | null>(null);

  // Effect to do all the calculations.
  useEffect(() => {
    if (tasks.length === 0) {
      setAverage(null);
      setMaxValue(null);
      setMinValue(null);
      return;
    }
    const numbers = tasks.map((task) => task.name);
    const sum = numbers.reduce((acc, num) => acc + Number(num), 0);

    setAverage(sum / numbers.length);
    setMaxValue(Math.max(...numbers.map(Number)));
    setMinValue(Math.min(...numbers.map(Number)));
  }, [tasks]);

  return (
    <>
      <div className="w-full flex ">
        <div className="flex-col m-auto ">
          <TaskList tasks={tasks} />
          <div className="flex align-middle gap-4 mt-4">
            <input
              type="text"
              value={taskValue}
              onChange={(e) => {
                setTaskValue(e.target.value);
              }}
              placeholder="Set number:"
              className="flex-1 text-black border-gray-500 p-4 rounded"
            />
            <button className="flex-1 bg-amber-800 border-2 border-gray-300 p-4 rounded" onClick={addTask}>
              add task
            </button>
            <button className="flex-1 bg-amber-800 border-2 border-gray-300 p-4 rounded" onClick={removeTask}>
              remove task
            </button>
          </div>
          {error && <p>{error}</p>}
          {maxValue && <p>Max Value: {maxValue}</p>}
          {minValue && <p>Min Value: {minValue}</p>}
          {avgerage && <p>Average: {avgerage}</p>}
        </div>
      </div>
    </>
  );
};
export default TaskListLayout;
