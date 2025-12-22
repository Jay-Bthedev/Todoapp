import React, { useState } from 'react'
import "./Todo.css"
import Modal from './Modal'
const Todo = (props) => {
    const [modalDisplay, setModalDisplay] = useState(false);

    const [todoDisplayData, setTodoDisplayData] = useState(props.todoData);
    


    const openModalFunction = () => { 
        setModalDisplay(true);
    }
    const closeModalFunction = () => {
        setModalDisplay(false);
    }

  return (
      <div className='Todo' >
          <div className='task'>
              {props.todoData.task}
          </div>

          <div className='status'>
              {props.todoData.status}
          </div>

          <div className='scheduleTime'>
              {props.todoData.scheduleTime}
          </div>

          <div className='todo-button-flex'>
              
              <button
                onClick={openModalFunction}
              >Edit</button>
              {/* <select value={props.todoData.status}>
                  <option>Pending</option>
                  <option>In Progress</option>
                    <option>Completed</option>
              </select> */}
              <button
                 onClick={()=>props.propsDeleteTodo(props.todoData)}
              
              >Delete</button>
              
              
          </div>

          {
              modalDisplay ?
                  <Modal
                  propsEditTodosArrayFunction={props.propsEditTodoFunction}
                  modalData={props.todoData}
                      propsCloseModal={closeModalFunction}
                  />
                  
                  : null
          }

        
    </div>
  )
}

export default Todo