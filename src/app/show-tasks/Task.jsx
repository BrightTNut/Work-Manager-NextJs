import UserContext from "@/context/userContext";
import React, { useContext } from "react";
import { GiSplitCross } from "react-icons/gi";
const Task = ({ task, deletTaskParent }) => {
  const { user } = useContext(UserContext);
  function deleteTask(taskId) {
    deletTaskParent(taskId);
  }
  return (
    <div
      className={` shadow-lg mt-2 rounded-lg ${
        task.status == "Completed" ? "bg-green-500" : "bg-gray-800"
      }`}
    >
      <div className="p-5">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">{task.title}</h1>
          <span
            onClick={() => {
              deleteTask(task._id);
            }}
          >
            <GiSplitCross className="shadow-lg bg-gray-950 rounded-full" />
          </span>
        </div>

        <p className="font-normal">{task.content}</p>
        <div className="flex justify-between">
          <p>
            Status : {"  "}
            <span
              className={`${
                task.status == "Completed" ? "text-green-800" : "text-red-800"
              }`}
            >
              {task.status.toUpperCase()}
            </span>
          </p>
          <p className="text-right">
            Author : {"  "}
            <span className="text-orange-200">{user.name}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Task;
