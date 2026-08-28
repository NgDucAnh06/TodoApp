import { useState } from 'react';
import './App.css';
import Form from './components/Form/form';
import Header from './components/Header/header';
import Table from './components/Table/table';

function App() {
    const [todos, setTodos] = useState([]);

    const handleAddTodo = (newTodo) => {
        setTodos((previousTodos) => [...previousTodos, newTodo]);
    };

    const handleDeleteTodo = (todoId) => {
        setTodos((previousTodos) => previousTodos.filter((todo) => todo.id !== todoId));
    };

    const handleCompleteTodo = (todoId) => {
        setTodos((previousTodos) =>
            previousTodos.map((todo) => (todo.id === todoId ? { ...todo, completed: !todo.completed } : todo)),
        );
    };

    return (
        <div className="App">
            <Header />
            <div className="main-content">
                <Form onAddTodo={handleAddTodo} />
                <Table todos={todos} onDeleteTodo={handleDeleteTodo} onCompleteTodo={handleCompleteTodo} />
            </div>
        </div>
    );
}

export default App;
