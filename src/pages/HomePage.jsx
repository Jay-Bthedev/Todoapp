import React, { useEffect, useState } from 'react'
import "./HomePage.css"
import NavComponent from '../components/NavComponent'
import CreateTask from '../components/CreateTask'
import Todo from '../components/Todo'
// import Modal from '../components/Modal'

const HomePage = () => {

    const [todosArray, setTodosArray] = useState([ ]);

    const addNewTaskFunction = (theTaskToAdd) => {
      
        //spread operator
        console.log("this is the task to be added", theTaskToAdd);
        setTodosArray([...todosArray, theTaskToAdd]);
        console.log("successfully added");
        console.log(todosArray);
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
        
       
    }

    const deleteTodoFunction = (todoToDelete) => {
        

        const newTodo = todosArray.filter((todo) => todo.id != todoToDelete.id);
        setTodosArray(newTodo);
    }

    const resetTodoFunction = () => {
        setTodosArray([]);
    }


  return (
      <div className='homepage'>
          <NavComponent propsResetFunction={resetTodoFunction} />
          

          <main>
              
              <CreateTask taskAdderProps={addNewTaskFunction} />
              
              {
                  
                  todosArray.length > 0 ?
            

                      <div className='todos-wrapper'>
                  
                          {
                              todosArray.map((todo) => (
                                  <div key={todo.id}>
                              
                                      <Todo
                                          todoData={todo} propsEditTodoFunction={editTodosArrayFunction}
                                          propsDeleteTodo={deleteTodoFunction}
                                      />
                                  </div>
                              ))
                          }
                  
            
              
              
          
                  
                      </div>

                      
                      :
                      <div className='notodo'>
                          No to do available
                      </div>
              
              }
              

          </main>

          
    </div>
  )
}

export default HomePage