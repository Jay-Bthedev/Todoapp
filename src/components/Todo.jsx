import React, { useState } from 'react'
import "./Todo.css"
import Modal from './Modal'

const Todo = (props) => {
    const [modalDisplay, setModalDisplay] = useState(false);

    
    const getStatusStyle = (status) => {
        if (status === 'Completed') {
            return { color: '#10b981', border: '1px solid #10b981', background: 'rgba(16, 185, 129, 0.1)' }; // Green
        } else if (status === 'In Progress') {
            return { color: '#3b82f6', border: '1px solid #3b82f6', background: 'rgba(59, 130, 246, 0.1)' }; // Blue
        } else {
            return { color: '#f59e0b', border: '1px solid #f59e0b', background: 'rgba(245, 158, 11, 0.1)' }; // Orange (Pending)
        }
    };

    const openModalFunction = () => { 
        setModalDisplay(true);
    }
    
    const closeModalFunction = () => {
        setModalDisplay(false);
    }

  return (
      <div className='Todo'>
          
          <div className='task' title={props.todoData.task}>
              {props.todoData.task}
          </div>

         
          <div 
            className='status' 
            style={getStatusStyle(props.todoData.status)}
          >
              {props.todoData.status}
          </div>

          <div className='scheduleTime'>
              {props.todoData.scheduleTime}
          </div>

          <div className='todo-button-flex'>
              <button onClick={openModalFunction}>
                  Edit
              </button>
              
              <button onClick={() => props.propsDeleteTodo(props.todoData)}>
                  Delete
              </button>
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