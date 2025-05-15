import React, { createContext, useState, useEffect } from "react";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:6001/tasks')
        .then((r) => r.json())
        .then((data) => setTasks(data));
    }, []);

    const addTask = (title) => {
        const newTask = {
            id: crypto.randomUUID(), 
            title,
            completed: false,
        };
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    const toggleComplete = (id) => {
        setTasks((prev) => 
            prev.map((task) => 
                task.id === id ? { ...task, completed: !task.completed } : task
                //task.id===id ? {...task, completed: true} : task
            )
        );
    };

    return (
	// Provide theme state and toggle function to all components
	<TaskContext.Provider value={{ tasks, addTask, toggleComplete }}>
        {children}
    </TaskContext.Provider>
    );
}




     
