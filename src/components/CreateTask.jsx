import React, { useState } from "react";
import "./CreateTask.css";

import toast from 'react-hot-toast';

const CreateTask = (props) => {
  const [newTask, setNewTask] = useState("");
  
  const [newTime, setNewTime] = useState("");

  const formSubmit = (e) => {
    e.preventDefault();

    
    if (!newTask || !newTime) {
        toast.error("Please fill in both the task and the time!");
        return;
    }

    console.log("New Task Created:", newTask);

    props.taskAdderProps({
      id: Date.now(),
      task: newTask,
      status: "Pending",
      
      scheduleTime: newTime, 
    });
      
    setNewTask("");
    setNewTime("");
  };

  return (
    <form onSubmit={formSubmit} className="create-task-form">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Create a new task"
      />
      <input
         type="time"
        value={newTime}
        onChange={(e)=>setNewTime(e.target.value)}
        placeholder="Input time"
      />

      <button type="submit">Add Task</button>
    </form>
  );
};

export default CreateTask;