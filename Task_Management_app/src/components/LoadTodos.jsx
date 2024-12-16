import { useEffect, useState } from "react";
import axios from "axios";
import AddTask from "./AddTask.jsx";
import UpdateTask from "./UpdateTask.jsx";
import SearchTask from "./SearchTask.jsx";


function LoadTodos() {
    const [todos, setTodos] = useState([]);
    const [showAddTask, setShowAddTask] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [searchedTask, setSearchedTask] = useState("");

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/todos?_limit=10/")
            .then((response) => setTodos(response.data))
            .catch((error) => console.error(error));
    }, []);

    const addNewTask = (newTask) => {
        setTodos((prevTodos) => [...prevTodos, newTask]);
    };

    const deleteTask = (id) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            setTodos((prevTodos) =>
                prevTodos.filter((item) => item.id !== id)
            );
        }
    };

    const updateTask = (updatedTask) => {
        setTodos((prevTodos) =>
            prevTodos.map((task) =>
                task.id === updatedTask.id ? updatedTask : task
            )
        );
        setTaskToEdit(null);
    };

    const searchTask = (id)=>{
        const result=todos.filter((task)=>
            task.id===id
        )
        setSearchedTask(result.length?result:[]);
        // useEffect(()=>{
        //     setSearchedTask(todos);
        // },[todos]);
        return result;
    }

    const onClose = () => {
        setTaskToEdit(null);
        setShowAddTask(false);
    };

    return (
        <div>
            {<SearchTask onSearchTask={searchTask}/>}
            <ul>
                {todos.map((item) => (
                    <li key={item.id}>
                        {item.title}
                        <button onClick={() => setTaskToEdit(item)}>Update</button>
                        <button onClick={() => deleteTask(item.id)}>Delete</button>
                        {taskToEdit && taskToEdit.id === item.id && (
                            <UpdateTask
                                task={taskToEdit}
                                onUpdateTask={updateTask}
                                onClose={onClose}
                            />
                        )}
                    </li>
                ))}
            </ul>
            <button onClick={() => setShowAddTask(true)}>Add Task</button>
            {showAddTask && <AddTask onAddTask={addNewTask} onClose={onClose} />}
        </div>
    );
}

export default LoadTodos;
