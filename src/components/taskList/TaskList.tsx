import React from 'react';

export type TaskProps = {
  id: string;
  name: number;
};

type TaskListProps = {
  tasks: TaskProps[];
};

// Task component to display individual task
// It is memoized to prevent unnecessary re-renders.
const Task = React.memo(({ id, name }: TaskProps) => {
  return (
    <li className="w-[900px] border-2 border-gray-300 p-4 mb-2 rounded">
      <h3>{name}</h3>
    </li>
  );
});

// Function to render the list of tasks
const renderTasks = (tasks: TaskProps[]) => tasks.map((task) => <Task key={task.id} {...task} />);

// The same idea as the Task component, but for the list of tasks.
const TaskList = React.memo(({ tasks }: TaskListProps) => {
  if (tasks.length === 0) {
    return <p className="text-center">No tasks available</p>;
  }

  return (
    <div className="task-list">
      <h2 className="flex justify-center underline">{tasks.length === 1 ? 'Task' : 'Tasks'} list:</h2>
      <ul className="h-[550px] overflow-y-auto bg-gray-600 p-4">{renderTasks(tasks)}</ul>
    </div>
  );
});

export default TaskList;
