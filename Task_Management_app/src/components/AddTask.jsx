import { useState } from "react";

function AddTask({ onAddTask, onClose }) {
    const [data, setData] = useState({
        userId: "",
        title: "",
        completed: false,
    });

    const handleOnSubmit = (event) => {
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

        alert(
            `Task Added:\nUserID: ${data.userId}\nTitle: ${data.title}\nCompleted: ${data.completed}`
        );

        const newTask = { ...data, id: Date.now() };  // Fix here
        onAddTask(newTask);
        onClose();
    };

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setData((values) => ({
            ...values,
            [name]: name === "completed" ? value === "true" : value,
        }));
    };

    return (
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
                <br />
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
                <br />
                <label>
                    Completed
                    <select
                        name="completed"
                        id="completed"
                        value={data.completed}
                        onChange={handleOnChange}
                    >
                        <option value="false">False</option>
                        <option value="true">True</option>
                    </select>
                </label>
                <br />
                <input type="submit" value="Submit" />
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
}

export default AddTask;
