import React, { useEffect, useState } from 'react'
import "./HomePage.css"
import NavComponent from '../components/NavComponent'
import CreateTask from '../components/CreateTask'
import Todo from '../components/Todo'
import toast, { Toaster } from 'react-hot-toast';

const HomePage = () => {

    
    const [todosArray, setTodosArray] = useState(() => {
        const savedTodos = localStorage.getItem("myTodos");
        return savedTodos ? JSON.parse(savedTodos) : [];
    });

    
    useEffect(() => {
        localStorage.setItem("myTodos", JSON.stringify(todosArray));
    }, [todosArray]);

    const addNewTaskFunction = (theTaskToAdd) => {
        setTodosArray([...todosArray, theTaskToAdd]);
        toast.success("Task added successfully!");
    };

    const editTodosArrayFunction = (editedTodo) => {
        const newTodosArray = todosArray.map((todo) => {
            if (todo.id === editedTodo.id) {
                return {
                    ...todo,
                    task: editedTodo.task,
                    status: editedTodo.status,
                    scheduleTime: editedTodo.scheduleTime 
                };
            }   
            return todo;
        });
        setTodosArray(newTodosArray);
        toast.success("Task updated!");
    }

  
    const deleteTodoFunction = (todoToDelete) => {
        toast((t) => (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px'}}>
                <span style={{fontWeight: 'bold'}}>Delete this task?</span>
                <div>
                    <button 
                        onClick={() => {
                           
                            const newTodo = todosArray.filter((todo) => todo.id !== todoToDelete.id);
                            setTodosArray(newTodo);
                            
                           
                            toast.dismiss(t.id);
                            toast.error("Task deleted");
                        }}
                        style={{
                            background: '#ff4d4f', color: 'white', border: 'none', 
                            padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', marginRight: '8px'
                        }}
                    >
                        Delete
                    </button>
                    <button 
                        onClick={() => toast.dismiss(t.id)}
                        style={{
                            background: '#fff', border: '1px solid #ccc', 
                            padding: '6px 12px', borderRadius: '4px', cursor: 'pointer'
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        ), { duration: 5000, position: 'top-center' });
    }

   
    const resetTodoFunction = () => {
        if (todosArray.length === 0) return; 

        toast((t) => (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px'}}>
                <span style={{fontWeight: 'bold'}}>Clear ALL tasks?</span>
                <div>
                    <button 
                        onClick={() => {
                            
                            setTodosArray([]);
                            
                            // Close Confirm Toast & Show Success
                            toast.dismiss(t.id);
                            toast.error("All tasks cleared");
                        }}
                        style={{
                            background: '#ff4d4f', color: 'white', border: 'none', 
                            padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', marginRight: '8px'
                        }}
                    >
                        Yes, Clear All
                    </button>
                    <button 
                        onClick={() => toast.dismiss(t.id)}
                        style={{
                            background: '#fff', border: '1px solid #ccc', 
                            padding: '6px 12px', borderRadius: '4px', cursor: 'pointer'
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        ), { duration: 5000, icon: '⚠️' });
    }

  return (
      <div className='homepage'>
          {/* TOASTER COMPONENT  */}
          <Toaster position="top-center" reverseOrder={false} />

          <NavComponent propsResetFunction={resetTodoFunction} />
          
          <main>
              <CreateTask taskAdderProps={addNewTaskFunction} />
              
              {todosArray.length > 0 ? (
                  <div className='todos-wrapper'>
                      {todosArray.map((todo) => (
                          <div key={todo.id}>
                              <Todo
                                  todoData={todo} 
                                  propsEditTodoFunction={editTodosArrayFunction}
                                  propsDeleteTodo={deleteTodoFunction}
                              />
                          </div>
                      ))}
                  </div>
              ) : (
                  <div className='notodo'>
                      No to do available
                  </div>
              )}
          </main>
    </div>
  )
}

export default HomePage