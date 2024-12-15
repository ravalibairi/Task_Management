import {useEffect, useState} from "react";
import axios from "axios";
import AddTask from "./AddTask.jsx";

function LoadTodos(){
    const [todos, setTodos] = useState([]);
    const [showAddTask, setShowAddTask] = useState(false)

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/todos")
            .then((response)=>setTodos(response.data))
            .catch((error)=>console.error(error))
    }, []);

    const addNewTask=(newTask)=>{
        setTodos((prevTodos)=>[...prevTodos,newTask])
    }

    return(
        <div>
            <ul>
                {todos.map((item)=> (
                    <li key={item.id}>{item.title}
                        <button>Update</button>
                        <button>Delete</button>

                    </li>

                ))}


            </ul>
            <button onClick={()=>setShowAddTask(true)}>Add Task</button>
            {showAddTask && <AddTask onAddTask={addNewTask}/>}
        </div>
    );
}
export default LoadTodos;