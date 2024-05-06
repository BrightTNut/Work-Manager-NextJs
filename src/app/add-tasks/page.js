"use client";
import React, { useState } from "react";
import Loginsvg from "./login.svg";
import Image from "next/image";
import { addTask } from "@/services/taskService";
import { toast } from "react-toastify";
import { connectDb } from "@/helper/db";
connectDb();
const AddTasks = () => {
  const [task, setTask] = useState({
    title: "",
    content: "",
    status: "",
    userId: "66236b0265d168e7cb34e069",
  });

  const handlesubmit = (e) => {
    e.preventDefault();
    console.log(task);

    //validate task data

    try {
      const result = addTask(task);
      toast("Task Added sucessfully");

      setTask({
        title: "",
        content: "",
        status: "none",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid  grid-cols-12 justify-center">
      <Image
        src={Loginsvg}
        className=" col-start-2 col-end-5 h-full shadow-lg shadow-red-100 w-full"
        alt="image"
      />
      <div className="border  col-start-6 col-end-12 p-8 shadow-gray-100 shadow-lg text-black rounded-3xl">
        <h1 className="text-center text-gray-100 text-3xl shadow-2xl shadow-green-200">
          Add Task Here
        </h1>
        <form onSubmit={handlesubmit}>
          {/* Task Name */}
          <div className="mt-7">
            <input
              type="text"
              placeholder="Add Task Name"
              className="p-2 w-full rounded-lg shadow-md  shadow-blue-400  bg-teal-100"
              name="title"
              onChange={(e) => {
                setTask({
                  ...task,
                  title: e.target.value,
                });
              }}
              value={task.title}
            />
          </div>

          {/* Task Content */}
          <div className="mt-7">
            <textarea
              type="text"
              placeholder="Add Task Content"
              className="p-2 w-full rounded-lg shadow-md shadow-blue-400  bg-teal-100 text-center"
              rows={5}
              name="content"
              onChange={(e) => {
                setTask({
                  ...task,
                  content: e.target.value,
                });
              }}
              value={task.content}
            />
          </div>

          {/* Status Changer */}
          <div className="mt-6">
            <label className="text-white text-1.3xl ">Select Status</label>
            <select
              className="w-full shadow-md shadow-blue-200 bg-teal-100 text-center rounded-lg p-5"
              name="status"
              onChange={(e) => {
                setTask({
                  ...task,
                  status: e.target.value,
                });
              }}
              value={task.status}
            >
              <option value={""} disabled selected>
                ----Select------
              </option>
              <option value={"Pending"}>Pending</option>
              <option value={"Completed"}>Completed</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="justify-center flex mt-4 gap-5">
            <button
              type="submit"
              className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Add
            </button>
            <button
              type="button"
              className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Clear
            </button>
          </div>

          {JSON.stringify(task)}
        </form>
      </div>
    </div>
  );
};

export default AddTasks;
