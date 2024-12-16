import {useState} from "react";


function SearchTask({onSearchTask}){

    const [userId, setUserId] = useState("");
    const [error,setError]=useState("")

    const handleOnSubmit = (event) => {
        event.preventDefault();

        if (!userId) {
            setError("UserId is required.");
            return;
        }
        if (isNaN(userId)) {
            setError("UserID must be a number.");
            return;
        }
        setError("");
        const result=onSearchTask(parseInt(userId,10));
        if(result.length==0){
            setError(`cannot find a  task with userId ${userId}`)
        }


    };

    const handleOnChange = (event) => {
        setUserId(event.target.value)
    };


    return(
        <div>
            <input type="text"
                   placeholder="enter userid to search "
                   value={userId}
                   onChange={handleOnChange}
            />
            <button onClick={handleOnSubmit}>Search</button>
            {error && <p>{error}</p>}

        </div>
    )
}

export default SearchTask;