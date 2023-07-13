import { useEffect } from "react";
import { useTasks } from "../context/TasksContext";
import { Link } from "react-router-dom";
import TaskCard from "../components/TaskCard.jsx";;

function TaskPage() {
  const { tasks, getTasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);
  return (
    <div>
      <div className="">
        <Link to="/add-task" className="w-full bg-zinc-500 hover:bg-zinc-600 text-white px-4 py-2 rounded-md my-2">
          New Task
        </Link>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {tasks.map((task) => (
          <TaskCard task={task} key={task._id} />
        ))}
      </div>
    </div>
  );
}

export default TaskPage;
