import { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import "./components/Todo.css";

export const Todo = () => {
    const [inputValue, setInputValue] = useState("");

    const [task, setTask] = useState(() => {
        const rawTodo = localStorage.getItem("reactTodo");
        try {
            return rawTodo ? JSON.parse(rawTodo) : [];
        } catch (error) {
            console.error("Invalid JSON in localStorage:", error);
            return [];
        }
    });

    // Save task list to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("reactTodo", JSON.stringify(task));
    }, [task]);

    // Handle input change
    const handleInputChange = (value) => {
        setInputValue(value);
    };

    // Handle form submission
    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (!inputValue.trim()) return;

        const ifTodoContentMatched = task.find(
            (curTask) => curTask.content === inputValue
        );
        if (ifTodoContentMatched) return;

        setTask((prevTask) => [
            ...prevTask,
            { id: Date.now(), content: inputValue, checked: false },
        ]);
        setInputValue("");
    };

    // Handle task delete
    const handleDeleteTodo = (id) => {
        const updatedTask = task.filter((curTask) => curTask.id !== id);
        setTask(updatedTask);
    };

    // Handle task completion
    const handleToggleCheck = (id) => {
        setTask((prevTask) =>
            prevTask.map((curTask) =>
                curTask.id === id
                    ? { ...curTask, checked: !curTask.checked }
                    : curTask
            )
        );
    };

    // Clear all tasks
    const handleClearAll = () => {
        setTask([]);
    };

    return (
        <section className="todo-container">
            <header>
                <h1>Todo list</h1>
            </header>
            <section className="form">
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <input
                            type="text"
                            className="todo-input"
                            autoComplete="off"
                            value={inputValue}
                            onChange={(event) => handleInputChange(event.target.value)}
                        />
                    </div>
                    <div>
                        <button type="submit" className="todo-btn">
                            Add Task
                        </button>
                    </div>
                </form>
                <section>
                    <ul>
                        {task.map((curTask) => (
                            <li
                                key={curTask.id}
                                className={`todo-item ${
                                    curTask.checked ? "checked" : ""
                                }`}
                            >
                                <span>{curTask.content}</span>
                                <button
                                    className="check-btn"
                                    onClick={() => handleToggleCheck(curTask.id)}
                                >
                                    <FaCheck />
                                </button>
                                <button
                                    className="delete-btn"
                                    onClick={() => handleDeleteTodo(curTask.id)}
                                >
                                    <MdDelete />
                                </button>
                            </li>
                        ))}
                    </ul>
                </section>
            </section>
            <section>
                <button onClick={handleClearAll} className="clear-all-btn">
                    Clear All
                </button>
            </section>
        </section>
    );
};
