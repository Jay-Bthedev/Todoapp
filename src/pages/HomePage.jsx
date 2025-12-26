import React, { useEffect, useState } from 'react'
import "./HomePage.css"
import NavComponent from '../components/NavComponent'
import CreateTask from '../components/CreateTask'
import Todo from '../components/Todo'
import emptyImage from '../assets/void.svg';
import toast, { Toaster } from 'react-hot-toast';
import { db, auth } from '../firebase';
import { 
  collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot, query, where 
} from 'firebase/firestore';
import { signOut } from 'firebase/auth';



const ALARM_URL = "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3";

const HomePage = () => {
    const [todosArray, setTodosArray] = useState([]);
    const [user, setUser] = useState(auth.currentUser);

    //  FETCH TASKS FROM CLOUD ()
    useEffect(() => {
        if (!user) return;

        // Query: Only get tasks for a logged-in user
        const q = query(collection(db, "todos"), where("uid", "==", user.uid));
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const todos = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setTodosArray(todos);
        });

        return () => unsubscribe();
    }, [user]);

    //  ALARM CHECKER SYSTEM
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const currentTime = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }); // "14:30"

            todosArray.forEach((todo) => {
                // Check if time matches, task is NOT completed, and alarm hasn't triggered yet
                if (todo.scheduleTime === currentTime && todo.status !== "Completed" && !todo.alarmTriggered) {
                    playAlarm(todo);
                }
            });
        }, 30000); // Check every 30 seconds

        return () => clearInterval(interval);
    }, [todosArray]);

    const playAlarm = (todo) => {
        // Play Sound from URL
        const audio = new Audio(ALARM_URL);
        audio.play().catch(e => console.log("Audio play failed, user interaction required"));

        // Update DB to stop alarm looping
        const todoRef = doc(db, "todos", todo.id);
        updateDoc(todoRef, { alarmTriggered: true });

        // Show Alarm Toast
        toast((t) => (
            <div style={{textAlign: 'center'}}>
                <span style={{fontSize: '20px'}}>⏰</span>
                <p style={{fontWeight: 'bold', margin: '5px 0'}}>Time for: {todo.task}</p>
                <button 
                    onClick={() => {
                        toast.dismiss(t.id);
                        audio.pause();
                    }}
                    style={{
                        background: '#6366f1', color: 'white', border: 'none', 
                        padding: '5px 10px', borderRadius: '4px', cursor: 'pointer'
                    }}
                >
                    I'm on it!
                </button>
            </div>
        ), { duration: 8000, position: "top-center" });
    };

    //  ADD TASK TO CLOUD
    const addNewTaskFunction = async (theTaskToAdd) => {
        await addDoc(collection(db, "todos"), {
            task: theTaskToAdd.task,
            status: "Pending",
            scheduleTime: theTaskToAdd.scheduleTime,
            uid: user.uid, // Link task to user
            alarmTriggered: false
        });
        toast.success("Task saved to cloud!");
    };

    //  EDIT TASK IN CLOUD
    const editTodosArrayFunction = async (editedTodo) => {
        const todoRef = doc(db, "todos", editedTodo.id);
        await updateDoc(todoRef, {
            task: editedTodo.task,
            status: editedTodo.status,
            scheduleTime: editedTodo.scheduleTime
        });
        toast.success("Task updated!");
    }

    //  DELETE FROM CLOUD
    const deleteTodoFunction = (todoToDelete) => {
        toast((t) => (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px'}}>
                <span style={{fontWeight: 'bold'}}>Delete this task?</span>
                <div>
                    <button 
                        onClick={async () => {
                            await deleteDoc(doc(db, "todos", todoToDelete.id));
                            toast.dismiss(t.id);
                            toast.error("Task deleted");
                        }}
                        style={{ background: '#ff4d4f', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', marginRight: '8px' }}
                    >
                        Delete
                    </button>
                    <button 
                        onClick={() => toast.dismiss(t.id)}
                        style={{ background: '#fff', border: '1px solid #ccc', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
                    >Cancel</button>
                </div>
            </div>
        ));
    }

    const handleLogout = () => {
        signOut(auth);
        toast.success("Logged out");
    }

  return (
      <div className='homepage'>
          <Toaster position="top-center" reverseOrder={false} />

          <NavComponent propsResetFunction={() => setTodosArray([]) /* Clear local view only */} />
          
          {/* Logout Button */}
          <button 
            onClick={handleLogout} 
            className="logout-btn" 
            style={{
                position:'absolute', top:'20px', right:'20px',
                padding: '8px 16px', borderRadius: '8px', border: 'none',
                background: 'rgba(239, 68, 68, 0.2)', color: '#f87171', cursor: 'pointer'
            }}
          >
            Logout
          </button>
          
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
                    
                      <img src={emptyImage} alt="No tasks" style={{ width: '300px', opacity: '0.9', marginBottom: '20px' }} />
                      <p>No tasks yet. Time to relax!</p>
                  </div>
              )}
          </main>
    </div>
  )
}

export default HomePage