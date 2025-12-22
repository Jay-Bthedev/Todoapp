import React, { useState } from 'react'
import ReactDOM from 'react-dom' 
import "./Modal.css"

const Modal = (props) => {
    
    
    const [editedTodo, setEditedTodo] = useState(props.modalData);

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedTodo({
            ...editedTodo,
            [name]: value
        })
    }

    const handleSave = (e) => {
        e.preventDefault();
        props.propsEditTodosArrayFunction(editedTodo);
        props.propsCloseModal();
    }

    
    return ReactDOM.createPortal(
        <div className='Modal' onClick={props.propsCloseModal}>
            <div 
                className='task-card' 
                onClick={(e) => e.stopPropagation()} 
            >
                <h3>Edit Task</h3>

                <form onSubmit={handleSave}>
                    <label>Task Name</label>
                    <input 
                        type='text'
                        name="task" 
                        value={editedTodo.task} 
                        onChange={handleEditChange} 
                    />

                    <label>Status</label>
                    <select 
                        name="status" 
                        value={editedTodo.status} 
                        onChange={handleEditChange}
                    >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>

                    <label>Time</label>
                    <input 
                        type="time" 
                        name="scheduleTime" 
                        value={editedTodo.scheduleTime} 
                        onChange={handleEditChange} 
                    />

                    <button type="submit">Save Changes</button>
                </form>
            </div>
        </div>,
        document.body 
    );
}

export default Modal