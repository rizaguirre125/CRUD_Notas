import { Link } from "react-router-dom";
import { useTasks } from "../context/TasksContext";
import days from "dayjs";
import utc from "dayjs/plugin/utc";

days.extend(utc);

function TaskCard({ task }) {
  const { deleteTask } = useTasks();

  const onClickBtnDelete = () => {
    deleteTask(task._id);
    console.log(task._id);
  };

  return (
    <div className="bg-zinc-800 max-w-md w-full p-5 rounded-10">
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <div className="flex gap-x-2 items-start">
          <Link
            to={`/tasks/${task._id}`}
            className="bg-blue-500 hove:bg-blue-600 text-white px-3 py-1 rounded-md"
          >
            Editar
          </Link>
          <button
            onClick={onClickBtnDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
          >
            Eliminar
          </button>
        </div>
      </header>
      <div className="flex py-2 justify-end ">
        <p className="text-left">
          {days(task.date).utc().format("DD/MM/YYYY")}
        </p>
      </div>
      <p className="text-slate-300">{task.description}</p>
    </div>
  );
}

export default TaskCard;
