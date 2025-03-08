import { useState } from "react"
import { FaCheck } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import "./components/Todo.css";
export const Todo = () =>{

    const [inputValue, setInputValue] = useState("");
    const [task, setTask] = useState([]);

    const handleInputChange = (value) =>{
        setInputValue(value);
    }

    const handleFormSubmit = (event) =>{
        event.preventDefault();

        if(!inputValue) return;

        if(task.includes(inputValue)) {
            setInputValue("");
            return;
        }
        setTask((prevTask) => [...prevTask, inputValue]);

        setInputValue("");
    }

    const handleDeleteTodo = (value) =>{
        console.log(task);
        console.log(value);
        const updatedTask = task.filter((curTask)=> curTask !== value);
        setTask(updatedTask);
        
    }

    const handleClearAll = () =>{
        setTask([]);
    }
    return(
        <section className="todo-container">
            <header>
                <h1>Todo list</h1>
            </header>
            <section className="form">
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <input type="text" 
                        className="todo-input" 
                        autoComplete="off" 
                        value={inputValue}
                        onChange={(event) =>handleInputChange(event.target.value)}/>
                    </div>
                    <div>
                        <button type="submiit" className="todo-btn">Add Task</button>
                    </div>
                </form>
                <section>
                    <ul>
                        {
                            task.map((curTask, index) =>{
                                return <li key={index} className="todo-item">
                                    <span>{curTask}</span>
                                    <button className="check-btn"><FaCheck /></button>
                                    <button className="delete-btn" onClick={() => handleDeleteTodo(curTask)}><MdDelete /></button>
                                    
                                </li>
                            })
                        }
                    </ul>
                </section>
            </section>
            <section>
                <button onClick={handleClearAll} className="clear-all-btn">Clear All</button>
            </section>
        </section>
    )
}