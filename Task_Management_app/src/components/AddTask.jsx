import {useState} from "react";

function AddTask({onAddTask}){
    const [data, setData] = useState({
        userId:"",
        title:"",
        completed:false,

    });

    const handleOnSubmit=(event)=>{
        event.preventDefault();

        if (!data.userId) {
            alert("UserId is required.");
            return;
        }
        if (isNaN(data.userId)) {
            alert("UserID must be a number.");
            return;
        }
        if (!data.title) {
            alert("Title is required.");
            return;
        }


        // Display form data in an alert
        alert(
            `Task Added:\nUserID: ${data.userId}\nTitle: ${data.title}\nCompleted: ${data.completed}`
        );

        console.log("Form Submitted:", data);
        const newTask={...data,id:Date.now};
        onAddTask(newTask);
    }

    const handleOnChange=(event)=>{
       const  {name,value}=event.target;
       setData((values)=>({...values,[name]:
           name==="completed"?value==="True":value}));

    }

    return(
        <div>
            <form onSubmit={handleOnSubmit}>
                <label>
                    User ID
                    <input
                        value={data.userId}
                        type="text"
                        name="userId"
                        id="userId"
                        onChange={handleOnChange}
                    />
                </label>
                <br/>
                <label>
                    Title
                    <input
                        value={data.title}
                        type="text"
                        name="title"
                        id="title"
                        onChange={handleOnChange}
                    />
                </label>
                <br/>
                <label>
                    Completed
                    <select
                        name="completed"
                        id="completed"
                        value={data.completed}
                        onChange={handleOnChange}
                    >
                        <option value="False">False</option>
                        <option value="True">True</option>
                    </select>
                </label>
                <br/>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
}

export default AddTask;