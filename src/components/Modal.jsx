import React, { useState } from 'react'
import "./Modal.css"

const Modal = (props) => {

   

    

    const [modalTaskData, setModalTaskData] = useState(props.modalData);
    
    const saveChangesClicked = () => {
       
        props.propsEditTodosArrayFunction(modalTaskData);
        console.log("Edited task data sent from Modal:", modalTaskData);
         props.propsCloseModal();
    }



    



console.log("Current Time Value:", modalTaskData.scheduleTime);
  return (
      <div className='Modal'>
          
          
          


          <div className='task-card'>
              
              <h3>Edit your task</h3>

              <form>
                  <label>Task</label>
                  <input
                      value={modalTaskData.task}
                      onChange={(e) => {
                          
                          setModalTaskData({...modalTaskData, task: e.target.value})
                          
                      }}
                      type="text" placeholder='Edit your task here' />
                  <label>Schedule Time</label>
                  <input 
                  value={modalTaskData.scheduleTime || ""}
                   onChange={(e) => {
                          
                          setModalTaskData({...modalTaskData, scheduleTime: e.target.value})
                          
                      }}

                   type="time" />




                 
                  
                  <label>Status</label>

                  <select
                      value={modalTaskData.status} 
                      onChange={(e) => {
                          
                          setModalTaskData({...modalTaskData, status: e.target.value})
                          
                      }}
                      
                  
                  >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
              </select>
              <button onClick={saveChangesClicked} type='button'>Save Changes</button>
          </form>
              
          </div>
          
 



     </div>
  )
}

export default Modal