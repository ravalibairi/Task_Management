import {useEffect, useState} from "react";


function UpdateTask({task,onUpdateTask,onClose}){

    const [data, setData] = useState({
        title:task.title || "",
        completed:task.completed || false,
    });

    useEffect(() => {
        setData({title: task.title,completed: task.completed})
    }, [task]);

    const handleOnSubmit=(event)=>{
        event.preventDefault();

        if (!data.title) {
            alert("Title is required.");
            return;
        }

        onUpdateTask({...task,...data});
        // Display form data in an alert
        alert(
            `Task has been modified successfully:\nTitle: ${data.title}\nCompleted: ${data.completed}`
        );
        console.log("Form Submitted:", data);
        onClose();
    }

    const handleOnChange=(event)=>{
        const  {name,value}=event.target;
        setData((values)=>({...values,[name]:
                name==="completed"?value==="true":value}));

    }

    return(
        <div>
            <form onSubmit={handleOnSubmit}>
                <label>Title
                    <input type="text"
                           value={data.title}
                           name="title"
                           onChange={handleOnChange}
                    />
                </label>
                <br/>
                <label>Completed
                    <select
                            value={data.completed}
                            name="completed"
                            onChange={handleOnChange}
                    >
                        <option value="false">false</option>
                        <option value="true">true</option>
                    </select>
                </label>
                <br/>
                <input type="submit" value="Submit"/>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );

}

export default UpdateTask;