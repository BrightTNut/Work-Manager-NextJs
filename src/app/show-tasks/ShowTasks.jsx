"use client";
import UserContext from "@/context/userContext";
import Task from "./Task";
import { deleteTask, getTasksOfUser } from "@/services/taskService";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const ShowTasks = () => {
  const [tasks, setTasks] = useState([]);
  const context = useContext(UserContext);
  async function loadTasks(userId) {
    try {
      const TasksGet = await getTasksOfUser(userId);
      setTasks([...TasksGet]);
      //console.log(tasks);
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    if (context.user) {
      loadTasks(context.user._id);
    }
  }, [context.user]);

  async function deletTaskParent(tasksId) {
    try {
      const result = await deleteTask(tasksId);

      // console.log(tasksId);
      toast.success("Task Deleted !!!");
    } catch (error) {
      console.log(error);
      toast.error("Error in Deleting Task !!");
    }
  }
  return (
    <div className=" grid grid-cols-12 mt-3">
      <div className="col-span-6 col-start-4">
        <h1 className="text-3xl text-center mb-4">
          Your Tasks ({tasks.length})
        </h1>
        {tasks.map((task) => (
          <Task key={task._id} task={task} deletTaskParent={deletTaskParent} />
        ))}
      </div>
    </div>
  );
};

export default ShowTasks;
